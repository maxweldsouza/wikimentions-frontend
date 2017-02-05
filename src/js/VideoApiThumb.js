import React from 'react';
import queryString from 'query-string';
import parseUrl from 'url-parse';
import requests from 'superagent';
import config from './config';
import moment from 'moment';
import utils from './utils';
import autoBind from 'react-autobind';

const humanizeDuration = ptduration => {
    const ms = moment.duration(ptduration).asMilliseconds();
    if (ms >= 3600000) {
        return moment.utc(ms).format('h:mm:ss');
    }
    return moment.utc(ms).format('m:ss');
};

class VideoApiThumb extends React.Component {
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            thumb: '',
            width: 120,
            height: 90,
            duration: ''
        };
    }
    componentDidMount () {
        const parsed = parseUrl(this.props.url);
        let videoId;
        if (this.state.thumb) {
            return;
        }
        if (utils.isYoutubeUrl(this.props.url)) {
            const queryObject = queryString.parse(parsed.query);
            videoId = queryObject.v;
            requests.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&fields=items(contentDetails/duration,snippet/thumbnails/default)&id=${videoId}&key=${config.keys.youtube}`).end((err, res) => {
                if (err) {
                    return;
                }
                try {
                    this.setState({
                        thumb: res.body.items[0].snippet.thumbnails.default.url,
                        width: res.body.items[0].snippet.thumbnails.default.width,
                        height: res.body.items[0].snippet.thumbnails.default.height,
                        duration: humanizeDuration(res.body.items[0].contentDetails.duration)
                    });
                } catch (e) {
                    return;
                }
            });
        }
    }
    render () {
        if (this.state.thumb) {
            return <span className='video-duration-container'>
                <img src={this.state.thumb} width={this.state.width} height={this.state.height} style={this.props.style} alt={this.props.alt}/>
                {this.state.duration ? <span className='video-duration'>{this.state.duration}</span> : null}
            </span>;
        }
        return this.props.children;
    }
}

export default VideoApiThumb;
