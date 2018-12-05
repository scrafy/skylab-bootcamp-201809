'use strict'

class HoneyCombController {

  constructor({ socket }) {

    this.clients = []
    this.adminSocket(socket)
   
    
  }

  
  adminSocket(socket) {

    
    socket.on("setUserId", (userId) => {
      socket.userId = userId
      
    })

    socket.on("getHivesInfo", () => {
      
      socket.broadcast("hivesInfo")
     /* this.clients.forEach(_socket => {

        const filtered = data.filter(hiveInf => {

          return hiveInf.userId === _socket.userId

        })
        if (filtered.length)
          _socket.emit("hivesInfo", JSON.stringify({ hives: filtered, userid: socket.userId }))
      })*/

    })

    
    socket.on("close", () => {

      this.subscription.unsubscribe()
      const index = this.clients.findIndex(_socket => {
        return _socket.id === socket.id
      })

      this.clients.splice(index, 1)
    })

  }

}

module.exports = HoneyCombController
