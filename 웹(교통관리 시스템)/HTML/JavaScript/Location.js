/*********** 도 -> 시군 **********/
async function updateDistrictSelect() {
    var firstSelect = document.getElementById("City");
    var secondSelect = document.getElementById("District");
    var thirdSelect = document.getElementById("RouteName");
    var fourthSelect = document.getElementById("Address");
    var fifthSelect = document.getElementById("SignalControlNumber");
  
    // 선택지 초기화
    secondSelect.innerHTML = "";
    thirdSelect.innerHTML = ""; 
    fourthSelect.innerHTML = ""; 
    fifthSelect.innerHTML = ""; 

    var CityOption = document.createElement("option");
    CityOption.text = "시/군";
    secondSelect.add(CityOption);
    var DistrictOption = document.createElement("option");
    DistrictOption.text = "로";
    thirdSelect.add(DistrictOption);
    var RouteNameOption = document.createElement("option");
    RouteNameOption.text = "주소";
    fourthSelect.add(RouteNameOption);
    var ignalControlNumberOption = document.createElement("option");
    ignalControlNumberOption.text = "카메라번호";
    fifthSelect.add(ignalControlNumberOption);

    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var CityValue = firstSelect.value;
    var DistrictValue = secondSelect.value;
    var RouteNameValue = thirdSelect.value;
    var AddressValue = fourthSelect.value;
    var SignalControlNumberValue = fifthSelect.value;

    var result = await GetLocationDataDistrict(CityValue);
    
    for(var i = 0; i < result.length; i++){
        var option = document.createElement("option");
        option.text = result[i];
        option.value = result[i];
        secondSelect.add(option);
    }
}
async function GetLocationDataDistrict(CityValue) {
    try {
        const response = await fetch('/DistrictData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CityValue })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

/*********** 시군 -> 길 **********/

async function updateRouteNameSelect() {
    var firstSelect = document.getElementById("City");
    var secondSelect = document.getElementById("District");
    var thirdSelect = document.getElementById("RouteName");
    var fourthSelect = document.getElementById("Address");
    var fifthSelect = document.getElementById("SignalControlNumber");
  
    // 선택지 초기화
    thirdSelect.innerHTML = ""; 
    fourthSelect.innerHTML = ""; 
    fifthSelect.innerHTML = "";

    var DistrictOption = document.createElement("option");
    DistrictOption.text = "로";
    thirdSelect.add(DistrictOption);
    var RouteNameOption = document.createElement("option");
    RouteNameOption.text = "주소";
    fourthSelect.add(RouteNameOption);
    var ignalControlNumberOption = document.createElement("option");
    ignalControlNumberOption.text = "카메라번호";
    fifthSelect.add(ignalControlNumberOption);

    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var CityValue = firstSelect.value;
    var DistrictValue = secondSelect.value;
    var RouteNameValue = thirdSelect.value;
    var AddressValue = fourthSelect.value;
    var SignalControlNumberValue = fifthSelect.value;

    var result = await GetLocationDataRouteName(CityValue, DistrictValue);

    for(var i = 0; i < result.length; i++){
        var option = document.createElement("option");
        option.text = result[i];
        option.value = result[i];
        thirdSelect.add(option);
    }
}
async function GetLocationDataRouteName(CityValue, DistrictValue) {
    try {
        const response = await fetch('/RouteNameData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CityValue, DistrictValue })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

/*********** 길 -> 주소 **********/

async function updateAddressSelect() {
    var firstSelect = document.getElementById("City");
    var secondSelect = document.getElementById("District");
    var thirdSelect = document.getElementById("RouteName");
    var fourthSelect = document.getElementById("Address");
    var fifthSelect = document.getElementById("SignalControlNumber");
  
    // 선택지 초기화
    fourthSelect.innerHTML = ""; 
    fifthSelect.innerHTML = "";

    var RouteNameOption = document.createElement("option");
    RouteNameOption.text = "주소";
    fourthSelect.add(RouteNameOption);
    var ignalControlNumberOption = document.createElement("option");
    ignalControlNumberOption.text = "카메라번호";
    fifthSelect.add(ignalControlNumberOption);

    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var CityValue = firstSelect.value;
    var DistrictValue = secondSelect.value;
    var RouteNameValue = thirdSelect.value;
    var AddressValue = fourthSelect.value;
    var SignalControlNumberValue = fifthSelect.value;

    var result = await GetLocationDataAddress(CityValue, DistrictValue, RouteNameValue);

    for(var i = 0; i < result.length; i++){
        var option = document.createElement("option");
        option.text = result[i];
        option.value = result[i];
        fourthSelect.add(option);
    }
}
async function GetLocationDataAddress(CityValue, DistrictValue, RouteNameValue) {
    try {
        const response = await fetch('/AddressData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CityValue, DistrictValue, RouteNameValue })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

/*********** 주소 -> 카메라번호 **********/

async function updateSignalControlNumberSelect() {
    var firstSelect = document.getElementById("City");
    var secondSelect = document.getElementById("District");
    var thirdSelect = document.getElementById("RouteName");
    var fourthSelect = document.getElementById("Address");
    var fifthSelect = document.getElementById("SignalControlNumber");
  
    // 선택지 초기화
    fifthSelect.innerHTML = "";

    var ignalControlNumberOption = document.createElement("option");
    ignalControlNumberOption.text = "카메라번호";
    fifthSelect.add(ignalControlNumberOption);

    // 첫 번째 선택지에 따라 두 번째 선택지를 동적으로 변경합니다.
    var CityValue = firstSelect.value;
    var DistrictValue = secondSelect.value;
    var RouteNameValue = thirdSelect.value;
    var AddressValue = fourthSelect.value;
    var SignalControlNumberValue = fifthSelect.value;

    var result = await GetLocationDataSignalControlNumber(CityValue, DistrictValue, RouteNameValue, AddressValue);

    for(var i = 0; i < result.length; i++){
        var option = document.createElement("option");
        option.text = result[i];
        option.value = result[i];
        fifthSelect.add(option);
    }
}
async function GetLocationDataSignalControlNumber(CityValue, DistrictValue, RouteNameValue, AddressValue) {
    try {
        const response = await fetch('SignalControlNumberData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CityValue, DistrictValue, RouteNameValue, AddressValue })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error('서버 응답 실패');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('fetch 오류:', error);
    }
}

