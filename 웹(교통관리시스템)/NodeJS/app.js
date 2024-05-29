const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./Connect_DB.js');
const graph = require('./GraphData.js');

db.Connect();

app.listen(3000, function(){
    console.log('서버 구동');
});


app.use(cors());

app.post('/hourData', async (req, res) => {
    const query = 'SELECT count FROM count';
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
app.post('/dayData', async (req, res) => {
    const query = 'SELECT count FROM count';
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
app.post('/weekData', async (req, res) => {
    const query = 'SELECT count FROM count';
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
app.post('/monthData', async (req, res) => {
    const query = 'SELECT count FROM count';
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