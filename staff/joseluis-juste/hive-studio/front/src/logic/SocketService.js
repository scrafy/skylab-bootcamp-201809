import Ws from '@adonisjs/websocket-client'
import ChannelNotReadyException from './exceptions/channelnotreadyexception'
import ChannelSubscriptionNotFoundException from './exceptions/channelsubcriptionnotfoundexception'
import NoConnectedWsException from './exceptions/nonconnectedwsexception'

class SocketService {

    constructor() {

        this.callbacks = {}
        this.onConnectCallback = null
        this.onDisconnectCallback = null
        this.subscriptionsChannels = []
        this.isConnected = false
        this.ws = Ws(process.env.REACT_APP_API_WS_ENDPOINT)
        this.setEvents()
    }

    setConnectToWebSocketServerCallback(callback) {

        this.callbacks.onConnectCallback = callback
    }

    setDisconnectFromWebSocketServerCallback(callback) {

        this.callbacks.onDisconnectCallback = callback
    }

    setOnChannelReadyCallback(callback) {

        this.callbacks.onChannelReadyCallback = callback
    }

    setOnChannelErrorCallback(callback) {

        this.callbacks.onChannelErrorCallback = callback
    }

    setOnChannelCloseCallback(callback) {

        this.callbacks.onChannelCloseCallback = callback
    }

    setOnChannelMessageCallback(callback) {

        this.callbacks.onChannelMessageCallback = callback
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
            if (this.callbacks.onConnectCallback)
                this.callbacks.onConnectCallback()
        })

        this.ws.on('close', () => {
            //this.unsubscribeAllChannels()
            this.isConnected = false
            console.log("disconnected from web socket server...")
            if (this.callbacks.onDisconnectCallback)
                this.callbacks.onDisconnectCallback()
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
            if (this.callbacks.onChannelReadyCallback)
                this.callbacks.onChannelReadyCallback()
        })

        channel.on('error', (error) => {
            if (this.callbacks.onChannelErrorCallback)
                this.callbacks.onChannelErrorCallback()

            console.log(`An error happened in the channel ${name}: ${error}`)
        })

        channel.on('close', () => {

            if (this.onChannelCloseCallback)
                this.callbacks.onChannelCloseCallback()
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
            throw new ChannelSubscriptionNotFoundException(`The with the name ${name} does not exists`)

        const index = this.subscriptionsChannels.findIndex(channel => {

            return channel.name === name
        })
        if (index !== -1) {
            return this.subscriptionsChannels[index]
        } else {
            throw new ChannelSubscriptionNotFoundException(`The with the name ${name} does not exists`)
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
                    this.subscriptionsChannels.splice(index,1)
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