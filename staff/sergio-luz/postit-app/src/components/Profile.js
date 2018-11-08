import React, { Component } from 'react'
import logic from '../logic'
import { throws } from 'assert';

class Profile extends Component {
    state = {
        name: "",
        surname: "",
        username: "",
        newPassword: "",
        repeatPassword: "",
        password: ""
    }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnmeChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handleRepeatPassword=event=>{
        const repeatPassword=event.target.value

        this.setState({repeatPassword})
    }

    handlePassword = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()
        
        const {name, surname, username, newPassword, repeatPassword, password } = this.state

        logic.modifyProfile(name, surname, username, newPassword, repeatPassword, password)
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name"></input>
                <input type="text" name="surname" placeholder="surname"></input>
                <input type="text" name="username" placeholder="username"></input>
                <input type="password" name="newPassword" placeholder="new password"></input>
                <input type="password" name="repeatPassword" placeholder="repeat new password"></input>
                <input type="password" name="password" placeholder="password"></input>

                <button type="submit">Save changes</button>
            </form>
        </div>
    }
}

export default Profile
