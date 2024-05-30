import cv2
import base64
import asyncio
import websockets

async def send_video(websocket, path):
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        # 이미지를 base64로 인코딩
        _, buffer = cv2.imencode('.jpg', frame)
        jpg_as_text = base64.b64encode(buffer).decode("utf-8")
        await websocket.send(jpg_as_text)

start_server = websockets.serve(send_video, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
