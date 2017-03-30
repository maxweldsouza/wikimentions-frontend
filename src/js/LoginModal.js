import React from 'react';
import Modal from './Modal';
import Login from './Login';
import autoBind from 'react-autobind';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            showing: false
        };
    }
    onOpen() {
        this.setState({
            showing: true
        });
    }
    onClose() {
        this.setState({ showing: false });
    }
    render() {
        return (
            <span>
                <a onClick={this.onOpen}>Login</a>
                <Modal
                    isOpen={this.state.showing}
                    onClose={this.onClose}
                    className="modal-content modal-small"
                    overlayClassName="modal-overlay"
                >
                    <div className="small-12 columns">
                        <Login onLogin={this.onClose} />
                    </div>
                </Modal>
            </span>
        );
    }
}

export default LoginModal;
