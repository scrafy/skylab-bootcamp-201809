import React, { Component } from 'react'

class Post extends Component {
    state = { 
        text: this.props.text,
        postits: []
     }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    // dragStart = (event, postitId) => {
    //     event.dataTransfer.setData('id', postitId)
    // }

    // dragOver = event => {
    //     event.preventDefault()
    // }

    // onDrop = (event, day) => {

    //     let totalPostits = this.state.postits.filter(postit => postit.day === day)
        
    //     if (totalPostits.length >= 2) return 
    //     let postits = this.state.postits.filter(postit => {
    //         if (postit.id === Number(event.dataTransfer.getData('id'))) {
    //             postit.day = day
    //             postit.time = Date.now()
    //         }
    //         return postit
    //     }).sort((a, b) => a.time - b.time)
 
    //     this.setState({ ...this.state, postits })
        
 
    // }

    render() {

        // let postits = { todo: [], doing: [], review: [], done: [] }
        // let template = (postit) => ( 
        //     <div className="postits" key={postit.id} draggable onDragStart={ event => this.dragStart(event, postit.id) }>
        //     {postit.name}
        //     </div>
        // )

        // this.state.postits.forEach(postit => {
        //     switch(postit.day) {
        //         case 'todo':
        //             postits.todo.push(template(postit))
        //         break;
        //         case 'doing':
        //             postits.doing.push(template(postit))
        //         break;
        //         case 'todo':
        //             postits.review.push(template(postit))
        //         break;
        //         case 'doing':
        //             postits.done.push(template(postit))
        //         break;
        //     }
        // })

        return (
        <article className="post">

            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />
            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></button>
            {/* <div className="column" onDragOver={ event => this.dragOver(event)} onDrop={ event => this.onDrop(event, 'todo')}>
                    <h4>TODO</h4>
                    {postits.todo}
            </div>
            <div className="column" onDragOver={ event => this.dragOver(event)} onDrop={ event => this.onDrop(event, 'doing')}>
                    <h4>DOING</h4>
                    {postits.doing}
            </div>
            <div className="column" onDragOver={ event => this.dragOver(event)} onDrop={ event => this.onDrop(event, 'review')}>
                    <h4>REVIEW</h4>
                    {postits.review}
            </div>
            <div className="column" onDragOver={ event => this.dragOver(event)} onDrop={ event => this.onDrop(event, 'done')}>
                    <h4>DONE</h4>
                    {postits.done}
            </div> */}

        </article>
        )
    }
}

export default Post