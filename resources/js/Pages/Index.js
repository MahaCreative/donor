import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import Button from '../Components/Button';
import Container from '../Components/Container';
import Guest from '../Layouts/Guest';

export default function Index({ event }) {
    return (
        <>
            <Container id='beranda' className={'h-screen'}>
                <div className='flex flex-col items-center gap-y-3 text-white px-2 md:px-3 lg:px-8'>
                    <img
                        className='w-[55%] lg:w-[350px]'
                        src={asset('/images/donor.png')}
                    />
                    <h1 className='text-center'>
                        Sistem Informasi Pendaftaran Donor Darah Pada Rumah
                        Sakit Umum Daerah Mamuju{' '}
                    </h1>
                    <p className='w-[95%] md:w-[43%] text-center'>
                        Untuk melakukan pendaftaran donor darah silahkan klick link dibawah ini
                    </p>
                    <Link
                        as='div'
                        className='justify-self-start py-2.5 hover:bg-red-600 px-4 border shadow-md shadow-gray-400/50 rounded-lg hover:cursor-pointer transition duration-300 font-bold'
                        href={route('registrasi-donor')}
                    >
                        Registrasi
                    </Link>
                </div>
            </Container>
        </>
    );
}
Index.layout = (page) => <Guest children={page} />;
