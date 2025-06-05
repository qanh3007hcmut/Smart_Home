import argparse
import subprocess

def process_task(task, filename=None):
    def test(filename : str):
        if filename == "live":
            command = [
                "python3", "src/event_camera.py",
                "--path", "0",  # 0 is the default camera device
                "--live"
            ]
        elif not filename: 
            print("No file input")
            return
        else:
            command = [
                "python3", "src/event_camera.py",
                "--path", f"video/{filename}.mp4",
            ]
        subprocess.run(command, check=True)
    
    def test_specific(filename : str, detection_types):
        base_command = ["python3", "src/event_camera.py"]
        
        if filename == "live":
            base_command.extend(["--path", "0", "--live"])
        elif not filename:
            print("No file input")
            return
        else:
            base_command.extend(["--path", f"video/{filename}.mp4"])
            
        # Add detection types
        base_command.append("--detect")
        for d_type in detection_types:
            base_command.append(d_type)
            
        subprocess.run(base_command, check=True)
    
    if task == "test":
        test(filename)
    elif task == "test_fall":
        test_specific(filename, ["motion", "fall"])
    elif task == "test_motion":
        test_specific(filename, ["motion"])
    elif task == "test_fight":
        test_specific(filename, ["motion", "fight"])
    else:
        print("Unknown task: ", task)

def main():
    parser = argparse.ArgumentParser(description="Event Detection Camera Script")
    parser.add_argument('--task', nargs='+', required=True, help="Specify the task to perform")
    
    args = parser.parse_args()
    
    if args.task: 
        if len(args.task) > 1:
            process_task(args.task[0], args.task[1])
        else: 
            process_task(args.task[0])

if __name__ == "__main__":
    main()