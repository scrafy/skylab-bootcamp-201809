import React, { Component } from 'react';

class Hive extends Component {

    state = {showPanelControlHive:""}

    
    handleShowPanelControlHive = (ev) =>{

        this.state.showPanelControlHive = this.state.showPanelControlHive ? "" : "show-panel-control-hive";
        this.setState({showPanelControlHive:this.state.showPanelControlHive})
    }

    handleDropBeeEvent = (ev) => {
        var data = ev.dataTransfer.getData("text");
        if (data === "item-bee") {
            
        }        
    }

    handleDragOverEvent = (ev) => {
        ev.preventDefault();

    }

    handleDeleteHive = (ev) =>{
        
    }   

    handleEditHive = (ev) =>{
       
    }

    render() {
        return (
            <div onClick={this.handleShowPanelControlHive} onDragOver={(ev) => this.handleDragOverEvent(ev)} onDrop={this.handleDropBeeEvent} className="farms-area__item__hive">
                <img src="img/hive.svg"></img>
                <div id="" className={`farms-area__item__hive_controls ${this.state.showPanelControlHive}`}>
                    <div id="" onClick={(ev) => this.handleDeleteHive(ev)} className="icon-trash-o"></div>
                    <div onClick={(ev) => this.handleEditHive(ev)} className="icon-pencil"></div>
                    <div className="icon-monitor"></div>
                </div>
            </div>
        );
    }
}

export default Hive


