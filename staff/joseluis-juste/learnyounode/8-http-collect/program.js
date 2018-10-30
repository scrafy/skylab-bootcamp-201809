let http = require('http')
let bl = require('bl')

http.get(process.argv[2], (res) => {
    res.pipe(bl((err, data) => {
        if (err) throw Error

        console.log(data.length)
        console.log(data.toString())
    }))
})
