import React, { Component } from 'react';
import Home from './home/home'
import Index from './index/index'
import Landing from './landing/landing'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from './register/register'
import Update from './update/update'
import SocketService from '../logic/SocketService'
import EventsManagement from '../logic/EventManagement'
import ServiceBackEnd from '../logic/Service'
import Chat from '../components/chat/chat'

class App extends Component {

  state = { isLogged: false }

  constructor(props) {

    super(props)
    this.service = new ServiceBackEnd()
    SocketService.connectToWsServer()
    SocketService.setOnChannelReadyCallback(this.$onsubscribed)
    SocketService.setConnectToWebSocketServerCallback(this.$onConnected)
    SocketService.setDisconnectFromWebSocketServerCallback(this.$onCloseConnectionError)

  }

  setIsLogged = (val) => {

    this.state.isLogged = val
    this.setState({})

  }

  componentDidMount() {

    this.state.isLogged = this.service.isLogged()
  }

  $onCloseConnectionError = () => {


  }

  $onConnected = () => {

    SocketService.subscribeChannel("honeycomb")
  }

  $onsubscribed = (name) => {

    if (name === "honeycomb") {

      try {
        
        const user = this.service.getUserSession()
        SocketService.emitMessage("honeycomb", "setUserId", user.id)

      } catch (err) {

      }
      SocketService.setMessageEventsInChannel("hivesInfo", "honeycomb", this.$onGetHivesInfo)

    }

  }

  $onGetHivesInfo(data) {
    
    const hiveUpdateInfoEventEmitter = EventsManagement.selectSubject("hiveUpdateInfo")
    hiveUpdateInfoEventEmitter.next(data)

  }

  render() {

    return (
      <section>
        <Route exact path="/" render={() => <Index></Index>} />
        <Route path="/home" render={() => <Home onHandleIsLogged={this.setIsLogged}></Home>} />
        <Route path="/landing" render={() => this.state.isLogged ? <Landing onHandleIsLogged={this.setIsLogged}></Landing> : <Redirect to="/home" />} />
        <Route path="/register" render={() => <Register onHandleIsLogged={this.setIsLogged}></Register>} />
        <Route path="/update" render={() => this.state.isLogged ? <Update onHandleIsLogged={this.setIsLogged}></Update> : <Redirect to="/home" />} />
        { this.props.location.pathname !== "/" && <Chat isLogged={this.state.isLogged}></Chat>}
      </section>

    );
  }
}

export default withRouter(App)
