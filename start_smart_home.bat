@echo off
set PYTHONPATH=%PYTHONPATH%;%cd%
start "Face Recognition" cmd /k "cd tests\Facenet_testing && python3 run.py --task test sample"
start "Camera MQTT Publisher" cmd /k "cd device && set PYTHONPATH=%PYTHONPATH%;.. && python3 camera.py"