import pymysql

def insert_data(date, count):
    conn = pymysql.connect(host='192.168.1.3', user='dbuser192381', password='ce1234', db='db192381', charset='utf8')
    cur = conn.cursor()
    
    query = "INSERT INTO count (date, count) VALUES (%s, %s)"
    values = (date, count)
    
    cur.execute(query, values)
    
    conn.commit()
    conn.close()

def saveCountData(count_datetime):
    # 메모장 파일 읽기
    file_path = f'countLog/{count_datetime}.txt'  # 메모장 파일 경로
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # 각 줄에서 날짜와 총 대수 추출 및 데이터베이스에 저장
    for line in lines:
        # 줄을 공백을 기준으로 분할하여 날짜와 총 대수 추출
        parts = line.split()
        date = parts[0]  # 날짜
        count = int(parts[3].replace('대', ''))  # 총 대수
        
        # 데이터베이스에 데이터 삽입
        insert_data(date, count)
        print("데이터 삽입이 완료되었습니다.")
