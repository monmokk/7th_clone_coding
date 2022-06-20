const {server, io} = require('./app')
const port = process.env.PORT;

server.listen(port || 3000, () => {
    console.log(`
        #########################################
                    ${port} server run
        #########################################
    `)
})

const chat = io.of('/chat');

chat.on('connection', socket => {
    console.log('/chat user', socket.id)
    socket.on('login', (data) => {
        socket.nickname = data.nickname;
        console.log(socket.nickname)
    })
    socket.on('chat', (data) => {
        const today = new Date();
        const currentMD = today.getMonth()+1 + '/' + today.getDate()
        const currentHMS = today.getHours() + ':' + today.getMinutes()
        const msg = {
            from: {
                nickname: socket.nickname,
                dateTime: currentMD + ' ' + currentHMS
            },
            msg: data.msg
        };
        console.log(msg)
        socket.emit('chat', msg);
    });
    socket.on('error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    socket.on('disconnect', () => {
    });
})
