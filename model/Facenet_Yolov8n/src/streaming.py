from waitress import serve
from flask import Flask, Response
import time
import threading
import cv2

app = Flask(__name__)
latest_frame = None
lock = threading.Lock()

def push_frame(frame):
    """Gọi hàm này từ main loop để cập nhật frame mới nhất"""
    global latest_frame
    with lock:
        latest_frame = frame.copy()

def generate_frames():
    """Tạo MJPEG stream từ frame mới nhất"""
    global latest_frame
    while True:
        previous_frame_id = None
        with lock:
            if latest_frame is None:
                continue
            current_id = id(latest_frame)
            if previous_frame_id and current_id == previous_frame_id:
                continue
            # Encode frame thành JPEG
            ret, buffer = cv2.imencode('.jpg', latest_frame)
            frame_bytes = buffer.tobytes()
            previous_frame_id = current_id
        # Trả về dưới dạng MJPEG
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        # time.sleep(0.01)

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
        status=200,
        mimetype='multipart/x-mixed-replace; boundary=frame',
        headers={
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
        }
    )

@app.route('/')
def index():
    return '<img src="/video_feed">'

def start_streaming(host='0.0.0.0', port=5000):
    """Chạy Flask app trong một luồng riêng"""
    # threading.Thread(target=lambda: app.run(host=host, port=port, debug=False, use_reloader=False)).start()
    threading.Thread(target=lambda: serve(app, host='0.0.0.0', port=5000)).start()
