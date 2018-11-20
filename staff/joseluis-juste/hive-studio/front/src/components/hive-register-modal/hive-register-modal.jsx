import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import GoogleMapReact from 'google-map-react';

class HiveRegisterModal extends React.Component {

    state = { hive_loc:{}, modal: false }

    constructor(props) {
        super(props);
        this.valuesForm = []
        this.valuesBeeVol = []
        for(let i=1;i<=100;i++){
            this.valuesForm.push(i)
        }
        for(let i=1;i<=10;i++){
            this.valuesBeeVol.push(i)
        }
    }

    setMapInstance = ({ map, maps }) => {

        this.map = map
        this.mapsApi = maps
        this.map.markers = []
    }

    componentWillReceiveProps(props) {
        this.setState({ modal: props.showModal })
    }

    toggle = () => {

        this.props.onShowHideModal()
    }


    handleMapClick = ({ x, y, lat, lng, event }) => {

        this.map.markers.forEach(marker =>{
            marker.setMap(null)
        })
        this.setState({ hive_loc: {lat:lat, lng:lng }})
        let marker = new this.mapsApi.Marker({
            position: { lat: lat, lng: lng },
            map:this.map,
            icon:require('../../assets/img/hive.ico')
        });
        this.map.markers.push(marker)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-hive">
                    <ModalHeader toggle={this.toggle}>New Hive</ModalHeader>
                    <ModalBody>
                        <section className="register-hive-main">
                            <section className="register-hive-main__map">
                                <GoogleMapReact
                                    defaultCenter={{ lat: 28.4, lng: -16.3 }}
                                    defaultZoom={8}
                                    bootstrapURLKeys={{ key: "AIzaSyDMgVAMQ3l51fT-suy2MOTswccssoOCuJ4", language: 'es', region: 'es' }}
                                    onClick={this.handleMapClick}
                                    onGoogleApiLoaded={this.setMapInstance}>

                                </GoogleMapReact>
                            </section>
                            <section className="register-hive-main__form">
                                <form className="form">
                                    <div className="form-group-field">
                                        <label>Hive name</label>
                                        <input type="text" name="name" placeholder="Hive name..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Hive description</label>
                                        <textarea name="description" placeholder="Hive description..."></textarea>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min Temperature</label>
                                        <select name="mintemperature">
                                            {this.valuesForm.map(val =>{return <option value={val}>{`${val}º`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max Temperature</label>
                                        <select name="maxtemperature">
                                            {this.valuesForm.map(val =>{return <option value={val}>{`${val}º`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min humidity</label>
                                        <select name="minhumidity">
                                            {this.valuesForm.map(val =>{return <option value={val}>{`${val}%`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max humidity</label>
                                        <select name="maxhumidity">
                                            {this.valuesForm.map(val =>{return <option value={val}>{`${val}%`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min bees volume</label>
                                        <select name="minbeevolume">
                                            {this.valuesBeeVol.map(val =>{return <option value={val}>{`${val * 10000}`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max bees volume</label>
                                        <select name="maxbeevolume">
                                            {this.valuesBeeVol.map(val =>{return <option value={val}>{`${val * 10000}`}</option>})}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Latitude</label>
                                        <input readonly="true" value={this.state.hive_loc.lat} type="text" name="latitude" placeholder="Latitude..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Longitude</label>
                                        <input readonly="true" value={this.state.hive_loc.lng} type="text" name="longitude" placeholder="Longitude..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <button>Send...</button>
                                    </div>
                                </form>
                            </section>

                        </section>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.toggle}>Close</button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}

export default HiveRegisterModal