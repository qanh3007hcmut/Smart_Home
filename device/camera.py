import sys
import os
# Add project root to Python path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(root_dir)

# Add Facenet src directory to Python path
facenet_src = os.path.join(root_dir, 'tests', 'Facenet_testing', 'src')
sys.path.append(facenet_src)
from tests.Facenet_testing.src.face_rec import FaceDetectionManager
import paho.mqtt.client as mqtt
import random
import time
import threading

class CameraFaceDetectionPublisher:
    def __init__(self, broker="localhost", port=1883, device_id="simulated_camera"):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.state_topic = f"home/camera/{device_id}/face"
        self.broker, self.port = broker, port
        self.last_update_time = time.time()
        self.update_interval = 1
        self.timer = None
        self.start_check_timer()

    def start_check_timer(self):
        # Cancel existing timer if any
        if self.timer:
            self.timer.cancel()
        # Start new timer
        self.timer = threading.Timer(self.update_interval, self.check_status)
        self.timer.start()

    def check_status(self):
        # If no new message received within interval, publish "none"
        self.client.publish(self.state_topic, "none")
        print("No face detection message received, publishing 'none'")
        # Restart timer
        self.start_check_timer()

    def on_connect(self, client, userdata, flags, rc):
        print(f"Connected with result code {rc}")
        # Subscribe to face detection status
        client.subscribe("home/face_detection/status")

    def on_message(self, client, userdata, msg):
        if msg.topic == "home/face_detection/status":
            current_time = time.time()
            if current_time - self.last_update_time >= self.update_interval:
                result = msg.payload.decode()
                self.client.publish(self.state_topic, result)
                print(f"Published face detection: {result} to topic: {self.state_topic}")
                
                # Update interval based on result and restart timer
                if result == "familiar":
                    self.update_interval = 6
                else:
                    self.update_interval = 1
                
                self.last_update_time = current_time
                self.start_check_timer()

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_forever()

    def __del__(self):
        if self.timer:
            self.timer.cancel()

class FallDetectionCamera:
    def __init__(self, broker="localhost", port=1883, device_id="simulated_fall_camera"):
        self.client = mqtt.Client()
        self.client.on_connect = lambda client, userdata, flags, rc: print(f"Connected with result code {rc}")
        self.state_topic = f"home/camera/{device_id}/fall"
        self.broker, self.port = broker, port

    def publish_fall_detection(self):
        while True:
            # Simulate fall detection
            fall_status = random.choice(["fall_detected", "no_fall"])
            self.client.publish(self.state_topic, fall_status)
            print(f"Published fall status: {fall_status} to topic: {self.state_topic}")
            time.sleep(5)

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_start()
        self.publish_fall_detection()

if __name__ == "__main__":
    CameraFaceDetectionPublisher().start()
    FallDetectionCamera().start()