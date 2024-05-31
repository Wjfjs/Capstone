from ultralytics import YOLO

model = YOLO('yolov8n.pt')

def start():
    model.train(data='C:/Users/315/Downloads/Vehicles.v5-v1.3.yolov8-obb/Cup_data.yaml', epochs=100, patience=30, batch=32, imgsz=416)

if __name__ == '__main__':
    start()