import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status}


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleStatusChange = event => {

        const status = event.target.value
        
        // this.setState({ status })

        this.props.onChangeStatus(this.props.id, status)
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        return <div className="post">
            <article className="post__article">
                <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />
                <button className="post__button" onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
                <select defaultValue = {this.state.status} className="post__select" onChange={this.handleStatusChange}>
                    <option value="TODO">To do</option>
                    <option value="DOING">Doing</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                </select>
            </article>
        </div>
    }
}

export default Post