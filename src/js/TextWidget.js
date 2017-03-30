import React from 'react';

const TextWidget = ({ label, value }) => {
    return (
        <div className="small-6 columns">
            <div className="callout text-center">
                <div className="text-widget-label">
                    {label}
                </div>
                <div className="text-widget-value">
                    {value}
                </div>
            </div>
        </div>
    );
};

export default TextWidget;
