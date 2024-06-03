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
    const { id } = req.body;
    const query = "\
    SELECT\
        COALESCE(SUM(count), 0) AS total_count\
    FROM\
        (SELECT 1 AS hour UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION\
        SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION\
        SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION\
        SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24) AS all_hours\
    Left JOIN\
        (select * from countFirst where SignalControlNumber = "+id+") as countFirst\
    ON\
        HOUR(countFirst.date) = all_hours.hour\
    GROUP BY\
        all_hours.hour;";
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
    const { id } = req.body;
    const query = "\
        SELECT\
        COALESCE(SUM(count), 0) AS total_count\
    FROM\
        (SELECT 1 AS day UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION\
        SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION\
        SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION\
        SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION\
        SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION SELECT 31) AS all_days\
    Left JOIN\
        (select * from countFirst where SignalControlNumber = "+id+") as countFirst\
    ON\
        DAY(countFirst.date) = all_days.day\
    GROUP BY\
        all_days.day;";
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
    const { id } = req.body;
    const query = "\
    SELECT\
        COALESCE(SUM(count), 0) AS total_count\
    FROM\
        (SELECT 1 AS week UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7) AS all_weeks\
    Left JOIN\
        (select * from countFirst where SignalControlNumber = "+id+") as countFirst\
    ON\
        DAY(countFirst.date) = all_weeks.week\
    GROUP BY\
        all_weeks.week;";
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
    const { id } = req.body;
    const query = "\
    SELECT \
        COALESCE(SUM(count), 0) AS total_count\
    FROM \
        (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION \
        SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) AS all_months\
    Left JOIN\
        (select * from countFirst where SignalControlNumber = "+id+") as countFirst\
    ON\
        MONTH(countFirst.date) = all_months.month\
    GROUP BY\
        all_months.month;";
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