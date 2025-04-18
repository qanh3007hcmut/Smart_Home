import time
from typing import Dict, List

from core.factory import *
from utils.mqtt_client import MQTTClient
from utils.helpers import load_config

config = load_config() 
mqtt = MQTTClient(config["mqtt"]["broker"], config["mqtt"]["port"])

factory: Dict[str, Factory] = {
    'sensor' : SensorFactory(),
    'binary_sensor' : BinarySensorFactory(),
    'lock' : LockFactory()
}

sensors : List[SensorConfig] = [factory['sensor'].create(sensor_conf) for sensor_conf in config["sensor"]] 
binary_sensors : List[BinarySensorConfig] = [factory['binary_sensor'].create(bin_sensor_conf) for bin_sensor_conf in config["binary_sensor"]] 
locks : List[LockConfig] = [factory['lock'].create(lock_conf) for lock_conf in config["lock"]] 

def run():
    mqtt.connect()
    # Initialize state for binary sensor
    # [ele.publish_state(mqtt, on=False) for ele in binary_sensors]
    [ele.subscribe_command(mqtt) for ele in locks]
    try:    
        while True:
            [ele.publish_state(mqtt) for ele in sensors]
            time.sleep(config["mqtt"]["interval"])
    except KeyboardInterrupt:
        print("Stopped by user!")
    finally:
        mqtt.disconnect()
            
if __name__ == "__main__":
    run()
