import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container';
import Guest from '../../Layouts/Guest';
import Card from '../../Components/Guest/Card';
import Input from '../../Components/Input';
import { useForm, usePage } from '@inertiajs/inertia-react';
import Button from '../../Components/Button';
import Modal from '../../Components/Guest/Modal';
export default function RegistrasiDonor() {
    const { data, setData, errors, post, reset } = useForm({
        email: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        telp: '',
        alamat: '',
        jenis_kelamin: '',
        berat_badan: '',
        tinggi_badan: '',
        gol_darah: '',
        pekerjaan: '',
        riwayat_penyakit: '',
        tanggal_donor: '',
        jam_donor: '',
        jenis_donor: '',
    });
    const { golDar } = usePage().props;
    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const showModal = (e) => {
        post(route('check-registrasi-donor'));
        console.log(data);
        if (
            data.email == '' ||
            data.nama == '' ||
            data.tempat_lahir == '' ||
            data.tanggal_lahir == '' ||
            data.telp == '' ||
            data.alamat == '' ||
            data.jenis_kelamin == '' ||
            data.gol_darah == ''
        ) {
            console.log('true');
            setOpen(false);
        } else {
            console.log('false');
            setOpen(true);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data);
        setOpen(false);
        post(route('registrasi-donor'));
    };
    let darah;
    if (data.golongan_darah == 1) {
        darah = 'A';
    } else if (data.golongan_darah == 2) {
        darah = 'A+';
    } else if (data.golongan_darah == 3) {
        darah = 'B';
    } else if (data.golongan_darah == 4) {
        darah = 'B+';
    } else if (data.golongan_darah == 5) {
        darah = 'AB';
    } else if (data.golongan_darah == 6) {
        darah = 'AB+';
    } else if (data.golongan_darah == 7) {
        darah = 'O';
    } else if (data.golongan_darah == 9) {
        darah = 'O+';
    }
    return (
        <>
            <Modal
                open={open}
                className='bg-gray-800/30 text-white'
                headerTitle={'Confirmation'}
            >
                <div className='px-3'>
                    <p>Apakah data yang ada dibawah ini sudah benar?</p>
                    <p>email : {data.email}</p>
                    <p>nama : {data.nama}</p>
                    <p>tempat_lahir : {data.tempat_lahir}</p>
                    <p>tanggal_lahir : {data.tanggal_lahir}</p>
                    <p>telp : {data.telp}</p>
                    <p>alamat : {data.alamat}</p>
                    <p>jenis_kelamin : {data.jenis_kelamin}</p>
                    <p>berat_badan : {data.berat_badan}</p>
                    <p>tinggi_badan : {data.tinggi_badan}</p>
                    <p>gol_darah : {darah}</p>
                    <p>pekerjaan : {data.pekerjaan}</p>
                    <p>riwayat_penyakit : {data.riwayat_penyakit}</p>
                    <p>
                        Waktu Order Donor Darah : {data.tanggal_donor}{' '}
                        {data.jam_donor}
                    </p>
                    <p>Jenis Donor : {data.jenis_donor}</p>
                    <p className=' bg-black'>
                        Setelah data dinyatakan valid, maka anda akan terdaftar
                        pada sistem kami. untuk menghindari adanya proses
                        antrian yang terjadi silahkan datang sesuai dengan waktu
                        yang anda masukkan.
                    </p>
                    <p className=' font-bold'>
                        {' '}
                        untuk mengecek apakah data anda sudah di setujui
                        silahkan cek email masuk yang kami kirim melalui email
                        anda.
                    </p>
                    <div className='w-full flex justify-between'>
                        <Button
                            className={'bg-emerald-500'}
                            onClick={submitHandler}
                        >
                            Submit
                        </Button>
                        <Button
                            className={'bg-orange-500'}
                            onClick={() => setOpen(false)}
                        >
                            Cancell
                        </Button>
                    </div>
                </div>
            </Modal>
            <Container>
                <div className='w-full py-16 flex justify-center items-center'>
                    <Card className={'bg-gray-800/10 flex-col'}>
                        <Card.CardHeader>
                            <div>Registrasi Pendonor</div>
                        </Card.CardHeader>
                        <form action='' className='px-3'>
                            <div className='flex flex-col gap-y-3 px-3 py-3'>
                                <div className='flex flex-col gap-y-3'>
                                    <div>
                                        <Input
                                            onChange={onChange}
                                            placeholder='Nama Lengkap'
                                            name='nama'
                                        />
                                        {errors && (
                                            <Input.Error errors={errors.nama} />
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            onChange={onChange}
                                            type='email'
                                            placeholder='Email'
                                            name='email'
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.email}
                                            />
                                        )}
                                    </div>
                                    <div className='flex flex-col md:flex-row gap-2'>
                                        <div>
                                            <Input
                                                onChange={onChange}
                                                placeholder='Tempat Lahir'
                                                name='tempat_lahir'
                                            />
                                            {errors && (
                                                <Input.Error
                                                    errors={errors.tempat_lahir}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Input
                                                onChange={onChange}
                                                type='date'
                                                placeholder='Tanggal Lahir'
                                                name='tanggal_lahir'
                                            />
                                            {errors && (
                                                <Input.Error
                                                    errors={
                                                        errors.tanggal_lahir
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <select
                                                onChange={onChange}
                                                className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                                placeholder='Select Jenis Kelamin'
                                                name='jenis_kelamin'
                                            >
                                                <option
                                                    defaultValue={''}
                                                    disabled
                                                >
                                                    Select Jenis Kelamin
                                                </option>
                                                <option value='laki-laki'>
                                                    Laki-Laki
                                                </option>
                                                <option value='perempuan'>
                                                    Perempuan
                                                </option>{' '}
                                            </select>
                                            {errors && (
                                                <Input.Error
                                                    errors={
                                                        errors.jenis_kelamin
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className='w-full'>
                                            <Input
                                                onChange={onChange}
                                                placeholder='Telp'
                                                name='telp'
                                            />{' '}
                                            {errors && (
                                                <Input.Error
                                                    errors={errors.telp}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            onChange={onChange}
                                            name='alamat'
                                            placeholder='Alamat'
                                            className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                        ></textarea>
                                        {errors && (
                                            <Input.Error
                                                errors={errors.alamat}
                                            />
                                        )}
                                    </div>

                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex flex-col md:flex-row gap-2'>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    placeholder='Pekerjaan'
                                                    name='pekerjaan'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.pekerjaan
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    placeholder='Riwayat Penyakit'
                                                    name='riwayat_penyakit'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.riwayat_penyakit
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    type='number'
                                                    placeholder='Berat Badan'
                                                    name='berat_badan'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.berat_badan
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    type='number'
                                                    placeholder='Tinggi Badan'
                                                    name='tinggi_badan'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.tinggi_badan
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <select
                                                onChange={onChange}
                                                className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                                placeholder='Select Golongan Darah'
                                                name='gol_darah'
                                            >
                                                <option
                                                    defaultValue={''}
                                                    disabled
                                                >
                                                    Select Golongan Darah
                                                </option>
                                                {golDar
                                                    ? golDar.map((item) => (
                                                          <option
                                                              key={item.id}
                                                              value={item.id}
                                                          >
                                                              {
                                                                  item.golongan_darah
                                                              }
                                                          </option>
                                                      ))
                                                    : ' '}
                                            </select>
                                            {errors && (
                                                <Input.Error
                                                    errors={errors.gol_darah}
                                                />
                                            )}
                                        </div>
                                        {/* {errors && (<div className='text-red-600 text-sm italic'>{errors.golongan_darah}</div>)} */}
                                        <div className='flex flex-col md:flex-row gap-2'>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    type='date'
                                                    placeholder='Tanggal Order Donor'
                                                    name='tanggal_donor'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.tinggi_badan
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Input
                                                    onChange={onChange}
                                                    type='time'
                                                    placeholder='Waktu Order Donor'
                                                    name='jam_donor'
                                                />
                                                {errors && (
                                                    <Input.Error
                                                        errors={errors.nama}
                                                    />
                                                )}
                                            </div>
                                            <div className='w-full'>
                                                <select
                                                    onChange={onChange}
                                                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                                    placeholder='Jenis Donor Darah'
                                                    name='jenis_donor'
                                                >
                                                    <option selected disabled>
                                                        Jenis Donor Darah
                                                    </option>
                                                    <option value='pengganti'>
                                                        Sukarela
                                                    </option>
                                                    <option value='bayaran'>
                                                        Bayaran
                                                    </option>
                                                    <option value='pengganti'>
                                                        Pengganti
                                                    </option>
                                                </select>
                                                {errors && (
                                                    <Input.Error
                                                        errors={
                                                            errors.jenis_donor
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={showModal}
                                className={
                                    'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                                }
                            >
                                Submit
                            </Button>
                        </form>
                    </Card>
                </div>
            </Container>
        </>
    );
}
RegistrasiDonor.layout = (page) => <Guest children={page} />;
