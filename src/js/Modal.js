var React = require('react');
var VelocityTransitionGroup = require('velocity-react').VelocityTransitionGroup;

var Modal = React.createClass({
    render () {
        return (
            <span>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                {this.props.isOpen ? <div
                    className={this.props.overlayClassName}
                    onClick={this.props.onClose}>
                </div> : null}
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{animation: "fadeIn"}} leave={{animation: "fadeOut"}}>
                {this.props.isOpen ? <div className={this.props.className}>
                    {this.props.children}
                </div> : null}
                </VelocityTransitionGroup>
            </span>
        );
    }
});

module.exports = Modal;