var React = require('react');
var Modal = require('react-modal');
var cookies = require('browser-cookies');
var Xsrf = require('./Xsrf');
var SubmitButton = require('./SubmitButton');
var requests = require('superagent');

var LoginModal = React.createClass({
    getInitialState () {
        return {
            modalIsOpen: false
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
                        <form action='/api/v1/login' method='post'>
                            <h1>Login</h1>
                            <input type='text' name='username' placeholder='Username' onChange={this.onChangeText}/>
                            <input type='password' name='password' placeholder='Password' onChange={this.onChangeText}/>
                            <SubmitButton title='Login' submitting={this.state.submitting} onSubmit={this.login}/>
                        </form>
                    </div>
                </Modal>
            </a>
        );
    }
});

module.exports = LoginModal;
