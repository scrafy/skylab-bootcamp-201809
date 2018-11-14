import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

//TODO:     Crear array default en la base de datos
//          Obtener array del back

class Postits extends Component {
    state = {
        postits: [],
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


        try {
            logic.listPostits()
                .then(_postits => {
                    this.setState({ postits: [..._postits] })
                    for (let postit of this.state.postits) {
                        board[postit.column].push(postit)
                    }
                    this.setState({ board: { ...board } })

                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }

        // .then(postits => console.log(postits))
        // .catch(err => console.log(err))
        const board = {
            todo: [],
            doing: [],
            review: [],
            done: []
        }
        //this.setState({ postits: [...postits] })


        // TODO error handling!
    }

    // componentDidUpdate() {
    //     try {
    //         logic.listPostits()
    //             .then(_postits => {
    //                 this.setState({ postits: [..._postits] })
    //                 for (let postit of this.state.postits) {
    //                     board[postit.column].push(postit)
    //                 }
    //                 this.setState({ board: { ...board } })

    //             })
    //     } catch ({ message }) {
    //         alert(message) // HORROR! FORBIDDEN! ACHTUNG!
    //     }
    //     const board = {
    //         todo: [],
    //         doing: [],
    //         review: [],
    //         done: []
    //     }
    // }

    handleSubmit = text => {
        try {
            logic.addPostit(text)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    handleChangeColumn = (id, column) => {
        logic.changeColumn(id, column)

        let index = 0;
        const selectedPostit = this.state.postits.find((postit, i) => {
            if (postit.id === id) {
                index = i
                return postit.id === id
            } else { return false }
        })
        selectedPostit.column = column;

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


    handleUpdatePostit = (postitId, newText) => {
        debugger
        logic.updatePostit(postitId, newText)
            .then(() => logic.listPostits())
            .then(postits => console.log(postits))
        // .then(postits => this.setState({ postits }))
    }


    // TODO error handling!


    render() {
        return (

            <div className='main'>
                <h1 className='main__title'>Kanban-App <i className="fas fa-sticky-note"></i></h1>

                <InputForm onSubmit={this.handleSubmit} />
                <div className='kanban-columns'>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>To do</h2>
                        {this.state.board.todo.map(postit => <Post key={postit.id} column={'todo'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePostit={this.handleUpdatePostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Doing</h2>
                        {this.state.board.doing.map(postit => <Post key={postit.id} column={'doing'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePostit={this.handleUpdatePostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Review</h2>
                        {this.state.board.review.map(postit => <Post key={postit.id} column={'review'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePostit={this.handleUpdatePostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                    <section className='kanban-column'>
                        <h2 className='kanban-column--title'>Done</h2>
                        {this.state.board.done.map(postit => <Post key={postit.id} column={'done'} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePostit={this.handleUpdatePostit} onChangeColumn={this.handleChangeColumn} />)}
                    </section>
                </div>
            </div>
        )
    }
}

export default Postits
