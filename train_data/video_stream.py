import cv2
import schedule
import base64
import asyncio
import websockets
import db #db.py 불러옴
import numpy as np
from datetime import datetime
from shapely.geometry import Polygon
from shapely.geometry.point import Point
from ultralytics import YOLO #욜로 v8 써서 울트라리틱스에서 가져옴
from deep_sort_realtime.deepsort_tracker import DeepSort #객체 추적 라이브러리
from ultralytics.utils.plotting import Annotator, colors
from collections import defaultdict

CONFIDENCE_THRESHOLD = 0.6 #객체 인식률 어느정도인지 0.6이상일 경우만 인식 (수정가능)
GREEN = (0, 255, 0)
YELLOW = (0, 255, 255)
RED = (0, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

track_history = defaultdict(list)

current_region = None
counting_regions = [
    {
        "name": "YOLOv8 Rectangle Region",
        "polygon": Polygon([(1255, 0), (740, 0), (740, 1080), (1255, 1080)]),  # Polygon points
        "counts": 0,
        "dragging": False,
        "region_color": (37, 255, 225),  # BGR Value
        "text_color": (0, 0, 0),  # Region Text Color
    }
]

def mouse_callback(event, x, y, flags, param):
    global current_region

    # Mouse left button down event
    if event == cv2.EVENT_LBUTTONDOWN:
        for region in counting_regions:
            if region["polygon"].contains(Point((x, y))):
                current_region = region
                current_region["dragging"] = True
                current_region["offset_x"] = x
                current_region["offset_y"] = y

    # Mouse move event
    elif event == cv2.EVENT_MOUSEMOVE:
        if current_region is not None and current_region["dragging"]:
            dx = x - current_region["offset_x"]
            dy = y - current_region["offset_y"]
            current_region["polygon"] = Polygon(
                [(p[0] + dx, p[1] + dy) for p in current_region["polygon"].exterior.coords]
            )
            current_region["offset_x"] = x
            current_region["offset_y"] = y

    # Mouse left button up event
    elif event == cv2.EVENT_LBUTTONUP:
        if current_region is not None and current_region["dragging"]:
            current_region["dragging"] = False

#model = YOLO('C:/Users/315/runs/detect/train14/weights/best.pt') # 모델
model = YOLO('run/best1.pt') # 모델
names = model.model.names

tracker = DeepSort(max_age=50)

async def send_video(websocket, path):
    totalDetObj = 0

    vid_frame_count = 0

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

    if (cap == cv2.VideoCapture(0)):
        fps = 15
    
    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))
    
    #차량 총 대수 저장 함수
    def show():
        countTime = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
        saveCount.write((countTime) + " 총 : " + str(totalDetObj) + "대 \n")

    schedule.every(1).seconds.do(show)
    
    while cap.isOpened():
        start = datetime.now()

        ret, frame = cap.read()
        if not ret:
            print('인식 종료')
            print(f'총 : {totalDetObj} 대')
            break
        vid_frame_count += 1

        detection = model.predict(source=[frame], save=False)[0]
        results = model.track(frame, persist=True, classes=None)
        results2 = []

        if results[0].boxes.id is not None:
            boxes = results[0].boxes.xyxy.cpu()
            track_ids = results[0].boxes.id.int().cpu().tolist()
            clss = results[0].boxes.cls.cpu().tolist()

            annotator = Annotator(frame, line_width=2, example=str(names))

            for box, track_id, cls in zip(boxes, track_ids, clss):
                annotator.box_label(box, str(names[cls]), color=colors(cls, True))
                bbox_center = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2  # Bbox center

                track = track_history[track_id]  # Tracking Lines plot
                track.append((float(bbox_center[0]), float(bbox_center[1])))
                if len(track) > 30:
                    track.pop(0)
                points = np.hstack(track).astype(np.int32).reshape((-1, 1, 2))
                
                # Check if detection inside region
                for region in counting_regions:
                    if region["polygon"].contains(Point((bbox_center[0], bbox_center[1]))):
                        region["counts"] += 1
                        totalDetObj += 1

        for region in counting_regions:
            region_label = str(region["counts"])
            region_color = region["region_color"]
            region_text_color = region["text_color"]

            polygon_coords = np.array(region["polygon"].exterior.coords, dtype=np.int32)
            centroid_x, centroid_y = int(region["polygon"].centroid.x), int(region["polygon"].centroid.y)

            text_size, _ = cv2.getTextSize(
                region_label, cv2.FONT_HERSHEY_SIMPLEX, fontScale=0.7, thickness=2
            )
            text_x = centroid_x - text_size[0] // 2
            text_y = centroid_y + text_size[1] // 2
            cv2.rectangle(
                frame,
                (text_x - 5, text_y - text_size[1] - 5),
                (text_x + text_size[0] + 5, text_y + 5),
                region_color,
                -1,
            )
            cv2.putText(
                frame, region_label, (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, region_text_color, 2
            )
            cv2.polylines(frame, [polygon_coords], isClosed=True, color=region_color, thickness=2)

        cv2.rectangle(frame, (0,0), (480,180), BLACK, -1) #기본 190, 100
        detection = model(frame)[0]

        detected_objects = 0 #객체 인식된 숫자

        #차량 총 카운트 메모장 저장 경로 지정
        count_datetime = datetime.now().strftime("%Y-%m-%d_%H")
        countLog_path = f'countLog/{count_datetime}.txt'
        saveCount = open(countLog_path,"a")

        for data in detection.boxes.data.tolist(): #여기가 인식인 듯
            confidence = float(data[4])
            if confidence < CONFIDENCE_THRESHOLD:
                continue

            x, y = int((data[0] + data[2]) / 2), int((data[1] + data[3]) / 2)
            label = int(data[5])
            #cv2.circle(frame, (x, y), 5, GREEN, -1)
            #cv2.putText(frame, f'Confidence: {confidence:.2f}', (x + 5, y - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 2)
            detected_objects += 1
            #print(f'테스트 : {detection.boxes.data.tolist()} 대')
        tracks = tracker.update_tracks(results2, frame=frame)

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
        cv2.putText(frame, fps, (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1.5, GREEN, 2) #기본 위치 10, 20 / 기본 폰트 사이즈 0.5

        # 좌측상단에 인식된 값 띄움
        if totalDetObj >= 30:
            cv2.putText(frame, 'LEVEL : DANGER', (10, 115), cv2.FONT_HERSHEY_SIMPLEX, 1.5, RED, 2) #기본 위치 10, 50, 기본 폰트 사이즈 0.5
            cv2.rectangle(frame, (0, 0), (frame.shape[1], frame.shape[0]), RED, 10)
        elif totalDetObj >= 15:
            cv2.putText(frame, 'LEVEL : WARNING', (10, 115), cv2.FONT_HERSHEY_SIMPLEX, 1.5, YELLOW, 2)
        else:
            cv2.putText(frame, 'LEVEL : CAUTION', (10, 115), cv2.FONT_HERSHEY_SIMPLEX, 1.5, GREEN, 2)

        schedule.run_pending() #카운트 메모 스케줄

        cv2.putText(frame, f'TOTAL : {totalDetObj}', (10, 158), cv2.FONT_HERSHEY_SIMPLEX, 1.5, GREEN, 2) #기본 위치 10, 80 / 기본 폰트 사이즈 0.5
        if vid_frame_count == 1:
            cv2.namedWindow("Ultralytics YOLOv8 Region Counter Movable")
            cv2.setMouseCallback("Ultralytics YOLOv8 Region Counter Movable", mouse_callback)
        cv2.imshow("Ultralytics YOLOv8 Region Counter Movable", frame)

        print(f'현재 인식된 차량 : {totalDetObj} 대')

        # 이미지를 base64로 인코딩
        _, buffer = cv2.imencode('.jpg', frame)
        jpg_as_text = base64.b64encode(buffer).decode("utf-8")
        await websocket.send(jpg_as_text)

        for region in counting_regions:  # Reinitialize count for each region
            region["counts"] = 0
            totalDetObj = 0

        if cv2.waitKey(1) == ord('q'): # 캠또는 비디오 종료 1 또는 q
            break
        
    del vid_frame_count
    saveCount.close()
    db.saveCountData(count_datetime)
    cap.release()
    cv2.destroyAllWindows()

start_server = websockets.serve(send_video, "localhost", 8555)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
