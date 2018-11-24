import React, { Component } from 'react';
import HiveRegisterModal from '../hive-register-modal/hive-register-modal'
import ServiceBackEnd from '../../logic/Service'


class Hive extends Component {

    state = { enabledHive:"", showPanelControlHive:"", hive:{}, showHiveModal:false, title:"" }

    constructor(props){

        super(props) 
        this.service = new ServiceBackEnd()      
    }

    handleShowPanelControlHive = (ev) => {

        this.state.showPanelControlHive = this.state.showPanelControlHive ? "" : "show-panel-control-hive";
        this.setState({showPanelControlHive:this.state.showPanelControlHive})
    }

    handleDropBeeEvent = (ev) => {
        var data = ev.dataTransfer.getData("text");
        if (data === "item-bee") {
            this.state.enabledHive = this.state.enabledHive ? "" : "blink-animation"
            this.setState({enabledHive:this.state.enabledHive})
            //llamar al API para desactivar/activar panal
        }        
    }

    componentWillReceiveProps(props){
        if (props.hive){
            this.setState({hive:props.hive})
            debugger
        }
    }

    componentDidMount(){
        
        this.setState({hive:this.props.hive})
    }
    
    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleDeleteHive = (ev) =>{

        this.service.deleteHive(ev.target.id).then( res => {
            this.props.onDeleteHive()
        }).catch(err => alert(err.message))
    }   

    handleEditHive = (ev) =>{

        this.setState({ showHiveModal: !this.state.showHiveModal, title:"Edit Hive"})
    }

    handleShowHideHiveModal = () =>{
        this.setState({ showHiveModal: !this.state.showHiveModal, hive:this.state.hive })
    }

    render() {
        return (
            <div onClick={this.handleShowPanelControlHive} onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropBeeEvent} className={`farms-area__item__hive ${this.state.enabledHive}`}>
                <img src={require('../../assets/img/hive.svg')}></img>
                <div className={`farms-area__item__hive_controls ${this.state.showPanelControlHive}`}>
                    <div id={this.state.hive.id} onClick={(ev) => this.handleDeleteHive(ev)} className="icon-trash-o"></div>
                    <div onClick={(ev) => this.handleEditHive(ev)} className="icon-pencil"></div>
                    <div className="icon-monitor"></div>
                </div>
                <HiveRegisterModal title={this.state.title} hive={this.state.hive} onShowHideModal={this.handleShowHideHiveModal} showModal={this.state.showHiveModal}></HiveRegisterModal>
            </div>
        );
    }
}

export default Hive

