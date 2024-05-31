// 사용 모듈 로드
const express = require('express');
const database = require('./database.js');
const cors = require('cors');
const Post = require('./Post.js');
const script = require('./HTML/script.js');
const TD = require('./HTML/TimeData.js')

// 데이터베이스 연결
database.Connect();

// 모듈에서 사용할 로직들
const app = express();
var fs = require('fs');

app.use(express.static('HTML'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 서버 구동
app.listen(3003, function(){
    console.log('서버 구동');
});

app.use(cors());

// 서버 오류 처리
process.on('uncaughtException', (err) => {
    console.error('오류가 발생했습니다:', err);
  
    database.Close();
    
    process.exit(1); // 0이 아닌 값은 비정상적인 종료를 나타냄
});


// 라우팅 설정

app.get('/', function(req, res){
    fs.readFile('./HTML/Light.html', function(error, data){
        if(error){
            console.log(error);
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

app.post('/testData', (req, res) => {
    const { time1, time2, time3 } = req.body;

    try{
        script.durations = (time1);
        script.durations2 = (time2);
        script.durations2 = (time3);

        console.log(`보낸값 [ time1 - ${time1} / time2 - ${time2} ]`);
    }
    catch(error){
        console.error('입력 오류:', error);
    }
});

app.post('/TimeAlgorithm', async (req, res) => {
    const query = `SELECT ColorTime 
    FROM TrafficLight
    WHERE (Sequence LIKE '녹%' OR Sequence LIKE '적%' OR Sequence LIKE '황%')
    AND TrafficLightID = 15
    ORDER BY CASE 
        WHEN Sequence LIKE '녹%' THEN 1
        WHEN Sequence LIKE '적%' THEN 2
        WHEN Sequence LIKE '황%' THEN 3
        ELSE 4 END;`;
	
	const result = await database.Query(query, null);
	
	if (result instanceof Error) {
		console.error(result);
	}
    console.log("데이터 확인: ", result);
	res.send(result);
    
    // const query = 'SELECT ColorTime from TrafficLight where TraffID <= 1';
    // try {
    //     const data = await new Promise((resolve, reject) => {
    //         database.Query(query, result => {
    //             // const TimeData = TD.TimeResult(result); // 데이터 처리
    //             const TimeData = result;
    //             console.log("데이터 확인: ", TimeData);

    //             resolve(TimeData);
    //         });
    //     });
    //     res.send(data);
    // } catch (error) {
    //     console.error("데이터 가져오기 실패: ", error);
    //     res.status(500).send("서버 오류");
    // }
})


