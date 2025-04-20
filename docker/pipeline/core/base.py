import logging
import json
import time
from abc import ABC, abstractmethod

from utils.validator import process_modes
from utils.mqtt_client import MQTTClient

class Component(ABC):
    @abstractmethod
    def publish_state(self):
        raise NotImplementedError

class SensorConfig(Component):
    def __init__(self, type, state_topic, unit, precision = 0, modes = None, active_modes = None, **kwargs):
        self.type = type
        self.state_topic = state_topic
        self.unit = unit
        self.precision = precision
        self.modes = process_modes(modes) or {}
        self.active_modes = active_modes or list(self.modes.keys())
        
    def _get_range(self):
        import random
        selected_mode = random.choice(self.active_modes)
        return random.choice(self.modes[selected_mode])        

    def generate_value(self):
        import random
        low, high = self._get_range()
        return round(random.uniform(low, high), self.precision)

    def publish_state(self, mqtt : MQTTClient):   
        value = self.generate_value()
        payload = str(value)
        try:
            mqtt.client.publish(self.state_topic, payload)
            logging.info(f"Published {self.type} → {payload} {self.unit}")
        except Exception as e:
            logging.warning(f"Failed to publish {self.type}: {e}") 
    
class BinarySensorConfig(Component):
    def __init__(self, _type, state_topic, on, off):
        self.type = _type
        self.state_topic = state_topic
        self.on = on
        self.off = off
        
    def publish_state(self, mqtt : MQTTClient, on = True):   
        payload = str(self.on if on else self.off)
        try:
            mqtt.client.publish(self.state_topic, payload, retain=True)
            logging.info(f"Published {self.type} → {payload}")
        except Exception as e:
            logging.warning(f"Failed to publish {self.type}: {e}") 
            
class LockConfig(Component):
    def __init__(self, _type, command_topic, state_topic, payload_lock, payload_unlock, payload_open, state_locked, state_unlocked, state_locking, state_unlocking, pin_code = None):
        self.type = _type
        self.command_topic = command_topic
        self.state_topic = state_topic
        self.payload_lock = payload_lock
        self.payload_unlock = payload_unlock
        self.payload_open = payload_open
        self.state_locked = state_locked
        self.state_unlocked = state_unlocked
        self.state_locking = state_locking
        self.state_unlocking = state_unlocking
        self.pin_code = pin_code
        self._current_state = None
        
    def publish_state(self, mqtt: MQTTClient, lock: bool):
        main_payload = self.state_locked if lock else self.state_unlocked
        ing_payload = self.state_locking if lock else self.state_unlocking
        
        try:
            mqtt.client.publish(self.state_topic, ing_payload, retain=True)
            logging.info(f"{self.type}: Published state → {ing_payload}")
            
            mqtt.client.loop() 
            time.sleep(5)
            
            mqtt.client.publish(self.state_topic, main_payload, retain=True)
            logging.info(f"{self.type}: Published state → {main_payload}")
            
            self._current_state = main_payload
        except Exception as e:
            logging.warning(f"{self.type}: Failed to publish state: {e}")
 
    def handle_command(self, payload: str, mqtt: MQTTClient):
        try:
            data = json.loads(payload)
            action = data.get("action")
            code = data.get("code")
        except json.JSONDecodeError:
            logging.warning(f"{self.type}: Invalid JSON command → {payload}")
            return

        if self.pin_code and code != self.pin_code:
            logging.warning(f"{self.type}: Invalid PIN code → {code}")
            return

        if action == self.payload_lock:
            self.publish_state(mqtt, lock=True)
        elif action == self.payload_unlock:
            self.publish_state(mqtt, lock=False)
        elif action == self.payload_open:
            if self._current_state == self.state_locked:
                self.publish_state(mqtt, lock=False)
                
                mqtt.client.loop()
                time.sleep(10)
            
            self.publish_state(mqtt, lock=True)
        else:
            logging.warning(f"{self.type}: Unknown action → {action}")
    
    def subscribe_command(self, mqtt: MQTTClient):
        def _on_command(client, userdata, msg):
            payload = msg.payload.decode()
            logging.info(f"{self.type}: Received command → {payload}")
            self.handle_command(payload, mqtt)

        mqtt.client.subscribe(self.command_topic)
        mqtt.client.message_callback_add(self.command_topic, _on_command)
        logging.info(f"{self.type}: Subscribed to {self.command_topic}")

