# 객체추적 시간재는거였나
import cv2 #opencv 라이브러리
import schedule
import base64
import zmq
import db
from ultralytics import YOLO #욜로 v8 써서 울트라리틱스에서 가져옴
from deep_sort_realtime.deepsort_tracker import DeepSort #객체 추적 라이브러리
from datetime import datetime, timedelta

CONFIDENCE_THRESHOLD = 0.6 #객체 인식률 어느정도인지 0.6이상일 경우만 인식 (수정가능)
GREEN = (0, 255, 0)
YELLOW = (0, 255, 255)
RED = (0, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:5555")

#cap = cv2.VideoCapture(0)

model = YOLO('C:/Users/315/runs/detect/train17/weights/best.pt')
#model = YOLO('C:/Users/315/runs/detect/train14/weights/best.pt')
#model = YOLO('yolov8/runs/detect/train9/weights/best.pt') # 모델
tracker = DeepSort(max_age=50)
cap = cv2.VideoCapture("test2.mp4") #캠 설정 기본 캠이 0,  비디오 경로 넣어도됨 "test.mp4"
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)

#분석 영상 저장
current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M")  
output_video_path = f'outPutVideo/output_video_{current_datetime}.mp4'

frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = 30    #캠은 15 동영상은 30

out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

def show():
    countTime = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
    saveCount.write((countTime) + " 총 : " + str(detected_objects) + "대 \n")

schedule.every(1).seconds.do(show)

while True:
    ret, frame = cap.read()
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
    print(f'1 프레임을 처리하는 데 걸린 시간: {total * 1000:.0f} 밀리초')

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

    print(f'총 차량: {detected_objects} 대')

    #총 차량 카운트하여 메모장으로 출력
    schedule.run_pending()
    # countTime = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
    # saveCount.write((countTime) + " 총 : " + str(detected_objects) + "대 \n")

    cv2.putText(frame, f'total population : {detected_objects}', (10, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.5, GREEN, 2)

    cv2.namedWindow('frame', cv2.WINDOW_NORMAL)
    cv2.resizeWindow('frame', 1280, 720) 

    cv2.imshow('frame', frame)

    out.write(frame)

    # 이미지를 base64 문자열로 인코딩
    _, buffer = cv2.imencode('.jpg', frame)
    frame_bytes = base64.b64encode(buffer)
    
    # 인코딩된 이미지를 문자열로 변환하여 전송
    socket.send_string(frame_bytes.decode('utf-8'))

    if cv2.waitKey(1) == ord('q'): # 캠또는 비디오 종료 1 또는 q
        break

saveCount.close()
db.saveCountData(count_datetime)
cap.release()
out.release()
cv2.destroyAllWindows()