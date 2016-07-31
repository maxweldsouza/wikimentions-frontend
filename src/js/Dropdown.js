var React = require('react');

var Dropdown = React.createClass({
    render () {
        return (
            <span style={{display: this.props.isOpen ? 'initial' : 'none'}} aria-haspopup={true} aria-expanded={this.props.isOpen}>
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
