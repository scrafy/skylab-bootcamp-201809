import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [], toDoPostits: [], doingPostits: [], reviewPostits: [], donePostits: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => {
                const toDoPostits = postits.filter(post => post.status === "TODO")
                const doingPostits = postits.filter(post => post.status === "DOING")
                const reviewPostits = postits.filter(post => post.status === "REVIEW")
                const donePostits = postits.filter(post => post.status === "DONE")

                this.setState({ postits, toDoPostits, doingPostits, reviewPostits, donePostits })
            })

        // TODO error handling!
    }

    handleSubmit = (text, status) => {
        try {
            logic.addPostit(text, status)
                .then(() => logic.listPostits())
                .then(postits => {
                    const toDoPostits = postits.filter(post => post.status === "TODO")
                    const doingPostits = postits.filter(post => post.status === "DOING")
                    const reviewPostits = postits.filter(post => post.status === "REVIEW")
                    const donePostits = postits.filter(post => post.status === "DONE")

                    this.setState({ postits, toDoPostits, doingPostits, reviewPostits, donePostits })
                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => {
                const toDoPostits = postits.filter(post => post.status === "TODO")
                const doingPostits = postits.filter(post => post.status === "DOING")
                const reviewPostits = postits.filter(post => post.status === "REVIEW")
                const donePostits = postits.filter(post => post.status === "DONE")

                this.setState({ postits, toDoPostits, doingPostits, reviewPostits, donePostits })
            })

    // TODO error handling!


    handleModifyPostit = (id, text) =>
        logic.modifyPostit(id, text)
            .then(() => logic.listPostits())
            .then(postits => {
                const toDoPostits = postits.filter(post => post.status === "TODO")
                const doingPostits = postits.filter(post => post.status === "DOING")
                const reviewPostits = postits.filter(post => post.status === "REVIEW")
                const donePostits = postits.filter(post => post.status === "DONE")
                this.setState({ postits, toDoPostits, doingPostits, reviewPostits, donePostits })

            })

    // TODO error handling!

    handleChangeStatus = (id, status) =>
        logic.modifyPostitStatus(id, status)
            .then(() => logic.listPostits())
            .then(postits => {
                const toDoPostits = postits.filter(post => post.status === "TODO")
                const doingPostits = postits.filter(post => post.status === "DOING")
                const reviewPostits = postits.filter(post => post.status === "REVIEW")
                const donePostits = postits.filter(post => post.status === "DONE")
                this.setState({ postits, toDoPostits, doingPostits, reviewPostits, donePostits })
            })

    render() {
        return <div>
            <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>
            <div className = "kanbanContainer">
                <section>
                    <h2>To do</h2>
                    <InputForm onSubmit={this.handleSubmit} status={"TODO"} />
                    <section>
                        {this.state.toDoPostits.map(postit => <Post status={"TODO"} key={postit.id} onChangeStatus={this.handleChangeStatus} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                    </section>
                </section>

                <section>
                    <h2>Doing</h2>
                    <InputForm onSubmit={this.handleSubmit} status={"DOING"} />
                    <section>
                        {this.state.doingPostits.map(postit => <Post status={"DOING"} key={postit.id} text={postit.text} onChangeStatus={this.handleChangeStatus} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                    </section>
                </section>

                <section>
                    <h2>Review</h2>
                    <InputForm onSubmit={this.handleSubmit} status={"REVIEW"} />
                    <section>
                        {this.state.reviewPostits.map(postit => <Post status={"REVIEW"} key={postit.id} text={postit.text} onChangeStatus={this.handleChangeStatus} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                    </section>
                </section>

                <section>
                    <h2>Done</h2>
                    <InputForm onSubmit={this.handleSubmit} status={"DONE"} />
                    <section>
                        {this.state.donePostits.map(postit => <Post status={"DONE"} key={postit.id} text={postit.text} onChangeStatus={this.handleChangeStatus} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} />)}
                    </section>
                </section>
            </div>
        </div>
    }
}

export default Postits
