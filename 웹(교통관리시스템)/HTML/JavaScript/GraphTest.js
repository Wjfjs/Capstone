
async function GetGraphDataHour() {
    try {
        const response = await fetch('/hourData', {
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

async function GetGraphDataDay() {
    try {
        const response = await fetch('/dayData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        GraphDay(result);
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
GetGraphDataDay();

async function GetGraphDataWeek() {
    try {
        const response = await fetch('/weekData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        GraphWeek(result);
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
GetGraphDataWeek();

async function GetGraphDataMonth() {
    try {
        const response = await fetch('/monthData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        GraphMonth(result);
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
GetGraphDataMonth();

async function GraphHour(result) {
    console.log(result);
    var ctx = document.getElementById('hour-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            datasets: [{
                label: '시간별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: result
                //data: Array.from({ length: 25 }, (_, index) => result[index % result.length])
                //data: [0, 10, 5, 2, 255, 80, 20, 30, 45, 25, 50, 13, 32, 21, 47, 16, 2, 30, 1, 46, 17, 28, 20, 39, 45]
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function GraphDay(result) {
    console.log(result);
    var ctx = document.getElementById('day-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            datasets: [{
                label: '일별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: result
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function GraphWeek(result) {
    console.log(result);
    var ctx = document.getElementById('week-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            datasets: [{
                label: '요일별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: result
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function GraphMonth(result) {
    console.log(result);
    var ctx = document.getElementById('month-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
                label: '월별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: result
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}