import clsx from 'clsx';
import React from 'react';

export default function Container({ className, children, ...props }) {
    return (
        <div
            className={clsx(
                className,
                'px-4 md:px-8 lg:px-16 bgPrimary max-w-screen-2xl flex flex-row md:flex-row items-center justify-between'
            )}
        >
            {children}
        </div>
    );
}
