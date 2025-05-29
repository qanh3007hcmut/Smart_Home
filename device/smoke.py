import paho.mqtt.client as mqtt
import random
import time

class SmokeSensorPublisher:
    def __init__(self, broker="localhost", port=1883, device_id="simulated_smoke_sensor"):
        self.client = mqtt.Client()
        self.client.on_connect = lambda client, userdata, flags, rc: print(f"Connected with result code {rc}")
        self.state_topic = f"home/sensor/{device_id}/smoke"
        self.broker, self.port = broker, port

    def publish_smoke_status(self):
        while True:
            # Simulate smoke detection
            smoke_detected = random.choice(["smoke", "clear"])
            self.client.publish(self.state_topic, smoke_detected)
            print(f"Published smoke status: {smoke_detected} to topic: {self.state_topic}")
            time.sleep(5)

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_start()
        self.publish_smoke_status()

if __name__ == "__main__":
    SmokeSensorPublisher().start()                                                             