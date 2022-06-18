const { server, app } = require('./app')
const port = process.env.PORT;

server.listen(port || 3000, () => {
    console.log(`
        #########################################
                    ${port} server run
        #########################################
    `)
})