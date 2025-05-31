import cv2
import subprocess
import threading
import queue
import time
RTSP = 'rtsp://172.27.192.1:8554/mystream'

class FFmpegStreamer:
    def __init__(self, width=640, height=480, fps=7, bitrate='500k', gop=10, rtsp_url=RTSP):
        self.width = width
        self.height = height
        self.fps = fps
        self.bitrate = bitrate
        self.gop = gop
        self.rtsp_url = rtsp_url

        self.frame_queue = queue.Queue(maxsize=60)  # buffer chứa frame trước khi gửi
        self.running = False

        self.ffmpeg_cmd = [
            'ffmpeg',
            '-y',
            '-f', 'rawvideo',
            '-pix_fmt', 'bgr24',
            '-s', f'{self.width}x{self.height}',
            '-r', str(self.fps),
            '-i', '-',
            '-c:v', 'h264',
            '-preset', 'ultrafast',
            '-tune', 'zerolatency',
            '-b:v', self.bitrate,
            '-g', str(self.gop),
            '-f', 'rtsp',
            '-rtsp_transport', 'tcp',
            self.rtsp_url
        ]

        self.process = None
        self.thread = None

    def start(self):
        self.running = True
        self.process = subprocess.Popen(self.ffmpeg_cmd, stdin=subprocess.PIPE)
        self.thread = threading.Thread(target=self._write_frames)
        self.thread.start()

    def stop(self):
        self.running = False
        if self.thread is not None:
            self.thread.join()
        if self.process is not None:
            try:
                self.process.stdin.close()
                self.process.wait()
            except Exception:
                pass

    def _write_frames(self):
        while self.running or not self.frame_queue.empty():
            try:
                frame = self.frame_queue.get(timeout=1)
                self.process.stdin.write(frame.tobytes())
            except queue.Empty:
                continue
            except BrokenPipeError:
                print("FFmpeg pipe broken")
                break
            except Exception as e:
                print("Error writing frame:", e)
                break

    def send_frame(self, frame):
        if not self.running:
            return
        try:
            # Nếu queue đầy thì drop frame mới để tránh block
            self.frame_queue.put_nowait(frame)
        except queue.Full:
            # Có thể log hoặc bỏ qua frame để giữ mượt
            pass