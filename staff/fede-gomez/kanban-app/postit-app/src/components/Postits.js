import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

//TODO:     Crear array default en la base de datos
//          Obtener array del back

class Postits extends Component {
    state = {
        postits: [
            {
                id: '001',
                text: 'nota 1',
                column: 'todo'
            },
            {
                id: '002',
                text: 'nota 2',
                column: 'todo'
            },
            {
                id: '003',
                text: 'nota 3',
                column: 'doing'
            },
            {
                id: '004',
                text: 'nota 4',
                column: 'done'
            }
        ],
        board: {
            todo: [],
            doing: [],
            review: [],
            done: []
        }
    }

    componentDidMount() {
        // logic.listPostits()
        //     .then(postits => { this.setState({ postits }) })

        const board = {
            todo: [],
            doing: [],
            review: [],
            done: []
        }
        for (let postit of this.state.postits) {
            board[postit.column].push(postit)
        }

        this.setState({ board: { ...board } })

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

    handleChangeColumn = (id, status) => {
        let index = 0;
        const selectedPostit = this.state.postits.find((postit, i) => {
            if (postit.id === id) {
                index = i
                return postit.id === id
            } else { return false }
        })
        selectedPostit.column = status;

        const board = {
            todo: [],
            doing: [],
            review: [],
            done: []
        }
        for (let postit of this.state.postits) {
            board[postit.column].push(postit)
        }

        this.setState({
            postits: [...this.state.postits],
            board: { ...board }
        })

    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    handleModifyPostit = (id, text) =>
        logic.modifyPostit(id, text)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))

    // TODO error handling!


    render() {
        return (

            <div className='main'>
                <h1 className='main__title'>Kanban-App <i className="fas fa-sticky-note"></i></h1>

                <InputForm onSubmit={this.handleSubmit} />
                <div className='kanban-columns'>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>To do</h2>
                        {this.state.board.todo.map(postit => <Post key={postit.id} status={'todo'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Doing</h2>
                        {this.state.board.doing.map(postit => <Post key={postit.id} status={'doing'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Review</h2>
                        {this.state.board.review.map(postit => <Post key={postit.id} status={'review'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Done</h2>
                        {this.state.board.done.map(postit => <Post key={postit.id} status={'done'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                </div>
            </div>
        )
    }
}

export default Postits
