import paho.mqtt.client as mqtt
import random
import time

class TemperatureSensorPublisher:
    def __init__(self, broker="localhost", port=1883, device_id="simulated_temperature_sensor"):
        self.client = mqtt.Client()
        self.client.on_connect = lambda client, userdata, flags, rc: print(f"Connected with result code {rc}")
        self.state_topic = f"home/sensor/{device_id}/temperature"
        self.broker, self.port = broker, port

    def publish_temperature(self):
        while True:
            temperature = round(random.uniform(15.0, 45.0), 2)
            self.client.publish(self.state_topic, temperature)
            print(f"Published temperature: {temperature} °C to topic: {self.state_topic}")
            time.sleep(5)

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_start()
        self.publish_temperature()

if __name__ == "__main__":
    TemperatureSensorPublisher().start()