import React, { Component } from 'react';

class Header extends Component {

    state = {showNavMobile:""}

    showNavMobile = () =>{

        this.state.showNavMobile = !this.state.showNavMobile ? "show-nav-mobile" : ""
        this.setState({showNavMobile:this.state.showNavMobile})
    }

    render() {
        return (
            <header className="header">
                <nav className={`nav-mobile ${this.state.showNavMobile}`}>
                    <ul className="nav-mobile__menu">
                        <li onClick={this.showNavMobile} className="nav-mobile__menu__item icon-bars" />
                        <li onClick={() => {this.showNavMobile(); this.props.onClickDefinition()}} className="nav-mobile__menu__item"><a>Que es la apicultura</a></li>
                        <li onClick={() => {this.showNavMobile(); this.props.onClickHistory()}} className="nav-mobile__menu__item"><a>Historia de la apicultura</a></li>
                        <li onClick={() => {this.showNavMobile(); this.props.onClickDerivates()}} className="nav-mobile__menu__item"><a>Productos derivados</a></li>
                        <li onClick={() => {this.showNavMobile();  this.props.onClickTools()}} className="nav-mobile__menu__item"><a>Herramientas</a></li>
                    </ul>
                </nav>
                <div className="header-container">
                    <div className="header-container__logo">
                        <img src="img/favicon.jpg" />
                    </div>
                    <div className="header-container__menu icon-bars" onClick={this.showNavMobile} />
                    <section className="header-container__actions">
                        <ul className="header-container__actions">
                            <li className="header-container__actions__item"><a>Register</a></li>
                            <li className="header-container__actions__item"><a>Login</a></li>
                        </ul>
                    </section>
                </div>
                <nav className="nav">
                    <ul className="nav__menu">
                        <li onClick={this.props.onClickDefinition} className="nav__menu__item"><a>Qué es la apicultura</a></li>
                        <li onClick={this.props.onClickHistory} className="nav__menu__item"><a>Historia de la apicultura</a></li>
                        <li onClick={this.props.onClickDerivates} className="nav__menu__item"><a>Productos derivados</a></li>
                        <li onClick={this.props.onClickTools} className="nav__menu__item"><a>Herramientas</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;


