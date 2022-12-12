import clsx from 'clsx';
import React from 'react';

export default function Button({ children, className, ...props }) {
    return (
        <div
            {...props}
            className={clsx(
                className ? className : '',
                'justify-self-start py-2.5 px-4 border shadow-md shadow-gray-400/50 rounded-lg hover:cursor-pointer transition duration-300 ease-in font-bold'
            )}
        >
            {children}
        </div>
    );
}
