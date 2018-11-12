import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status: this.props.status }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        return <article className="post">
            <div className="card text-white bg-primary mb-3">
                <div className="card-header">          <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.status}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button onClick={() => this.props.onStatusUpdate(this.props.id, 'TODO')} class="dropdown-item" type="button">TODO</button>
                        <button onClick={() => this.props.onStatusUpdate(this.props.id, 'DOING')} class="dropdown-item" type="button">DOING</button>
                        <button onClick={() => this.props.onStatusUpdate(this.props.id, 'REVIEW')} class="dropdown-item" type="button">REVIEW</button>
                        <button onClick={() => this.props.onStatusUpdate(this.props.id, 'DONE')} class="dropdown-item" type="button">DONE</button>
                    </div>
                </div></div>
                <div className="card-body">

                    <textarea className="n" defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />
                    <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        </article>

      
    }
}

export default Post