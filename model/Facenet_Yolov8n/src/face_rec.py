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
from ultralytics import YOLO
from datetime import datetime
import time
import json
import paho.mqtt.client as mqtt

from streaming import start_streaming, push_frame
from rtps import FFmpegStreamer

class FaceDetectionManager:
    _instance = None
    
    def __init__(self):
        self.latest_result = "none"
        self.is_running = False
    
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
    
    def get_current_result(self):
        if not self.is_running:
            return "none"
        print(f"Current result: {self.latest_result}")
        return self.latest_result
    
    def start(self):
        self.is_running = True
    
    def stop(self):
        self.is_running = False


# New class for face capture functionality, completely separate from MQTT
class FaceCaptureSystem:
    def __init__(self, client : mqtt.Client = None):
        self.client = client
        self.face = {}
        self.face_trackers = {}  # Track multiple faces
        self.face_capture_dir = "captured_faces"
        os.makedirs(self.face_capture_dir, exist_ok=True)
        
    def track_face(self, face_id, face_img, face_info, timestamp):
        """
        Track a face for 3 seconds to determine if it should be saved
        """
        current_time = time.time()
        
        if face_id not in self.face_trackers:
            # New face detected, start tracking
            self.face_trackers[face_id] = {
                'start_time': current_time,
                'frames': 1,
                'present_frames': 1,  # Frames where face is present
                'best_image': face_img.copy(),  # Store best quality image
                'info': face_info,
                'saved': False
            }
            
            if face_info['display_name'] not in self.face:
                self.face[face_info['display_name']] = current_time
                
            print(f"New face tracker created: {face_id}, {face_info['display_name']}")
        else:
            # Update existing face tracker
            tracker = self.face_trackers[face_id]
            tracker['frames'] += 1
            tracker['present_frames'] += 1
            
            # Keep the best quality image (largest face area)
            current_area = (face_info['x2'] - face_info['x1']) * (face_info['y2'] - face_info['y1'])
            existing_area = (tracker['info']['x2'] - tracker['info']['x1']) * (tracker['info']['y2'] - tracker['info']['y1'])
            
            if current_area > existing_area:
                tracker['best_image'] = face_img.copy()
                tracker['info'] = face_info
            
            # Check if 3 seconds have passed
            if current_time - tracker['start_time'] >= 3.0:
                # Calculate presence ratio
                presence_ratio = tracker['present_frames'] / tracker['frames']
                
                # Save the face if it appeared most of the time and hasn't been saved yet
                if presence_ratio > 0.8 and not tracker['saved']:  # If present more than 60% of the time
                    self.save_face(face_id, tracker['best_image'], tracker['info']['display_name'], timestamp)
                    tracker['saved'] = True
                    print(f"Face {face_id} saved with presence ratio {presence_ratio:.2f}")
                    
        return self.face_trackers[face_id] if face_id in self.face_trackers else None
    
    def save_face(self, face_id, face_img, name, timestamp):
        """
        Save the face image to disk
        """
        def _format(seconds: float) -> str:
            seconds = int(seconds)
            parts = []

            hours = seconds // 3600
            if hours:
                parts.append(f"{hours} hour{'s' if hours > 1 else ''}")

            minutes = (seconds % 3600) // 60
            if minutes:
                parts.append(f"{minutes} minute{'s' if minutes > 1 else ''}")

            secs = seconds % 60
            if secs or not parts:  # luôn hiển thị ít nhất 1 đơn vị
                parts.append(f"{secs} second{'s' if secs > 1 else ''}")

            return " ".join(parts)
        # Create filename with timestamp and face ID
        filename = f"{self.face_capture_dir}/{timestamp}_{name}_{face_id}.jpg"
        cv2.imwrite(filename, face_img)
        print(f"Saved face to {filename}")
        duration = time.time() - self.face[name] if self.face.get(name) else 0
        payload = {
            "name": name,
            "timestamp": timestamp,
            "timestand": _format(duration)
        }
        self.client.publish("home/frontdoor/notifications", json.dumps(payload), qos=1, retain=True)
        print("published payload from AI")
        
    
    # Replace the existing update_trackers method with this improved version:
    def update_trackers(self):
        """
        Update all face trackers, without affecting frame counts
        Only check for expired trackers
        """
        current_time = time.time()
        
        # List for trackers to remove
        to_remove = []
        
        for face_id, tracker in self.face_trackers.items():
            
            # Remove trackers that are too old (more than 5 seconds since start)
            if current_time - tracker['start_time'] > 5.0:
                to_remove.append(face_id)
                
                # Debug print
                ratio = tracker['present_frames'] / tracker['frames']
                print(f"Face {face_id} expired. Final ratio: {ratio:.2f} ({tracker['present_frames']}/{tracker['frames']})")
                
                # Save face if it appeared most of the time but wasn't saved yet
                if not tracker['saved'] and ratio > 0.8:
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    self.save_face(face_id, tracker['best_image'], tracker['info']['display_name'], timestamp)
        
        active_names = {
            tracker['info']['display_name']
            for tracker in self.face_trackers.values()
            if tracker.get('info', {}).get('display_name') is not None
        }
        
        self.face = {
            name: data for name, data in self.face.items()
            if name in active_names
        }
        
        # Remove old trackers
        for face_id in to_remove:
            self.face_trackers.pop(face_id, None)
        
        
        
    def find_matching_face_id(self, x1, y1, x2, y2):
        """Find if this face matches any existing tracked face"""
        # Face center
        center_x = (x1 + x2) / 2
        center_y = (y1 + y2) / 2
        
        # Check against existing faces
        for face_id, tracker in self.face_trackers.items():
            info = tracker['info']
            existing_center_x = (info['x1'] + info['x2']) / 2
            existing_center_y = (info['y1'] + info['y2']) / 2
            
            # Calculate distance between centers
            distance = ((center_x - existing_center_x)**2 + 
                       (center_y - existing_center_y)**2)**0.5
            
            # If centers are close, it's likely the same face
            if distance < 50:  # 50-pixel threshold
                return face_id
        
        # No match found, generate new ID
        return f"face_{int(time.time()*1000)}"

    # Add this new method to FaceCaptureSystem class:
    def mark_faces_absent(self, detected_face_ids):
        """
        Mark faces as absent if they weren't detected in this frame
        """
        # Get all tracked faces
        all_face_ids = set(self.face_trackers.keys())
        
        # Find faces that were not detected in this frame
        absent_face_ids = all_face_ids - set(detected_face_ids)
        
        # Update frame count for absent faces
        for face_id in absent_face_ids:
            if face_id in self.face_trackers:
                self.face_trackers[face_id]['frames'] += 1
    

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--path', help='Path of the video you want to test on.', default=0)
    parser.add_argument('--live', action='store_true', help='Use live camera feed')
    args = parser.parse_args()
    client = mqtt.Client()
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
    
    # Initialize face capture system (separate from MQTT)
    face_capture = FaceCaptureSystem(client)
    
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
            
            # Initialize video capture and recording
            if args.live:
                print("Starting live camera feed...")
                VIDEO_PATH = 0  # Use default camera
                # Set up video recording

                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                output_path = os.path.join('video', f'live_recording_{timestamp}.mp4')
                os.makedirs('video', exist_ok=True)  # Create video directory if it doesn't exist
            else:
                VIDEO_PATH = args.path
                output_path = None

            cap = cv2.VideoCapture(VIDEO_PATH)
            if not cap.isOpened():
                print("Error: Could not open video source")
                return

            # Initialize video writer for live recording
            out = None
            if args.live:
                frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                fps = 40.0  # Standard video recording rate
                fourcc = cv2.VideoWriter_fourcc(*'mp4v')
                out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

            face_manager = FaceDetectionManager.get_instance()
            face_manager.start()
            
            try:
                try:
                    client.connect("172.20.96.1", 1883, 60)
                    client.loop_start()
                except: pass
                start_streaming()
                streamer = FFmpegStreamer()
                streamer.start()
                while cap.isOpened():
                    ret, frame = cap.read()
                    if not ret:
                        break
                    
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    
                    # Update all face trackers
                    face_capture.update_trackers()
                        
                    # Use YOLO instead of MTCNN
                    results = yolo_model(frame, verbose=False)[0]
                    boxes = results.boxes
                    
                    # Collect IDs of faces detected in current frame
                    detected_face_ids = []
                    
                    if len(boxes) > 0:
                        for i, box in enumerate(boxes):
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
                            confidence = best_class_probabilities[0]
                            display_name = "unknown" if confidence < 0.5 else best_name
                            print("Name: {}, Probability: {:.2f}".format(display_name, confidence))
                            
                            # Update result via manager
                            face_manager.update_result(best_name, confidence)
                            
                            # Draw bounding box and name
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                            cv2.putText(frame, f"{display_name}: {confidence:.2f}",
                                    (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 2)
                            
                            # Generate a face_id based on position and size
                            face_id = face_capture.find_matching_face_id(x1, y1, x2, y2)
                            detected_face_ids.append(face_id)
                            
                            # Track face for capturing 
                            face_info = {
                                'x1': x1,
                                'y1': y1,
                                'x2': x2,
                                'y2': y2,
                                'display_name': display_name,
                                'confidence': confidence
                            }
                            tracker = face_capture.track_face(face_id, face, face_info, timestamp)
                            
                            # Show timer if tracking
                            if tracker:
                                elapsed_time = time.time() - tracker['start_time']
                                if elapsed_time < 3.0:
                                    # Draw timer
                                    timer_text = f"Timer: {3.0 - elapsed_time:.1f}s"
                                    cv2.putText(frame, timer_text, (x1, y2+20), 
                                             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
                                elif not tracker['saved'] and tracker['present_frames'] / tracker['frames'] > 0.6:
                                    # Visual indicator that face will be saved
                                    cv2.putText(frame, "Saving...", (x1, y2+20), 
                                             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                    
                    else:
                        face_manager.latest_result = "none"
                    
                    # Mark faces as absent if they weren't detected in this frame
                    face_capture.mark_faces_absent(detected_face_ids)
                        
                    # Save frame if recording
                    if out is not None:
                        out.write(frame)

                    cv2.imshow('Face Recognition', frame)
                    push_frame(frame)
                    streamer.send_frame(frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        print(f"Recording saved to: {output_path}" if args.live else "Video processing complete")
                        break
                        
            finally:
                face_manager.stop()
                cap.release()
                streamer.stop()
                try:
                    client.loop_stop()
                    client.disconnect()
                except: pass
                if out is not None:
                    out.release()
                cv2.destroyAllWindows()


if __name__ == "__main__":
    main()