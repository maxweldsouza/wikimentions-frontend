import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import autoBind from 'react-autobind';

class Modal extends React.Component {
    render () {
        return (
            <span style={{ display: this.props.isOpen ? 'inline' : 'none' }} role='dialog'>
                <VelocityTransitionGroup enter={{ animation: 'fadeIn' }} leave={{ animation: 'fadeOut' }}>
                {this.props.isOpen ? <div
                    className={this.props.overlayClassName}
                    onClick={this.props.onClose}>
                </div> : null}
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{ animation: 'fadeIn' }} leave={{ animation: 'fadeOut' }}>
                <div className={this.props.className} role='document'>
                    <div
                        className='ion-close modal-close'
                        onClick={this.props.onClose}
                        aria-label='Close'></div>
                    {this.props.children}
                </div>
                </VelocityTransitionGroup>
            </span>
        );
    }
}

export default Modal;
