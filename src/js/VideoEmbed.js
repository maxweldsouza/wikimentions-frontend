import React from 'react';
import queryString from 'query-string';
import parseUrl from 'url-parse';
import requests from 'superagent';
import config from './config';
import utils from './utils';
import autoBind from 'react-autobind';

class YoutubeEmbed extends React.Component {
    static get defaultProps () {
        return {
            width: 640,
            height: 390,
            autoplay: true
        };
    }
    render () {
        let embed;
        const parsed = parseUrl(this.props.url);
        if (utils.isYoutubeUrl(this.props.url)) {
            const queryObject = queryString.parse(parsed.query);
            const autoplay = this.props.autoplay ? '?autoplay=1' : '';
            embed = <iframe
                id='ytplayer'
                type='text/html'
                width={this.props.width}
                height={this.props.height}
                src={`https://www.youtube.com/embed/${queryObject.v}${autoplay}`} frameBorder={0}></iframe>;
        } else {
            return null;
        }
        if (!this.props.embeddable) {
            return null;
        }
        return (
            <div className='flex-video widescreen'>
                {embed}
            </div>
        );
    }
}

export default YoutubeEmbed;
