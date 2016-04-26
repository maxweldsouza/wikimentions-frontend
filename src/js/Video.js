var React = require('react');
var Image = require('./Image');

var Video = React.createClass({
    render () {
        return (
            <div className='small-12 columns'>
                <div className='row video-block'>
                    <div className='shrink columns'>
                        <Image id={this.props.id} md5='0fe24b98591b45e8c5c30423b25cd15a' width='1280' height='720'/>
                    </div>
                    <div className='columns'>
                        <a className='video-title' href={'/videos/' + this.props.id + '/' + this.props.slug}>{this.props.title}</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Video;
