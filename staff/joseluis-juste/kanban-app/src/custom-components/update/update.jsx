import React, { Component } from 'react';
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'
import { withRouter } from 'react-router-dom'

class Update extends Component {

    state = { profile_img:"", name: "", surname: "", email: "", phone: "", username: "", password: "", newpassword: "", confirmpassword: "", validationErrors: {}, flashMessage: "", showFlashMessageError: false, showFlashMessageOk: false }

    constructor(props) {
        super(props)
        this.serviceBackend = new ServiceBackEnd()
        if (!this.serviceBackend.isLogged()) {
            this.props.history.push("/")
        }
    }

    handleUploadImageProfile = () => {

        let file_input = document.createElement('input');
        file_input.addEventListener("change", (ev) => {
           
            this.serviceBackend.uploadImageProfile(file_input.files[0]).then(res => {
                
                this.setState({profile_img: res.data})

            }).catch(err => alert(err.message))
        }, false);
        file_input.type = 'file';
        file_input.click();

    }

    handleUpdateSubmit = () => {

        let user = {}
        user.name = this.state.name
        user.surname = this.state.surname
        user.email = this.state.email
        user.phone = this.state.phone
        user.username = this.state.username
        user.password = this.state.password
        user.newpassword = this.state.newpassword
        user.confirmpassword = this.state.confirmpassword

        this.serviceBackend.updateUser(user).then(res => {
            this.setState({ showFlashMessageOk: true, flashMessage: "Account updated correctly..." }, () => {

                setTimeout(() => {
                    this.setState({ showFlashMessageOk: false, validationErrors: {}, showFlashMessage: false, name: "", surname: "", email: "", phone: "", username: "", password: "", newpassword: "", confirmpassword: "" })
                }, 3000)
            })
        }).catch(err => {

            if (err instanceof ValidationError) {
                let errors = {}
                err.validationErrors.forEach(error => {
                    errors[error.field] = error.message
                });
                this.setState({ flashMessage: err.message, showFlashMessageError: true, validationErrors: errors }, () => {

                    setTimeout(() => {
                        this.setState({ showFlashMessageError: false })
                    }, 3000)

                })
            } else {
                this.setState({ flashMessage: err.error, showFlashMessageError: true }, () => {

                    setTimeout(() => {
                        this.setState({ showFlashMessageError: false })
                    }, 3000)

                })
            }

        })
    }

    render() {
        return (
            <form onSubmit={(ev) => ev.preventDefault()} className="login-form login-form--update">
                {this.state.showFlashMessageOk && <div className="alert alert-success" role="alert">
                    {this.state.flashMessage}
                </div>}
                {this.state.showFlashMessageError && <div className="alert alert-danger" role="alert">
                    {this.state.flashMessage}
                </div>}
                <div className="form-group">
                    <div className="profile-img">
                        <img src={this.state.profile_img}></img>
                    </div>
                    <button onClick={this.handleUploadImageProfile} className="btn btn-primary">Upload</button>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input value={this.state.name} onChange={(ev) => { this.setState({ name: ev.target.value }) }} type="text" className="form-control" placeholder="Enter name" />
                    <small class="text-danger">{this.state.validationErrors["name"]}</small>
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input value={this.state.surname} onChange={(ev) => { this.setState({ surname: ev.target.value }) }} type="text" className="form-control" placeholder="Enter surname" />
                    <small class="text-danger">{this.state.validationErrors["surname"]}</small>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={this.state.email} onChange={(ev) => { this.setState({ email: ev.target.value }) }} type="email" className="form-control" placeholder="Enter mail" />
                    <small class="text-danger">{this.state.validationErrors["email"]}</small>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value={this.state.phone} onChange={(ev) => { this.setState({ phone: ev.target.value }) }} type="phone" className="form-control" placeholder="Enter phone" />
                    <small class="text-danger">{this.state.validationErrors["phone"]}</small>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input value={this.state.username} onChange={(ev) => { this.setState({ username: ev.target.value }) }} type="text" className="form-control" placeholder="Enter username" />
                    <small class="text-danger">{this.state.validationErrors["username"]}</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={this.state.password} onChange={(ev) => { this.setState({ password: ev.target.value }) }} type="password" className="form-control" placeholder="Enter password" />
                    <small class="text-danger">{this.state.validationErrors["password"]}</small>
                </div>
                <div className="form-group">
                    <label>Newpasword</label>
                    <input value={this.state.newpassword} onChange={(ev) => { this.setState({ newpassword: ev.target.value }) }} type="password" className="form-control" placeholder="Enter newpassword" />
                    <small class="text-danger">{this.state.validationErrors["newpassword"]}</small>
                </div>
                <div className="form-group">
                    <label>Confirmpassword</label>
                    <input value={this.state.confirmpassword} onChange={(ev) => { this.setState({ confirmpassword: ev.target.value }) }} type="password" className="form-control" placeholder="Enter confirmpassword" />
                    <small class="text-danger">{this.state.validationErrors["confirmpassword"]}</small>
                </div>
                <button onClick={this.handleUpdateSubmit} type="submit" className="btn btn-primary">Send</button>
            </form>
        );
    }
}

export default withRouter(Update)
