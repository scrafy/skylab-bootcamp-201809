import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'
import Error from './Error';

class Postits extends Component {
    state = {
        postits: [],
        error: ''
    }

    componentDidMount() {
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        // TODO error handling!
    }

    handleSubmit = text => {
        try {
            logic.addPostit(text, 'TODO')
                .catch(err => { console.log(err.message) })
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
                .then(() => this.setState({ error: '' }))
        } catch (err) {
            this.setState({ error: err.message })
        }

    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    handleModifyPostit = (id, text, status) =>
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    render() {
        return <div className='home__body'>
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

            <InputForm onSubmit={this.handleSubmit} />
            <Error message={this.state.error}></Error>

            <section className='board__postits'>
                <section>
                    <h3>TODO</h3>
                    {this.state.postits.map(postit => {
                        if (postit.status === 'TODO')
                            return <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} hand />
                    })}
                </section>
                <section>
                    <h3>DOING</h3>

                    {this.state.postits.map(postit => {
                        if (postit.status === 'DOING')
                            return <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} hand />
                    })}
                </section>
                <section>
                    <h3>REVIEW</h3>

                    {this.state.postits.map(postit => {
                        if (postit.status === 'REVIEW')
                            return <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} hand />
                    })}
                </section>
                <section>
                    <h3>DONE</h3>

                    {this.state.postits.map(postit => {
                        if (postit.status === 'DONE')
                            return <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} hand />
                    })}
                </section>
            </section>

        </div>
    }
}

export default Postits
