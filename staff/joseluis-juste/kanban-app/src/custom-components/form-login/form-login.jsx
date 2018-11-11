import React, { Component } from 'react';


class FormLogin extends Component {
    render() {
        return (
            <form className="login-form">
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        );
    }
}

export default FormLogin;
