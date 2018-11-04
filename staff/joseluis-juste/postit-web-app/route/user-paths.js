let bodyParser = require('body-parser')
let Logic = require("../logic/logic")
const pug = require('pug');

function setUserPaths(app, route){

    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    route.use(function(req, res, next) {
        next();
    });
   
    route.post("/register",urlencodedParser,function(req, res){

        Logic.register(req.body).then(data => {

            //redirect to home

        }).catch(err => {
            req.session.errorMessage = err
            //redirect to register
        })
    })

    route.post("/login",urlencodedParser,function(req, res){

        Logic.login(req.body.username, req.body.password).then(userId => {

            req.session.userId = userId
            //redirect to landing

        }).catch(err => {

            req.session.errorMessage = err
            //redirect to login
        })
    })

    route.post("/logout",urlencodedParser,function(req, res){

        delete req.session.userId
        //redirect to home
    })

    app.use('/user', route)
}

module.exports = setUserPaths