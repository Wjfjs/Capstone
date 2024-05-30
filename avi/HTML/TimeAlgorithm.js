async function GetTimeData() {
    try {
        const response = await fetch('/TimeAlgorithm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        const multipliedValue = result.value * 100;


        const resultContainer = document.getElementById('result');
        resultContainer.textContent = JSON.stringify(result);


    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
GetTimeData();

// var time1 = 4000; // 1번째 길의 신호등 녹색
// var time2 = 4000; // 2번째 길의 신호등 녹색

var count1 = 1; 
var count2 = 1;

if (count1 >= 20 || count2 >= 20) {
    // 최대 할당 시간을 20초로 설정
    var maxTime = 20;

    // 카운트별 비율 계산
    var total = count1 + count2;
    var ratio1 = count1 / total;
    var ratio2 = count2 / total;

    // 각 카운트별 할당 시간 계산
    var allocatedTime1 = Math.min(maxTime, Math.round(time1 * ratio1));
    var allocatedTime2 = Math.min(maxTime, Math.round(time2 * ratio2));

    // 총 할당된 시간이 20초를 넘어가면 비율을 다시 계산하여 조정
    var totalAllocatedTime = allocatedTime1 + allocatedTime2;
    if (totalAllocatedTime > maxTime * 2) {
        var newTotalAllocatedTime = maxTime * 2;
        allocatedTime1 = Math.round(allocatedTime1 / totalAllocatedTime * newTotalAllocatedTime);
        allocatedTime2 = Math.round(allocatedTime2 / totalAllocatedTime * newTotalAllocatedTime);
    }

    // 각 카운트별 최종 할당 시간 계산
    var finalTime1 = Math.min(time1, allocatedTime1 * count1 / total);
    var finalTime2 = Math.min(time2, allocatedTime2 * count2 / total);

    PlusTime = time1 + time2 - maxTime;
    time1 = PlusTime / 2 + finalTime1;
    time2 = PlusTime / 2 + finalTime2;

    fetch('/testData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time1, time2 })
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        alert('오류 발생');
        console.log(error);
    });

}

console.log("카운트 1에 할당된 시간:", time1.toFixed(1), "초");
console.log("카운트 2에 할당된 시간:", time2.toFixed(1), "초");

 