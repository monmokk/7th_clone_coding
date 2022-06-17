const express = require('express');
const routers = require("./routes");

const app = express();
const port = process.env.PORT;


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