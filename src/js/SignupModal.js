var React = require('react');
var Modal = require('react-modal');

var Signup = require('./Signup');

var SignupModal = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false,
        };
    },
    onOpenModal () {
        this.setState({
            modalIsOpen: true
        });
    },
    closeModal () {
        this.setState({modalIsOpen: false});
    },
    render () {
        return (
            <a onClick={this.onOpenModal}>
                Sign up
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <h1>Sign up</h1>
                        You will be user #TODO if you sign up now
                        <Signup />
                    </div>
                </Modal>
            </a>
        );
    }
});

module.exports = SignupModal;
