import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

class ModalInf extends React.Component {

    state = {}

    componentWillReceiveProps(props) {

        this.setState({ showModal: props.showModal, message: props.modalMessage, title: props.modalTitle })
    }

    toggle = () => {

        this.state.showModal = !this.state.showModal
        this.setState({})
        this.props.onHideModal()
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.showModal} toggle={this.toggle} className="register-farm">
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        <section className="modalInf-main">
                            <p>{this.state.message}</p>
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

export default ModalInf