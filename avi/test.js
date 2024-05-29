var time1 = 40; //1번째 길의 신호등 녹색
var time2 = 40; //2번째 길의 신호등 녹색

var count1 = 1; 
var count2 = 100;

if(count1 >=20  | count2>= 20){
// 최대 할당 시간을 10초로 설정
var maxTime = 20;

// 카운트별 비율 계산
var total = count1 + count2;
var ratio1 = count1 / total;
var ratio2 = count2 / total;

// 각 카운트별 할당 시간 계산
var allocatedTime1 = Math.min(maxTime, Math.round(time1 * ratio1));
var allocatedTime2 = Math.min(maxTime, Math.round(time2 * ratio2));

// 총 할당된 시간이 10초를 넘어가면 비율을 다시 계산하여 조정
var totalAllocatedTime = allocatedTime1 + allocatedTime2;
if (totalAllocatedTime > maxTime * 2) {
    var newTotalAllocatedTime = maxTime * 2;
    allocatedTime1 = Math.round(allocatedTime1 / totalAllocatedTime * newTotalAllocatedTime);
    allocatedTime2 = Math.round(allocatedTime2 / totalAllocatedTime * newTotalAllocatedTime);
}

// 각 카운트별 최종 할당 시간 계산
var finalTime1 = Math.min(time1, allocatedTime1 * count1 / total);
var finalTime2 = Math.min(time2, allocatedTime2 * count2 / total);


PlusTime = time1 + time2 -maxTime;
time1 = PlusTime/2 + finalTime1;
time2 = PlusTime/2 + finalTime2;
}


console.log("카운트 1에 할당된 시간:", time1.toFixed(1), "초");
console.log("카운트 2에 할당된 시간:", time2.toFixed(1), "초");
