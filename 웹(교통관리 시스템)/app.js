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
//const hostname = 'ec2-3-38-185-186.ap-northeast-2.compute.amazonaws.com'; //이건 AWS
//const hostname = 'http://azza.gwangju.ac.kr'; //이건 azza

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
    const query = "SELECT sum(count) AS count FROM countFirst GROUP BY DATE_FORMAT(date, '%Y-%m-%d %H')";
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
    const query = "SELECT sum(count) AS count FROM countFirst GROUP BY DATE_FORMAT(date, '%Y-%m-%d');";
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
    const query = "SELECT sum(count) AS count FROM countFirst GROUP BY DATE_FORMAT(date, '%Y-%m');";
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
app.post('/DistrictData', async (req, res) => {
    const { CityValue } = req.body;
    const query = `select District From location where City = "${CityValue}" group by District;`;
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const LocationData = graph.handleResult(result); // 데이터 처리
                resolve(LocationData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})
app.post('/RouteNameData', async (req, res) => {
    const { CityValue, DistrictValue } = req.body;
    const query = `select routeName From location where City = "${CityValue}" and District = "${DistrictValue}" group by routeName`;
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const LocationData = graph.handleResult(result); // 데이터 처리
                resolve(LocationData);
            });
        });
        console.log("데이터 확인: ", data);

        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})
app.post('/AddressData', async (req, res) => {
    const { CityValue, DistrictValue, RouteNameValue } = req.body;
    const query = `select Address From location where City = "${CityValue}" and District = "${DistrictValue}" and routeName = "${RouteNameValue}" group by Address;`;
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const LocationData = graph.handleResult(result); // 데이터 처리
                resolve(LocationData);
            });
        });
        console.log("데이터 확인: ", data);
        res.send(data);
    } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
        res.status(500).send("서버 오류");
    }
})
app.post('/SignalControlNumberData', async (req, res) => {
    const { CityValue, DistrictValue, RouteNameValue, AddressValue } = req.body;
    const query = `select SignalControlNumber From location where City = "${CityValue}" and District = "${DistrictValue}" and routeName = "${RouteNameValue}" and Address = "${AddressValue}";
    `;
    try {
        const data = await new Promise((resolve, reject) => {
            db.Query(query, result => {
                const LocationData = graph.handleResult(result); // 데이터 처리
                resolve(LocationData);
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