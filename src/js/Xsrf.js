import React from 'react';
import cookies from 'browser-cookies';
import isNode from './isNode';
import autoBind from 'react-autobind';

class Xsrf extends React.Component {
    constructor (props) {
        super(props);
        autoBind(this);
        this.state = {
            xsrf: ''
        };
    }
    componentWillMount () {
        if (isNode.isBrowser()) {
            const cookie = cookies.get('_xsrf');
            this.setState({
                xsrf: cookie
            });
        }
    }
    render () {
        return (
            <input type='hidden' name='_xsrf' value={this.state.xsrf}/>
        );
    }
}

export default Xsrf;
