let idc, pwc, cpwc, nnc;

function Input_Check(element){
    Input_Data_Check_To_Submit();
    PW_T();
    // 패턴 체크
    let div = document.createElement("div");
    let img = document.createElement("img");
    let span = document.createElement("span");
    let parentElement = element.parentNode;
    let textNode = document.createTextNode("");
    
    let childElement = parentElement.firstElementChild;

    var len = element.value.length;

    let pw = document.getElementById('pw');
    let confirm_pw = document.getElementById('confirm_pw');

    div.setAttribute('class', 'MessageBox');
    
    function MessageBox_Check(){
        const nextElement = childElement.nextElementSibling; // div 태그 id: MessageBox

        if(nextElement !== null){
            parentElement.removeChild(nextElement);
        }
        parentElement.appendChild(div);
        div.appendChild(img);
        div.appendChild(span);
        span.appendChild(textNode);
    }

    // 비밀번호 확인 아이콘, 메세지 변경
    function PW_T(){
        let arr = document.getElementsByTagName("input");
        if(arr[1].value !== "" && arr[2].value !== ""){
            let msgBox = arr[2].nextElementSibling;
            if(msgBox !== null){
                if(arr[1].value !== arr[2].value){
                    msgBox.firstElementChild.src = "Image/dcheck.png";
                    msgBox.children[1].textContent = "비밀번호가 일치하지 않습니다.";
                    return;
                }
                msgBox.firstElementChild.src = "Image/check.png";
                msgBox.children[1].textContent = "비밀번호가 일치합니다.";
            }
        }
    }
    // 빈칸이면 더 이상 실행하지 않고 margin 값 주고 종료
    if(len <= 0){
        const nextElement = childElement.nextElementSibling; // div 태그 id: MessageBox
        parentElement.removeChild(nextElement);
        element.style.marginBottom = "10px";
        return;
    }
    else{
        element.style.marginBottom = "0px";
    }

    // 분기별 함수 실행
    if(element.name === "id"){
        Value_Check(element.name, element.value, null)
            .then(result => {
                idc = result;
                if(result){
                    img.src = "Image/check.png";
                    textNode.nodeValue = "사용 가능한 아이디입니다.";
                }
                else{
                    img.src = "Image/dcheck.png";
                    textNode.nodeValue = "사용 불가능한 아이디입니다.";
                }
                MessageBox_Check();
            });
    }
    else if(element.name === "pw"){
        pw.value = element.value;
        Value_Check(element.name, element.value, null)
            .then(result => {
                pwc = result;
                if(result){
                    img.src = "Image/check.png";
                    textNode.nodeValue = "사용 가능한 비밀번호입니다.";
                }
                else{
                    img.src = "Image/dcheck.png";
                    textNode.nodeValue = "사용 불가능한 비밀번호입니다.";
                }
                MessageBox_Check();
            });
    }
    else if(element.name === "confirm_pw"){
        confirm_pw = element.value;
        Value_Check(element.name, pw.value, element.value)
            .then(result => {
                cpwc = result;
                if(result){
                    img.src = "Image/check.png";
                    textNode.nodeValue = "비밀번호가 일치합니다.";
                }
                else{
                    img.src = "Image/dcheck.png";
                    textNode.nodeValue = "비밀번호가 일치하지 않습니다.";
                }
                MessageBox_Check();
            });
    }
    else if(element.name === "nick_name"){
        const spaceBar = / /;
        if(spaceBar.test(element.value)){
            img.src = "Image/dcheck.png";
            textNode.nodeValue = "공백은 별명에 사용할 수 없습니다.";
            MessageBox_Check();
            return;
        }
        else{
            Value_Check(element.name, element.value, null)
            .then(result => {
                nnc = result;
                if(result){
                    img.src = "Image/check.png";
                    textNode.nodeValue = "사용 가능한 별명입니다.";
                }
                else{
                    img.src = "Image/dcheck.png";
                    textNode.nodeValue = "중복된 별명입니다.";
                }
                MessageBox_Check();
            });
        }
    }

    if(pw.value !== confirm_pw.value && pw.value !== null && confirm_pw.value !== null){
        cpwc = false;
    }
    else{
        cpwc = true;
    }
}
function InitForm(){
    let arr = document.getElementsByTagName("input");
    
    for(let i = 0; i < arr.length; i++){
        arr[i].style.marginBottom = "10px";
    }
    Exit_Check();
}
function Exit_Check(){
    window.onbeforeunload = function(){
        return '변경사항이 저장되지 않을 수 있습니다.';
    }
}
function Input_Data_Check_To_Submit(){
    let inputData = document.getElementsByTagName("input");
    let submitButton = document.getElementById("sign_up") ? document.getElementById("sign_up"):document.getElementById("login");

    for(let i = 0; i < inputData.length; i++){
        if(inputData[i].value === ""){
            submitButton.disabled = true;
            submitButton.style.backgroundColor = "#347236";
            return;
        }
    }
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "#4CAF50";
    submitButton.style.cursor = "pointer";
}
function Value_Check(name, value1, value2) {
    return new Promise((resolve, reject) => {
        fetch('/check-input', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, value1, value2 })
        })
            .then(response => response.json())
            .then(data => {
                const result = data.result;
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function All_Values_Check(){
    if(idc && pwc && cpwc && nnc){
        return true;
    }
    alert('입력값을 다시 확인해 주세요.');
    return false;
}
  