var React = require('react');

var Spinner = React.createClass({
    shouldComponentUpdate (nextProps, nextState) {
        return false;
    },
    render () {
        return (
            <div className='spinner spinner-hidden'>
            </div>
        );
    }
});

module.exports = Spinner;
