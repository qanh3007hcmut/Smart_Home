import paho.mqtt.client as mqtt
import time
import random

broker = "mosquitto"  # hoặc "mosquitto" nếu trong Docker network
port = 1883

client = mqtt.Client()
client.connect(broker, port, 60)
client.loop_start()

try:
    while True:
        temperature = round(random.uniform(18.0, 32.0), 2)
        client.publish("home/sensor/temperature", str(temperature))
        print(f"Sent: {temperature}°C")
        time.sleep(5)
except KeyboardInterrupt:
    print("Stopped by user.")
    client.loop_stop()
    client.disconnect()
