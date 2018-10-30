const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        const str = data.split('\n')
        console.log(str.length - 1)
    }
})
