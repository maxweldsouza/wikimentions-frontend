var React = require('react');

var Mention = React.createClass({
    render () {
        return (
            <div className='small-12 columns'>
                <div className='row'>
                    <div className='small-12 columns'>
                        <a href='/people/richard-dawkins'>{this.props.mentioner}</a>
                    </div>
                    <div className='small-12 columns'>
                        "{this.props.text}"
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Mention;
