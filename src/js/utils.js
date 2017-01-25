import _ from 'underscore';
import parseUrl from 'url-parse';
import queryString from 'query-string';

const ellipsis = (s, max) => {
    if (_.isString(s) && s.length > max) {
        return `${s.substring(0, max - 3)}...`;
    }
    return s;
};

const youtubeThumb = (url, size) => {
    const parsed = parseUrl(url);
    let img;
    const sizes = {
        max: 'maxresdefault.jpg',
        large: 'mqdefault.jpg'
    };
    if (!size) {
        size = 'large';
    }
    img = sizes[size];
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
        const queryObject = queryString.parse(parsed.query);
        return `https://i.ytimg.com/vi/${queryObject.v}/${img}`;
    }
};

const isYoutubeUrl = url => {
    const parsed = parseUrl(url);
    return parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com';
};

export default {
    ellipsis,
    youtubeThumb,
    isYoutubeUrl
};
