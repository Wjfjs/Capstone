let currentLight = 0;

const lights = ["red", "yellow", "green"];
const lightElements = {
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    green: document.getElementById("green")
};

// 각 신호등의 초기 지속 시간을 설정합니다.
let durations = [7000, 8000, 5000];

function changeLight() {
    // 임의의 차량 수를 생성합니다.
    const carCounts = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

    // 가장 많은 차량이 있는 신호등의 색을 결정합니다.
    const maxCarCountIndex = carCounts.indexOf(Math.max(...carCounts));

    // 해당 신호등의 색을 변경하여 더 길게 유지합니다.
    durations = [7000, 8000, 5000]; // 초기값으로 설정

    if (maxCarCountIndex === 0) {
        durations[2] = 10000; // 왼쪽 신호등에 많은 차량이 있으면 왼쪽 신호를 더 길게 유지
    } else if (maxCarCountIndex === 1) {
        durations[1] = 10000; // 왼쪽에서 두 번째 신호등에 많은 차량이 있으면 왼쪽에서 두 번째 신호를 더 길게 유지
    } else if (maxCarCountIndex === 2) {
        durations[0] = 10000; // 오른쪽에서 두 번째 신호등에 많은 차량이 있으면 오른쪽에서 두 번째 신호를 더 길게 유지
    } else {
        durations[1] = 10000; // 오른쪽 신호등에 많은 차량이 있으면 오른쪽 신호를 더 길게 유지
    }

    console.log(`${lights[currentLight]} light was on for ${durations[currentLight]} milliseconds`);

    lightElements.red.classList.remove("red");
    lightElements.yellow.classList.remove("yellow");
    lightElements.green.classList.remove("green");

    const light = lights[currentLight];
    lightElements[light].classList.add(light);

    currentLight = (currentLight + 1) % lights.length;

    setTimeout(changeLight, durations[currentLight]);
}

changeLight();
