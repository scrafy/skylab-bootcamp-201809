import React, { Component } from 'react';
import Header from './header/header'
import Home from './home/home'
import Landing from './landing/landing'


class App extends Component {
  render() {
    return (
        <section className="main-app">
             <Header></Header>
             {false && <Home></Home>}
             <Landing></Landing> 
        </section>
       
    );
  }
}

export default App;
