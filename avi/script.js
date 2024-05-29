var currentLight = 0;

const lights = ["red", "yellow", "green"];
const lightElements = {
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    green: document.getElementById("green")
};
const durations = [7000, 8000, 5000]; // 각 불의 지속 시간 (밀리초)







function changeLight() {
    // 켜진 불의 지속 시간 출력
    console.log(`${lights[currentLight]} light was on for ${durations[currentLight]} milliseconds`);
    
    // 모든 불을 끕니다.
    lightElements.red.classList.remove("red");
    lightElements.yellow.classList.remove("yellow");
    lightElements.green.classList.remove("green");

    // 현재 불을 켭니다.
    const light = lights[currentLight];
    lightElements[light].classList.add(light);

    // 다음 불로 이동합니다.
    currentLight = (currentLight + 1) % lights.length;

    // 다음 불로 이동하기 전에 지정된 시간(밀리초)만큼 대기합니다.
    setTimeout(changeLight, durations[currentLight]);
}

// 사이클을 시작합니다.
changeLight(); // 즉시 시작
