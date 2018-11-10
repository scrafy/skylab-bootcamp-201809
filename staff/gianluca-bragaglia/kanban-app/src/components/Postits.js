import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => { this.setState({ postits }) })

        // TODO error handling!
    }

    handleSubmit = (text, status) => {

        try {
            logic.addPostit(text, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))

        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
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
        return <div>
                <InputForm onSubmit={this.handleSubmit} />
                <div className='postits-container'>
                    <div className='postits-container__item'>
                        <p className='postits-container__item__task'>TODO</p>
                        <div>                                         {/*   postit.status === 'TODO' ? <Post></Post> : null */}
                            {this.state.postits.map(postit => (postit.status === 'TODO') ? <Post key={postit.id} text={postit.text} id={postit.id} status={postit.status} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} /> : null)}
                        </div>
                    </div>
                    <div className='postits-container__item'>
                        <p className='postits-container__item__task'>DOING</p>
                        <div>
                            {this.state.postits.map(postit => (postit.status === 'DOING') ? <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} /> : null)}
                        </div>
                    </div>
                    <div className='postits-container__item'>
                        <p className='postits-container__item__task'>REVIEW</p>
                        <div>
                            {this.state.postits.map(postit => (postit.status === 'REVIEW') ? <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} /> : null)}
                        </div>
                    </div>
                    <div className='postits-container__item'>
                        <p className='postits-container__item__task'>DONE</p>
                        <div>
                            {this.state.postits.map(postit => (postit.status === 'DONE') ? <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} /> : null)}
                        </div>
                    </div>
                    
                </div>
            </div>
    }
}

export default Postits
