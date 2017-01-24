import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import autoBind from 'react-autobind';

class IpWarning extends React.Component {
    render () {
        let loggedin;
        if (this.props.loggedin) {
            return null;
        }
        return (
            <div className='callout warning'>
                Your IP address will be recorded and publicly visible. Alternatively you can <LoginModal/> / <SignupModal/>.
            </div>
        );
    }
}

export default IpWarning;
