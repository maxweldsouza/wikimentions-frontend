import React from 'react';
import config from './config';

class Share extends React.Component {
    getInitialState () {
        return {
            open: false
        };
    }
    render () {
        return (
            <div>
                <div className='button-group small'>
                    <a
                        role='button'
                        href={`http://www.facebook.com/sharer/sharer.php?u=${config.url}${this.props.path}&title=${this.props.title}`}
                        className='button'
                        style={{'background': '#3b5998'}}>
                        <span className='ion-social-facebook'/>  Share
                    </a>
                    <a
                        role='button'
                        href={`http://twitter.com/intent/tweet?status=${this.props.title}+${config.url}${this.props.path}`}
                        className='button'
                        style={{'background': '#55aace'}}>
                        <span className='ion-social-twitter'/>  Tweet
                    </a>
                </div>
            </div>
        );
    }
}

export default Share;
