const express = require('express');
const routers = require("./routes");
const kakaoLogin = require("./middlewares/social_login_middle")
const app = express();
const port = process.env.PORT;


app.listen(port, () => {
    console.log(`
    ##############################
            ${port} port
           server running
    ##############################`);
});

app.use(express.json());
kakaoLogin()

app.use(routers);
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});