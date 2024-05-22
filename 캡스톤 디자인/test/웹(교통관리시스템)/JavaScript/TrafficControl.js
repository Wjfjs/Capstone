/* 적색 신호등 */
var Redbutton = document.getElementById("RedLight");
var clickCount = 0;
var timeout;
var isRed = 0;

Redbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1) {
        timeout = setTimeout(function() {
            if (isRed == 0) {
                Redbutton.style.backgroundColor = "red";
                isRed = 1;
            } else {
                Redbutton.style.backgroundColor = "grey";
                isRed = 0;
            }
            clickCount = 0;
        }, 200); // 여기서 300은 시간을 나타내며, 밀리초 단위입니다.
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        setInterval("flashRed()", 500) 
        clearTimeout(timeout);
        clickCount = 0;
    }
});

function flashRed(){ 
    if (Redbutton.style.backgroundColor.indexOf("rgb(255, 0, 0)")!=-1) 
        Redbutton.style.backgroundColor="#ff0000" 
    else 
    Redbutton.style.backgroundColor="#ff0000" 
    isRed = 1
}  
















/* 황색 신호등 */
var Yellowbutton = document.getElementById("YellowLight");
var clickCount = 0;
var timeout;

Yellowbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1) {
        timeout = setTimeout(function() {
            alert("Single click detected!");
            clickCount = 0;
        }, 200);
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        alert("Double click detected!");
        clearTimeout(timeout);
        clickCount = 0;
    }
});

/* 녹색 신호등 */
var Greenbutton = document.getElementById("GreenLight");
var clickCount = 0;
var timeout;

Greenbutton.addEventListener("click", function() {
    clickCount++;
    if (clickCount === 1) {
        timeout = setTimeout(function() {
            alert("Single click detected!");
            clickCount = 0;
        }, 200); // 여기서 300은 시간을 나타내며, 밀리초 단위입니다.
    } else {
        // 클릭 이벤트가 연달아 발생한 경우
        alert("Double click detected!");
        clearTimeout(timeout);
        clickCount = 0;
    }
});