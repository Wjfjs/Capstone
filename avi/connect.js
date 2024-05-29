const mysql = require('mysql');

// MySQL 데이터베이스 연결 설정
const dbConfig = {
    host: '192.168.1.3',
    port: '3306',
    user: 'dbuser192381',
    password: 'ce1234',
    database: 'db192381'
};

// MySQL 연결 생성
const connection = mysql.createConnection(dbConfig);


