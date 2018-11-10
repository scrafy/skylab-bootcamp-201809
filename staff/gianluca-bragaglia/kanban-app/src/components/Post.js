import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text, status:'' }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    dropDownHandle = event => {

        const statusDrop = event.target.value
        

       this.setState({ status: statusDrop })

       console.log(statusDrop);
       

  
       }

    render() {
        return <article className="post">
            <textarea defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <select className='dropdown' onChange={this.dropDownHandle}>

                <option >Select</option>

                <option  value='TODO'>TODO</option>

                <option  value='DOING'>DOING</option>

                <option value='REVIEW'>REVIEW</option>

                <option value='DONE'>DONE</option>
                    
            </select>

            <a className='btn-trash' onClick={() => this.props.onDeletePost(this.props.id)}><i className="far fa-trash-alt"></i></a>
        </article>
    }
}

export default Post