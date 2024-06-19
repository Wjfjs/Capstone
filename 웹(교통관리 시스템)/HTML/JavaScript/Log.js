async function GetLog() {
    var fifthSelect = document.getElementById("SignalControlNumber");
    var id = fifthSelect.value; // 카메라번호
    if(isNaN(id)){
        return;
    }
    var num = null;
    var time = null;
    var color = null;



    try {
        const response = await fetch('/LogDataID', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        num = await response.json(); // 기본키 
    } catch (error) {
        console.error('fetch 오류:', error);
    }

    try {
        const response = await fetch('/LogDataColorTime', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        time = await response.json(); // 시간
    } catch (error) {
        console.error('fetch 오류:', error);
    }

    try {
        const response = await fetch('/LogDataSequence', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        color = await response.json();  // 색상
    } catch (error) {
        console.error('fetch 오류:', error);
    }

    drawLogTable(num, time, color);
    var logContainer = document.getElementById("Log");
    logContainer.scrollTop = logContainer.scrollHeight;
}

function drawLogTable(num, time, color){
    document.getElementById("ControlLogBody").innerHTML = "";
    var Logs = [];

    for (var i=0; i < num.length || i < 8; i++ ){
        Logs.push({num:num[i], time:time[i], color:color[i]});
    }
    console.log(Logs);

    // 테이블의 tbody 요소 가져오기
    var tbody = document.getElementById("ControlLogBody");
    // 학생 데이터 배열을 순회하면서 테이블에 데이터 추가
    Logs.forEach(function(Logs) {
        var row = document.createElement("tr"); // 새로운 행 생성

        // 각 데이터에 대한 열 생성
        var numCell = document.createElement("td");
        numCell.style.height = "41px";
        numCell.textContent = Logs.num;
        numCell.classList.add("LogNum");
        row.appendChild(numCell);

        var timeCell = document.createElement("td");
        timeCell.textContent = Logs.time;
        row.appendChild(timeCell);

        var colorCell = document.createElement("td");
        colorCell.textContent = Logs.color;
        row.appendChild(colorCell);

        // 새로운 행을 tbody에 추가
        tbody.appendChild(row);
    });
}


