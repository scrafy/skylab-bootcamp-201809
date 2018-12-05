import React, { Component } from 'react';
import ServiceBackEnd from '../../logic/Service'
import EventsManagement from '../../logic/EventManagement'
import ModalInf from '../../components/modalInf/modalinf'
import SocketService from '../../logic/SocketService'


class Chat extends Component {

    state = { showModal: false, modalMessage: "", modalTitle: "", messages: [], message: "", users: [], showchat: "" }

    constructor(props) {

        super(props)
        SocketService.setOnChannelReadyCallback(this.$onsubscribed)
        SocketService.setConnectToWebSocketServerCallback(this.$onConnected)
        SocketService.setDisconnectFromWebSocketServerCallback(this.$onDisconnected)
        if (SocketService.isConnected)
            SocketService.subscribeChannel("chat")
        this.service = new ServiceBackEnd()
        this.interval = null

    }

    setOffshowModalValue = () => {
        this.state.showModal = false
    }

    $onConnected = () => {
        SocketService.subscribeChannel("chat")
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    componentWillReceiveProps(props) {

        if (!props.isLogged) {
            this.setState({ messages: [] })
        }
    }

    $onDisconnected = () => {

        if (!this.interval)
            this.interval = setInterval(() => {
                this.$onGetMessages()
            }, 1000)

    }

    $onsubscribed = (name) => {

        if (name === "chat") {

            SocketService.setMessageEventsInChannel("getMessages", "chat", this.$onGetMessages)
            SocketService.setMessageEventsInChannel("connectedUsers", "chat", this.$onGetConnectedUsers)
            try {

                const user = this.service.getUserSession()
                SocketService.emitMessage("chat", "setUserId", user.id)
                SocketService.emitMessage("chat", "setUsername", user.username)
                // SocketService.emitMessage("chat", "getConnectedUsers")

            } catch (err) {

            }
        }
    }

    $onGetConnectedUsers = (_user) => {
        
        try {
            const user = this.service.getUserSession()
            if (user) {
                
                if (user.id === _user.userId){
                    if (!this.state.users.find(us => us.id === user.id))
                        this.state.users.push({ userId:user.id, name:user.name })
                }else{
                    this.service.getName(_user.userId).then(res => {
                        
                        if (!this.state.users.find(us => us.id === _user.userId))
                            this.state.users.push({ userId:_user.userId, name:res.data })
                    })
                }
                this.setState({})
            }
        } catch (err) {

        }

    }

    $onGetMessages = () => {

        this.service.getLastMessage(1).then(res => {
            if (res.data) {

                if (this.state.messages.length > 0) {
                    const last = this.state.messages[this.state.messages.length - 1].id
                    if (last !== res.data.id) {
                        this.state.messages.push({ id: res.data.id, message: res.data.message })
                        this.setState({})
                    }
                } else {
                    this.state.messages.push({ id: res.data.id, message: res.data.message })
                    this.setState({})
                }

            }

        }).catch(err => { })

    }

    handleSendMessage = (ev) => {

        try {

            const user = this.service.getUserSession().username
            this.service.sendChatMessage(1, user + ":" + this.state.message).then(res => {

                if (SocketService.isConnected)
                    SocketService.emitMessage("chat", "sendMessages", this.state.message)
                this.state.messages.push({ id: res.data, message: user + ":" + this.state.message })
                this.state.message = ""
                this.setState({})
            })
        } catch (err) {
            this.state.modalTitle = "Error"
            this.state.modalMessage = "You are not logged"
            this.state.showModal = true
            this.state.message = ""
            this.setState({})
        }
    }

    onChangeInput = (ev) => {

        this.state.message = ev.target.value
        this.setState({})
    }

    handleShowChat = () => {

        this.state.showchat = this.state.showchat ? "" : "show-chat"
        this.setState({})
    }

    render() {
        return (
            <section className={`chat-section ${this.state.showchat}`}>
                <div onClick={this.handleShowChat} className="chat-section__show">Chat</div>
                <ModalInf onHideModal={this.setOffshowModalValue} modalTitle={this.state.modalTitle} modalMessage={this.state.modalMessage} showModal={this.state.showModal}></ModalInf>
                <section className="chat-section__main">
                    <main>
                        {this.state.messages.map(message => { return <p><span>{`${message.message.split(":")[0]}:  `}</span>{message.message.split(":")[1]}</p> })}
                    </main>
                </section>
                <section className="chat-section__footer">
                    <form onSubmit={(ev) => {ev.preventDefault()}}>
                        <div>
                            <div><button onClick={(ev) => this.handleSendMessage(ev)}>Send...</button></div>
                            <div><input value={this.state.message} onChange={(ev) => this.onChangeInput(ev)} type="text"></input></div>
                        </div>

                    </form>
                </section>
            </section>
        );
    }
}

export default Chat
