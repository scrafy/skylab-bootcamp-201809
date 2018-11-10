import React, { Component } from 'react'

class InputForm extends Component {
    state = { text: '', status:'' }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text, this.state.status)

        this.setState({ text: '' })
    }

    dropDownHandle = event => {

        const state = event.target.value

       this.setState({ status: state })
    
       }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input value={this.state.text} placeholder='Write text here...' onChange={this.handleInput} />
            <select className='dropdown' onChange={this.dropDownHandle}>

                <option  value='TODO'>TODO</option>

                <option  value='DOING'>DOING</option>

                <option value='REVIEW'>REVIEW</option>

                <option value='DONE'>DONE</option>
                    
            </select>
            <button type="submit"><i className="fas fa-plus"></i></button>
        </form>
    }
}

export default InputForm