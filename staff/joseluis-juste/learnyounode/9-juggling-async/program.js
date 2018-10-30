let http = require('http')
let bl = require('bl')


http.get(process.argv[2], (res) => {
    res.pipe(bl((err, data) => {
        if (err) throw Error
        console.log(data.toString())

    }))
    res.on('end', () => {
        http.get(process.argv[3], (res) => {
            res.pipe(bl((err, data) => {
                if (err) throw Error
                console.log(data.toString())

            }))
            res.on('end', () => {
                http.get(process.argv[4], (res) => {
                    res.pipe(bl((err, data) => {
                        if (err) throw Error
                        console.log(data.toString())

                    }))
                })
            })
        })
    })
})