var React = require('react');

var Dropdown = React.createClass({
    render () {
        return (
            <span style={{display: this.props.isOpen ? 'initial' : 'none'}}>
                {this.props.isOpen ? <div
                    className='dropdown-overlay'
                    onClick={this.props.onClose}>
                </div> : null}
                {this.props.isOpen ? <div className={this.props.className}>
                    {this.props.children}
                </div> : null}
            </span>
        );
    }
});

module.exports = Dropdown;
