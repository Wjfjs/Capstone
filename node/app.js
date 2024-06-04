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
app.listen(3005, function(){
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
    const query = `SELECT TraffID, ColorTime
    FROM TrafficLight
    WHERE (Sequence LIKE '녹%' OR Sequence LIKE '적%' OR Sequence LIKE '황%')
    AND TrafficLightID = 15
    ORDER BY 
        CASE
            WHEN Sequence LIKE '녹%' THEN 2  
            WHEN Sequence LIKE '황%' THEN 3    
            WHEN Sequence LIKE '적%' THEN 1    
            ELSE 4 
        END;`;
        
	
	const result = await database.Query(query, null);
	
	if (result instanceof Error) {
		console.error(result);
	}
    console.log("데이터 확인: ", result);
	res.send(result);
})

app.post('/TimeAlgorithm2', async (req, res) => {
    const query = `SELECT TraffID, ColorTime
    FROM TrafficLight
    WHERE (Sequence LIKE '녹%' OR Sequence LIKE '적%' OR Sequence LIKE '황%')
    AND TrafficLightID = 16
    ORDER BY 
        CASE
            WHEN Sequence LIKE '녹%' THEN 2    
            WHEN Sequence LIKE '황%' THEN 3    
            WHEN Sequence LIKE '적%' THEN 1    
            ELSE 4 
        END;`;
	
	const result2 = await database.Query(query, null);
	
	if (result2 instanceof Error) {
		console.error(result2);
	}
    console.log("데이터 확인 두번재: ", result2);
	res.send(result2);
})

app.post('/updateTime', async (req, res) => {
    const query = `UPDATE TrafficLight SET ColorTime = ? WHERE TraffID = ?`;
	const { time1, time2, tID, tID2 } = req.body;
    const values = [time1, tID];
    const values2 = [time2, tID2];
    console.log(time1, time2, tID, tID2);
	const Cntresult = await database.Query(query, values);
	const Cntresult2 = await database.Query(query, values2);
	if (Cntresult instanceof Error) {
		console.error(result);
	}
    if (Cntresult2 instanceof Error) {
		console.error(result);
	}
	res.send({Cnt: Cntresult, Cnt2: Cntresult2});
})

app.post('/count1', async (req, res) => {
    const query = `SELECT (count*10)as count FROM countFirst 
    where SignalControlNumber = 15
    ORDER BY date DESC LIMIT 1;`;
	
	const result2 = await database.Query(query, null);
	
	if (result2 instanceof Error) {
		console.error(result2);
	}
    console.log("15 카운트 수: ", result2);
	res.send(result2);
})

app.post('/count2', async (req, res) => {
    const query = `SELECT (count*10)as count FROM countFirst 
    where SignalControlNumber = 16
    ORDER BY date DESC LIMIT 1;`;
	
	const result2 = await database.Query(query, null);
	
	if (result2 instanceof Error) {
		console.error(result2);
	}
    console.log("16 카운트 수: ", result2);
	res.send(result2);
})
