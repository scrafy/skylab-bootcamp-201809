import React, { Component } from 'react'

class Post extends Component {
    state = {
        id: this.props.id,
        text: this.props.text,
        status: this.props.status
    }

    handleSelectChange = (event) => {
        this.props.onChangeColumn(this.state.id, event.target.value)
    }

    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        return <article className='kanban-item'>
            {/* <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} /> */}
            <textarea defaultValue={this.state.text} onChange={this.handleChange} />
            <select defaultValue={this.state.status} onChange={this.handleSelectChange}>
                {
                    ['todo', 'doing', 'review', 'done'].map(item => <option value={item}>{item}</option>)
                }
            </select>
            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
        </article>
    }
}

export default Post