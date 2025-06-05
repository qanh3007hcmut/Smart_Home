@echo off
echo test Face Recognition with webcam

cd ..
cd Facenet_Yolov8n
python3 run.py --task test live

