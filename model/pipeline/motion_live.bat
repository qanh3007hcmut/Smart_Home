@echo off
echo test Fall Detection with webcam

cd ..
cd Facenet_Yolov8n
python3 run_events.py --task test_fall live

