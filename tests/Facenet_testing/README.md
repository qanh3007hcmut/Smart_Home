[Download this file](https://drive.google.com/file/d/1ZNJyJVqp4I8Yr-kwvNTcv-dThagLKM6Q/view?usp=sharing)
## Then put it in ```Facenet_testing/models```
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

Reference: 
# MiAI_FaceRecog_3
Nhận diện khuôn mặt khá chuẩn xác bằng MTCNN và Facenet!
Chạy trên Tensorflow 2.x

Article link: http://miai.vn/2019/09/11/face-recog-2-0-nhan-dien-khuon-mat-trong-video-bang-mtcnn-va-facenet/

#MìAI 
Fanpage: http://facebook.com/miaiblog<br>
Group trao đổi, chia sẻ: https://www.facebook.com/groups/miaigroup<br>
Website: http://ainoodle.tech<br>
Youtube: http://bit.ly/miaiyoutube<br>
