import React from 'react';

const SubmitButton = ({ submitting, className = 'button', title, onSubmit, confirm }) => {
    if (submitting) {
        return <button
            type='submit'
            className={`${className} loading`}>{title}
        </button>;
    }
    if (confirm === false) {
        return <button type='submit' className={`${className} disabled`} onClick={onSubmit}>{title}</button>;
    }
    return <button type='submit' className={className} onClick={onSubmit}>{title}</button>;
};

export default SubmitButton;
