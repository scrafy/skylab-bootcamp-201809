import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'

class Index extends Component {

    goHome = () =>{

        this.props.history.push("/home")
    }
    
    render(){
        return (
            <section className="bees">
                <section className="bees__container">
                    <div className="bees__bee"><img src={require('../../assets/img/bee.png')} /></div>
                    <div onClick={this.goHome} className="bees_title"><span>Hive Studio</span></div>
                    <div className="bees__bee"><img src={require('../../assets/img/bee.png')} /></div>
                </section>
            </section>
        )
    }

}

export default withRouter(Index)