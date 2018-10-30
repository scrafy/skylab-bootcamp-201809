const fs = require('fs')
let filtered = []

fs.readdir(process.argv[2], (err, list) => {
    if (err) throw Error

    let ext = process.argv[3]
    filtered = list.filter((elem) =>
        elem.split('.')[1] === ext
    )
    filtered.map(elem => console.log(elem))
})
