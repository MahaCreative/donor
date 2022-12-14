import React from 'react';
import Container from '../../../Components/Container';
import Guest from '../../../Layouts/Guest';

export default function Index() {
    return (
        <Container id='syarat-donor' className={'py-16'}>
            <div className='flex flex-col lg:flex-row items-center gap-y-3 text-white px-2 md:px-3 lg:px-8'>
                <img className='w-[55%] lg:w-[50%]' src='/images/donor.png' />
                <div>
                    <div className='py-2.5 px-4 text-white'>
                        <h1 className='mb-6'>
                            Ini Syarat yang Harus Dipenuhi Sebelum Donor Darah
                        </h1>
                        <p>
                            Berikut ini syarat umum yang harus dipenuhi sebelum
                            melakukan donor darah:
                        </p>
                        <div className='flex flex-col gap-y-3 my-6 px-4'>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Umur minimal 17 tahun. Di usia ini, perkembangan tubuh telah sempurna. Sehingga, mendonorkan darah tidak mengganggu sistem kerja tubuh
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Berat badan minimal 45 kg. Kurang dari itu, pengurangan darah dikhawatirkan akan mengganggu keseimbangan sistem kerja tubuh.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Temperatur tubuh normal, antara 36,6 - 37,5 derajat Celsius.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Tekanan darah normal, yaitu sistole 110 - 160 mmHg, diastole 70 - 100 mmHg.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Denyut nadi teratur, yaitu sekitar 50 - 100 kali/ menit.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Haemoglobin wanita minimal 12 gram%, pria minimal 13 gram%.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Frekuensi donor darah maksimal 5 kali setahun, atau berjarak minimal 3 bulan.
                            </div>
                        </div>
                        <p>
                            Itulah beberapa syarat umum yang perlu dipenuhi
                            sebelum donor darah. Perlu diketahui, kamu bisa
                            mendonorkan darah maksimal lima kali setahun, dengan
                            jangka waktu minimal 3 bulan. Sebelum donor darah,
                            calon donor dapat mengambil dan menandatangani
                            formulir pendaftaran, lalu menjalani pemeriksaan
                            pendahuluan, seperti kondisi berat badan, HB,
                            golongan darah, dan dilanjutkan dengan pemeriksaan
                            dokter.
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
}

Index.layout = (page) => <Guest children={page} />;
