var fs = require('fs')

const { argv: [, , originPath, destinyPath] } = process

// First we read the file
if (originPath === '-R') {
    const { argv: [, , , originPath, destinyPath] } = process

    const readStream = fs.createReadStream(originPath)
    const writeStream = fs.createWriteStream(destinyPath)

    readStream.pipe(writeStream)

} else {
    const readStream = fs.createReadStream(originPath)
    const writeStream = fs.createWriteStream(destinyPath)

    readStream.pipe(writeStream)

}


fs.lstat(originPath, (err, stats) => {

    if(err)
        return console.log(err); //Handle error

    if(stats.isFile())

});