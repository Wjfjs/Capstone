const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./NodeJS/Connect_DB.js');
const graph = require('./NodeJS/GraphData.js');
const getLog = require('./NodeJS/getLog.js');

db.Connect();

var fs = require('fs');

const port = 8003;
const hostname = 'localhost';

app.use(cors());
app.use(express.static('HTML'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res){
    fs.readFile('HTML/Main.html', function(error, data){
        if(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            
            res.end(data);
        }
    });
});

app.listen(port, hostname, function(){
    console.log('서버 구동');
});

// 시간데이터
app.post('/hourData', async (req, res) => {
    //const query = "SELECT sum(count) AS count FROM count GROUP BY DATE_FORMAT(date, '%Y-%m-%d %H')";
    const query = "SELECT count FROM countFirst";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const graphData = graph.handleResult(result); // 데이터 처리
                resolve(graphData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})

// 일별데이터
app.post('/dayData', async (req, res) => {
    //const query = "SELECT DATE_FORMAT(date, '%Y-%m-%d') AS day_interval, sum(count) AS count FROM count GROUP BY DATE_FORMAT(date, '%Y-%m-%d');";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const graphData = graph.handleResult(result); // 데이터 처리
                resolve(graphData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})

// 요일별데이터
app.post('/weekData', async (req, res) => {
    //const query = 'SELECT count FROM count';
    const query = "SELECT count FROM countFirst";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const graphData = graph.handleResult(result); // 데이터 처리
                resolve(graphData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})

// 월별데이터
app.post('/monthData', async (req, res) => {
    //const query = "SELECT DATE_FORMAT(date, '%Y-%m') AS month_interval, sum(count) AS count FROM count GROUP BY DATE_FORMAT(date, '%Y-%m');";
    const query = "SELECT count FROM countFirst";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const graphData = graph.handleResult(result); // 데이터 처리
                resolve(graphData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})

// 지역데이터
app.post('/LocationData', async (req, res) => {
    const query = "";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const graphData = graph.handleResult(result); // 데이터 처리
                resolve(graphData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})

// 로그데이터
app.post('/LogData', async (req, res) => {
    const query = "";
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const LogData = getLog.ResultLog(result); // 데이터 처리
                resolve(LogData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})