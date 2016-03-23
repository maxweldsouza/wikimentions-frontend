var React = require('react');

var Video = React.createClass({
    render () {
        return (
            <div className='small-12 columns'>
                <div className='shrink columns'>
                    <img className="" src="/assets/video.png" alt=""/>
                </div>
                <div className='columns'>
                    <a href={'/videos/' + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
                </div>
            </div>
        );
    }
});

module.exports = Video;
