import React, { Component } from 'react';
import Header from '../header/header'
import History from '../history/history'
import Definition from '../definition/definition'
import Tool from '../tool/tool'
import Derivative from '../derivative/derivative'

class Landing extends Component {

    state = {showPanelControl:"", showDefinition: true, showHistory: false, showDerivative: false, showTool: false }

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

    handleTogglePanelControl = () =>{

        this.state.showPanelControl = !this.state.showPanelControl ? "top-0" : "";
        this.setState({showPanelControl:this.state.showPanelControl})
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
                    <section onClick={this.handleTogglePanelControl} className={`panel-control icon-wrench ${this.state.showPanelControl}`}>
                        <section className="panel-control__items">
                            <div id="item-farm" ondragstart="drag(event)" draggable="true" className="panel-control__item">
                                <img src="img/honeycomb1.png" />
                            </div>
                            <div id="item-hive" ondragstart="drag(event)" draggable="true" className="panel-control__item">
                                <img src="img/hive.svg" />
                            </div>
                            <div id="item-bee" ondragstart="drag(event)" draggable="true" className="panel-control__item">
                                <img src="img/bee.png" />
                            </div>
                        </section>
                    </section>
                    {this.state.showPanelControl && <section id="farm-area" ondrop="drop(event)" ondragover="allowDrop(event)" className="farms-area">
                    </section>}
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
