function updateLocation2Select() {
    var firstSelect = document.getElementById("Location1");
    var secondSelect = document.getElementById("Location2");
  
    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var selectedValue = firstSelect.value;
    secondSelect.innerHTML = ""; // 먼저 두 번째 선택지를 초기화합니다.

    var option = document.createElement("option");
    option.text = "구";
    secondSelect.add(option);

    if (selectedValue === "1") {
        // 첫 번째 선택지가 1일 때 두 번째 선택지를 추가합니다.
        var option1 = document.createElement("option");
        option1.text = "옵션 A";
        secondSelect.add(option1);
        var option2 = document.createElement("option");
        option2.text = "옵션 B";
        secondSelect.add(option2);
    } else if (selectedValue === "2") {
        // 첫 번째 선택지가 2일 때 두 번째 선택지를 추가합니다.
        var option3 = document.createElement("option");
        option3.text = "옵션 X";
        secondSelect.add(option3);
        var option4 = document.createElement("option");
        option4.text = "옵션 Y";
        secondSelect.add(option4);
    } else if (selectedValue === "3") {
        // 첫 번째 선택지가 3일 때 두 번째 선택지를 추가합니다.
        var option5 = document.createElement("option");
        option5.text = "옵션 가";
        secondSelect.add(option5);
        var option6 = document.createElement("option");
        option6.text = "옵션 나";
        secondSelect.add(option6);
    }
}
function updateLocation3Select() {
    var firstSelect = document.getElementById("Location2");
    var secondSelect = document.getElementById("Location3");
  
    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var selectedValue = firstSelect.value;
    secondSelect.innerHTML = ""; // 먼저 두 번째 선택지를 초기화합니다.
  
    var option = document.createElement("option");
    option.text = "동/면";
    secondSelect.add(option);

    if (selectedValue === "1") {
        // 첫 번째 선택지가 1일 때 두 번째 선택지를 추가합니다.
        var option1 = document.createElement("option");
        option1.text = "옵션 A";
        secondSelect.add(option1);
        var option2 = document.createElement("option");
        option2.text = "옵션 B";
        secondSelect.add(option2);
    } else if (selectedValue === "2") {
        // 첫 번째 선택지가 2일 때 두 번째 선택지를 추가합니다.
        var option3 = document.createElement("option");
        option3.text = "옵션 X";
        secondSelect.add(option3);
        var option4 = document.createElement("option");
        option4.text = "옵션 Y";
        secondSelect.add(option4);
    } else if (selectedValue === "3") {
        // 첫 번째 선택지가 3일 때 두 번째 선택지를 추가합니다.
        var option5 = document.createElement("option");
        option5.text = "옵션 가";
        secondSelect.add(option5);
        var option6 = document.createElement("option");
        option6.text = "옵션 나";
        secondSelect.add(option6);
    }
}
function updateLocation4Select() {
    var firstSelect = document.getElementById("Location3");
    var secondSelect = document.getElementById("Location4");
  
    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var selectedValue = firstSelect.value;
    secondSelect.innerHTML = ""; // 먼저 두 번째 선택지를 초기화합니다.
  
    var option = document.createElement("option");
    option.text = "교차로";
    secondSelect.add(option);

    if (selectedValue === "1") {
        // 첫 번째 선택지가 1일 때 두 번째 선택지를 추가합니다.
        var option1 = document.createElement("option");
        option1.text = "옵션 A";
        secondSelect.add(option1);
        var option2 = document.createElement("option");
        option2.text = "옵션 B";
        secondSelect.add(option2);
    } else if (selectedValue === "2") {
        // 첫 번째 선택지가 2일 때 두 번째 선택지를 추가합니다.
        var option3 = document.createElement("option");
        option3.text = "옵션 X";
        secondSelect.add(option3);
        var option4 = document.createElement("option");
        option4.text = "옵션 Y";
        secondSelect.add(option4);
    } else if (selectedValue === "3") {
        // 첫 번째 선택지가 3일 때 두 번째 선택지를 추가합니다.
        var option5 = document.createElement("option");
        option5.text = "옵션 가";
        secondSelect.add(option5);
        var option6 = document.createElement("option");
        option6.text = "옵션 나";
        secondSelect.add(option6);
    }
}