from typing import List

def load_config() -> dict:
    """
    Loads sensor and MQTT configurations from YAML files.

    Reads configuration data from:
    - `config/sensors.yaml`: Contains sensor-related settings.
    - `config/mqtt.yaml`: Contains MQTT broker and connection settings.

    Returns:
        dict: A dictionary with two keys:
            - 'sensor': Sensor configuration data.
            - 'mqtt': MQTT configuration data.

    Raises:
        FileNotFoundError: If either YAML file is not found.
        yaml.YAMLError: If there is an error parsing the YAML files.
    """
    import yaml

    with open('config/sensors.yaml', 'r') as f:
        sensor_config = yaml.safe_load(f)
    
    with open('config/binary_sensors.yaml', 'r') as f:
        binary_sensor_config = yaml.safe_load(f)
    
    with open('config/locks.yaml', 'r') as f:
        lock_config = yaml.safe_load(f)
    
    with open('config/lights.yaml', 'r') as f:
        light_config = yaml.safe_load(f)
    
    with open('config/hvacs.yaml', 'r') as f:
        hvac_config = yaml.safe_load(f)
    
    with open('config/switches.yaml', 'r') as f:
        switch_config = yaml.safe_load(f)
    
    with open('config/humidifiers.yaml', 'r') as f:
        humidifier_config = yaml.safe_load(f)
        
    with open('config/mqtt.yaml', 'r') as f:
        mqtt_config = yaml.safe_load(f)
    
    
    
    config = {
        'sensor': sensor_config["sensors"],
        'binary_sensor': binary_sensor_config["binary_sensors"],
        'lock': lock_config["locks"],
        'light': light_config["lights"],
        'hvac' : hvac_config["hvacs"],
        'switch' : switch_config["switches"],
        'humidifier' : humidifier_config["humidifiers"],
        'mqtt': mqtt_config
    }
    
    return config

def initialzize_entities(mqtt, entities : List[List]):
    from core.base import LockConfig, LightConfig, HVACConfig, SwitchConfig, BinarySensorConfig, HumidifierConfig
    def initialize_lock(locks : List[LockConfig]):
        for ele in locks:
            ele.publish_state(mqtt, lock = True)
            ele.subscribe_command(mqtt)
    
    def initialize_light(lights : List[LightConfig]):
        for ele in lights:
            ele.publish_state(mqtt, {"state":"OFF", "brightness":"100"})
            ele.subscribe_command(mqtt)
    
    def initialize_hvac(hvacs : List[HVACConfig]):
        for ele in hvacs:
            ele.publish_state(mqtt, field = "mode", value = "auto")
            ele.publish_state(mqtt, field = "temperature", value = 16)
            ele.publish_state(mqtt, field = "humidity", value = 50)
            ele.subscribe_command(mqtt)
    
    def initialize_humidifier(hvacs : List[HumidifierConfig]):
        for ele in hvacs:
            ele.publish_state(mqtt, field = "command", value = "ON")
            ele.publish_state(mqtt, field = "mode", value = "auto")
            ele.publish_state(mqtt, field = "humidity", value = 50)
            ele.subscribe_command(mqtt)
            
    def initialize_switch(switches : List[SwitchConfig]):
        for ele in switches:
            ele.publish_state(mqtt, "OFF")
            ele.subscribe_command(mqtt)
    
    def initialize_binary_sensor(bsensors : List[BinarySensorConfig]):
        for ele in bsensors:
            ele.publish_state(mqtt, False)
            
    for list in entities:
        if isinstance(list[0], LockConfig):
            initialize_lock(list)
        elif isinstance(list[0], LightConfig):
            initialize_light(list)    
        elif isinstance(list[0], HVACConfig):
            initialize_hvac(list)    
        elif isinstance(list[0], SwitchConfig):
            initialize_switch(list)    
        elif isinstance(list[0], BinarySensorConfig):
            initialize_binary_sensor(list)    
        elif isinstance(list[0], HumidifierConfig):
            initialize_humidifier(list)
        
        