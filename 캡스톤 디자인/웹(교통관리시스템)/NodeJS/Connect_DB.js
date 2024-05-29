const http = require('http');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '192.168.1.3',
    user: 'dbuser192381',
    password: 'ce1234', 
    database: 'db192381',
    port: '3306',
    charset: 'UTF8MB4'
});

// DB 연결
function DB_Connect() {
    connection.connect((err) => {
        if(err){
            console.error('MySQL 데이터베이스에 연결할 수 없습니다.');
            throw err;
        }
        console.log('MySQL 데이터베이스에 연결되었습니다.')
    })
}

// DB 닫기
function DB_Close(){
    connection.destroy((err) => {
        if (err) {
            console.error('MySQL 데이터베이스 연결을 닫을 수 없습니다.');
            throw err;
        }
        console.log('MySQL 데이터베이스 연결이 닫혔습니다.');
    });
}

// DB 쿼리 실행
function DB_Query(sql, callback) {
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('쿼리 실행 중 오류가 발생했습니다.');
            throw err;
        }
        console.log('쿼리가 성공적으로 실행되었습니다.');
        callback(result);
    });
}

module.exports = {
    Connect: DB_Connect,
    Close: DB_Close,
    Query: DB_Query
};