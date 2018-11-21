import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import GoogleMapReact from 'google-map-react';

class HiveRegisterModal extends React.Component {

    state = {
        title: this.props.title,
        modal: false,
        form_data: {
            name: "",
            description: "",
            mintemperature: 1,
            maxtemperature: 100,
            minhumidity: 1,
            maxhumidity: 100,
            beeminvolume: 10000,
            beemaxvolume: 100000,
            latitude: "",
            longitude: ""

        },
        validationErrors: {}
    }

    constructor(props) {
        super(props);
        this.valuesForm = []
        this.valuesBeeVol = []
        for (let i = 1; i <= 100; i++) {
            this.valuesForm.push(i)
        }
        for (let i = 1; i <= 10; i++) {
            this.valuesBeeVol.push(i)
        }
    }

    componentWillReceiveProps(props) {

        /*if (props.hive) {

            if (props.validationErrors)
                this.state.validationErrors = props.validationErrors
            else
                this.state.validationErrors = {}

            this.setState({ form_data: props.hive, modal: props.showModal, title: props.title, validationErrors: this.state.validationErrors })
        }
        else {
            if (props.validationErrors)
                this.state.validationErrors = props.validationErrors
            else
                this.state.validationErrors = {}

            this.setState({ modal: props.showModal, title: props.title, validationErrors: this.state.validationErrors })
        }*/
        if (props.hive)

            this.setState({ form_data: props.hive, modal: props.showModal, title: props.title, validationErrors: props.validationErrors }) 
        else
            this.setState({ modal: props.showModal, title: props.title, validationErrors: props.validationErrors })

    }

    setMapInstance = ({ map, maps }) => {

        this.map = map
        this.mapsApi = maps
        this.map.markers = []
        if (this.state.form_data)
            this.handleMapClick({ x: 0, y: 0, lat: this.state.form_data.latitude, lng: this.state.form_data.longitude, event: null })
    }

    toggle = () => {

        this.props.onShowHideModal()
    }


    handleMapClick = ({ x, y, lat, lng, event }) => {

        this.map.markers.forEach(marker => {
            marker.setMap(null)
        })
        this.state.form_data.latitude = lat;
        this.state.form_data.longitude = lng;
        this.setState({ form_data: this.state.form_data })
        let marker = new this.mapsApi.Marker({
            position: { lat: lat, lng: lng },
            map: this.map,
            icon: require('../../assets/img/hive.ico')
        });
        this.map.markers.push(marker)
    }

