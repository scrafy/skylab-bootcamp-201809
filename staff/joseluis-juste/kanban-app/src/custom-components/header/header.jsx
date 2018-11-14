import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import ServiceBackEnd from '../../logic/Service'

class Header extends Component {

    state = { hideRegisterLink: false }


    constructor(props) {
        super(props)
        this.serviceBackend = new ServiceBackEnd()
    }

    handleRegisterLinkClick = () => {

        this.props.history.push('/register')
        this.setState({ hideRegisterLink: true })
    }

    handleHomeLinkClick = () => {

        this.props.history.push('/')
        this.setState({ hideRegisterLink: false })
    }

    handleLogoutLinkClick = () => {

        this.serviceBackend.logoutUser()
        this.props.history.push('/')
    }

    handleUpdateProfileClick = () => {
        
        this.props.history.push('/update')
    }

    handleLandingLinkClick = () =>{
        this.props.history.push('/landing')
    }

    render() {
        return (
            <header className="header">
                <nav className="main-nav">
                    <ul className="nav">
                        {this.props.location.pathname === "/landing" && <li className="nav-item"><a onClick={this.handleUpdateProfileClick} className="nav-link active">My profile</a></li>}
                        <li className="nav-item">
                            {this.props.location.pathname === "/" && <a onClick={this.handleRegisterLinkClick} className="nav-link active">Register</a>}
                            {this.props.location.pathname === "/register" && <a onClick={this.handleHomeLinkClick} className="nav-link active">Home</a>}
                            {this.props.location.pathname === "/landing" && <a onClick={this.handleLogoutLinkClick} className="nav-link active">Logout</a>}
                            {this.props.location.pathname === "/update" && <a onClick={this.handleLandingLinkClick} className="nav-link active">Landing</a>}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header)
