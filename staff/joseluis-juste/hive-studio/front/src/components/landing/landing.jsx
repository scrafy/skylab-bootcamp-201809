import React, { Component } from 'react'
import Header from '../header/header'
import History from '../history/history'
import Definition from '../definition/definition'
import Tool from '../tool/tool'
import Derivative from '../derivative/derivative'
import { Carousel } from 'react-responsive-carousel'
import FarmRegisterModal from '../farm-register-modal/farm-register-modal'
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'

class Landing extends Component {

    state = { showHiveModal: false, showRegisterModal: false, selectedSlide: 0, farms: [], hives: [], showPanelControl: "", showDefinition: true, showHistory: false, showDerivative: false, showTool: false }

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

    handleTogglePanelControl = () => {

        this.state.showPanelControl = !this.state.showPanelControl ? "top-0" : "";
        this.setState({ showPanelControl: this.state.showPanelControl })
    }

    handleDragEvent = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    handleDropFarmEvent = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-farm") {
            this.setState({ showRegisterModal: !this.state.showRegisterModal })
            this.state.farms.push("asd")
            this.setState({ farms: this.state.farms })
        }


    }


    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleSliderChange = (ev) => {

        this.setState({ selectedSlide: ev })

    }

    handleDropHiveEvent = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-hive") {
            this.setState({ showHiveModal: !this.state.showHiveModal })
            this.state.hives.push("asd")
            this.setState({ hives: this.state.hives })
        }
    }

    handleShowHideRegisterModal = () => {

        this.setState({ showRegisterModal: !this.state.showRegisterModal })
    }

    handleShowHideHiveModal = () => {

        this.setState({ showHiveModal: !this.state.showHiveModal })
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
                            <div id="item-farm" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                                {false && <img src="img/honeycomb1.png" />}
                            </div>
                            <div id="item-hive" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                                {false && <img src="img/hive.svg" />}
                            </div>
                            <div id="item-bee" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                                {false && <img src="img/bee.png" />}
                            </div>
                        </section>
                    </section>
                    {this.state.showPanelControl && <section id="farm-area" onDrop={(ev) => this.handleDropFarmEvent(ev)} onDragOver={(ev) => this.handleDragOverEvent(ev)} className="farms-area">
                        <FarmRegisterModal onShowHideModal={this.handleShowHideRegisterModal} showModal={this.state.showRegisterModal}></FarmRegisterModal>
                        <HiveRegisterModal onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
                        <Carousel selectedItem={this.state.selectedSlide} onChange={(ev) => this.handleSliderChange(ev)} showThumbs={false}>
                            {this.state.farms.map(farm => {
                                return <div id={Date.now()} className="farms-area__item" onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropHiveEvent}>
                                    {}
                                    {this.state.hives.map(hive => {
                                        return <div className="farms-area__item__hive">
                                            <img src="img/hive.svg"></img>
                                        </div>
                                    })}
                                </div>
                            })}
                        </Carousel>
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
