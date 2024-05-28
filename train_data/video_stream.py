import cv2
import numpy as np
import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('서버에 연결되었습니다.')

@sio.event
def disconnect():
    print('서버와 연결이 해제되었습니다.')

cap = cv2.VideoCapture(0)

def send_video_data():
    while True:
        ret, frame = cap.read()
        if ret:
            _, img_encoded = cv2.imencode('.jpg', frame)
            frame_data = {
                'frame': img_encoded.tobytes(),
                'dtype': str(frame.dtype),
                'shape': frame.shape
            }
            sio.emit('videoData', frame_data)

# 서버에 연결
sio.connect('http://localhost:5555')

# 영상 데이터 전송
send_video_data()
