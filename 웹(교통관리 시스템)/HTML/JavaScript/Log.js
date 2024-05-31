async function GetGraphDataHour() {
    try {
        const response = await fetch('/LogData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        GraphHour(result);
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
GetGraphDataHour();

var Logs = [
    { num: 1, time: "05-21 18:00:00", color: "적" },
    { num: 2, time: "05-21 18:02:00", color: "녹" },
    { num: 3, time: "05-21 18:04:00", color: "적(점멸)" },
    { num: 4, time: "05-21 18:06:00", color: "녹" },
    { num: 5, time: "05-21 18:08:00", color: "적" },
    { num: 6, time: "05-21 18:10:00", color: "녹" },
    { num: 7, time: "05-21 18:12:00", color: "적" },
    { num: 8, time: "05-21 18:14:00", color: "녹" },
    { num: 9, time: "05-21 18:16:00", color: "적" },
    { num: 10, time: "05-21 18:18:00", color: "녹" },
    { num: 11, time: "05-21 18:20:00", color: "적" },
    { num: 12, time: "05-21 18:22:00", color: "녹" },
];

// 테이블의 tbody 요소 가져오기
var tbody = document.getElementById("ControlLogBody");

// 학생 데이터 배열을 순회하면서 테이블에 데이터 추가
Logs.forEach(function(Logs) {
    var row = document.createElement("tr"); // 새로운 행 생성

    // 각 데이터에 대한 열 생성
    var numCell = document.createElement("td");
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
