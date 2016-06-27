var React = require('react');
var Modal = require('./Modal');

var Login = require('./Login');

var LoginModal = React.createClass({
    getInitialState () {
        return {
            showing: false,
        };
    },
    onOpen (e) {
        this.setState({
            showing: true
        });
        e.preventDefault();
    },
    onClose () {
        this.setState({showing: false});
    },
    render () {
        return (
            <span>
                <a onClick={this.onOpen}>Login</a>
                <Modal
                    isOpen={this.state.showing}
                    onClose={this.onClose}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <div className='small-12 columns'>
                        <Login onLogin={this.onClose}/>
                    </div>
                </Modal>
            </span>
        );
    }
});

module.exports = LoginModal;
