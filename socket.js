const { io } = require('./app')
const { checkLogin } = require('./middlewares/auth_middleware');
const connectedUser = {}

io.on('connection', (socket) => {
    socket.on('token',token => {
        const userId = checkLogin(token)
        connectedUser[userId] = socket.id
        console.log(connectedUser)
    })

    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', (data) => {
        console.log('Message from %s: %s', socket.name, data.msg);

        const msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };

        socket.emit('s2c chat', msg);

    });
})