const fs = require('fs')

const [, , orig, dest] = process.argv


fs.readdir(orig,(err,files)=>{
    if (err) throw err

    files.forEach(file => {
        
        console.log(file.toString())

    })
})

// const isdir = fs.lstatSync(orig)

// console.log (isdir)

// const rs = fs.createReadStream(orig)

// const ws = fs.createWriteStream(dest)

// rs.pipe(ws)

// rs.on('end', () => printMem())

// function printMem() {
//     console.log(process.memoryUsage().rss / 1024 / 1024)
// }