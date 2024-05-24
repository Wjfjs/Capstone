document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('hour-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
            datasets: [{
                label: '시간별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 255, 80, 20, 30, 45, 25, 50, 13, 32, 21, 47, 16, 2, 30, 1, 46, 17, 28, 20, 39, 45]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('day-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: '일별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('week-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: '주간별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('month-graph').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: '월별 데이터',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});