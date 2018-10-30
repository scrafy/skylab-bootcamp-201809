var fs = require('fs')

function myReadDir(path, ext, callback) {
    let filtered = []
    fs.readdir(path, (err, list) => {
        // if (err) {
        //     callback(err)
        //     return
        // }

        // ó

        // if (err) return callback(err)

        if (err)
            callback(err, null)
        else {
            filtered = list.filter((elem) =>
                elem.split('.')[1] === ext
            )
            callback(null, filtered)
        }

    })

}

module.exports = myReadDir