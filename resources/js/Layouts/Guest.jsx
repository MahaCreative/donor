import { usePage } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Components/Guest/Navbar';
export default function Guest({ children }) {
    const { flash } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    });
    return (
        <div>
            <Toaster position='bottom-right'></Toaster>
            <Navbar />
            {children}
        </div>
    );
}
InertiaProgress.init();
