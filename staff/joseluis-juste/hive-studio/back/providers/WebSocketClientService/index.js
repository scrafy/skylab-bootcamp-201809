const WebSocket = require('ws');
const ws = require('ws');
const Event = use('Event')

class Connection {

    constructor(uri) {
        this._url = uri
        this._reconnectInterval = 2500
        this.isConnectionOpen = false
        this.channel = null
    }

    _open() {
        this._client = new WebSocket(this._url)
        this._client.on('open', this._onOpen.bind(this))
        this._client.on('message', this._onMessage.bind(this))
        this._client.on('close', this._onClose.bind(this))
        this._client.on('error', this._onError.bind(this))
    }

    _onOpen() {

        this.isConnectionOpen = true
        console.log('Connected to WebSocket Server')
       
         const data = { t: 1, d: { topic: "honeycomb" } }
        this._client.send(JSON.stringify(data))
    }

    _onMessage(data) {
      
    }

    _onClose(e) {
        this.isConnectionOpen = false
        console.log('Disconnected to WebSocket Server')
        switch (e.code) {
            case 1000:	// CLOSE_NORMAL
                console.log("WebSocket: closed")
                break
            default:	// Abnormal closure
                this._reconnect(e)
                break
        }
        //this._onclose(e)
    }

    _onError(e) {
        this.isConnectionOpen = false
        switch (e.code) {
            case 'ECONNREFUSED':
                this._reconnect(e)
                break
          
        }
    }

    _reconnect(e) {
        this._client.removeAllListeners()
        setTimeout(this._open.bind(this), this._reconnectInterval)
    }
}

module.exports = Connection