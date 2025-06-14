## Run terminal at ```Facenet_testing```
## Install requirement
```bash
pip install -r requirements.txt
```
### 1. Preprocess data
- Add image of person for dataset in ```Facenet_testing/dataset/facedata/raw```
- Then, run the following cmd
```bash
python3 run.py --task preprocess
```
After showing the number of processed image, it means the cmd is running successfully

### 2. Training model
- Run the following cmd
```bash
python3 run.py --task train
```
After showing ```Saved classifier model to file "Models/facemodel.pkl"```, it means the cmd is running successfully

### 3. Test with video.mp4
- Run the following cmd with ```sample``` is name of mp4 video test in ```Facenet_testing\video```
```bash
python3 run.py --task test sample
```
- If want the video recorded live from laptop camera
```bash
python3 run.py --task test live
```
- When exit the camera it will automatically saved into the video folder. You must exit the record by pressing Q in the video recording tab or else the video file will be corrupted and can't be opened

- Face that appear most of the time in 3 second will be captured and store in folder ```Facenet_testing/captured_faces```

### 4. Event Detection Camera
- Run the following cmd with ```sample``` is name of mp4 video test in ```Facenet_testing\video```. This will enable fall detection and motion detection
```bash
python3 run_events.py --task test_fall sample
```
- To only detect motion in a video:
```bash
python3 run_events.py --task test_motion sample
```
- To run fall detection using your webcam:
```bash
python3 run_events.py --task test_fall live
```
- To run motion detection only using your webcam:
```bash
python3 run_events.py --task test_motion live
```
