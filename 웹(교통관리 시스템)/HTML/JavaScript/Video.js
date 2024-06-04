var socket = null;

function ConnectVideo(){
    var fifthSelect = document.getElementById("SignalControlNumber");
    if (isNaN(fifthSelect.value)){
        console.log("오류");
    }else{
        ConnectSocket(fifthSelect.value);
    }
}

function ConnectSocket(value){
    switch (value) {
        case 15 :
        case 16 :
        case 17 :
            socket = new WebSocket("ws://localhost:8555");
            break;
        default :
            socket = new WebSocket("ws://localhost:8888");
            break;
    }

    socket.onmessage = function(event) {
        var img = document.getElementById('video_feed');
        img.src = 'data:image/jpg;base64,' + event.data;
    };
    
    socket.onerror = function(event) {
        var img = document.getElementById('video_feed');
        img.src = '../Image/error.png';
        img.style.width = '300px';
        img.style.height = 'auto';
        var errorText = document.getElementById('errorText');
        errorText.textContent = '연결 실패';
    };
}
                            
