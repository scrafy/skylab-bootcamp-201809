import React, { Component } from 'react';
import FarmRegisterModal from '../farm-register-modal/farm-register-modal'
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import Hive from '../hive/hive'
import { Carousel } from 'react-responsive-carousel'
import ServiceBackEnd from '../../logic/Service'
import ModalInf from '../../components/modalInf/modalinf'

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
        hivedata: { data: [] },
        currentHive: {},
        showModal: false,
        modalMessage: "",
        modalTitle: "",
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

            this.state.showModal = true
            this.state.modalMessage = err.message
            this.state.modalTitle = "Error"
            this.setState({})
        })
    }

    handleEditFarm = (ev) => {

        this.service.findFarm(ev.target.id).then(res => {

            this.setState({ farm: res.data, showRegisterModal: !this.state.showRegisterModal })

        }).catch(err => {

            this.state.showModal = true
            this.state.modalMessage = err.message
            this.state.modalTitle = "Error"
            this.setState({})
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

            res.data.sort((a, b) => {

                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0
            })

            this.setState({ farms: res.data })

        }).catch(err => {

            this.state.showModal = true
            this.state.modalMessage = err.message
            this.state.modalTitle = "Error"
            this.setState({})
        })
    }

    handleClosePanelInf = () => {


        this.state.hideHivePanelInf = ""
        this.setState({ hivedata: { data: [] }, currentHive: {}, hideHivePanelInf: this.state.hideHivePanelInf })
    }

    handleShowPanelMonitor = (hive) => {


        if (this.state.hideHivePanelInf === "") {
            this.state.hideHivePanelInf = "hide-hive-info"
            this.setState({ currentHive: hive, hideHivePanelInf: this.state.hideHivePanelInf })
        }
    }

    handleGetDataFromServer = (data) => {

        if (data.hiveId === this.state.currentHive.id) {
            data.data = data.data.reverse()
            this.setState({ hivedata: data })
        }
    }

    setOffshowModalValue = () => {
        this.state.showModal = false
    }

    render() {
        return (
            <section>
                <ModalInf onHideModal={this.setOffshowModalValue} modalTitle={this.state.modalTitle} modalMessage={this.state.modalMessage} showModal={this.state.showModal}></ModalInf>
                <section onClick={this.handleTogglePanelControl} className={`panel-control icon-wrench ${this.state.showPanelControl}`}>
                    <section className="panel-control__items">
                        <div id="item-farm" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                            {false && <img src={require('../../assets/img/honeycomb1.png')} />}
                        </div>
                        <div id="item-hive" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                            {false && <img src={require('../../assets/img/hive.svg')} />}
                        </div>
                        <div id="item-bee" onDragStart={(ev) => this.handleDragEvent(ev)} draggable="true" className="panel-control__item">
                            {false && <img src={require('../../assets/img/bee.png')} />}
                        </div>
                    </section>
                </section>
                {this.state.showPanelControl && <section id="farm-area" onDrop={(ev) => this.handleDropFarmEvent(ev)} onDragOver={(ev) => this.handleDragOverEvent(ev)} className="farms-area">
                    <section className={`hive-info ${this.state.hideHivePanelInf}`}>
                        <section className="hive-info__main">
                            <h2 className="hive-info__main-hiveid">{this.state.hivedata.hiveId}</h2>
                            <button onClick={this.handleClosePanelInf}>Close panel</button>
                            <section className="hive-info__main-detail">
                                <div>
                                    <p>Min temperature: <span>{this.state.currentHive.mintemperature}</span></p>
                                    <p>Max temeprature: <span>{this.state.currentHive.maxtemperature}</span></p>
                                </div>
                                <div>
                                    <p>Min humidity: <span>{this.state.currentHive.minhumidity}</span></p>
                                    <p>Max humidity: <span>{this.state.currentHive.maxhumidity}</span></p>
                                </div>
                                <div>
                                    <p>Min beevolume: <span>{this.state.currentHive.beeminvolume}</span></p>
                                    <p>Max beevolume: <span>{this.state.currentHive.beemaxvolume}</span></p>
                                </div>
                            </section>
                            {this.state.hivedata.data.map(hivedata => {
                                return <ul>
                                    <li><span>Temperature: </span><span style={{ color: hivedata.temperature.color }}>{hivedata.temperature.value}</span></li>
                                    <li><span>Humidity: </span><span style={{ color: hivedata.humidity.color }}>{hivedata.humidity.value}</span></li>
                                    <li><span>BeeVolume: </span><span style={{ color: hivedata.beevolume.color }}>{hivedata.beevolume.value}</span></li>
                                </ul>
                            })}

                        </section>
                    </section>
                    <audio autoPlay loop src={require('../../assets/audio/abeja.mp3')}></audio>
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


