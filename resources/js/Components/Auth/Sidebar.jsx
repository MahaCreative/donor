import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import NavLink from '../Guest/NavLink';
import DropdownMenu from '../Guest/DropdownMenu';
export default function Sidebar({ open = false, setOpen, label }) {
    const [toggler, setToggler] = useState(false);

    return (
        <div
            className={clsx(
                open ? '' : '-translate-x-[1000px] md:-translate-x-[1000px]',
                'duration-1000  ease-in-out transition-all fixed top-0 left-0 bg-gray-900/20 backdrop-blur-sm min-h-screen w-[85%] md:w-[45%] lg:w-[25%] z-[9999] py-2.5 px-4 border-r border-dashed border-gray-700/50'
            )}
        >
            <div className='flex justify-between text-white border-b border-dashed border-gray-600 py-1.5 items-center'>
                <div className='text-white font-bold text-2xl'>SisDonor</div>
                <svg
                    onClick={(event) => setOpen(false)}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='flex justify-end hover:cursor-pointer hover:text-blue-800 duration-300 ease-linear transition w-6 h-6'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            </div>
            <div className='py-3'>
                <NavLink className={'block'} href={route('dashboard')}>
                    Dashboard
                </NavLink>
                <NavLink
                    className={'block'}
                    href={route('admin-registrasi-donor')}
                >
                    Data Registrasi Pendonor
                </NavLink>
                <NavLink className={'block'} href={route('admin-event-donor')}>
                    Data Event Donor
                </NavLink>
                <NavLink className={'block'} href={route('proses-donor')}>
                    Proses Registrasi Donor
                </NavLink>
                {/* <NavLink className={'block'} href={route('admin-data-pendonor')}>
                    Permintaan Darah
                </NavLink> */}
                <NavLink className={'block'} href={route('admin-data-pendonor')}>
                    Nama Pendonor
                </NavLink>
                <NavLink className={'block'} href={route('data-darah')}>
                    Data Darah
                </NavLink>
                {/* <NavLink className={'block'} href={route('home')}>
                    History Registrasi Donor
                </NavLink>
                <NavLink className={'block'} href={route('home')}>
                    History Data Darah
                </NavLink> */}
            </div>
        </div>
    );
}
