import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

class FarmRegisterModal extends React.Component {

    state = { farm_loc: {}, modal: false }

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(props) {
        this.setState({ modal: props.showModal })
    }

    toggle = () => {

        this.props.onShowHideModal()
    }


    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-farm">
                    <ModalHeader toggle={this.toggle}>New Farm</ModalHeader>
                    <ModalBody>
                        <section className="register-farm-main">
                            <section className="register-farm-main__form">
                                <form className="form">
                                    <div className="form-group-field">
                                        <label>Farm name</label>
                                        <input type="text" name="name" placeholder="Farm name..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Farm description</label>
                                        <textarea name="description" placeholder="Farm description..."></textarea>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min hives</label>
                                        <input type="text" name="minhives" placeholder="Min hives..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max hives</label>
                                        <input type="text" name="maxhives" placeholder="Max hives..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Latitude</label>
                                        <input readonly="true" value={this.state.farm_loc.lat} type="text" name="latitude" placeholder="Latitude..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Longitude</label>
                                        <input readonly="true" value={this.state.farm_loc.lng} type="text" name="longitude" placeholder="Longitude..."></input>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Square meter</label>
                                        <input type="text" name="squaremeter" placeholder="Square meters..."></input>
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
            </div >

        );
    }
}

export default FarmRegisterModal