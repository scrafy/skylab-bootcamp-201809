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

class App extends Component {

  constructor(props) {

    super(props)
    this.service = new ServiceBackEnd()  
    SocketService.connectToWsServer()
    SocketService.setOnChannelReadyCallback(this.$onsubscribed)
    SocketService.setConnectToWebSocketServerCallback(this.$onConnected)
    SocketService.setDisconnectFromWebSocketServerCallback(this.$onCloseConnectionError)
 
  }

  $onCloseConnectionError = () =>{
   

  }

  $onConnected = () => {
    
    SocketService.subscribeChannel("honeycomb")
  }

  $onsubscribed = () => {

    try{
      const user = this.service.getUserSession()
      SocketService.emitMessage("honeycomb","setUserId", user.id)
    }catch(err){

    }
    SocketService.setMessageEventsInChannel("hivesInfo", "honeycomb", this.$onGetHivesInfo)
   
  }

  $onGetHivesInfo(data){
    
    const hiveUpdateInfoEventEmitter = EventsManagement.selectSubject("hiveUpdateInfo")
    hiveUpdateInfoEventEmitter.next(data)

  }

  render() {
    return (
      <section>
        <Route exact path="/" render={() => <Index></Index>} />
        <Route path="/home" render={() => <Home></Home>} />
        <Route path="/landing" render={() => <Landing></Landing>} />
        <Route path="/register" render={() => <Register></Register>} />
        <Route path="/update" render={() => <Update></Update>} />
      </section>

    );
  }
}

export default withRouter(App)
