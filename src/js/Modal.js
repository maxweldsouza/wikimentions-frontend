import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

const Modal = ({ isOpen, overlayClassName, onClose, className, children }) => {
    return (
        <span style={{ display: isOpen ? 'inline' : 'none' }} role="dialog">
            <VelocityTransitionGroup
                enter={{ animation: 'fadeIn' }}
                leave={{ animation: 'fadeOut' }}
            >
                {isOpen
                    ? <div className={overlayClassName} onClick={onClose} />
                    : null}
            </VelocityTransitionGroup>
            <VelocityTransitionGroup
                enter={{ animation: 'fadeIn' }}
                leave={{ animation: 'fadeOut' }}
            >
                <div className={className} role="document">
                    <div
                        className="ion-close modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    />
                    {children}
                </div>
            </VelocityTransitionGroup>
        </span>
    );
};

export default Modal;
