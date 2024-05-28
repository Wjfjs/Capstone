// 필요한 모듈 가져오기
const mysql = require('mysql');

const { Connect, Close, Query } = require('./Connect_DB'); // Connect_DB.js 파일의 모듈 가져오기


// 데이터 가져오는 함수
function fetchData(callback) {
    const query = 'SELECT count FROM count'; // 적절한 쿼리 작성
    connection.query(query, (error, results) => {
        if (error) {
            callback(error, null);
            return;
        }
        const dataArray = results.map(row => {
            // 여기서 각 행(row)을 원하는 형식으로 가공하여 배열에 저장할 수 있습니다.
            return {
                count: row.count
                // 필요한 다른 데이터도 추가할 수 있습니다.
            };
        });
        callback(null, dataArray); // 가공된 데이터 배열을 콜백 함수에 전달
    });
}

// 모듈 내보내기
module.exports = fetchData;