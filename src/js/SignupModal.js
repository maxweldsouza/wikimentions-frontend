var React = require('react');
var Modal = require('./Modal');

var Signup = require('./Signup');

var SignupModal = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false
        };
    },
    onOpenModal (e) {
        this.setState({
            modalIsOpen: true
        });
        e.preventDefault();
    },
    closeModal () {
        this.setState({modalIsOpen: false});
    },
    render () {
        return (
            <span>
                <a onClick={this.onOpenModal}>Sign up</a>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onClose={this.closeModal}
                    className='modal-content modal-small'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <h1>Sign up</h1>
                        You will be user #TODO if you sign up now
                        <Signup />
                    </div>
                </Modal>
            </span>
        );
    }
});

module.exports = SignupModal;
