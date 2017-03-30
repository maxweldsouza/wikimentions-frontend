import React from 'react';

const Dropdown = ({ isOpen, onClose, className, children }) => {
    return (
        <span
            style={{ display: isOpen ? 'inline' : 'none' }}
            aria-haspopup={true}
            aria-expanded={isOpen}
        >
            {isOpen
                ? <div className="dropdown-overlay" onClick={onClose} />
                : null}
            {isOpen
                ? <div className={className}>
                      {children}
                  </div>
                : null}
        </span>
    );
};

export default Dropdown;
