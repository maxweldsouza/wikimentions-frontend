import React from 'react';
import Remarkable from 'remarkable';
const md = new Remarkable({
    linkify: true
});
import nofollow from './nofollow';

class Markdown extends React.Component {
    getDefaultProps () {
        return {
            className: 'markdown'
        };
    }
    render () {
        /* This is a dangerous area for security. Make sure
         * you know what you are doing */
        const obj = {
            __html: nofollow(md.render(this.props.markdown))
        };
        return <div className={this.props.className} dangerouslySetInnerHTML={obj} />;// eslint-disable-line react/no-danger
    }
}

export default Markdown;
