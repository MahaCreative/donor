import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Card from '../../../Components/Auth/Card';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import Backend from '../../../Layouts/Backend';

export default function Lihat({ registrasi, errors, golDar, closeModal }) {
    const onChange = () => {};
    const submitHandler = () => {};
    const [data, setData] = useState({ nama: '' });

    useEffect(() => {
        if (registrasi.length !== 0) {
            setData({
                ...data,
                email: registrasi.email,
                nama: registrasi.nama,

                telp: registrasi.telp,
                gol_darah: registrasi.golongan_darah,
                status_proses: registrasi.status,
                jumlah_donor: registrasi.jumlah_darah,
                // tanggal_donor:  registrasi.proses && registrasi.proses.tanggal_donor,
                keterangan: registrasi.keterangan,
                // petugas:  registrasi.proses && registrasi.proses.petugas,
            });
        }
    }, [registrasi]);
    return (
        <div className='px-3 py-3 capitalize'>
            {registrasi ? (
                <div>
                    <div className='flex flex-col  text-white my-3 px-6'>
                        <p>Kode Registrasi :{registrasi.kode_registrasi}</p>
                        <p>Tanggal Registrasi:{registrasi.created_at}</p>
                    </div>
                    <form action='' className='px-3 '>
                        <div className='flex flex-col gap-y-3 px-3 '>
                            <div className='flex flex-col gap-y-3'>
                                <div>
                                    <p className='text-white'>Nama Pendonor</p>
                                    <Input
                                        defaultValue={data.nama}
                                        onChange={onChange}
                                        placeholder='Nama Lengkap'
                                        name='nama'
                                    />
                                </div>
                                <div>
                                    <p className='text-white'>Email Pendonor</p>
                                    <Input
                                        defaultValue={data.email}
                                        onChange={onChange}
                                        type='email'
                                        placeholder='Email'
                                        name=''
                                    />
                                </div>
                                <div className='flex flex-col md:flex-row gap-3'>
                                    <div>
                                        <p className='text-white text-sm'>
                                            Status Donor Darah
                                        </p>
                                        <Input
                                            defaultValue={data.status_proses}
                                        />
                                    </div>
                                    <div>
                                        <p className='text-white text-sm'>
                                            Tanggal Donor Darah
                                        </p>
                                        <Input
                                            defaultValue={moment(
                                                data.tanggal
                                            ).format('DD-MMMM-YYYY')}
                                        />
                                    </div>
                                    <div>
                                        <p className='text-white text-sm'>
                                            Golongan Darah
                                        </p>
                                        <Input defaultValue={data.gol_darah} />
                                    </div>
                                    <div>
                                        <p className='text-white text-sm'>
                                            Jumlah Darah
                                        </p>
                                        <Input
                                            defaultValue={data.jumlah_donor}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className='text-white text-sm'>
                                        Keterangan
                                    </p>
                                    <textarea
                                        onChange={onChange}
                                        name=''
                                        placeholder='Keterangan'
                                        className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => closeModal()}
                            className={
                                'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                            }
                        >
                            Close
                        </Button>
                    </form>
                </div>
            ) : (
                <p className='text-white'>Data Proses Belum Tersedia</p>
            )}
        </div>
    );
}
Lihat.layout = (page) => <Backend children={page} />;
