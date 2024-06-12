var currentLight1 = 0;
var currentLight2 = 0;
const durations = [] //신호등 변하는 시간
const durations2 = [] //신호등 변하는 시간

const lights = ["red", "yellow", "green"];
async function GetTime(){
    try {
        const responses = await fetch('/TimeAlgorithm', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (!responses.ok) {
            throw new Error('서버 응답 실패');
        }
        const result = await responses.json();


        console.log('처리된 데이터:', result);

        function displayResult(resultIndex, resultValue) {
            const resultContainer = document.getElementById(`result${resultIndex}`);
            resultContainer.textContent = JSON.stringify(resultValue['ColorTime']);
            resultContainer.innerHTML += "  ";
        }
        
        // 결과 출력을 위한 딜레이 설정 (밀리초 단위)
        const delayBetweenResults = 1000;
        
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

        durations = result[0]['ColorTime'];
        console.log('신호등 시간:', durations);
        
        durations = result[0]['ColorTime'];
        console.log('신호등 시간:', durations);

    } catch (error) {   
        console.error('fetch 오류:', error);
    }

}


function changeLight1() {
    const lightElements1 = {
        red: document.getElementById("red"),
        yellow: document.getElementById("yellow"),
        green: document.getElementById("green")
    };

    console.log(`${lights[currentLight1]} light was on for ${durations[currentLight1]} milliseconds`);
    
    lightElements1.red.classList.remove("red");
    lightElements1.yellow.classList.remove("yellow");
    lightElements1.green.classList.remove("green");

    const light = lights[currentLight1];
    lightElements1[light].classList.add(light);

    currentLight1 = (currentLight1 + 1) % lights.length;

    setTimeout(changeLight1, durations[currentLight1]);
}

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

    setTimeout(changeLight2, durations2[currentLight2]);
}
