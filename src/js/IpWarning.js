import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const IpWarning = ({ loggedin }) => {
    if (!loggedin) {
        return (
            <div className="callout warning">
                Your IP address will be recorded and publicly visible. Alternatively you can
                {' '}
                <LoginModal />
                {' '}
                /
                {' '}
                <SignupModal />
                .
            </div>
        );
    }
    return null;
};

export default IpWarning;
