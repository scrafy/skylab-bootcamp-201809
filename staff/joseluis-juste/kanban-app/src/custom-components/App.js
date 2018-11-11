import React, { Component } from 'react';
import Header from './header/header'
import Home from './home/home'
import Landing from './landing/landing'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Register from '../custom-components/register/register'


class App extends Component {

  state = {hideRegisterLink:false}

  handleRegisterLinkClick = () =>{

     this.setState({hideRegisterLink:true}, () =>{
       this.props.history.push('/register')
     })
     
  }

  handleHomeLinkClick = () =>{
     
    this.setState({hideRegisterLink:false}, () =>{
      this.props.history.push('/')
    })
  }

  render() {
    return (
        <section className="main-app">
             <Header hideRegisterLink = {this.state.hideRegisterLink} onHomeLinkClick={this.handleHomeLinkClick} onRegisterLinkClick = {this.handleRegisterLinkClick}></Header>
             <Route exact path="/" render={() => <Home></Home>} />
             <Route path="/landing" render={() => <Landing></Landing>} />
             <Route exact path="/register" render={() => <Register></Register>} />
        </section>       
    );
  }
}

export default withRouter(App)
