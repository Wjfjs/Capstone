var Redbutton = document.getElementById("RedLight");
var Yellowbutton = document.getElementById("YellowLight");
var Greenbutton = document.getElementById("GreenLight");

function reset(){
    Redbutton.style.backgroundColor = "grey";
    Yellowbutton.style.backgroundColor = "grey";
    Greenbutton.style.backgroundColor = "grey";
    Yellowbutton.textContent="";
    isRed = 0;
    isYellow = 0;
    isGreen = 0;
    clearInterval(RedInterval);
    clearInterval(YellowInterval);
    clearInterval(GreenInterval);
}

/* 적색 신호등 */
var clickCount = 0;
var timeout;
var isRed = 0;
var RedInterval;

Redbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1 || clickCount >= 3) {
        timeout = setTimeout(function() {
            if (isRed == 0) {
                reset()
                Redbutton.style.backgroundColor = "red";
                isRed = 1;
            } else {
                reset()
                Redbutton.style.backgroundColor = "grey";
                isRed = 0;
            }
            clickCount = 0;
        }, 200); // 여기서 300은 시간을 나타내며, 밀리초 단위입니다.
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        reset()
        RedInterval = setInterval("flashRed()", 500) 
        clearTimeout(timeout);
        clickCount = 0;
    }
});

function flashRed(){ 
    if (Redbutton.style.backgroundColor.indexOf("rgb(255, 0, 0)")!=-1) 
        Redbutton.style.backgroundColor="grey" 
    else 
    Redbutton.style.backgroundColor="#ff0000" 
    isRed = 1
}  

/* 황색 신호등 */
var clickCount = 0;
var timeout;
var isYellow = 0;
var YellowInterval;

Yellowbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1 || clickCount >= 3) {
        timeout = setTimeout(function() {
            if (isYellow == 0) {
                reset()
                Yellowbutton.textContent="←";
                Yellowbutton.style.fontWeight="bolder";
                Yellowbutton.style.fontSize="70px";
                Yellowbutton.style.color = "#00e000";
                Greenbutton.style.backgroundColor = "#00e000";
                isYellow = 1;
            } else {
                reset()
                Yellowbutton.style.backgroundColor = "grey";
                isYellow = 0;
            }
            clickCount = 0;
        }, 200); // 여기서 300은 시간을 나타내며, 밀리초 단위입니다.
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        reset()
        YellowInterval = setInterval("flashYellow()", 500) 
        clearTimeout(timeout);
        clickCount = 0;
    }
});

function flashYellow(){ 
    if (Yellowbutton.style.backgroundColor.indexOf("rgb(255, 131, 0)")!=-1) 
        Yellowbutton.style.backgroundColor="grey" 
    else 
    Yellowbutton.style.backgroundColor="#ff8300" 
    isYellow = 1
} 

/* 녹색 */
var clickCount = 0;
var timeout;
var isGreen = 0;
var GreenInterval;

Greenbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1 || clickCount >= 3) {
        timeout = setTimeout(function() {
            if (isGreen == 0) {
                reset()
                Greenbutton.style.backgroundColor = "#00e000";
                isGreen = 1;
            } else {
                reset()
                Greenbutton.style.backgroundColor = "grey";
                isGreen = 0;
            }
            clickCount = 0;
        }, 200); // 여기서 300은 시간을 나타내며, 밀리초 단위입니다.
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        reset()
        Redbutton.style.backgroundColor = "111111";
        Yellowbutton.style.backgroundColor = "111111";
        Greenbutton.style.backgroundColor = "111111";
        isGreen = 1;
        clearTimeout(timeout);
        clickCount = 0;
    }
});