var fs = require('fs')

/*var buffer = fs.readFileSync(process.argv[2])

var str = buffer.toString().split('\n')

console.log(str.length - 1)*/


let rstream = fs.createReadStream(process.argv[2]);


setTimeout(() => {
    console.log(rstream)

}, 5000);



