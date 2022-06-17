const express = require('express');
const routers = require("./routes");
const kakaoLogin = require("./middlewares/kakao_login_middle")
const naverLogin = require("./middlewares/naver_login_middle")
const app = express();
const port = process.env.PORT;
const cors = require('cors');
app.use(cors());

app.listen(port, () => {
    console.log(`
    ##############################
            ${port} port
           server running
    ##############################`);
});

app.use(express.json());
kakaoLogin()
naverLogin()

app.use(routers);
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});