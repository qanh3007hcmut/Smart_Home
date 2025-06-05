@echo off
echo test Face Recognition with video/sample.mp4

cd ..
cd Facenet_Yolov8n
python3 run_events.py --task test_motion sample

