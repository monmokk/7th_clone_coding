const express = require('express');
const routers = require("./routes");
const kakaoLogin = require("./middlewares/kakao_login_middle")
const naverLogin = require("./middlewares/naver_login_middle")
const app = express();

const { Server } = require('socket.io');
const { createServer } = require('http');
const server = createServer(app)
const cors = require('cors');

const corsOptions = {
    origin: [
        'http://localhost:4000',
        'http://3.37.87.166'
    ],
    method: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})


app.use(express.json());
kakaoLogin()
naverLogin()

app.use(routers);

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});

module.exports = {
    app, server, io
}