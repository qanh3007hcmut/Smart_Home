from abc import ABC, abstractmethod

from core.base import *
from core.types.temperature import *

class Factory(ABC):
            
    @abstractmethod
    def create(self) -> Component: 
        pass

class SensorFactory(Factory):
    SENSOR_MAP = {
            'temperature' : Temperature
        }
    
    def create(self, sensor : dict) -> SensorConfig:
        sensor_type = sensor['type']
        cls = self.SENSOR_MAP.get(sensor_type, SensorConfig)
        return cls(**{k: v for k, v in sensor.items()})

class BinarySensorFactory(Factory):
    BINARY_SENSOR_MAP = {
            
        }
    
    def create(self, component : dict) -> BinarySensorConfig:
        _type = component['type']
        cls = self.BINARY_SENSOR_MAP.get(_type, BinarySensorConfig)
        binary_sensor = cls(
            _type = component['type'],
            state_topic = component['state_topic'], 
            on = component['payload_on'], 
            off = component['payload_off']
        )
        return binary_sensor

class LockFactory(Factory):
    LOCK_MAP = {
            
        }
    
    def create(self, component : dict) -> LockConfig:
        _type = component['type']
        cls = self.LOCK_MAP.get(_type, LockConfig)
        lock = cls(
            _type = component['type'],
            command_topic = component['command_topic'],
            state_topic = component['state_topic'], 
            payload_lock = component['payload_lock'], 
            payload_unlock = component['payload_unlock'], 
            payload_open = component['payload_open'], 
            state_locked = component['state_locked'], 
            state_unlocked = component['state_unlocked'], 
            state_locking = component['state_locking'], 
            state_unlocking = component['state_unlocking'], 
            pin_code = component['code']
        )
        return lock