import React, { Component } from 'react';


class Card extends Component {

    state = { id:this.props.id, content: this.props.content }


    render() {
        return (
            <article id={this.state.id} class="card">
                <p>
                    {this.state.content}
                </p>
            </article>
        );
    }
}

export default Card;
