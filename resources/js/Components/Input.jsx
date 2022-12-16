import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

function Input({ isFocused, className, errors, ...props }) {
    const input = useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return (
        <>
            <input
                {...props}
                className={clsx(
                    className ? className : '',
                    ' px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full'
                )}
                ref={input}
            />
        </>
    );
}
function Error({ classError, errors }) {
    return (
        <div
            className={clsx(
                classError ? classError : 'text-white',
                'text-sm italic text-red-600'
            )}
        >
            {errors}
        </div>
    );
}
Input.Error = Error;
export default Input;
