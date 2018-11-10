import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [], todo: [], doing: [], review: [], done: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => this.setState({ postits }))

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
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
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
        return <div className="home">
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />
            <div className="postit-board">
                <section className="postit-col postit-col--todo">
                    <h3>TO DO</h3>
                    {this.state.postits.filter(postit => postit.status === 'TODO').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--doing">
                <h3>DOING</h3>
                    {this.state.postits.filter(postit => postit.status === 'DOING').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--review">
                <h3>REVIEW</h3>
                    {this.state.postits.filter(postit => postit.status === 'REVIEW').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
                <section className="postit-col postit-col--done">
                <h3>DONE</h3>
                    {this.state.postits.filter(postit => postit.status === 'DONE').map(postit => <Post key={postit.id} text={postit.text} status={postit.status} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onUpdateStatus={this.handleModifyStatus} />)}
                </section>
            </div>
        </div>
    }
}

export default Postits