    handleOnChangeName = (ev) => {

        this.state.form_data.name = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeDescription = (ev) => {

        this.state.form_data.description = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMinTemp = (ev) => {

        this.state.form_data.mintemperature = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMaxTemp = (ev) => {

        this.state.form_data.maxtemperature = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMinHumidity = (ev) => {

        this.state.form_data.minhumidity = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMaxHumidity = (ev) => {

        this.state.form_data.maxhumidity = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMinBeeVolume = (ev) => {

        this.state.form_data.beeminvolume = Number(ev.target.value)
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMaxBeeVolume = (ev) => {

        this.state.form_data.beemaxvolume = Number(ev.target.value)
        this.setState({ form_data: this.state.form_data })
    }

    handleSubmit = () => {

        this.props.onSubmitHive(this.state.form_data)
        
        
        if (Object.keys(this.state.validationErrors).length !== 0 && this.state.validationErrors.constructor === Object){
            this.state.form_data = {

                name: "",
                description: "",
                mintemperature: 1,
                maxtemperature: 100,
                minhumidity: 1,
                maxhumidity: 100,
                beeminvolume: 10000,
                beemaxvolume: 100000,
                latitude: "",
                longitude: ""

            }
            this.map.markers.forEach(marker => {
                marker.setMap(null)
            })

        }
        this.setState({ form_data: this.state.form_data })
        //this.toggle()
    }

    render() {

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-hive">
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
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
                                <form className="form" onSubmit={(ev) => ev.preventDefault()}>
                                    <div className="form-group-field">
                                        <label>Hive name</label>
                                        <input value={this.state.form_data.name} onChange={(ev) => { this.handleOnChangeName(ev) }} type="text" name="name" placeholder="Hive name..."></input>
                                        <small class="text-danger">{this.state.validationErrors["name"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Hive description</label>
                                        <textarea value={this.state.form_data.description} onChange={(ev) => { this.handleOnChangeDescription(ev) }} name="description" placeholder="Hive description..."></textarea>
                                        <small class="text-danger">{this.state.validationErrors["description"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min Temperature</label>
                                        <select onChange={(ev) => { this.handleOnChangeMinTemp(ev) }} name="mintemperature">
                                            {this.valuesForm.map(val => {
                                                if (val == this.state.form_data.mintemperature)
                                                    return <option selected value={val}>{`${val}º`}</option>
                                                else
                                                    return <option value={val}>{`${val}º`}</option>

                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max Temperature</label>
                                        <select onChange={(ev) => { this.handleOnChangeMaxTemp(ev) }} name="maxtemperature">
                                            {this.valuesForm.map(val => {
                                                if (val == this.state.form_data.maxtemperature)
                                                    return <option selected value={val}>{`${val}º`}</option>
                                                else
                                                    return <option value={val}>{`${val}º`}</option>

                                            })}
                                        </select>
                                        <small class="text-danger">{this.state.validationErrors["maxtemperature"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min humidity</label>
                                        <select onChange={(ev) => { this.handleOnChangeMinHumidity(ev) }} name="minhumidity">
                                            {this.valuesForm.map(val => {
                                                if (val == this.state.form_data.minhumidity)
                                                    return <option selected value={val}>{`${val}%`}</option>
                                                else
                                                    return <option value={val}>{`${val}%`}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max humidity</label>
                                        <select onChange={(ev) => { this.handleOnChangeMaxHumidity(ev) }} name="maxhumidity">
                                            {this.valuesForm.map(val => {
                                                if (val == this.state.form_data.maxhumidity)
                                                    return <option selected value={val}>{`${val}%`}</option>
                                                else
                                                    return <option value={val}>{`${val}%`}</option>
                                            })}
                                        </select>
                                        <small class="text-danger">{this.state.validationErrors["maxhumidity"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min bees volume</label>
                                        <select onChange={(ev) => { this.handleOnChangeMinBeeVolume(ev) }} name="beeminvolume">
                                            {this.valuesBeeVol.map(val => {
                                                if (val * 10000 == this.state.form_data.beeminvolume)
                                                    return <option selected value={val * 10000}>{`${val * 10000}`}</option>
                                                else
                                                    return <option value={val * 10000}>{`${val * 10000}`}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max bees volume</label>
                                        <select onChange={(ev) => { this.handleOnChangeMaxBeeVolume(ev) }} name="beemaxvolume">
                                            {this.valuesBeeVol.map(val => {
                                                if (val * 10000 == this.state.form_data.beemaxvolume)
                                                    return <option selected value={val * 10000}>{`${val * 10000}`}</option>
                                                else
                                                    return <option value={val * 10000}>{`${val * 10000}`}</option>
                                            })}
                                        </select>
                                        <small class="text-danger">{this.state.validationErrors["beemaxvolume"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Latitude</label>
                                        <input readonly="true" value={this.state.form_data.latitude} type="text" name="latitude" placeholder="Latitude..."></input>
                                        <small class="text-danger">{this.state.validationErrors["latitude"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Longitude</label>
                                        <input readonly="true" value={this.state.form_data.longitude} type="text" name="longitude" placeholder="Longitude..."></input>
                                        <small class="text-danger">{this.state.validationErrors["longitude"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <button onClick={this.handleSubmit}>Send...</button>
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