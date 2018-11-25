import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'
import { Route, withRouter, Redirect } from 'react-router-dom'
import SocketService from '../../logic/SocketService'

class LoginModal extends React.Component {

    state = {
        modal: false,
        form_data: {
            username: "",
            password: ""
        },
        message:"",
        validationErrors: {}
    }

    constructor(props) {
        super(props);
        this.service = new ServiceBackEnd()
    }

    componentWillReceiveProps(props) {
        this.setState({ modal: props.showModal })
    }


    toggle = () => {

        this.setState({message:"", validationErrors: {}, form_data: { username: "", password: "" } })
        this.props.onShowHideModal()
    }


    handleOnChangeUsername = (ev) => {

        this.state.form_data.username = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangePassword = (ev) => {

        this.state.form_data.password = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleSubmit = () => {

        this.service.loginUser(this.state.form_data.username, this.state.form_data.password)
            .then(res => {
                this.props.onShowHideModal()
                this.props.history.push("/landing")
                const user = this.service.getUserSession()
                SocketService.emitMessage("honeycomb","setUserId", user.id)
            })
            .catch(err => {
                if (err instanceof ValidationError) {
                    let errors = {}
                    err.validationErrors.forEach(error => {
                        errors[error.field] = error.message
                    });
                    this.setState({ validationErrors: errors, message:"Exists validation errors" })
                } else {

                    this.setState({ message:err.message })
                }
            })
    }

    render() {

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-hive">
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <h2 style={{color:"red"}}>{this.state.message}</h2>
                        <section className="login-form">
                            <form className="form" onSubmit={(ev) => ev.preventDefault()}>
                                <div className="form-group-field">
                                    <label>Username</label>
                                    <input value={this.state.form_data.username} onChange={(ev) => { this.handleOnChangeUsername(ev) }} type="text" name="username" placeholder="Username..."></input>
                                    <small class="text-danger">{this.state.validationErrors["username"]}</small>
                                </div>
                                <div className="form-group-field">
                                    <label>Password</label>
                                    <input type="password" value={this.state.form_data.password} onChange={(ev) => { this.handleOnChangePassword(ev) }} name="password" placeholder="Password..."></input>
                                    <small class="text-danger">{this.state.validationErrors["password"]}</small>
                                </div>
                                <div className="form-group-field">
                                    <button onClick={this.handleSubmit}>Login</button>
                                </div>
                            </form>
                        </section>

                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.toggle}>Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default withRouter(LoginModal)