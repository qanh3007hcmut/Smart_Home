import json
import logging
import paho.mqtt.client as mqtt
# from core.base import SensorConfig
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


class MQTTClient:
    def __init__(self, broker: str, port: int):
        self.broker = broker
        self.port = port
        self.client = mqtt.Client()

    def connect(self):
        try:
            self.client.connect(self.broker, self.port, 60)
            self.client.loop_start()
            logging.info(f"Connected to MQTT broker at {self.broker}:{self.port}")
        except Exception as e:
            logging.error(f"Failed to connect to MQTT broker: {e}")
            raise

    def disconnect(self):
        self.client.loop_stop()
        self.client.disconnect()
        logging.info("MQTT client disconnected")
