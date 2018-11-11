import React, { Component } from 'react';


class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav className="main-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Login</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
