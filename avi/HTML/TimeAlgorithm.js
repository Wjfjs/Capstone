//const TimeResultJs = require("./TimeData.js");

var currentLight1 = 0;
var currentLight2 = 0;
var durations = [];   //신호등 변하는 시간
var durations2 = [];  //신호등 변하는 시간
var count1 = 0;
var count2 = 0;


var trafficID = [];   
var trafficID2 = [];  

const lights = ["red", "yellow", "green"];

// 시간값 받아오기
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

        // const processedData = TimeResultJs.TimeResult(result);


        console.log('처리된 데이터:', result);

        function displayResult(resultIndex, resultValue) {
            const resultContainer = document.getElementById(`result${resultIndex}`);
            resultContainer.textContent = resultValue['ColorTime'];
            resultContainer.innerHTML += "  ";
        }
        
        // 결과 출력을 위한 딜레이 설정 (밀리초 단위)
        const delayBetweenResults = 1;
        
        // 각 결과를 일정 시간 간격으로 출력
        setTimeout(() => {
            displayResult(1, result[0]);
        }, delayBetweenResults * 0);
          
        setTimeout(() => {
            displayResult(2, result[1]);
        }, delayBetweenResults * 1);
        
        setTimeout(() => {
            displayResult(3, result[2]);
        }, delayBetweenResults * 2);

         await result.forEach(function(element) {
             durations.push(element.ColorTime);
             trafficID.push(element.TraffID);
         });
        console.log('시간', durations);

    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

async function GetTimeData2() {

    try {
        const response = await fetch('/TimeAlgorithm2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result2 = await response.json();

        // const processedData = TimeResultJs.TimeResult(result);


        console.log('처리된 데이터2:', [result2]);

        function displayResult2(resultIndex2, resultValue2) {
            const resultContainer2 = document.getElementById(`result2${resultIndex2}`);
            console.log(resultContainer2);
            resultContainer2.textContent = resultValue2['ColorTime'];
        }
        
        // 결과 출력을 위한 딜레이 설정 (밀리초 단위)
        const delayBetweenResults2 = 1;
        
        // 각 결과를 일정 시간 간격으로 출력
        setTimeout(() => {
            displayResult2(4, result2[0]);
        }, delayBetweenResults2 * 0);
          
        setTimeout(() => {
            displayResult2(5, result2[1]);
        }, delayBetweenResults2 * 1);
        
        setTimeout(() => {
            displayResult2(6, result2[2]);
        }, delayBetweenResults2 * 2);

        await result2.forEach(function(element) {
             durations2.push(element.ColorTime);
             trafficID2.push(element.TraffID);
         });
        console.log('시간', durations2);

    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

async function cntion1() {

    try {
        const response = await fetch('/count1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const countation1 = await response.json();
        
        console.log('카운트 수:', countation1);
        count1 = countation1;
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
cntion1();
async function cntion2() {

    try {
        const response = await fetch('/count2', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const countation2 = await response.json();
        count2 = countation1;
        console.log('카운트 수:', countation2);

    } catch (error) {
        console.error('fetch 오류:', error);
    }
}
cntion2();

// var count 데이터값 
// async function GetCountData() {

//     try {
//         const response = await fetch('/TimeAlgorithm', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('서버 응답 실패');
//         }

//         const Cntresult = await response.json();

//         // const processedData = TimeResultJs.TimeResult(result);

//         console.log('들어온 카운트 수:', Cntresult);

//     } catch (error) {
//         console.error('fetch 오류:', error);
//     }
// }

async function init(){


    await GetTimeData();
    await GetTimeData2();
    await countAlgorithm();
    await GetTimeData();
    await GetTimeData2();

    changeLight1();
    changeLight2();
}

async function countAlgorithm(){
    //시간 계산 알고리즘
    if ((count1+count2) < 10) {
        // 최대 할당 시간을 20초로 설정
        var maxTime = 20;

        // 카운트별 비율 계산
        var total = count1 + count2;
        var ratio1 = count1 / total;
        var ratio2 = count2 / total;

        // 각 카운트별 할당 시간 계산
            var allocatedTime1 = Math.min(maxTime, Math.round(durations[0] * ratio1));
            var allocatedTime2 = Math.min(maxTime, Math.round(durations2[0] * ratio2));
        
        // 총 할당된 시간이 20초를 넘어가면 비율을 다시 계산하여 조정
        var totalAllocatedTime = allocatedTime1 + allocatedTime2;
        if (totalAllocatedTime > maxTime * 2) {
            var newTotalAllocatedTime = maxTime * 2;
            allocatedTime1 = Math.round(allocatedTime1 / totalAllocatedTime * newTotalAllocatedTime);
            allocatedTime2 = Math.round(allocatedTime2 / totalAllocatedTime * newTotalAllocatedTime);
        }

        // 각 카운트별 최종 할당 시간 계산
        var finalTime1 = Math.min(durations[0], allocatedTime1 * count1 / total);
        var finalTime2 = Math.min(durations2[0], allocatedTime2 * count2 / total);
        

        PlusTime = durations[0] + durations2[0] - maxTime;
        time1 = PlusTime / 2 + finalTime1;
        time2 = PlusTime / 2 + finalTime2;
        const tID = trafficID[0];
        const tID2 = trafficID2[0];
        fetch('/updateTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ time1, time2, tID, tID2 })
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            alert('오류 발생');
            console.log(error);
        });

    }
}


// 1번째 신호등 불 켜지는 알고리즘
function changeLight1() {
    const lightElements1 = {
        red: document.getElementById("red"),
        yellow: document.getElementById("yellow"),
        green: document.getElementById("green")
    };
    
    lightElements1.red.classList.remove("red");
    lightElements1.yellow.classList.remove("yellow");
    lightElements1.green.classList.remove("green");

    const light = lights[currentLight1];
    lightElements1[light].classList.add(light);

    currentLight1 = (currentLight1 + 1) % lights.length;
    setTimeout(changeLight1, durations[currentLight1]*1000);
}
// 2번째 신호등 불 켜지는 알고리즘
function changeLight2() {
    const lightElements2 = {
        red: document.getElementById("red2"),
        yellow: document.getElementById("yellow2"),
        green: document.getElementById("green2")
    };

    console.log(`${lights[currentLight2]} light was on for ${durations2[currentLight2]} milliseconds`);
    
    lightElements2.red.classList.remove("red");
    lightElements2.yellow.classList.remove("yellow");
    lightElements2.green.classList.remove("green");

    const light = lights[currentLight2];
    lightElements2[light].classList.add(light);
    currentLight2 = (currentLight2 + 1) % lights.length;

    setTimeout(changeLight2, durations2[currentLight2]*1000);
}

