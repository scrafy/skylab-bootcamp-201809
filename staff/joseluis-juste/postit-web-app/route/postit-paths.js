let bodyParser = require('body-parser')
let Logic = require("../logic/logic")

function setPostitPaths(app, route) {

    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    route.use(function (req, res, next) {
        next();
    });

    route.post("/add", urlencodedParser, function (req, res) {

        if (!req.session.userId)
            res.redirect("/")
        else {
            Logic.addPosIt(req.body.content, Number.parseInt(req.session.userId)).then(postits => {
                req.session.message = "Postit added correctly"
                res.redirect("/landing")

            }).catch(err => {

                req.session.errorMessage = err
                res.redirect("/landing")
            })
        }
    })

    app.use('/postit', route)

}

module.exports = setPostitPaths