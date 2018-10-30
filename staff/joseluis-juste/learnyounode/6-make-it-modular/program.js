let myReadDir = require('./my-module')

myReadDir(process.argv[2], process.argv[3], (err, data) => {
    if (err)
        console.log(err)
    else
        data.map(elem => console.log(elem))
})