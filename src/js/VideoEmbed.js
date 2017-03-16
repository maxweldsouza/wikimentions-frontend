import React from 'react';
import queryString from 'query-string';
import parseUrl from 'url-parse';
import utils from './utils';

const YoutubeEmbed = ({
    url,
    embeddable,
    width = 640,
    height = 390,
    autoplay = true
}) => {
    let embed;
    const parsed = parseUrl(url);
    if (utils.isYoutubeUrl(url)) {
        const queryObject = queryString.parse(parsed.query);
        embed = <iframe
            id='ytplayer'
            type='text/html'
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${queryObject.v}${autoplay}`} frameBorder={0}></iframe>;
    } else {
        return null;
    }
    if (!embeddable) {
        return null;
    }
    return (
        <div className='flex-video widescreen'>
            {embed}
        </div>
    );
};

export default YoutubeEmbed;
