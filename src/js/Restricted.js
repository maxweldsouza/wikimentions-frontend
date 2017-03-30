import React from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Restricted = (
    {
        message = <span>You need to <LoginModal /> / <SignupModal /></span>,
        min_level = 0,
        level = 1,
        loggedin,
        children
    }
) => {
    let allowed;
    if (min_level === 0) {
        allowed = true;
    } else if (min_level === 1) {
        allowed = loggedin;
    } else {
        allowed = level >= min_level;
    }
    if (allowed) {
        return (
            <div>
                {children}
            </div>
        );
    }
    return (
        <div>
            {message}
        </div>
    );
};

export default Restricted;
