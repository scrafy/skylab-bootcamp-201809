'use strict'

class ChatController {

  constructor({ socket }) {

    this.clients = []
    this.adminSocket(socket)

  }

  adminSocket(socket) {

    this.clients.push(socket)

    socket.on("setUserId", (userId) => {

      socket.userId = userId
      socket.broadcastToAll("connectedUsers", { socketId:socket.id, userId:userId })


    })

    socket.on("setUsername", (username) => {

      socket.userName = username


    })

    socket.on("sendMessages", () => {

      socket.broadcast("getMessages")
    })

    socket.on("getConnectedUsers", () => {

      let users = []
      this.clients.map(_socket => { users.push(_socket.userName) })
      socket.broadcastToAll("connectedUsers", users)

    })

    socket.on("close", () => {

      //this.subscription.unsubscribe()
      const index = this.clients.findIndex(_socket => {
        return _socket.id === socket.id
      })

      this.clients.splice(index, 1)
    })

  }

}

module.exports = ChatController
