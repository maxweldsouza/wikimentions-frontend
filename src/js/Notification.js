var React = require('react');

var Notification = React.createClass({
    render () {
        if (this.props.showing) {
            return (
                <div className={'callout ' + this.props.level}>
                    {this.props.message}
                    {this.props.closeable ? <button className="close-button" aria-label="Dismiss alert" type="button" onClick={this.props.onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button> : null}
                </div>
            );
        }
        return null;
    }
});

module.exports = Notification;
