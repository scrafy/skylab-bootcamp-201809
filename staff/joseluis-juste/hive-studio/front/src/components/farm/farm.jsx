import React, { Component } from 'react';
import FarmRegisterModal from '../farm-register-modal/farm-register-modal'
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import Hive from '../hive/hive'
import { Carousel } from 'react-responsive-carousel'

class Farm extends Component {

    state = { 
        selectedSlide:0, 
        farms: [], 
        showPanelControl: false, 
        showHiveModal:false,
        showRegisterModal:false,
        registerModalTitle:"", 
        registerHiveTitle:"", 
        farm:{},
        validationHiveErrors:{},
        validationFarmErrors:{}
    }

    constructor(props){
        super(props)
        this.sent = false
    }


    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleDropFarmEvent = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-farm") {
            this.setState({ showRegisterModal: !this.state.showRegisterModal, registerModalTitle:"New Farm" })
            this.state.farms.push({id:Date.now(), name:"farm1" + Date.now(), description:"desc", minhives:5, square_meters:50, maxhives:10, hives: [{
                id:Date.now(),
                name:"hive1",
                description:"desc hive",
                mintemperature:1,
                maxtemperature:5,
                minhumidity:5,
                maxhumidity:10,
                beeminvolume:30000,
                beemaxvolume:20000,
                latitude:28.4,
                longitude:-16.3
            }] })
            this.setState({ farms: this.state.farms })
        }
    }

    handleDropHiveEvent = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-hive") {
            this.setState({ showHiveModal: !this.state.showHiveModal, registerHiveTitle:"New Hive"})
            this.state.farms[this.state.selectedSlide].hives.push("asd")
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

    handleTogglePanelControl = () => {

        this.setState({ showPanelControl: !this.state.showPanelControl })
    }

    handleTogglePanelControl = () => {

        this.state.showPanelControl = !this.state.showPanelControl ? "top-0" : "";
        this.setState({ showPanelControl: this.state.showPanelControl })
    }

    handleDragEvent = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    handleSliderChange = (ev) => {

        this.setState({ selectedSlide: ev })

    }

    handleDeleteFarm = (ev) =>{
        alert("delete")
    }

    handleEditFarm = (ev) =>{
        
        if(this.state.farms.length){
           
            const farm = this.state.farms.find(farm => farm.id === Number(ev.target.id))
            if (!farm)
                return
            this.setState({farm:farm, showRegisterModal: !this.state.showRegisterModal, registerModalTitle:"Edit Farm" })
        }
       
    }

    handleSubmitHive = (form_data) => {
        //enviar al api, si la respuesta ha sido ok desde el api, llamar otra vez para obtener los datos y hacer un setstate de ese hive concreto
        //si hay errores de validacion
            if (!this.sent){
                this.setState({validationHiveErrors:{name:"Error en el nombre"}})
                this.sent = true
            }
            else
                this.setState({validationHiveErrors:{}})
            
        //else
            //this.handleShowHideHiveModal()
    }

    handleSubmitFarm = (form_data) =>{
        console.log(form_data)
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
                    <FarmRegisterModal onSubmitFarm={this.handleSubmitFarm} farm={this.state.farm} title={this.state.registerModalTitle} onShowHideModal={this.handleShowHideRegisterModal} showModal={this.state.showRegisterModal}></FarmRegisterModal>
                    <HiveRegisterModal validationErrors = {this.state.validationHiveErrors} onSubmitHive={this.handleSubmitHive} title={this.state.registerHiveTitle} onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
                    <Carousel selectedItem={this.state.selectedSlide} onChange={(ev) => this.handleSliderChange(ev)} showThumbs={false}>
                        {this.state.farms.map(farm => {
                            return <div className="farms-area__item" onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropHiveEvent}>
                                <div className="farms-area__item__panel-control">
                                    <div onClick={(ev) => this.handleDeleteFarm(ev)} className="icon-trash-o"></div>
                                    <div id={farm.id} onClick={(ev) => this.handleEditFarm(ev)} className="icon-pencil"></div>
                                </div>
                                {farm.hives.map(hive => { return <Hive hive={hive}></Hive> })}
                            </div>
                        })}
                    </Carousel>
                </section>}
            </section>

        );
    }
}

export default Farm


