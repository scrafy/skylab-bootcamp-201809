const net = require('net')
const fs = require('fs')

let clients = []

const server = net.createServer((socket) => {
   
})

server.on("connection", socket => {

    clients.push(socket)
    adminSocket(socket)
    
})


server.listen(8080)

function adminSocket(socket){
    
    socket.setEncoding("utf8")
    let nickname = ""
    socket.write("¡¡¡WELCOME TO CHAT APP!!!\n")
    socket.write("Elije un nickname escribiendo --> name:nickname\n")
    socket.on("data", data => {

        if (data.match(/name:{1}/g))
        {
            nickname = data.split(":")[1]
            socket.write("Nickname setted to " + nickname)
        }
        else{
            clients.forEach(s => {
                
                const message = `${nickname}${data}`
                if (s !== socket) s.write(message)
            
            })
        }
        
        

    })


}
