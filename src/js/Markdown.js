import React from 'react';
import Remarkable from 'remarkable';

import nofollow from './nofollow';
import autoBind from 'react-autobind';

class Markdown extends React.Component {
    constructor() {
        super();
        this.state = { server: true };
    }
    static get defaultProps() {
        return {
            className: 'markdown'
        };
    }
    componentDidMount() {
        import('remarkable')
            .then(Remarkable => {
                const md = new Remarkable({
                    linkify: true
                });
                this.md = md;
                this.setState({ server: false });
            })
            .catch(err => console.log('Failed to load remarkable', err));
    }
    render() {
        if (this.state.server) {
            return null;
        }
        /* This is a dangerous area for security. Make sure
         * you know what you are doing */
        const obj = {
            __html: nofollow(this.md.render(this.props.markdown))
        };
        return (
            <div
                className={this.props.className}
                dangerouslySetInnerHTML={obj}
            />
        ); // eslint-disable-line react/no-danger
    }
}

export default Markdown;
