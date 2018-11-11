import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'


class Header extends Component {

    state = {hideRegisterLink:this.props.hideRegisterLink}

    componentWillReceiveProps(props){

        this.setState({hideRegisterLink:props.hideRegisterLink})
    } 

    render() {
        return (
            <header className="header">
                <nav className="main-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            {!this.state.hideRegisterLink && <a onClick={this.props.onRegisterLinkClick} className="nav-link active">Register</a>}
                            {this.state.hideRegisterLink && <a onClick={this.props.onHomeLinkClick} className="nav-link active">Home</a>}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
