import cv2
import schedule
import base64
import asyncio
import websockets
from datetime import datetime
import cv2 #opencv 라이브러리
import db #db.py 불러옴
from ultralytics import YOLO #욜로 v8 써서 울트라리틱스에서 가져옴
from deep_sort_realtime.deepsort_tracker import DeepSort #객체 추적 라이브러리

CONFIDENCE_THRESHOLD = 0.6 #객체 인식률 어느정도인지 0.6이상일 경우만 인식 (수정가능)
GREEN = (0, 255, 0)
YELLOW = (0, 255, 255)
RED = (0, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

#model = YOLO('C:/Users/315/runs/detect/train14/weights/best.pt') # 모델
model = YOLO('yolov8n.pt') # 모델
tracker = DeepSort(max_age=50)



async def send_video(websocket, path):
    #cap = cv2.VideoCapture(0)
    cap = cv2.VideoCapture('video/test.mp4')
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)

    #분석 영상 저장
    current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M")  
    output_video_path = f'outPutVideo/output_video_{current_datetime}.mp4'

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = 30    #캠은 15 동영상은 30

    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    #차량 총 대수 저장 함수
    def show():
        countTime = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
        saveCount.write((countTime) + " 총 : " + str(detected_objects) + "대 \n")

    schedule.every(1).seconds.do(show)
    
    while cap.isOpened():
        start = datetime.now()

        ret, frame = cap.read()
        if not ret:
            print('카메라 에러')
            break

        detection = model.predict(source=[frame], save=False)[0]
        results = []

        cv2.rectangle(frame, (0,0), (190,100), BLACK, -1)
        detection = model(frame)[0]

        detected_objects = 0 #객체 인식된 숫자

        #차량 총 카운트 메모장 저장 경로 지정
        count_datetime = datetime.now().strftime("%Y-%m-%d_%H")
        countLog_path = f'countLog/{count_datetime}.txt'
        saveCount = open(countLog_path,"a")

        for data in detection.boxes.data.tolist():
            confidence = float(data[4])
            if confidence < CONFIDENCE_THRESHOLD:
                continue

            x, y = int((data[0] + data[2]) / 2), int((data[1] + data[3]) / 2)
            label = int(data[5])
            cv2.circle(frame, (x, y), 5, GREEN, -1)
            cv2.putText(frame, f'Confidence: {confidence:.2f}', (x + 5, y - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 2)
            detected_objects += 1
        tracks = tracker.update_tracks(results, frame=frame)

        for track in tracks:
            if not track.is_confirmed():
                continue

            track_id = track.track_id
            ltrb = track.to_ltrb()

            xmin, ymin, xmax, ymax = int(ltrb[0]), int(ltrb[1]), int(ltrb[2]), int(ltrb[3])
            cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), GREEN, 2)
            cv2.rectangle(frame, (xmin, ymin - 20), (xmin + 20, ymin), GREEN, -1)
            cv2.putText(frame, str(track_id), (xmin + 5, ymin - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 2)
            
        end = datetime.now()

        total = (end - start).total_seconds()
        # print(f'1 프레임을 처리하는 데 걸린 시간: {total * 1000:.0f} 밀리초')

        fps = f'FPS : {1 / total:.2f}'
        cv2.putText(frame, fps, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, GREEN, 2)

        # 좌측상단에 인식된 값 띄움
        if detected_objects >= 2:
            cv2.putText(frame, 'LEVEL : DANGER', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, RED, 2)
            cv2.rectangle(frame, (0, 0), (frame.shape[1], frame.shape[0]), RED, 10)
        elif detected_objects >= 1:
            cv2.putText(frame, 'LEVEL : WARNING', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, YELLOW, 2)
        else:
            cv2.putText(frame, 'LEVEL : CAUTION', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, GREEN, 2)


        print(f'총인원: {detected_objects} 명')

        schedule.run_pending() #카운트 메모 스케줄

        cv2.putText(frame, f'total population : {detected_objects}', (10, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.5, GREEN, 2)

        cv2.imshow('frame', frame)

        # 이미지를 base64로 인코딩
        _, buffer = cv2.imencode('.jpg', frame)
        jpg_as_text = base64.b64encode(buffer).decode("utf-8")
        await websocket.send(jpg_as_text)

        if cv2.waitKey(1) == ord('q'): # 캠또는 비디오 종료 1 또는 q
            break

    saveCount.close()
    db.saveCountData(count_datetime)
    cap.release()
    cv2.destroyAllWindows()

start_server = websockets.serve(send_video, "localhost", 8555)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
