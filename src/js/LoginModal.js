var React = require('react');
var Modal = require('react-modal');

var Login = require('./Login');

var LoginModal = React.createClass({
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
                Login
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <Login onLogin={this.closeModal}/>
                    </div>
                </Modal>
            </a>
        );
    }
});

module.exports = LoginModal;
