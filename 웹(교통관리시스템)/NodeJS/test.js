
const fetchData = require('./GraphData'); // DBHandler.js 파일의 경로를 지정하여 모듈 가져오기

// 데이터를 가져오는 함수 호출
fetchData((error, data) => {
    if (error) {
        console.error('Error fetching data:', error);
        return;
    }
    console.log('Fetched data:', data); // 받은 배열 데이터 출력
});