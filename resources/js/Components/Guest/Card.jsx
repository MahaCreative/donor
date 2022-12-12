import clsx from 'clsx';
import React from 'react';

function Card({ className, children, ...props}) {
    return (
        <div {...props}
            className={clsx(
                className ? className : 'text-white bg-white/20',
                'border border-dashed border-gray-700 pb-2 backdrop-blur-sm rounded-lg shadow-md shadow-gray-800/50 overflow-hidden'
            )}
        >
            <div className={className}>{children}</div>
        </div>
    );
}

function CardHeader({ classHeader, children }) {
    return (
        <div
            className={clsx(
                classHeader,
                'bg-black/40 flex justify-between items-center backdrop-blur-sm py-2.5 px-4 text-white'
            )}
        >
            {children}
        </div>
    );
}
Card.CardHeader = CardHeader;
export default Card;
