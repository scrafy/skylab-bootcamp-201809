var http = require('http')
var map = require('through2-map')

let [, , port] = process.argv

var server = http.createServer(function (req, res) {
    req.pipe(map(chunk => {

        return chunk.toString().toUpperCase()

    })).pipe(res)

})
server.listen(port)