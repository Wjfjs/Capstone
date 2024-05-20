<header>
  <h1>안녕하세요! 만나서 반가워요!</h1>
</header>
<body>
  <div>
    <h3>How to</h3>
  </div>
  <div>
    <a href="https://made-by-kyu.tistory.com/entry/OpenCV-YOLOv8-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%95%99%EC%8A%B5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%A7%8C%EB%93%A4%EA%B8%B02">참고자료</a><br><br>
  </div>
  <div>
    <h3>폴더 생성</h3><br>
    C:\train_data <br>
    C:\train_data\labels <br>
    모두 생성해주기 <br><br>
    <h3>Ultralytics 폴더 다운로드</h3><br>
    <a href="https://github.com/ultralytics/ultralytics">무료다운로드</a> <br>
    위 링크 다운로드 후 압축 풀어서 폴더명을 yolov8변경하고 <strong>C:\train_data\yolov8</strong> 에 위치하도록 두기 <br>
    예시 : 
    ![image](https://github.com/Wjfjs/Capstone/assets/148942623/12502d9b-8dc0-4bf3-83af-ecb4c32fc2c6)

    <a href="https://github.com/Wjfjs/Capstone/files/15374315/requirements.txt">requirements.txt</a><br>
    위 txt 파일 다운로드 후 <strong>C:\train_data\yolov8</strong> 안에 투척 <br><br>
    <h3>학습할 데이터 사진 넣기</h3><br>
    <strong>C:\train_data</strong> 안에 동영상에서 추출한 사진 넣기
    <h3>아나콘다 환경변수 설정</h3><br>
    시스템 속성 → 고급 → 환경변수 → 시스템 변수 → Path 더블클릭 <br>
    C:\Users\느그사용자폴더\miniconda3\Scripts 추가하고 확인 <br>
    cmd를 <strong>관리자 권한</strong> 으로 실행 후 conda를 입력하여 conda 명령어가 뜨는지 확인 <br><br>
    <h3>아나콘다 프로필? 생성</h3><br>
    <pre><code>conda create -n labelme python=3.9</code></pre>
    <pre><code>conda activate labelme</code></pre> <br>
    <h3>라이브러리 설치</h3><br>
    <pre><code>pip install labelme</code></pre>
    <pre><code>pip install labelme2yolo</code></pre>
    <pre><code>pip install ultralytics</code></pre>
    <pre><code>pip install numpy</code></pre>
    <pre><code>pip install opencv-python</code></pre>
    <pre><code>pip install -r requirements.txt</code></pre> <br>
    <h3>labelme 사용</h3><br>
    cmd에서 labelme 입력 → Open Dir → C:\train_data 선택 <br>
    File List에서 이미지 선택 <br>
    컨트롤 + R 눌러서 직사각형으로 자동차 선택(시작점하고 끝점클릭), label 이름 지정 <br>
    <strong>※완전한 모양의 자동차만 선택할것※</strong> <br>
    json 파일은 C:\train_data\labels 폴더 안에 모아주자. <br>
    다했으면 labelme 창을 닫은 후 cmd에 아래 명령어 입력 <br>
    <pre><code>labelme2yolo --json_dir C:\train_data\labels --val_size 0.15 --test_size 0.15</code></pre>
    <pre><code>yolo detect train data=C:\train_data\labels\YOLODataset\dataset.yaml model=yolov8n.pt epochs=100 imgsz=640</code></pre>
    바로 위 코드에서 중요한 부분이 <strong>model=yolov8n.pt</strong>와 <strong>epochs=100</strong>이 부분인데,
    
    
    
  </div>
  
</body>
