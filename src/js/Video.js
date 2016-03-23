var React = require('react');

var Video = React.createClass({
    render () {
        return (
            <div className='small-12 columns'>
                <a href={'/videos/' + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
            </div>
        );
    }
});

module.exports = Video;
