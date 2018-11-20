import React, { Component } from 'react'
import Header from '../header/header'
import History from '../history/history'
import Definition from '../definition/definition'
import Tool from '../tool/tool'
import Derivative from '../derivative/derivative'
import Farm from '../farm/farm'

class Landing extends Component {

    state = { showDefinition: true, showHistory: false, showDerivative: false, showTool: false }

    handleClickHistory = () => {
        this.setState({ showDefinition: false, showHistory: true, showDerivative: false, showTool: false })
    }

    handleClickDefinition = () => {
        this.setState({ showDefinition: true, showHistory: false, showDerivative: false, showTool: false })
    }

    handleClickDerivates = () => {
        this.setState({ showDefinition: false, showHistory: false, showDerivative: true, showTool: false })
    }

    handleClickTools = () => {
        this.setState({ showDefinition: false, showHistory: false, showDerivative: false, showTool: true })
    }

   
    handleDragEvent = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }


    render() {

        return (
            <section>
                <Header onClickHistory={this.handleClickHistory}
                    onClickDefinition={this.handleClickDefinition}
                    onClickDerivates={this.handleClickDerivates}
                    onClickTools={this.handleClickTools}>
                </Header>
                <section className="landing-section">
                    <Farm></Farm>
                    {this.state.showDefinition && <Definition></Definition>}
                    {this.state.showHistory && <History></History>}
                    {this.state.showDerivative && <Derivative></Derivative>}
                    {this.state.showTool && <Tool></Tool>}
                </section>

            </section>
        );
    }
}

export default Landing;
