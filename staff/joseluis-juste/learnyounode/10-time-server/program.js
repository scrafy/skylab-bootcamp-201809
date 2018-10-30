const net = require('net')

const server = net.createServer((socket) => {
    let date = new Date()
    socket.end(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}\n`)
})

server.listen(process.argv[2])
