const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 정적 파일 제공 설정
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('클라이언트가 연결되었습니다.');

    // 클라이언트로부터 받은 영상 데이터를 다른 클라이언트들에게 브로드캐스트
    socket.on('videoData', (data) => {
        console.log('영상 데이터를 전송받았습니다.');
        io.emit('videoData', data); // 모든 클라이언트에게 전송
    });

    socket.on('disconnect', () => {
        console.log('클라이언트가 연결을 해제했습니다.');
    });
});

server.listen(5555, () => {
    console.log('서버가 5555번 포트에서 실행 중입니다.');
});
