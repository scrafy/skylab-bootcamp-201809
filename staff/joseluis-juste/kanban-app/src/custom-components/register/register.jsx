import React, { Component } from 'react';


class Register extends Component {
    
    render() {
        return (
            <form className="login-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control"  placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" className="form-control"  placeholder="Enter surname" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"  placeholder="Enter mail" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="email" className="form-control"  placeholder="Enter phone" />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"  placeholder="Enter username" />
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

export default Register;
