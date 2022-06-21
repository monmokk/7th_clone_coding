const {server, io} = require('./app')
const port = process.env.PORT;

server.listen(port || 3000, () => {
    console.log(`
        #########################################
                    ${port} server run
        #########################################
    `)
})


io.on('connection', socket => {
    console.log('/chat user', socket.id)
    socket.on('join_room', (data)=>{
        socket.join(data);
        console.log(`User ${socket.id} joined room: ${data}`)
    });
    socket.on('login', (data) => {
        socket.nickname = data.nickname;
        console.log(socket.nickname)
    })
    socket.on('chat', (data) => {
        socket.to(data.room).emit('chat', data);
    });
    socket.on('error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    socket.on('disconnect', () => {
    });
})
