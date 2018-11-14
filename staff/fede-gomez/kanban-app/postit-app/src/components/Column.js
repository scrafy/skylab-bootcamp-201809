import React, { Component } from 'react'
import Post from './Post'

const Column = (props) => {

    return (
        <section className='kanban-column'>
            {props.postis.map(postit => <Post key={postit.id} column={postit.column} text={postit.text} id={postit.id} />)}
        </section>
    )
}

export default Column