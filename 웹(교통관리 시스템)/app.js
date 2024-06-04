const express = require('express');
const database = require('./NodeJS/database.js');
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
    select COALESCE(count, 0) AS total_count\
    from all_hours\
    left Join (\
        select date, avg(count) count, SignalControlNumber\
        from (\
            select DATE_FORMAT(date, '%H') date, SUM(count) count, SignalControlNumber\
            from countFirst\
            where SignalControlNumber = "+ id +"\
            GROUP BY DATE_FORMAT(date, '%Y-%m-%d %H')\
        ) as countFirst\
        group by date\
    ) as countFirst\
    ON countFirst.date = all_hours.hour\
    order by hour;";
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
    select COALESCE(count, 0) AS total_count\
    from all_days\
    left Join (\
        select date, avg(count) count, SignalControlNumber\
        from (\
            select DATE_FORMAT(date, '%d') date, SUM(count) count, SignalControlNumber\
            from countFirst\
            where SignalControlNumber = "+ id +"\
            GROUP BY DATE_FORMAT(date, '%Y-%m-%d')\
        ) as countFirst\
        group by date\
    ) as countFirst\
    ON countFirst.date = all_days.day\
    order by day;";
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
    select COALESCE(count, 0) AS total_count\
    from all_weeks\
    left Join (\
        select dayofweek(date) date, avg(count) count, SignalControlNumber\
        from (\
            select DATE_FORMAT(date, '%Y-%m-%d') date, SUM(count) count, SignalControlNumber\
            from countFirst\
            where SignalControlNumber = "+ id +"\
            GROUP BY DATE_FORMAT(date, '%Y-%m-%d')\
        ) as countFirst\
        group by dayofweek(date)\
    ) as countFirst\
    ON countFirst.date = all_weeks.week\
    order by week;";
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
    select COALESCE(count, 0) AS total_count\
    from all_months\
    left Join (\
        select date, avg(count) count, SignalControlNumber\
        from (\
            select DATE_FORMAT(date, '%m') date, SUM(count) count, SignalControlNumber\
            from countFirst\
            where SignalControlNumber = "+ id +"\
            GROUP BY DATE_FORMAT(date, '%Y-%m')\
        ) as countFirst\
        group by date\
    ) as countFirst\
    ON countFirst.date = all_months.month\
    order by month;";
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
// TrafficID
app.post('/LogDataID', async (req, res) => {
    const { id } = req.body;
    const query = "select TraffID from TrafficLight where SignalControlNumber = "+id+";";
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
// ColorTime
app.post('/LogDataColorTime', async (req, res) => {
    const { id } = req.body;
    const query = "select ColorTime from TrafficLight where SignalControlNumber = "+id+";";
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
// Sequence (색상)
app.post('/LogDataSequence', async (req, res) => {
    const { id } = req.body;
    const query = "select Sequence from TrafficLight where SignalControlNumber = "+id+";";
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

////////////////////////////////////////////////////////////////////////////////////
// 데이터베이스 연결
database.Connect();

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
