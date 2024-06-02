import cv2
from datetime import datetime
from ultralytics import YOLO #욜로 v8 써서 울트라리틱스에서 가져옴

CONFIDENCE_THRESHOLD = 0.6
GREEN = (0, 255, 0)
YELLOW = (0, 255, 255)
RED = (0, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

model = YOLO('C:/Users/315/runs/detect/train14/weights/best.pt')
cap = cv2.VideoCapture("video/test2.mp4")  # 비디오 경로 설정

detection_times = []  # 객체 감지 시간을 저장할 리스트
total_objects = 0  # 총 객체 수
correct_objects = 0  # 올바르게 분류된 객체 수

while True:
    start = datetime.now()

    ret, frame = cap.read()
    if not ret:
        print('비디오 에러')
        break

    detection_start = datetime.now()
    detection = model(frame)[0]  # 객체 감지
    detection_end = datetime.now()
    detection_times.append((detection_end - detection_start).total_seconds() * 1000)  # 밀리초로 변환하여 저장

    detected_objects = 0

    for data in detection.boxes.data.tolist():
        confidence = float(data[4])
        if confidence < CONFIDENCE_THRESHOLD:
            continue

        x, y = int((data[0] + data[2]) / 2), int((data[1] + data[3]) / 2)
        label = int(data[5])
        cv2.circle(frame, (x, y), 5, GREEN, -1)
        cv2.putText(frame, f'Confidence: {confidence:.2f}', (x + 5, y - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, WHITE, 2)
        detected_objects += 1

        # 클래스가 올바르게 분류된 경우
        if label == 13:  # 여기서 correct_label은 실제 객체의 클래스에 따라 설정해야 합니다.
            correct_objects += 1

    total_objects += detected_objects

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# 객체 감지 시간의 평균 및 최소, 최대값 출력
if detection_times:
    avg_detection_time = sum(detection_times) / len(detection_times)
    min_detection_time = min(detection_times)
    max_detection_time = max(detection_times)
    print(f'평균 객체 감지 시간: {avg_detection_time:.2f}ms')
    print(f'최소 객체 감지 시간: {min_detection_time:.2f}ms')
    print(f'최대 객체 감지 시간: {max_detection_time:.2f}ms')

# 정확도 계산
if total_objects > 0:
    accuracy = (correct_objects / total_objects) * 100
    print(f'정확도: {accuracy:.2f}%')
else:
    print('감지된 객체가 없습니다.')
