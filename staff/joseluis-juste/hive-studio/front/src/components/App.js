import React, { Component } from 'react';
import Home from './home/home'
import Index from './index/index'
import Landing from './landing/landing'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from './register/register'
import Update from './update/update'

class App extends Component {

  

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
