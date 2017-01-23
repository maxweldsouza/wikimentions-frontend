import React from 'react';
import Modal from './Modal';
import Signup from './Signup';

class SignupModal extends React.Component {
    getInitialState () {
        return {
            modalIsOpen: false
        };
    }
    onOpenModal (e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    }
    closeModal () {
        this.setState({modalIsOpen: false});
    }
    render () {
        return (
            <span>
                <a onClick={this.onOpenModal}>Sign Up</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <h1>Sign Up</h1>
                        <Signup />
                    </div>
                </Modal>
            </span>
        );
    }
}

export default SignupModal;
