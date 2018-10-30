var http = require('http')
var fs = require('fs')
let [, , port, url] = process.argv


var server = http.createServer(function (req, res) {
    fs.createReadStream(url).pipe(res)

})
server.listen(port)