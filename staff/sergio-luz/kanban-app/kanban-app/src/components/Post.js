import React, { Component } from 'react'
import Selector from './Selector';

class Post extends Component {
    state = { 
        text: this.props.text,
        status:'TODO'
     }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    getStatusFromSelector=(status)=>{
        this.setState({status})
        this.props.onUpdatePost(this.props.id, this.state.text, status)
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text, this.state.status)
    }

    render() {
        return <article className="post">
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>

            <Selector status={this.props.status} id={this.props.id} text={this.state.text} getStatusFromSelector={this.getStatusFromSelector} />
        </article>
    }
}

export default Post