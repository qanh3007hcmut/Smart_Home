import paho.mqtt.client as mqtt
import random
import time

class CameraFaceDetectionPublisher:
    def __init__(self, broker="localhost", port=1883, device_id="simulated_camera"):
        self.client = mqtt.Client()
        self.client.on_connect = lambda client, userdata, flags, rc: print(f"Connected with result code {rc}")
        self.state_topic = f"home/camera/{device_id}/face"
        self.broker, self.port = broker, port

    def publish_face_detection(self):
        while True:
            # Simulate face detection
            face_detected = random.choice(["familiar", "unfamiliar", "none"])
            self.client.publish(self.state_topic, face_detected)
            print(f"Published face detection: {face_detected} to topic: {self.state_topic}")
            time.sleep(5)

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_start()
        self.publish_face_detection()

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