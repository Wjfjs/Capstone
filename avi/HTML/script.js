var currentLight1 = 0;
var currentLight2 = 0;

const lights = ["red", "yellow", "green"];



const durations = []//[7000, 8000, 5000]; // 각 불의 지속 시간 (밀리초)
const durations2 = []//[7000, 5000, 8000]

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
