import React from 'react';

class Dropdown extends React.Component {
    render () {
        return (
            <span style={{display: this.props.isOpen ? 'inline' : 'none'}} aria-haspopup={true} aria-expanded={this.props.isOpen}>
                {this.props.isOpen ? <div
                    className='dropdown-overlay'
                    onClick={this.props.onClose}>
                </div> : null}
                {this.props.isOpen ? <div className={this.props.className}>
                    {this.props.children}
                </div> : null}
            </span>
        );
    }
}

export default Dropdown;
