# from ObjectDetectionMaster import ObjectDetectionMaster
# from ultralytics import YOLO

from detetions.ObjectDetectionMaster import ObjectDetectionMaster


bestEggs="../../traing Model/weights/bestEggs.pt"
yolov8n="../../traing Model/weights/best.pt"

sizeOfScreen=(1020,500)

ob=ObjectDetectionMaster(yolov8n,sizeOfScreen)
def mainMaster(frame):
    ob.detectionSupervision(frame)
    return frame