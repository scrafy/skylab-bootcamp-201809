import React, { Component } from 'react';
import Card from '../card/card'

class List extends Component {

    state = { name: this.props.name, showFormAddCard:"", cardContent:"", cards:[]}

    constructor(props){
        super(props)
        this.state.cards = [{id:1,content:"asdasd"},{id:2,content:"asdasdsad"},{id:3,content:"asdasd"}]
    }

    handleshowFormAddCard = () => {
        
        this.state.showFormAddCard = !this.state.showFormAddCard ? "height-auto" : ""
        this.setState({showFormAddCard:this.state.showFormAddCard})
    }

    handleAddCard = () =>{

        //se envía a backend
        if (!this.state.cardContent)
            alert("The content of the card is empty")

        this.state.cards.push({id:5,content:this.state.cardContent})
        this.state.cardContent = ""
        this.setState({cards:this.state.cards}, () =>{

            this.handleshowFormAddCard()
        })
        


    }

    handleCardContentChange = (ev) =>{

        this.state.cardContent = ev.target.value
        this.setState({cardContent:this.state.cardContent})
        
    }

    render() {
        return (
            <section className="list">
                <h3 className="list__title">{this.state.name}</h3>
                {
                    this.state.cards.map((card) => <Card id={card.id} content={card.content}></Card>)
                    //this.state.cards.length
                }
                <form onSubmit={(ev) => ev.preventDefault()} className={`form-addcard ${this.state.showFormAddCard}`}>
                    <textarea value={this.state.cardContent} onChange={(ev) => this.handleCardContentChange(ev)}></textarea>
                    <button onClick={this.handleAddCard} className="btn btn-success btn-sm">Add card</button>
                </form>
                <span onClick={this.handleshowFormAddCard} className="add-card">+ Add Card</span>
            </section>
        );
    }
}

export default List;
