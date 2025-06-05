import argparse
import subprocess

def process_task(task, filename = None):
    def preprocess():
        command = [
            "python3", "src/align_dataset_mtcnn.py",
            "dataset/facedata/raw", "dataset/facedata/processed",
            "--image_size", "160",
            "--margin", "32",
            "--random_order",
            "--gpu_memory_fraction", "0.25" 
        ]
        subprocess.run(command, check=True)
    
    def train():
        command = [
            "python3", "src/classifier.py",
            "TRAIN", "dataset/facedata/processed",
            "Models/20180402-114759.pb",
            "Models/facemodel.pkl",
            "--batch_size", "1000"
        ]

        subprocess.run(command, check=True)
    
    def test(filename : str):
        if filename == "live":
            command = [
                "python3", "src/face_rec.py",
                "--path", "0",  # 0 is the default camera device
                "--live"
            ]
        elif not filename: 
            print("No file input")
            return
        else:
            command = [
                "python3", "src/face_rec.py",
                "--path", f"video/{filename}.mp4",
            ]
        subprocess.run(command, check=True)
    
    match task:
        case ("preprocess") : preprocess()
        case ("train") : train()
        case ("test"): test(filename)
        case _ : print("Unknown task: ", task)

def main():
    parser = argparse.ArgumentParser(description="Facenet Test Script")
    parser.add_argument('--task', nargs='+', required=True, help="Specify the task to perform")
    
    args = parser.parse_args()
    
    if args.task: 
        if len(args.task) > 1:
            process_task(args.task[0],args.task[1])
        else: process_task(args.task[0])

if __name__ == "__main__":
    main()