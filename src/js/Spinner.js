import React from 'react';

const Spinner = React.createClass({
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

export default Spinner;