class LightConfig(Component):
    def __init__(
            self, 
            _type, 
            state_topic, 
            command_topic, 
    ):
        self._type = _type
        self.state_topic = state_topic
        self.command_topic = command_topic
        self._current_state = None
    
    def publish_state(self, mqtt: MQTTClient, payload):
        payload = json.dumps(payload)
        try:
            mqtt.client.publish(self.state_topic, payload, qos = 1, retain=True)
            logging.info(f"{self._type}: Published state → {payload}")
            
            self._current_state = payload
        except Exception as e:
            logging.warning(f"{self._type}: Failed to publish state: {e}")
 
    def handle_command(self, payload: str, mqtt: MQTTClient):
        try:
            data = json.loads(payload)
            msg = {
                "state" : data.get("state"),
                "brightness" : data.get("brightness")
            }
            self.publish_state(mqtt, msg)
        except json.JSONDecodeError:
            logging.warning(f"{self._type}: Invalid JSON command → {payload}")
            return            

    
    def subscribe_command(self, mqtt: MQTTClient):
        def _on_command(client, userdata, msg):
            payload = msg.payload.decode()
            logging.info(f"{self._type}: Received command → {payload}")
            self.handle_command(payload, mqtt)

        mqtt.client.subscribe(self.command_topic)
        mqtt.client.message_callback_add(self.command_topic, _on_command)
        logging.info(f"{self._type}: Subscribed to {self.command_topic}") 

class HVACConfig(Component):
    def __init__(
            self, 
            _type, 
            mode_command_topic, 
            temperature_command_topic,
            fan_mode_command_topic,
            swing_mode_command_topic,
            swing_horizontal_mode_command_topic,
            preset_mode_command_topic,
            
            mode_state_topic,
            temperature_state_topic,
            fan_mode_state_topic,
            swing_mode_state_topic,
            swing_horizontal_mode_state_topic,
            preset_mode_state_topic
    ):
        self._type = _type
        self.command_topics = {
            "mode": mode_command_topic,
            "temperature": temperature_command_topic,
            "fan_mode": fan_mode_command_topic,
            "swing_mode": swing_mode_command_topic,
            "swing_horizontal_mode": swing_horizontal_mode_command_topic,
            "preset_mode": preset_mode_command_topic,
        }

        # State topics
        self.state_topics = {
            "mode": mode_state_topic,
            "temperature": temperature_state_topic,
            "fan_mode": fan_mode_state_topic,
            "swing_mode": swing_mode_state_topic,
            "swing_horizontal_mode": swing_horizontal_mode_state_topic,
            "preset_mode": preset_mode_state_topic,
        }

        self._current_state = {}
    
    def publish_state(self, mqtt: MQTTClient, field: str, value):
        topic = self.state_topics.get(field)
        if not topic:
            logging.warning(f"{self._type}: No state topic defined for '{field}'")
            return
        try:
            mqtt.client.publish(topic, str(value), qos=1, retain=True)
            logging.info(f"{self._type}: Published {field} state → {value}")
            self._current_state[field] = value
        except Exception as e:
            logging.warning(f"{self._type}: Failed to publish {field} state: {e}")
 
    def handle_command(self, topic: str, payload: str, mqtt: MQTTClient):
        for field, cmd_topic in self.command_topics.items():
            if cmd_topic == topic:
                self.publish_state(mqtt, field, payload)
                break
        else:
            logging.warning(f"{self._type}: Unknown command topic → {topic}")

    
    def subscribe_command(self, mqtt: MQTTClient):
        for field, topic in self.command_topics.items():
            def make_callback(field_name, topic_name):
                def _on_command(client, userdata, msg):
                    payload = msg.payload.decode()
                    logging.info(f"{self._type}: Received {field_name} command → {payload}")
                    self.handle_command(topic_name, payload, mqtt)
                return _on_command

            mqtt.client.subscribe(topic)
            mqtt.client.message_callback_add(topic, make_callback(field, topic))
            logging.info(f"{self._type}: Subscribed to {field} command topic → {topic}")

    