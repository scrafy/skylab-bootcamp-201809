import React, { Component } from 'react';
import Header from '../header/header'
import { Route, withRouter, Redirect } from 'react-router-dom'
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'

class Update extends Component {

    state = { 
         form_data: {
             name:"",
             surname:"",
             email:"",
             phone:"",
             username:"",
             password:"",
             newpassword:"",
             confirmpassword:"",
             picprofile:""
         }, 
         validationErrors: {},
         message: "", 
         message_color: "green",
         profile_img:require('../../assets/img/user.png')
    }

    constructor(props) {
        super(props)
        this.service = new ServiceBackEnd()
        this.service.getUserData().then(res => {
            
            this.setState({ form_data:res.data.user, profile_img:res.data.profile_pic })
        }).catch(err => {
            alert(err.message)
        })
    }

    handleClickHistory = () => {

    }

    handleClickDefinition = () => {

    }

    handleClickDerivates = () => {

    }

    handleClickTools = () => {

    }

    handleOnChangeName = (ev) => {

        this.state.form_data.name = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeSurname = (ev) => {

        this.state.form_data.surname = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeEmail = (ev) => {

        this.state.form_data.email = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangePhone = (ev) => {

        this.state.form_data.phone = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeUsername = (ev) => {

        this.state.form_data.username = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangePassword = (ev) => {

        this.state.form_data.password = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeNewpassword = (ev) =>{
        this.state.form_data.newpassword = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeConfirmpassword = (ev) =>{
        this.state.form_data.confirmpassword = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleSubmit = () => {

        this.service.updateUser(this.state.form_data).then(res => {

            this.state.form_data.password = ""
            this.state.form_data.newpassword = ""
            this.state.form_data.confirmpassword = ""
            this.setState({form_data:this.state.form_data,  message: "The account has been updated correctly...", message_color:"green",validationErrors:{}},() => {

                setTimeout(() => this.setState({message:""}), 3000)
            })

        }).catch(err => {

            if (err instanceof ValidationError) {
                let errors = {}
                err.validationErrors.forEach(error => {
                    errors[error.field] = error.message
                });
                this.setState({ validationErrors: errors,message:"Exists validation errors...",  message_color:"red" })
            } else {
               
                this.setState({ message: err.message, message_color:"red" })
            }
        })
    }

    handleUploadImageProfile = () => {

        let file_input = document.createElement('input');
        file_input.addEventListener("change", (ev) => {
           debugger
            this.service.uploadImageProfile(file_input.files[0]).then(res => {
                
                this.setState({profile_img: res.data,  message: "The profile pic has been uploaded correctly...", message_color:"green"},() => {

                    setTimeout(() => this.setState({message:"", message_color:"green"}), 3000)
                })

            }).catch(err => {
                
                this.setState({message: "There was a problem while uploading the profile pic...", message_color:"red"},() => {

                    setTimeout(() => this.setState({message:""}), 3000)
                })
        
            })
        }, false);
        file_input.type = 'file';
        file_input.click();

    }

    handleClose = () =>{
        this.props.history.push("/landing")
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
                    <h2 style={{ color: this.state.message_color }}>{this.state.message}</h2>
                    <form className="form" onSubmit={(ev) => ev.preventDefault()}>
                        <input type="hidden" name="picprofile" value={this.state.form_data.picprofile}></input>
                        <div className="form-group-field">
                            <div className="form-image-profile">
                                <img src={this.state.profile_img}></img>
                            </div>
                            <button onClick={this.handleUploadImageProfile}>Upload</button>
                        </div>
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
                            <label>Newpassword</label>
                            <input value={this.state.form_data.newpassword} onChange={(ev) => { this.handleOnChangeNewpassword(ev) }} type="password" name="newpassword" placeholder="New password..."></input>
                            <small class="text-danger">{this.state.validationErrors["newpassword"]}</small>
                        </div>
                        <div className="form-group-field">
                            <label>Confirmpassword</label>
                            <input value={this.state.form_data.confirmpassword} onChange={(ev) => { this.handleOnChangeConfirmpassword(ev) }} type="password" name="confirmpassword" placeholder="Confirm password..."></input>
                            
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

export default withRouter(Update)
