import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import ServiceBackEnd from '../../logic/Service'
import ValidationError from '../../logic/exceptions/validationexception'


class FarmRegisterModal extends React.Component {

    state = {

        title: "",
        isUpdate: this.props.isUpdateFarm,
        modal: false,
        form_data: {

            name: "",
            description: "",
            minhives: 1,
            maxhives: 100,
            squaremeters: ""
        },
        validationErrors: {},
        message: "",
        message_color: "green",
    }

    constructor(props) {

        super(props);
        this.valuesForm = []
        for (let i = 1; i <= 100; i++) {
            this.valuesForm.push(i)
        }
        this.service = new ServiceBackEnd()
    }

       
    componentWillReceiveProps(props) {
        
        if (props.isUpdateFarm){
            
            this.service.findFarm(props.farmId).then(res => {
                
                this.setState({isUpdate: props.isUpdateFarm, modal: props.showModal, title: "Edit Farm", form_data:res.data })
             })
             .catch(err => {
     
                 this.setState({ isUpdate: props.isUpdateFarm, modal: props.showModal, title: "Edit Farm", message:err.message, message_color:"red"}, () => {

                     setTimeout(() => {

                        this.setState({ message:"", message_color:"green"})

                     }, 3000)
                 })
             })
        }
        else
            this.setState({ isUpdate: props.isUpdateFarm, modal: props.showModal, title: "New Farm" })
    }

    resetComponent = () => {
        
        this.state.form_data = { name: "", description: "", minhives: 1, maxhives: 100, squaremeters: "" }
        
        this.setState({ validationErrors: {}, form_data: this.state.form_data, message_color: "green", message: "" })
    }

    toggle = () => {
        
        this.resetComponent()
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

        this.state.form_data.squaremeters = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleOnChangeName = (ev) => {

        this.state.form_data.name = ev.target.value
        this.setState({ form_data: this.state.form_data })
    }

    handleSubmitForm = () => {

        if (this.state.isUpdate) {

            this.service.updateFarm(this.state.form_data).then(res => {

                this.props.onCreatedAndEdited()
                this.setState({ message: "The farm has been updated correctly...", message_color: "green", validationErrors: {} }, () => {

                    setTimeout(() => this.setState( {message:""} ), 3000)
                })

            }).catch(err => {

                if (err instanceof ValidationError) {
                    let errors = {}
                    err.validationErrors.forEach(error => {
                        errors[error.field] = error.message
                    });
                    this.setState({ validationErrors: errors, message: "Exists validation errors...", message_color: "red" }, () => {

                        setTimeout(() => this.setState({ message: "", message_color: "green" }), 3000)
                    })
                } else {

                    this.setState({ message: err.message, message_color: "red" }, () => {
                        setTimeout(() => this.setState({ message: "", message_color: "green" }), 3000)
                    })
                }
            })

        } else {

            this.service.createFarm(this.state.form_data).then(res => {

                this.props.onCreatedAndEdited()
                this.setState({ message: "The farm has been created correctly...", message_color: "green", validationErrors: {} }, () => {

                    setTimeout(() => this.resetComponent(), 3000)
                })

            }).catch(err => {

                if (err instanceof ValidationError) {
                    let errors = {}
                    err.validationErrors.forEach(error => {
                        errors[error.field] = error.message
                    });
                    this.setState({ validationErrors: errors, message: "Exists validation errors...", message_color: "red" }, () => {

                        setTimeout(() => this.setState({ message: "", message_color: "green" }), 3000)
                    })
                } else {

                    this.setState({ message: err.message, message_color: "red" }, () => {
                        setTimeout(() => this.setState({ message: "", message_color: "green" }), 3000)
                    })
                }
            })
        }

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="register-farm">
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        <section className="register-farm-main">
                            <section className="register-farm-main__form">
                                <h2 style={{ color: this.state.message_color }}>{this.state.message}</h2>
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
                                        <label>Square meters</label>
                                        <input value={this.state.form_data.squaremeters} onChange={(ev) => { this.handleOnChangeSquareMeters(ev) }} type="number" name="squaremeters" placeholder="Square meters..."></input>
                                        <small class="text-danger">{this.state.validationErrors["squaremeters"]}</small>
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