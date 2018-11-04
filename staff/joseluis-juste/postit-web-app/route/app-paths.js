let Logic = require("../logic/logic")

function setAppPaths(app, route) {

    route.use(function (req, res, next) {

        next();

    });

    route.get("/", function (req, res) {

        if (req.session.userId)
            res.redirect("/landing")
        else
            res.render('home')
    })

    route.get("/landing", function (req, res) {

        if (!req.session.userId)

            res.redirect("/")
        else {
            Logic.getUserPostIts(Number.parseInt(req.session.userId)).then(postits => {

                res.render('landing', { postits: postits, errorMessage:req.session.errorMessage, message:req.session.message},(err, html) =>{
                    delete req.session.errorMessage
                    delete req.session.message
                    res.send(html)
                })

            }).catch(err => {
                req.session.errorMessage = err
                res.redirect("/landing")
            })

        }


    })

    app.use('/', route)

}

module.exports = setAppPaths