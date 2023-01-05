import { Menu } from '@headlessui/react';
import { usePage } from '@inertiajs/inertia-react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Components/Auth/Sidebar';
import Button from '../Components/Button';
import DropdownMenu from '../Components/Guest/DropdownMenu';
import NavLink from '../Components/Guest/NavLink';

export default function Backend({ children }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;
    const { flash } = usePage().props;
    const { imbox_pendonor } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    });

    return (
        <div className=''>
            <Toaster position='bottom-right'></Toaster>
            <Sidebar open={open} setOpen={setOpen} />
            <div>
                <div className=''>
                    <div
                        className={clsx(
                            open ? '' : '',
                            'px-4 flex justify-between items-center py-1.5 bg-gray-900/20 shadow-md shadow-gray-900/50 bgPrimary border-b border-dashed border-gray-500'
                        )}
                    >
                        <svg
                            onClick={() => setOpen(!open)}
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-10 h-10 text-white hover:cursor-pointer hover:text-blue-900'
                        >
                            {' '}
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                            />{' '}
                        </svg>
                        <div className='flex gap-x-1'>
                            <NavLink
                                className={'text-white  md:inline-block hidden'}
                            >
                                <DropdownMenu
                                    label={auth.user.name}
                                    className='text-white'
                                >
                                    <DropdownMenu.ItemLink
                                        href={route('dashboard')}
                                    >
                                        Dashboard
                                    </DropdownMenu.ItemLink>
                                    <DropdownMenu.ItemLink
                                        href={route('profile')}
                                    >
                                        Setting
                                    </DropdownMenu.ItemLink>
                                    <DropdownMenu.ItemLink
                                        href={route('logout')}
                                    >
                                        Logout
                                    </DropdownMenu.ItemLink>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink
                                className={'text-white  md:inline-block hidden'}
                            >
                                <DropdownMenu
                                    label={'inbox'}
                                    className='text-white'
                                >
                               
                                    <DropdownMenu.ItemLink href={ route('admin-registrasi-donor')}>
                                        <div className='border border-b border-dashed border-gray-600/50 py-2.5 px-4 relative rounded-lg'>
                                            <p>Pengajuan Registrasi Baru</p>
                                            <div className='absolute top-1 right-0 w-5 h-5 rounded-full bg-red-600 text-white text-sm flex items-center justify-center'>
                                                {imbox_pendonor.length}
                                            </div>
                                        </div>
                                    </DropdownMenu.ItemLink>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink href='/'>Home</NavLink>
                        </div>
                    </div>
                    <div
                        className={
                            'bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900'
                        }
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
