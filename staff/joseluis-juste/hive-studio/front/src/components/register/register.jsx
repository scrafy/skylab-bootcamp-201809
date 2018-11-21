import React, { Component } from 'react';
import Header from '../header/header'
import { Route, withRouter, Redirect } from 'react-router-dom'


class Register extends Component {

    state = { form_data: {}, validationErrors: {}, message:"", message_color:"green" }

    handleClickHistory = () => {

    }

    handleClickDefinition = () => {

    }

    handleClickDerivates = () => {

    }

    handleClickTools = () => {

    }
    handleSubmit = () =>{
        
    }

    render() {
        return (
            <section>
                <Header onClickHistory={this.handleClickHistory}
                    onClickDefinition={this.handleClickDefinition}
                    onClickDerivates={this.handleClickDerivates}
                    onClickTools={this.handleClickTools}>
                </Header>
                <section className="register-section">
                    <h2 style={{color:this.state.message_color}}>{this.state.message}</h2>
                    <form className="form" onSubmit={(ev) => ev.preventDefault()}>
                        <div className="form-group-field">
                            <label>Name</label>
                            <input value={this.state.form_data.name} onChange={(ev) => { this.handleOnChangeName(ev) }} type="text" name="name" placeholder="Name..."></input>
                            <small class="text-danger">{this.state.validationErrors["name"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Surname</label>
                            <input value={this.state.form_data.surname} onChange={(ev) => { this.handleOnChangeSurname(ev) }} type="text" name="surname" placeholder="Surname..."></input>
                            <small class="text-danger">{this.state.validationErrors["surname"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Email</label>
                            <input value={this.state.form_data.email} onChange={(ev) => { this.handleOnChangeEmail(ev) }} type="email" name="email" placeholder="Email..."></input>
                            <small class="text-danger">{this.state.validationErrors["email"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Phone</label>
                            <input value={this.state.form_data.phone} onChange={(ev) => { this.handleOnChangePhone(ev) }} type="phone" name="phone" placeholder="Phone..."></input>
                            <small class="text-danger">{this.state.validationErrors["phone"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Username</label>
                            <input value={this.state.form_data.username} onChange={(ev) => { this.handleOnChangeUsername(ev) }} type="text" name="username" placeholder="Username..."></input>
                            <small class="text-danger">{this.state.validationErrors["username"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Password</label>
                            <input value={this.state.form_data.password} onChange={(ev) => { this.handleOnChangePassword(ev) }} type="password" name="password" placeholder="Password..."></input>
                            <small class="text-danger">{this.state.validationErrors["password"]}</small>
                        </div>

                        <div className="form-group-field">
                            <button onClick={this.handleSubmit}>Send...</button>
                            <button onClick={this.handleClose}>Close</button>
                        </div>
                    </form>
                </section>
            </section>
        );
    }
}

export default withRouter(Register)
