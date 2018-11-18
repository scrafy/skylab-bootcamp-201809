import React, { Component } from 'react';
import Home from './home/home'
import Index from './index/index'
import Landing from './landing/landing'
import { Route, withRouter, Redirect } from 'react-router-dom'

class App extends Component {

  

  render() {
    return (
      <section>
        <Route exact path="/" render={() => <Index></Index>} />
        <Route path="/home" render={() => <Home></Home>} />
        <Route path="/landing" render={() => <Landing></Landing>} />
      </section>

    );
  }
}

export default withRouter(App)
