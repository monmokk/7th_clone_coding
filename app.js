const express = require('express');
const routers = require("./routers");

const app = express();
const port = 4000;


app.listen(port, () => {
    console.log(`
    ##############################
            ${port} port
           server running
    ##############################`);
});

app.use(routers);
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
});