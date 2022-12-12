import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import Navbar from '../Components/Guest/Navbar';
export default function Guest({ children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
InertiaProgress.init();
