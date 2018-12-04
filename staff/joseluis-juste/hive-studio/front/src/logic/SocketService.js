import Ws from '@adonisjs/websocket-client'
import ChannelNotReadyException from './exceptions/channelnotreadyexception'
import ChannelSubscriptionNotFoundException from './exceptions/channelsubcriptionnotfoundexception'
import NoConnectedWsException from './exceptions/nonconnectedwsexception'

class SocketService {

    constructor() {

        this.callbacks = {

            onConnectCallbacks: [],
            onDisconnectCallbacks: [],
            onChannelReadyCallbacks: [],
            onChannelErrorCallbacks: [],
            onChannelCloseCallbacks: [],
            onChannelMessageCallbacks: []

        }
        this.subscriptionsChannels = []
        this.isConnected = false
        this.ws = Ws(process.env.REACT_APP_API_WS_ENDPOINT)
        this.setEvents()
    }

    setConnectToWebSocketServerCallback(callback) {

        this.callbacks.onConnectCallbacks.push(callback)
    }

    setDisconnectFromWebSocketServerCallback(callback) {

        this.callbacks.onDisconnectCallbacks.push(callback)
    }

    setOnChannelReadyCallback(callback) {

        this.callbacks.onChannelReadyCallbacks.push(callback)
    }

    setOnChannelErrorCallback(callback) {

        this.callbacks.onChannelErrorCallbacks.push(callback)
    }

    setOnChannelCloseCallback(callback) {

        this.callbacks.onChannelCloseCallbacks.push(callback)
    }

    setOnChannelMessageCallback(callback) {

        this.callbacks.onChannelMessageCallbacks.push(callback)
    }

    connectToWsServer() {

        if (!this.isConnected)
            this.ws.connect()
    }

    disconnectToWsServer() {

        if (this.isConnected) {
            this.ws.close()
        }

    }

    setEvents() {

        this.ws.on('open', () => {
            this.isConnected = true
            console.log("connected to web socket server...")
            if (this.callbacks.onConnectCallbacks.length)
                this.callbacks.onConnectCallbacks.forEach(callback => callback())
        })

        this.ws.on('close', () => {
            //this.unsubscribeAllChannels()
            this.isConnected = false
            console.log("disconnected from web socket server...")
            if (this.callbacks.onDisconnectCallbacks.length)
                this.callbacks.onDisconnectCallbacks.forEach(callback => callback())
        })
    }

    unsubscribeAllChannels() {

        this.subscriptionsChannels.forEach(channel => {

            this.unsubscribeChannel(channel.name)
        })

    }

    setChannelEvents(channel, name) {

        channel.on('ready', () => {

            console.log(`Channel subscription: ${name} is ready...`)
            let channelFound = this.getChannelFromSubscriptions(name)
            channelFound.ready = true
            if (this.callbacks.onChannelReadyCallbacks.length)
                this.callbacks.onChannelReadyCallbacks.forEach(callback => callback(name))
        })

        channel.on('error', (error) => {
            if (this.callbacks.onChannelErrorCallbacks.length)
                this.callbacks.onChannelErrorCallbacks.forEach(callback => callback())

            console.log(`An error happened in the channel ${name}: ${error}`)
        })

        channel.on('close', () => {

            if (this.onChannelCloseCallbacks.length)
                this.callbacks.onChannelCloseCallbacks.forEach(callback => callback())
            console.log(`Subscription to the channel: ${name} ended`)
        })
    }

    setMessageEventsInChannel(event, channel_name, callback) {

        const channel = this.getChannelFromSubscriptions(channel_name)

        channel.channel.on(event, (data) => {

            callback(data)
        })
    }

    emitMessage(channelName, event, data) {
        
        let channel = this.getChannelFromSubscriptions(channelName)
        if (channel.ready)
            channel.channel.emit(event, data)
        else
            throw new ChannelNotReadyException(`The ${channelName} channel is not ready`)
    }

    getChannelFromSubscriptions(name) {

        if (this.subscriptionsChannels.length === 0)
            return undefined

        const index = this.subscriptionsChannels.findIndex(channel => {

            return channel.name === name
        })
        if (index !== -1) {
            return this.subscriptionsChannels[index]

            return undefined
        }
    }

    subscribeChannel(name) {

        if (this.isConnected) {
            if (this.subscriptionsChannels.length > 0) {
                const found = this.getChannelFromSubscriptions(name)
                if (found) {
                    const index = this.subscriptionsChannels.findIndex(channel => {
                        return channel.name === name
                    })
                    this.subscriptionsChannels.splice(index, 1)
                }

            }
            const channel = this.ws.subscribe(name)
            this.subscriptionsChannels.push({ name: name, channel: channel, ready: false })
            this.setChannelEvents(channel, name)

        } else
            throw new NoConnectedWsException("Its not possible to subscribe this channel, the connection is not available")
    }

    unsubscribeChannel(name) {

        const index = this.subscriptionsChannels.findIndex(channel => {

            return channel.name === name
        })
        if (index !== -1) {
            if (this.subscriptionsChannels[index].ready)

                this.subscriptionsChannels[index].channel.close()

            this.subscriptionsChannels.splice(index, 1)

        }
    }

}

SocketService = new SocketService()

export default SocketService