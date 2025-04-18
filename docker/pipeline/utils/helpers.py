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
        
    with open('config/mqtt.yaml', 'r') as f:
        mqtt_config = yaml.safe_load(f)
    
    config = {
        'sensor': sensor_config["sensors"],
        'binary_sensor': binary_sensor_config["binary_sensors"],
        'lock': lock_config["locks"],
        'mqtt': mqtt_config
    }
    
    return config
