//const TimeResultJs = require("./TimeData.js");

var currentLight1 = 0;
var currentLight2 = 0;
var durations = [];   //신호등 변하는 시간
var durations2 = [];  //신호등 변하는 시간
var count1 = 0;
var count2 = 0;
let redClicked = false;
let yellowClicked = false;
let greenClicked = false;
let leftGreen = false;
let flashingRed = false;
let flashingYellow = false;
let Off = false;

var trafficID = [];   
var trafficID2 = [];  
let isChangingLight1 = true; // 신호등 변경 상태를 추적하는 변수
const lights = ["green", "yellow", "red"];

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
        count2 = countation2;
        console.log('카운트 수:', countation2);

    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

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


    await cntion1();
    await cntion2();
    
    await GetTimeData();
    await GetTimeData2();
    await countAlgorithm();
    await GetTimeData();
    await GetTimeData2();
    
   
    toggleColor();
    changeLight1();
}

init();

    //시간 계산 알고리즘
async function countAlgorithm(){
    console.log('countAlgorithm 카운트 수:', count1[0]['count']+count2[0]['count']);
    if ((count1[0]['count']+count2[0]['count']) > 10) {
        // 최대 할당 시간을 20초로 설정
        var maxTime = 20;

        // 카운트별 비율 계산
        var total = count1[0]['count'] + count2[0]['count'];
        var ratio1 = count1[0]['count'] / total;
        var ratio2 = count2[0]['count'] / total;

        // 각 카운트별 할당 시간 계산
            var allocatedTime1 = Math.min(maxTime, Math.round(durations[1] * ratio1));
            var allocatedTime2 = Math.min(maxTime, Math.round(durations2[1] * ratio2));
        
        // 총 할당된 시간이 20초를 넘어가면 비율을 다시 계산하여 조정
        var totalAllocatedTime = allocatedTime1 + allocatedTime2;
        if (totalAllocatedTime > maxTime * 2) {
            var newTotalAllocatedTime = maxTime * 2;
            allocatedTime1 = Math.round(allocatedTime1 / totalAllocatedTime * newTotalAllocatedTime);
            allocatedTime2 = Math.round(allocatedTime2 / totalAllocatedTime * newTotalAllocatedTime);
        }

        // 각 카운트별 최종 할당 시간 계산
        var finalTime1 = Math.min(durations[1], allocatedTime1 * count1[0]['count'] / total);
        var finalTime2 = Math.min(durations2[1], allocatedTime2 * count2[0]['count'] / total);
        

        PlusTime = durations[1] + durations2[1] - maxTime;
        console.log('응'+PlusTime);
        time1 = PlusTime / 2 + finalTime1;
        time2 = PlusTime / 2 + finalTime2;
        const tID = trafficID[1];
        const tID2 = trafficID2[1];
        console.log('기'+time1);
        console.log('잇'+time2);
        console.log('들어온 카운트 수:' + count1[0]['count']);
        console.log('들어온 카운트 수:' + count2[0]['count']);

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
    else {
        console.log("안됨");
    }
}
let timerId;

const lightElements1 = {
    green: document.getElementById("green"),
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    leftGreen: document.getElementById("yellow"),
    flashingRed: document.getElementById("red"),
    flashingYellow: document.getElementById("yellow")
};

// 1번째 신호등 불 켜지는 알고리즘
function changeLight1() {
    
    if(isChangingLight1 == true){
        lightElements1.red.classList.remove("red");
        lightElements1.yellow.classList.remove("yellow");
        lightElements1.green.classList.remove("green");

        const light = lights[currentLight1];
        lightElements1[light].classList.add(light);

        currentLight1 = (currentLight1 + 1) % lights.length;
        timerId = setTimeout(changeLight1, durations[currentLight1]*100);
    }
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
    setTimeout(changeLight2, durations2[currentLight2]*100);
    }
// const lights = ["red", "yellow", "green"];

function rectlyLight(){
    lightElements1.red.classList.remove("red");
    lightElements1.yellow.classList.remove("yellow");
    lightElements1.green.classList.remove("green");
}


function button1Click(color, id) {
    toggleColor('green', id);
}

function button2Click(color, id) {
    toggleColor('red', id);
}

function button3Click(color, id) {
    toggleColor('leftGreen', id);
}

function button4Click(color, id) {
    toggleColor('flashingRed', id);
}

function button5Click(color, id) {
    toggleColor('flashingYellow', id);
}

function button6Click(color, id) {
    toggleColor('Off', id);
}

async function insertControlLog(color, id) {
    try {
        const response = await fetch('/insertControlLog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, color })
        });
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

// clearTimeout(timerId);
var RedInterval;
var YellowInterval;

function trafficReset(){
    lightElements1.green.classList.remove("green");
    lightElements1.red.classList.remove("red");
    lightElements1.yellow.classList.remove("yellow");
    lightElements1.leftGreen.textContent="";
    redClicked = false;
    yellowClicked = false;
    greenClicked = false;
    leftGreen = false;
    flashingRed = false;
    flashingYellow = false;
    Off = false;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function toggleColor(color, id) {
    switch(color) {
        case 'green':
            if (greenClicked) {
                trafficReset();
                lightElements1.green.classList.remove("green");
                greenClicked = false;
                console.log('그린색 시작 안돼:', greenClicked);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                lightElements1.green.classList.add("green");
                greenClicked = true;
                console.log('그린색 시작 돼:', greenClicked);
                insertControlLog(color, id);
                clearTimeout(timerId);
            }
            break;
        case 'red':
            if (redClicked) {
                trafficReset();
                lightElements1.red.classList.remove("red");
                redClicked = false;
                console.log('빨간색 시작 안돼:', redClicked);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                lightElements1.red.classList.add("red");
                redClicked = true;
                console.log('빨간색 시작 돼:', redClicked);
                insertControlLog(color, id);
                clearTimeout(timerId);
            }
            break;
        case 'leftGreen':
            if (leftGreen) {
                trafficReset();
                lightElements1.leftGreen.textContent="";
                lightElements1.leftGreen.classList.remove("leftGreen");
                yellow = false;
                leftGreen = false;
                console.log('직좌 시작 안돼:', leftGreen, yellow);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                lightElements1.leftGreen.classList.add("leftGreen");
                lightElements1.leftGreen.textContent="←";
                lightElements1.leftGreen.style.fontSize="70px";
                lightElements1.leftGreen.style.color = "#00e000";
                lightElements1.leftGreen.style.fontWeight="bolder";
                lightElements1.green.classList.add("green");
                yellow = true;
                leftGreen = true;
                console.log('직좌 시작 돼:', leftGreen, yellow);
                insertControlLog(color, id);
                clearTimeout(timerId);
            }
            break;
        case 'flashingRed':
            if (flashingRed) {
                trafficReset();
                lightElements1.flashingRed.classList.remove("flashingRed");
                flashingRed = false;
                console.log('빨간깜빡이 시작 안돼:', flashingRed);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                flashingRed = true;
                console.log('빨간깜빡이 시작 돼:', flashingRed);
                insertControlLog(color, id);
                clearTimeout(timerId);
                while (flashingRed) {
                    lightElements1.red.classList.add("red");
                    await delay(500);
                    lightElements1.red.classList.remove("red");
                    await delay(500);
                }
            }
            break;
        case 'flashingYellow':
            if (flashingYellow) {
                trafficReset();
                lightElements1.flashingYellow.classList.remove("flashingYellow");
                flashingYellow = false;
                console.log('노란깜빡이 시작 안돼:', flashingYellow);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                lightElements1.flashingYellow.classList.add("flashingYellow");
                flashingYellow = true;
                console.log('노란깜빡이 시작 돼:', flashingYellow);
                insertControlLog(color, id);
                clearTimeout(timerId);
                while (flashingYellow) {
                    lightElements1.yellow.classList.add("yellow");
                    await delay(500);
                    lightElements1.yellow.classList.remove("yellow");
                    await delay(500);
                }
            }
            break;
        case 'Off':
            if (Off) {
                trafficReset();
                Off = false;
                lightElements1.red.style.backgroundColor = "gray";
                lightElements1.yellow.style.backgroundColor = "gray";
                lightElements1.green.style.backgroundColor = "gray";
                console.log('꺼짐 시작 안돼:', Off);
                setTimeout(changeLight1, durations[currentLight1]*10);
            } else {
                trafficReset();
                rectlyLight();
                Off = true;
                lightElements1.red.style.backgroundColor = "111111";
                lightElements1.yellow.style.backgroundColor = "111111";
                lightElements1.green.style.backgroundColor = "111111";
                console.log('꺼짐 시작 돼:', Off);
                insertControlLog(color, id);
                clearTimeout(timerId);
            }
            break;
        default:
            break;
    }

    if (redClicked && yellowClicked && !greenClicked){
        isChangingLight1 = true;
    }
}

function changeTraffic() { // 선택한 버튼에 따른 신호제어
    var ControlTrafficForm = document.getElementById("ControlTrafficForm");
    var color = ControlTrafficForm.value
    console.log("색상로그 : " + color);
    var fifthSelect = document.getElementById("SignalControlNumber"); // 카메라번호
    var id = fifthSelect.value;
    console.log("카메라로그 : " + id);
    if (isNaN(id)) {
        console.log("값이 널이거나 정의되지 않았습니다.");
    }
    switch (ControlTrafficForm.value) {
        case "green":
            button1Click(color, id);
            break;
        case "red":
            button2Click(color, id);
            break;
        case "leftGreen":
            button3Click(color, id);
            break;
        case "flashingRed":
            button4Click(color, id);
            break;
        case "flashingYellow":
            button5Click(color, id);
            break;
        case "Off":
            button6Click(color, id);
            break;
        default :
            trafficReset();
            console.log("없다 병신아");
    }
}




