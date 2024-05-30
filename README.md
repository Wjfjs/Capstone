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
    예시 : <br>
    <img src="https://github.com/Wjfjs/Capstone/assets/148942623/12502d9b-8dc0-4bf3-83af-ecb4c32fc2c6"><br>
    <a href="https://github.com/Wjfjs/Capstone/files/15374315/requirements.txt">requirements.txt</a><br>
    위 txt 파일 다운로드 후 <strong>C:\train_data\yolov8</strong> 안에 투척 <br><br>
    <h3>학습할 데이터 사진 넣기</h3><br>
    <strong>C:\train_data</strong> 안에 동영상에서 추출한 사진 넣기<br><br>
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
    json 파일은 <strong>C:\train_data\labels</strong> 폴더 안에 모아주자. <br>
    다했으면 labelme 창을 닫은 후 cmd에 아래 명령어 입력 <br><br>
    <pre><code>labelme2yolo --json_dir C:\train_data\labels --val_size 0.15 --test_size 0.15</code></pre><br>
    위에 명령을 입력하면 dataset.yaml이 생성됨.<br>
    <pre><code>yolo detect train data=C:\train_data\labels\YOLODataset\dataset.yaml model=yolov8n.pt epochs=100 imgsz=640</code></pre><br>
    위에꺼 말고 아래꺼 추천<br>
    <pre><code>yolo task=detect mode=train epochs=50 imgsz=640 data=yaml위치 model=yolov8s.pt device=0</code></pre><br>
    바로 위 코드에서 중요한 부분이 <strong>model=yolov8n.pt</strong>와 <strong>epochs=100</strong>이 부분인데, model을 알잘딱으로 찾아서 변경하시오 (필자는 m이나 s로 함)<br>
    모델 명 참고<br>
    <img src="https://github.com/Wjfjs/Capstone/assets/148942623/d2611bdd-7166-44c8-ba44-35eecfa173ab"><br>
    epoch는 학습 횟수이다. 이것도 해보고 알잘딱으로 알아서 하셈 ㅅㄱ<br>
    (필자는 100~400정도로 했음, 모델이 x쪽으로 가까울수록 횟수는 적게 하셈)<br><br>
    학습이 완료되었다면, <strong>C:\train_data\yolov8\runs\detect</strong> 폴더 안에 train 폴더가 생성되었을것이다.<br>
    너가 학습을 할때마다 뒤에 번호가 붙으면서 폴더가 생성될거임. train1, train2 이런식으로 ㅇㅇ <br>
    학습을 완료할때마다 마지막에 나오는 정보를 꼭 확인하자. 거기에 너가 나중에 쓸 모델 경로가 있다. <br><br>
    정상적으로 되었다면 <strong>C:\train_data\yolov8\runs\detect\train번호\weight</strong> 안에 best.pt와 last.pt가 생성되었을것이다.<br>
    우리가 쓸것은 best.pt이다.<br><br>
    이제 이걸 눈으로 확인해봐야겠지? 인식한 영상을 파일로 저장하는법을 알아보자. <br>
    다음 명령어를 cmd에 입력해주기만 하면 된다. <br><br>
    <pre><code>yolo detect predict model=[best.pt 파일경로] source=[적용해볼 동영상 파일경로]</code></pre>
    (대괄호는 알잘딱으로 생략해주자) <br><br>
    이걸 성공했다면 <strong>C:\train_data\yolov8\runs\detect</strong> 폴더 안에 predict 폴더가 생성되었을것이다.<br>
    이것도 계속 하면 폴더 뒤에 번호가 붙어서 생성된다. <br>
  </div>
  <div>
    <h3>Flask를 이용한 웹에서 실시간 Yolo 객체 감지 영상 띄우기</h3><br>
    <a href="https://github.com/gamalahmed3265/Flask-Yolov8">무료 따운로드</a>
    <pre><code>pip install flask</code></pre>
    <pre><code>pip install supervision=0.3.0</code></pre>
    꼭 하기
  </div>
  
</body>
