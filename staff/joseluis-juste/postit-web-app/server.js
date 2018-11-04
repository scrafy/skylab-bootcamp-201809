let express = require('express')
let configRoutes = require("./route/route")
var session = require('express-session')


let app = express()

app.use(session({
    secret: 'kJHSJKTODSUJ57664JGLHJGJHU7464664JDK',
    cookie: {}
}))


configRoutes(app, express.Router())


app.listen(process.argv[2] || 8080)