import React, { Component } from 'react';
import FarmRegisterModal from '../farm-register-modal/farm-register-modal'
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import Hive from '../hive/hive'
import { Carousel } from 'react-responsive-carousel'

class Farm extends Component {

    state = {farms:[], showPanelControl:false}



    handleDragOverEvent = (ev) => {
        ev.preventDefault();

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

    handleShowHideRegisterModal = () => {

        this.setState({ showRegisterModal: !this.state.showRegisterModal })
    }

    handleShowHideHiveModal = () => {

        this.setState({ showHiveModal: !this.state.showHiveModal })
    }

    handleTogglePanelControl = () =>{

        this.setState({showPanelControl:!this.state.showPanelControl})
    }

    render() {
        return (
            <section>
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
                    <audio autoPlay loop src={require(`../../assets/audio/abeja.mp3`)}></audio>
                    <FarmRegisterModal onShowHideModal={this.handleShowHideRegisterModal} showModal={this.state.showRegisterModal}></FarmRegisterModal>
                    <HiveRegisterModal onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
                    <Carousel showThumbs={false}>
                        {this.state.farms.map(farm => {
                            return <div id={Date.now()} className="farms-area__item" onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropHiveEvent}>

                            </div>
                        })}
                    </Carousel>
                </section>}
            </section>

        );
    }
}

export default Farm


