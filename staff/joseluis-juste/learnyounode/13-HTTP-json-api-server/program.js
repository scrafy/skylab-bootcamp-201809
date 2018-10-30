var http = require('http')
var url = require('url')

let [, , port] = process.argv


var server = http.createServer(function (req, res) {
    let query = url.parse(req.url, true).query
    let path = url.parse(req.url, true).path.split("?")[0]

    if (path === "/api/parsetime") {

        let date = new Date(query.iso)
        let resp = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify(resp))

    } else if (path === "/api/unixtime") {

        let date = new Date(query.iso)
        let resp = {
            unixtime: date.getTime()

        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.write(JSON.stringify(resp))
    }
    res.end()

})

server.listen(port)

