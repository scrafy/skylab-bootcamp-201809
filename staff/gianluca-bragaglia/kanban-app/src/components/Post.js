import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status:this.props.status }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        return <article className="post">
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <a className='btn-trash' onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></a>
        </article>
    }
}

export default Post