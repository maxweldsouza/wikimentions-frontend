var React = require('react');
var Modal = require('./Modal');

var Test = React.createClass({
    getInitialState () {
        return {
            showing: false
        };
    },
    onOpen () {
        this.setState({
            showing: true
        });
    },
    onClose() {
        this.setState({
            showing: false
        });
    },
    render () {
        return (
            <div>
                {this.state.showing ? 'opened' : 'closed'}
                <Modal
                    isOpen={this.state.showing}
                    onClose={this.state.onClose}
                    className='modal-content'
                    overlayClassName='modal-overlay'>
                    <button className='button' onClick={this.onClose}>Close</button>
                </Modal>
                <button className='button' onClick={this.onOpen}>Open</button>
            </div>
        );
    }
});

module.exports = Test;
