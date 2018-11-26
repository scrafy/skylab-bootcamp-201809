import React, { Component } from 'react';
import FarmRegisterModal from '../farm-register-modal/farm-register-modal'
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import Hive from '../hive/hive'
import { Carousel } from 'react-responsive-carousel'
import ServiceBackEnd from '../../logic/Service'

class Farm extends Component {

    state = {

        selectedSlide: 0,
        farms: [],
        showPanelControl: false,
        showHiveModal: false,
        showRegisterModal: false,
        registerModalTitle: "",
        registerHiveTitle: "",
        farm: {},
        hideHivePanelInf: "",
        hivedata: {data:[]},
        currentHive: ""
    }

    constructor(props) {

        super(props)
        this.service = new ServiceBackEnd()

    }


    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleDropFarmEvent = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-farm") {
            this.setState({ showRegisterModal: !this.state.showRegisterModal, registerModalTitle: "New Farm" })
        }
    }

    handleDropHiveEvent = (ev) => {

        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (data === "item-hive") {
            this.setState({ showHiveModal: !this.state.showHiveModal, registerHiveTitle: "New Hive", farmId: ev.target.id })
        }
    }

    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleShowHideRegisterModal = () => {

        this.state.showRegisterModal = !this.state.showRegisterModal
        this.state.farm = {}

        this.setState({ farm: this.state.farm, showRegisterModal: this.state.showRegisterModal })
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

    handleDeleteFarm = (ev) => {

        this.service.deleteFarm(ev.target.id).then(res => {

            this.getUserFarms()
            this.setState({ selectedSlide: 0 })

        }).catch(err => {

            alert(err.message)
        })
    }

    handleEditFarm = (ev) => {

        this.service.findFarm(ev.target.id).then(res => {

            this.setState({ farm: res.data, showRegisterModal: !this.state.showRegisterModal })

        }).catch(err => {

            alert(err.message)
        })
    }

    handleSubmitHive = (form_data) => {
        //enviar al api, si la respuesta ha sido ok desde el api, llamar otra vez para obtener los datos y hacer un setstate de ese hive concreto
        //si hay errores de validacion
        if (!this.sent) {
            this.setState({ validationHiveErrors: { name: "Error en el nombre" } })
            this.sent = true
        }
        else
            this.setState({ validationHiveErrors: {} })

        //else
        //this.handleShowHideHiveModal()
    }

    componentDidMount() {

        this.getUserFarms()
    }

    getUserFarms = () => {

        this.service.getUserFarms().then(res => {

            this.setState({ farms: res.data })

        }).catch(err => {

            alert(err.message)
        })
    }

    handleClosePanelInf = () => {


        this.state.hideHivePanelInf = ""
        this.setState({ hivedata:{data:[]}, currentHive: "", hideHivePanelInf: this.state.hideHivePanelInf })
    }

    handleShowPanelMonitor = (hiveId) => {


        if (this.state.hideHivePanelInf === "") {
            this.state.hideHivePanelInf = "hide-hive-info"
            this.setState({ currentHive: hiveId, hideHivePanelInf: this.state.hideHivePanelInf })
        }
    }

    handleGetDataFromServer = (data) => {

        if (data.hiveId === this.state.currentHive) {
            data.data = data.data.reverse()
            this.setState({ hivedata: data })
        }
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
                    <section className={`hive-info ${this.state.hideHivePanelInf}`}>
                        <section className="hive-info__main">
                            <button onClick={this.handleClosePanelInf}>Close panel</button>
                            
                            {this.state.hivedata.data.map(hivedata => {
                                return <ul>
                                    <li><span>Temperature: </span><span style={{ color: hivedata.temperature.color }}>{hivedata.temperature.value}</span></li>
                                    <li><span>Humidity: </span><span style={{ color: hivedata.humidity.color }}>{hivedata.humidity.value}</span></li>
                                    <li><span>BeeVolume: </span><span style={{ color: hivedata.beevolume.color }}>{hivedata.beevolume.value}</span></li>
                                </ul>
                            })}

                        </section>
                    </section>
                    <audio autoPlay loop></audio>
                    <FarmRegisterModal farm={this.state.farm} onCreatedAndEdited={this.getUserFarms} onShowHideModal={this.handleShowHideRegisterModal} showModal={this.state.showRegisterModal}></FarmRegisterModal>
                    <HiveRegisterModal onCreatedAndEdited={this.getUserFarms} farmId={this.state.farmId} validationErrors={this.state.validationHiveErrors} onSubmitHive={this.handleSubmitHive} title={this.state.registerHiveTitle} onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
                    <Carousel selectedItem={this.state.selectedSlide} onChange={(ev) => this.handleSliderChange(ev)} showThumbs={false}>
                        {this.state.farms.map(farm => {
                            return <div id={farm.id} className="farms-area__item" onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropHiveEvent}>
                                <div className="farms-area__item__panel-control">
                                    <div id={farm.id} onClick={(ev) => this.handleDeleteFarm(ev)} className="icon-trash-o"></div>
                                    <div id={farm.id} onClick={(ev) => this.handleEditFarm(ev)} className="icon-pencil"></div>
                                </div>
                                {farm.hives.map(hive => { return <Hive onGetHiveDataFromServer={this.handleGetDataFromServer} onShowPanelMonitor={this.handleShowPanelMonitor} onDeleteHive={this.getUserFarms} hive={hive}></Hive> })}
                            </div>
                        })}
                    </Carousel>
                </section>}
            </section>

        );
    }
}

export default Farm


