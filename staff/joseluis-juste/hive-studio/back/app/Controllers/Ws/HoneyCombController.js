'use strict'

class HoneyCombController {

  constructor({ socket }) {
   
    this.clients = []
    this.adminSocket(socket)
    const hiveUpdateInfoEventEmitter = use("EventManagement").selectSubject("hiveUpdateInfo")
    this.getHivesInfo = this.getHivesInfo.bind(this)
    this.subscription = hiveUpdateInfoEventEmitter.subscribe({next: this.getHivesInfo, complete: () => console.log("done"), error: err => {console.log(err)}})
    
  }

  getHivesInfo(data){
      
     this.clients.forEach(socket => {
        socket.emit("hivesInfo", JSON.stringify({hives:JSON.parse(data), userid:socket.userId}))
      })
  }

  adminSocket(socket) {

    this.clients.push(socket)
    
    socket.on("setUserId", (userId) => {
      socket.userId = userId
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
