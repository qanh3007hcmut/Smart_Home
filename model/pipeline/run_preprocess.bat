@echo off
echo ai model running
echo data processing

cd ..
cd Facenet_Yolov8n

python3 run.py --task preprocess

echo training model
python3 run.py --task train

echo preprocess DONE!
