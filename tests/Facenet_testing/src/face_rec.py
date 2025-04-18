from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import argparse
import facenet
import os
import sys
import math
import pickle
import align.detect_face
import numpy as np
import cv2
import collections
from sklearn.svm import SVC
import paho.mqtt.client as mqtt
from ultralytics import YOLO


class FaceDetectionManager:
    _instance = None
    
    def __init__(self):
        self.latest_result = "none"
        self.is_running = False
        # Initialize MQTT client
        self.client = mqtt.Client()
        self.client.on_connect = lambda client, userdata, flags, rc: print(f"FDM connected with result code {rc}")
        try:
            self.client.connect("localhost", 1883, 60)
            self.client.loop_start()
        except Exception as e:
            print(f"Could not connect to MQTT broker: {e}")
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = FaceDetectionManager()
            print(f"Created new instance: {id(cls._instance)}")
        else:
            print(f"Returning existing instance: {id(cls._instance)}")
        return cls._instance
    
    def update_result(self, name, probability):
        if probability > 0.5:
            if name == "Dwayne Johnson":
                result = "familiar"
            else:
                result = "unfamiliar"
        else:
            result = "unfamiliar"
        self.latest_result = result
        # Publish result directly to MQTT
        self.client.publish("home/face_detection/status", result)
    
    def get_current_result(self):
        if not self.is_running:
            return "none"
        print(f"Current result: {self.latest_result}")
        return self.latest_result
    
    def start(self):
        self.is_running = True
    
    def stop(self):
        self.is_running = False
        self.client.publish("home/face_detection/status", "none")
        self.client.loop_stop()
        self.client.disconnect()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--path', help='Path of the video you want to test on.', default=0)
    args = parser.parse_args()
    
    # Load YOLO model instead of MTCNN
    yolo_model = YOLO('Models/yolov8_face.pt')
    
    # Existing parameters
    INPUT_IMAGE_SIZE = 160
    CLASSIFIER_PATH = 'Models/facemodel.pkl'
    VIDEO_PATH = args.path
    FACENET_MODEL_PATH = 'Models/20180402-114759.pb'

    # Load classifier and facenet model
    with open(CLASSIFIER_PATH, 'rb') as file:
        model, class_names = pickle.load(file)
    
    graph = tf.Graph()
    with graph.as_default():
        gpu_options = tf.compat.v1.GPUOptions(per_process_gpu_memory_fraction=0.6)
        sess = tf.compat.v1.Session(config=tf.compat.v1.ConfigProto(gpu_options=gpu_options))
        
        with sess.as_default():
            facenet.load_model(FACENET_MODEL_PATH)
            
            # Get Facenet tensors
            images_placeholder = graph.get_tensor_by_name("input:0")
            embeddings = graph.get_tensor_by_name("embeddings:0")
            phase_train_placeholder = graph.get_tensor_by_name("phase_train:0")
            
            # Initialize video capture
            cap = cv2.VideoCapture(VIDEO_PATH)
            face_manager = FaceDetectionManager.get_instance()
            face_manager.start()
            
            try:
                while cap.isOpened():
                    ret, frame = cap.read()
                    if not ret:
                        break
                        
                    # Use YOLO instead of MTCNN
                    results = yolo_model(frame, verbose=False)[0]
                    boxes = results.boxes
                    
                    if len(boxes) > 0:
                        for box in boxes:
                            # Get coordinates
                            x1, y1, x2, y2 = map(int, box.xyxy[0])
                            
                            # Extract and process face
                            face = frame[y1:y2, x1:x2]
                            if face.size == 0:
                                continue
                                
                            # Resize and preprocess
                            scaled = cv2.resize(face, (INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE),
                                            interpolation=cv2.INTER_CUBIC)
                            scaled = facenet.prewhiten(scaled)
                            scaled_reshape = scaled.reshape(-1, INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE, 3)
                            
                            # Get face embedding
                            feed_dict = {
                                images_placeholder: scaled_reshape,
                                phase_train_placeholder: False
                            }
                            emb_array = sess.run(embeddings, feed_dict=feed_dict)
                            
                            # Predict identity
                            predictions = model.predict_proba(emb_array)
                            best_class_indices = np.argmax(predictions, axis=1)
                            best_class_probabilities = predictions[
                                np.arange(len(best_class_indices)), best_class_indices
                            ]
                            
                            best_name = class_names[best_class_indices[0]]
                            print("Name: {}, Probability: {}".format(best_name, best_class_probabilities))
                            
                            # Update result via manager
                            face_manager.update_result(best_name, best_class_probabilities[0])
                            
                            # Draw bounding box and name
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                            cv2.putText(frame, f"{best_name}: {best_class_probabilities[0]:.2f}",
                                    (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 2)
                    
                    else:
                        face_manager.latest_result = "none"
                        
                    cv2.imshow('Face Recognition', frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
                        
            finally:
                face_manager.stop()
                cap.release()
                cv2.destroyAllWindows()


if __name__ == "__main__":
    main()