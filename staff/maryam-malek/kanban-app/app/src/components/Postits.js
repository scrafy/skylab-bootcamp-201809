import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [], todo: [], doing:[], review:[], done:[] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => this.setState({ postits}))

        // TODO error handling!
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id => {
        return logic.removePostit(id)
            .then(() => {
                debugger
                return logic.listPostits()})
            .then(postits => {
                debugger
                return this.setState({ postits })})
    }
    // TODO error handling!


    handleModifyPostit = (id, text) =>
        logic.modifyPostit(id, text)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!

    handleModifyStatus = (id, status) =>
        logic.modifyStatus(id, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    render() {
        return <div>
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />

            <section>
                {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
            </section>
            <section>
                {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
            </section><section>
                {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
            </section><section>
                {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
            </section>
        </div>
    }
}

export default Postits
