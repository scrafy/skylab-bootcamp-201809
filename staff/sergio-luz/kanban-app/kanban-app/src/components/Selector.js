import React, { Component } from 'react'

class Selector extends Component {

    state={
        status:'TODO'
    }

    handleSelectionChange= event =>{
        event.preventDefault()

        this.setState({ status:event.target.value })
    }
    
    render() {
        console.log(this.state.status)
        return <select onChange={this.handleSelectionChange}>
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="REVIEW">REVIEW</option>
            <option value="DONE">DONE</option>
        </select>
    }
}

export default Selector