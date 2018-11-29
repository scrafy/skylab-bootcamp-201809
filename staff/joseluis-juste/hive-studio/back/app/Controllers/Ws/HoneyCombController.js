'use strict'

class HoneyCombController {

  constructor({ socket }) {

    this.clients = []
    this.adminSocket(socket)
    const hiveUpdateInfoEventEmitter = use("EventManagement").selectSubject("hiveUpdateInfo")
    this.getHivesInfo = this.getHivesInfo.bind(this)
    this.subscription = hiveUpdateInfoEventEmitter.subscribe({ next: this.getHivesInfo, complete: () => console.log("done"), error: err => { console.log(err) } })

  }

  getHivesInfo(data) {

    data = JSON.parse(data)


    this.clients.forEach(socket => {

      const filtered = data.filter(hiveInf => {

        return hiveInf.userId === socket.userId

      })
      if (filtered.length)
        socket.emit("hivesInfo", JSON.stringify({ hives: filtered, userid: socket.userId }))
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
