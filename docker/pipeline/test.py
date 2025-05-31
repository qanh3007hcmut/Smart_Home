import paho.mqtt.client as mqtt
client = mqtt.Client()

try:
    client.connect("172.20.96.1", 1883, 60)
    client.loop_start()
    client.publish("home/frontdoor/notifications", "1234", qos=1, retain=True)
except Exception as e:
    print(e)
finally:
    client.loop_stop()
    client.disconnect()
