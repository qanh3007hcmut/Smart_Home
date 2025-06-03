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

class LightFactory(Factory):
    LIGHT_MAP = {
            
        }
    
    def create(self, component : dict) -> LightConfig:
        _type = component['type']
        cls = self.LIGHT_MAP.get(_type, LightConfig)
        light = cls(
            _type = component['type'],
            command_topic = component['command_topic'],
            state_topic = component['state_topic'], 
        )
        return light

class SwitchFactory(Factory):
    SWITCH_MAP = {
            
        }
    
    def create(self, component : dict) -> SwitchConfig:
        _type = component['type']
        cls = self.SWITCH_MAP.get(_type, SwitchConfig)
        light = cls(
            _type = component['type'],
            command_topic = component['command_topic'],
            state_topic = component['state_topic'], 
        )
        return light
    
class HVACFactory(Factory):
    HVAC_MAP = {}
    
    def create(self, component : dict) -> HVACConfig:
        _type = component['type']
        cls = self.HVAC_MAP.get(_type, HVACConfig)
        hvac = cls(
            _type = component['type'],
            mode_command_topic = component['mode_command_topic'], 
            temperature_command_topic = component['temperature_command_topic'],
            fan_mode_command_topic = component['fan_mode_command_topic'],
            swing_mode_command_topic = component['swing_mode_command_topic'],
            swing_horizontal_mode_command_topic = component['swing_horizontal_mode_command_topic'],
            preset_mode_command_topic = component['preset_mode_command_topic'],
            target_humidity_command_topic = component['target_humidity_command_topic'],
            mode_state_topic = component['mode_state_topic'],
            temperature_state_topic = component['temperature_state_topic'],
            fan_mode_state_topic = component['fan_mode_state_topic'],
            swing_mode_state_topic = component['swing_mode_state_topic'],
            swing_horizontal_mode_state_topic = component['swing_horizontal_mode_state_topic'],
            preset_mode_state_topic = component['preset_mode_state_topic'],
            target_humidity_state_topic = component['target_humidity_state_topic']
        )
        return hvac

class HumidifierFactory(Factory):
    Humidifier_MAP = {}
    
    def create(self, component : dict) -> HumidifierConfig:
        _type = component['type']
        cls = self.Humidifier_MAP.get(_type, HumidifierConfig)
        humidifier = cls(
            _type = component['type'],
            command_topic = component['command_topic'],
            state_topic = component['state_topic'],
            target_humidity_command_topic = component['target_humidity_command_topic'],
            mode_command_topic = component['mode_command_topic'],
            target_humidity_state_topic = component['target_humidity_state_topic'],
            mode_state_topic = component['mode_state_topic'],
        )
        return humidifier
    