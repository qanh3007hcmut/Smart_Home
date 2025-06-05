@echo off
echo test Fall Detection with video/sample.mp4

cd ..
cd Facenet_Yolov8n
python3 run_events.py --task test_fall sample

