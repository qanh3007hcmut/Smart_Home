import time
from typing import Dict, List

from core.factory import *
from utils.mqtt_client import MQTTClient
from utils.helpers import load_config, initialzize_entities

config = load_config() 
mqtt = MQTTClient(config["mqtt"]["broker"], config["mqtt"]["port"])

factory: Dict[str, Factory] = {
    'sensor' : SensorFactory(),
    'binary_sensor' : BinarySensorFactory(),
    'lock' : LockFactory(),
    'light' : LightFactory(),
    'hvac' : HVACFactory(),
    'switch' : SwitchFactory(),
}

sensors : List[SensorConfig] = [factory['sensor'].create(sensor_conf) for sensor_conf in config["sensor"]] 
binary_sensors : List[BinarySensorConfig] = [factory['binary_sensor'].create(bin_sensor_conf) for bin_sensor_conf in config["binary_sensor"]] 
locks : List[LockConfig] = [factory['lock'].create(lock_conf) for lock_conf in config["lock"]] 
lights : List[LightConfig] = [factory['light'].create(light_conf) for light_conf in config["light"]] 
hvacs: List[HVACConfig] = [factory['hvac'].create(hvac_conf) for hvac_conf in config["hvac"]] 
switches: List[SwitchConfig] = [factory['switch'].create(hvac_conf) for hvac_conf in config["switch"]] 

ini_entities = [binary_sensors, locks, lights, hvacs, switches]
def run():
    mqtt.connect()

    initialzize_entities(mqtt, ini_entities)
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
