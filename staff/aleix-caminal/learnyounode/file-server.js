const http = require('http')
const fs = require('fs')

const { argv: [, , port, file] } = process

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' })

    const rs = fs.createReadStream(file)

    rs.pipe(res)
})

server.listen(port)
