import React, { Component } from 'react';
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import ServiceBackEnd from '../../logic/Service'
import EventsManagement from '../../logic/EventManagement'

class Hive extends Component {

    state = { isMonitored: false, levelInf: "", showPanelControlHive: "", hive: {}, showHiveModal: false, title: "", registeredInf: [] }

    constructor(props) {

        super(props)
        this.service = new ServiceBackEnd()
        const hiveUpdateInfoEventEmitter = EventsManagement.selectSubject("hiveUpdateInfo")
        this.subscription = hiveUpdateInfoEventEmitter.subscribe({ next: this.getHiveIfFromServer, complete: () => console.log("done"), error: err => { console.log(err) } })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe()
    }

    getHiveIfFromServer = (data) => {
        
        let tempcolor = "green"
        let humcolor = "green"
        let beevolcolor = "green"
        let blink_color = "green"
        const _data = JSON.parse(data)
        const hive = _data.hives.find(hive => {

            return hive.hiveId === this.state.hive.id
        })
        if (hive) {

            if (this.state.hive.mintemperature === hive.temperature || this.state.hive.maxtemperature === hive.temperature)
                tempcolor = "orange"

            if (hive.temperature > this.state.hive.maxtemperature || hive.temperature < this.state.hive.mintemperature)
                tempcolor = "red"

            if (this.state.hive.minhumidity === hive.humidity || this.state.hive.maxhumidity === hive.humidity)
                humcolor = "orange"

            if (hive.humidity > this.state.hive.maxhumidity || hive.humidity < this.state.hive.minhumidity)
                humcolor = "red"

            if (this.state.hive.beeminvolume === hive.beevolume || this.state.hive.beemaxvolume === hive.beevolume)
                beevolcolor = "orange"

            if (hive.beevolume > this.state.hive.beemaxvolume || hive.beevolume < this.state.hive.beeminvolume)
                beevolcolor = "red"

            const hiveData = {

                temperature: { color: tempcolor, value: hive.temperature },
                humidity: { color: humcolor, value: hive.humidity },
                beevolume: { color: beevolcolor, value: hive.beevolume }
            }

            for (var key in hiveData) {

                if (hiveData[key].color === "red") {
                    blink_color = "red"
                    break;

                } else if (hiveData[key].color === "orange") {
                    blink_color = "orange"
                }
            }
            if (this.state.isMonitored) {
                if (blink_color === "red")
                    this.state.levelInf = "blink-animation-danger"

                if (blink_color === "orange")
                    this.state.levelInf = "blink-animation-warning"

                if (blink_color === "green")
                    this.state.levelInf = "blink-animation"

                this.setState({})
            }
            this.state.registeredInf.push(hiveData)
            this.props.onGetHiveDataFromServer({ hiveId: this.state.hive.id, hivename: this.state.hive.name, data: this.state.registeredInf })

        }
    }

    handleShowPanelControlHive = (ev) => {

        this.state.showPanelControlHive = this.state.showPanelControlHive ? "" : "show-panel-control-hive";
        this.setState({ showPanelControlHive: this.state.showPanelControlHive })
    }

    handleDropBeeEvent = (ev) => {
        var data = ev.dataTransfer.getData("text");
        if (data === "item-bee") {
            this.state.levelInf = this.state.levelInf ? "" : "blink-animation"
            this.state.isMonitored = true
            this.setState({})
            //llamar al API para desactivar/activar panal
        }
    }

    componentWillReceiveProps(props) {
        if (props.hive) {
            this.setState({ hive: props.hive })

        }
    }

    componentDidMount() {

        this.setState({ hive: this.props.hive })
    }

    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleDeleteHive = (ev) => {

        this.service.deleteHive(ev.target.id).then(res => {
            this.props.onDeleteHive()
        }).catch(err => alert(err.message))
    }

    handleEditHive = (ev) => {

        this.setState({ showHiveModal: !this.state.showHiveModal, title: "Edit Hive" })
    }

    handleShowHideHiveModal = () => {
        this.setState({ showHiveModal: !this.state.showHiveModal, hive: this.state.hive })
    }

    handleShowPanelMonitor = (ev) => {

        if (!this.state.isMonitored)
            alert("The hive is not being monitored")
        else
            this.props.onShowPanelMonitor(this.state.hive.id)

    }

    render() {
        return (
            <div onClick={this.handleShowPanelControlHive} onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropBeeEvent} className={`farms-area__item__hive ${this.state.levelInf}`}>
                <img src={require('../../assets/img/hive.svg')}></img>
                <div className={`farms-area__item__hive_controls ${this.state.showPanelControlHive}`}>
                    <div id={this.state.hive.id} onClick={(ev) => this.handleDeleteHive(ev)} className="icon-trash-o"></div>
                    <div onClick={(ev) => this.handleEditHive(ev)} className="icon-pencil"></div>
                    <div onClick={(ev) => this.handleShowPanelMonitor(ev)} className="icon-monitor"></div>
                </div>
                <HiveRegisterModal title={this.state.title} hive={this.state.hive} onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
            </div>
        );
    }
}

export default Hive

