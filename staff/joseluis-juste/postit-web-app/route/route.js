let setUserPaths = require("./user-paths")

function configRoutes(app, route){

    setUserPaths(app, route)
    
}

module.exports = configRoutes