const { server, io } = require('./app')
const port = process.env.PORT;

server.listen(port || 3000, () => {
    console.log(`
        #########################################
                    ${port} server run
        #########################################
    `)
})

/**
 * todo
 * 1. count로 2인이상 접근못하게(상담사, 고객)
 * 2. 고객마다 room으로 분리?
 */

const chat = io.of('/chat').on('connection', socket => {
    socket.on('chat', (data) => {
        const count = io.of('/').sockets.size;
        console.log(data);
        socket.emit('chat', data.msg);
    });
    socket.on('error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
    socket.on('disconnect', () => {
    });
})


// const connectedUser = {}
// io.on('connection', (socket) => {
//     socket.on('error', (err) => {
//         console.log(`connect_error due to ${err.message}`);
//     });
//     socket.on('disconnect', () => {
//     });
//
//     // const msg = {
//     //     from: {
//     //         name: socket.name,
//     //         userid: socket.userid
//     //     },
//     //     msg: data.msg
//     // };
// })