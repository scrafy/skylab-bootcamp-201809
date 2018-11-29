import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import LoginModal from '../login-modal/login-modal'
import ServiceBackEnd from '../../logic/Service'

class Header extends Component {

    state = { isLogged: false, showNavMobile: "", showLoginModal: false }

    constructor(props) {
        super(props)
        this.service = new ServiceBackEnd()
    }

    showNavMobile = () => {

        this.state.showNavMobile = !this.state.showNavMobile ? "show-nav-mobile" : ""
        this.setState({ showNavMobile: this.state.showNavMobile })
    }

    handleShowFormLogin = () => {

        this.setState({ showLoginModal: !this.state.showLoginModal })
    }

    componentDidMount() {

        if (this.service.isLogged())

            this.setState({ isLogged: true })
        else
            this.setState({ isLogged: false })

    }

    handleLogoutClick = () => {

        this.service.logoutUser()
        this.props.onHandleIsLogged(false)
        this.setState({ isLogged: false })
    }

    render() {
        return (
            <header className="header">
                <LoginModal onHandleIsLogged={this.props.onHandleIsLogged} showModal={this.state.showLoginModal} onShowHideModal={this.handleShowFormLogin}></LoginModal>
                {this.props.showMenu && <nav className={`nav-mobile ${this.state.showNavMobile}`}>
                    <ul className="nav-mobile__menu">
                        <li onClick={this.showNavMobile} className="nav-mobile__menu__item icon-bars" />
                        <li onClick={() => { this.showNavMobile(); this.props.onClickDefinition() }} className="nav-mobile__menu__item"><a>Que es la apicultura</a></li>
                        <li onClick={() => { this.showNavMobile(); this.props.onClickHistory() }} className="nav-mobile__menu__item"><a>Historia de la apicultura</a></li>
                        <li onClick={() => { this.showNavMobile(); this.props.onClickDerivates() }} className="nav-mobile__menu__item"><a>Productos derivados</a></li>
                        <li onClick={() => { this.showNavMobile(); this.props.onClickTools() }} className="nav-mobile__menu__item"><a>Herramientas</a></li>
                    </ul>
                </nav>}
                <div className="header-container">
                    <div onClick={() => this.props.history.push("/home")} className="header-container__logo">
                        <img src={require('../../assets/img/favicon.jpg')} />
                    </div>
                    <div className="header-container__menu icon-bars" onClick={this.showNavMobile} />
                    <section className="header-container__actions">
                        {!this.state.isLogged && <ul className="header-container__actions">
                            <li onClick={() => this.props.history.push("/register")} className="header-container__actions__item"><a>Register</a></li>
                            <li onClick={this.handleShowFormLogin} className="header-container__actions__item"><a>Login</a></li>
                        </ul>}
                        {this.state.isLogged && <ul className="header-container__actions">
                            <li onClick={() => this.props.history.push("/landing")} className="header-container__actions__item"><a className="icon-cog"></a></li>
                            <li onClick={() => this.props.history.push("/update")} className="header-container__actions__item"><a className="icon-user"></a></li>
                            <li onClick={this.handleLogoutClick} className="header-container__actions__item"><a className="icon-logout"></a></li>
                        </ul>}
                    </section>
                </div>
                {this.props.showMenu && <nav className="nav">
                    <ul className="nav__menu">
                        <li onClick={this.props.onClickDefinition} className="nav__menu__item"><a>Qué es la apicultura</a></li>
                        <li onClick={this.props.onClickHistory} className="nav__menu__item"><a>Historia de la apicultura</a></li>
                        <li onClick={this.props.onClickDerivates} className="nav__menu__item"><a>Productos derivados</a></li>
                        <li onClick={this.props.onClickTools} className="nav__menu__item"><a>Herramientas</a></li>
                    </ul>
                </nav>}
            </header>
        );
    }
}

export default withRouter(Header)


