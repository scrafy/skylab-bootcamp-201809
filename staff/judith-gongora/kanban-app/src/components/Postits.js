import React, { Component } from 'react'
import logic from '../logic'
import InputForm from './InputForm'
import Post from './Post'

class Postits extends Component {
    state = { postits: [], todo: [], doing: [], review: [], done: [] }

    componentDidMount() {
        logic.listPostits()
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })
            

        // TODO error handling!
    }

    // componentWillUpdate(){
    //     console.log('peo')
    //     logic.listPostits()
    //     .then(postits => this.setState({ postits }))
    //     .then(() =>{
    //         const todo = this.state.postits.filter(postit => postit.status === 'todo')
    //         this.setState({todo})
    //     })
    //     .then(() =>{
    //         const doing = this.state.postits.filter(postit => postit.status === 'doing')
    //         this.setState({doing})
    //     })
    //     .then(() =>{
    //         const review = this.state.postits.filter(postit => postit.status === 'review')
    //         this.setState({review})
    //     })
    //     .then(() =>{
    //         const done = this.state.postits.filter(postit => postit.status === 'done')
    //         this.setState({done})
    //     })
        
    // }

    handleSubmit = (text, status) => {
        try {
            logic.addPostit(text, status)
                .then(() => logic.listPostits())
                .then(postits => this.setState({ postits }))
                .then(() =>{
                    const todo = this.state.postits.filter(postit => postit.status === 'todo')
                    this.setState({todo})
                })
                .then(() =>{
                    const doing = this.state.postits.filter(postit => postit.status === 'doing')
                    this.setState({doing})
                })
                .then(() =>{
                    const review = this.state.postits.filter(postit => postit.status === 'review')
                    this.setState({review})
                })
                .then(() =>{
                    const done = this.state.postits.filter(postit => postit.status === 'done')
                    this.setState({done})
                })
        } catch ({ message }) {
            alert(message) // HORROR! FORBIDDEN! ACHTUNG!
        }
    }

    // TODO error handling!

    handleRemovePostit = id =>
        logic.removePostit(id)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })

    // TODO error handling!


    handleModifyPostit = (id, text, status) =>
        logic.modifyPostit(id, text, status)
            .then(() => logic.listPostits())
            .then(postits => this.setState({ postits }))
            .then(() =>{
                const todo = this.state.postits.filter(postit => postit.status === 'todo')
                this.setState({todo})
            })
            .then(() =>{
                const doing = this.state.postits.filter(postit => postit.status === 'doing')
                this.setState({doing})
            })
            .then(() =>{
                const review = this.state.postits.filter(postit => postit.status === 'review')
                this.setState({review})
            })
            .then(() =>{
                const done = this.state.postits.filter(postit => postit.status === 'done')
                this.setState({done})
            })

    // TODO error handling!


    render() {
        return <div>
                <h1>Post-It App <i className="fas fa-sticky-note"></i></h1>

                <div className="grid__postits">
                
                    <section>
                    <InputForm onSubmit={this.handleSubmit}  status = 'todo'/>
                        {this.state.todo.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} status = 'todo'/>)}
                    </section>
                    <section>
                    <InputForm onSubmit={this.handleSubmit} status= 'doing'/>
                        {this.state.doing.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} status = 'doing'/>)}
                    </section>
                    <section>
                    <InputForm onSubmit={this.handleSubmit} status='review'/>
                        {this.state.review.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} status = 'review'/>)}
                    </section>
                    <section>
                    <InputForm onSubmit={this.handleSubmit} status='done'/>
                        {this.state.done.map(postit => <Post key={postit.id} text={postit.text} id={postit.id} onDeletePost={this.handleRemovePostit} onUpdatePost={this.handleModifyPostit} status = 'done'/>)}
                    </section>
            </div>
        </div>
    }
}

export default Postits
