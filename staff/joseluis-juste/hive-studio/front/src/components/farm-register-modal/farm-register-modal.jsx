import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

class FarmRegisterModal extends React.Component {

    state = {title: this.props.title, farm_loc: {}, modal: false, form_data: {}, validationErrors:{} }

    constructor(props) {
        super(props);
        this.valuesForm = []
        for (let i = 1; i <= 100; i++) {
            this.valuesForm.push(i)
        }
    }


    componentWillReceiveProps(props) {
        this.setState({form_data:props.farm, modal: props.showModal, title: props.title })
    }

    toggle = () => {

        this.props.onShowHideModal()
    }

    handleOnChangeName = (ev) => {

        this.state.form_data.name = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeDescription = (ev) => {

        this.state.form_data.description = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMinHives = (ev) => {

        this.state.form_data.minhives = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeMaxHives = (ev) => {

        this.state.form_data.maxhives = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeSquareMeters = (ev) => {

        this.state.form_data.square_meters = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeName = (ev) => {

        this.state.form_data.name = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleSubmitForm = () => {

        this.props.onSubmitFarm(this.state.form_data)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-farm">
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        <section className="register-farm-main">
                            <section className="register-farm-main__form">
                                <form className="form" onSubmit={(ev) => ev.preventDefault()}>
                                    <div className="form-group-field">
                                        <label>Farm name</label>
                                        <input value={this.state.form_data.name} onChange={(ev) => { this.handleOnChangeName(ev) }} type="text" name="name" placeholder="Farm name..."></input>
                                        <small class="text-danger">{this.state.validationErrors["name"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Farm description</label>
                                        <textarea value={this.state.form_data.description} onChange={(ev) => { this.handleOnChangeDescription(ev) }} name="description" placeholder="Farm description..."></textarea>
                                        <small class="text-danger">{this.state.validationErrors["description"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Min hives</label>
                                        <select onChange={(ev) => { this.handleOnChangeMinHives(ev) }} name="minhives">
                                            {this.valuesForm.map(val => {
                                                if (val == this.state.form_data.minhives)
                                                    return <option selected value={val}>{`${val}`}</option>
                                                else
                                                    return <option value={val}>{`${val}`}</option>

                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Max hives</label>
                                        <select onChange={(ev) => { this.handleOnChangeMaxHives(ev) }} name="maxhives">
                                            {this.valuesForm.map(val => {

                                                if (val == this.state.form_data.maxhives)
                                                    return <option selected value={val}>{`${val}`}</option>
                                                else
                                                    return <option value={val}>{`${val}`}</option>
                                            })}
                                        </select>
                                        <small class="text-danger">{this.state.validationErrors["maxhives"]}</small>
                                    </div>
                                    <div className="form-group-field">
                                        <label>Square meter</label>
                                        <input value={this.state.form_data.square_meters} onChange={(ev) => { this.handleOnChangeSquareMeters(ev) }} type="number" name="squaremeter" placeholder="Square meters..."></input>
                                        <small class="text-danger">{this.state.validationErrors["squaremeter"]}</small>    
                                    </div>
                                    <div className="form-group-field">
                                        <button onClick={this.handleSubmitForm}>Send...</button>
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