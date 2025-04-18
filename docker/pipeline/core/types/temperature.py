from core.base import SensorConfig

class Temperature(SensorConfig):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.unit == "°F":
            self._convert_modes(self._c_to_f)
        elif self.unit == "K":
            self._convert_modes(self._c_to_k)
        elif self.unit != "°C":
            raise ValueError(f"Unsupported temperature unit: {self.unit}")

    def _convert_modes(self, convert_fn):
        self.modes = {
            mode: [convert_fn(v) for v in value_range]
            for mode, value_range in self.modes.items()
        }

    # Celsius to Fahrenheit
    def _c_to_f(self, c):  
        return c * 9/5 + 32

    # Celsius to Kelvin
    def _c_to_k(self, c):  
        return c + 273.15
