const { server, io } = require('./app')
const port = process.env.PORT;
const { checkCounselor } = require('./middlewares/auth_middleware');

server.listen(port || 3000, () => {
    console.log(`
        #########################################
                    ${port} server run
        #########################################
    `)
})

const connectedUser = {}
io.on('connection', (socket) => {

    socket.on('token',token => {
        const userId = checkCounselor(token)
        connectedUser[userId] = socket.id
        const userType = userId === 2? '상담사':'고객';
        console.log(connectedUser, userType)
        socket.emit('token', userType);
    })
    socket.on('chat', (data) => {
        console.log(data);
        socket.emit('chat', data.msg);

    });
    socket.on('error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    socket.on('disconnect', () => {
    });
})