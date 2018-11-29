import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';

class ModalInf extends React.Component {

    state = {

       
    }


    toggle = () => {

    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.showModal} toggle={this.toggle} className="register-farm">
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>
                        <section className="modalInf-main">
                            <p>{this.props.message}</p>
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