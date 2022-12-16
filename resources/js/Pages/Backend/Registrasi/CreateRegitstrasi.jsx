import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function CreateRegitstrasi({ golDar, closeModal }) {
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

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = () => {
        post(route('admin-registrasi-donor'), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <form action='' className='px-3'>
            <div className='flex flex-col gap-y-1 px-3 py-3'>
                <div className='flex flex-col gap-y-1'>
                    <div>
                        <label htmlFor='' className='text-white'>
                            Nama Lengkap
                        </label>
                        <Input
                            onChange={onChange}
                            placeholder='Nama Lengkap'
                            name='nama'
                        />
                        {errors && <Input.Error errors={errors.nama} />}
                    </div>
                    <div>
                        <label htmlFor='' className='text-white'>
                            Email
                        </label>
                        <Input
                            onChange={onChange}
                            type='email'
                            placeholder='Email'
                            name='email'
                        />
                        {errors && <Input.Error errors={errors.email} />}
                    </div>
                    <div className='flex flex-col md:flex-row gap-1'>
                        <div>
                            <label htmlFor='' className='text-white'>
                                Tempat Lahir
                            </label>
                            <Input
                                onChange={onChange}
                                placeholder='Tempat Lahir'
                                name='tempat_lahir'
                            />
                            {errors && (
                                <Input.Error errors={errors.tempat_lahir} />
                            )}
                        </div>
                        <div>
                            <label htmlFor='' className='text-white'>
                                Tanggal Lahir
                            </label>
                            <Input
                                onChange={onChange}
                                type='date'
                                placeholder='Tanggal Lahir'
                                name='tanggal_lahir'
                            />
                            {errors && (
                                <Input.Error errors={errors.tanggal_lahir} />
                            )}
                        </div>
                        <div>
                            <label htmlFor='' className='text-white'>
                                Jenis Kelamin
                            </label>
                            <select
                                onChange={onChange}
                                className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                placeholder='Select Jenis Kelamin'
                                name='jenis_kelamin'
                            >
                                <option defaultValue={''}>
                                    Select Jenis Kelamin
                                </option>
                                <option value='laki-laki'>Laki-Laki</option>
                                <option value='perempuan'>
                                    Perempuan
                                </option>{' '}
                            </select>
                            {errors && (
                                <Input.Error errors={errors.jenis_kelamin} />
                            )}
                        </div>
                        <div className='w-full'>
                            <label htmlFor='' className='text-white'>
                                Telp
                            </label>
                            <Input
                                onChange={onChange}
                                placeholder='Telp'
                                name='telp'
                            />{' '}
                            {errors && <Input.Error errors={errors.telp} />}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='' className='text-white'>
                            Alamat
                        </label>
                        <textarea
                            onChange={onChange}
                            name='alamat'
                            placeholder='Alamat'
                            className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                        ></textarea>
                        {errors && <Input.Error errors={errors.alamat} />}
                    </div>

                    <div className='flex flex-col gap-y-1'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Pekerjaan
                                </label>
                                <Input
                                    onChange={onChange}
                                    placeholder='Pekerjaan'
                                    name='pekerjaan'
                                />
                                {errors && (
                                    <Input.Error errors={errors.pekerjaan} />
                                )}
                            </div>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Riwayat Penyakit
                                </label>
                                <Input
                                    onChange={onChange}
                                    placeholder='Riwayat Penyakit'
                                    name='riwayat_penyakit'
                                />
                                {errors && (
                                    <Input.Error
                                        errors={errors.riwayat_penyakit}
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Berat Badan
                                </label>
                                <Input
                                    onChange={onChange}
                                    type='number'
                                    placeholder='Berat Badan'
                                    name='berat_badan'
                                />
                                {errors && (
                                    <Input.Error errors={errors.berat_badan} />
                                )}
                            </div>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Tinggi Badan
                                </label>
                                <Input
                                    onChange={onChange}
                                    type='number'
                                    placeholder='Tinggi Badan'
                                    name='tinggi_badan'
                                />
                                {errors && (
                                    <Input.Error errors={errors.tinggi_badan} />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor='' className='text-white'>
                                Golongan Darah
                            </label>
                            <select
                                onChange={onChange}
                                className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                placeholder='Select Golongan Darah'
                                name='gol_darah'
                            >
                                <option defaultValue={''} disabled>
                                    Select Golongan Darah
                                </option>
                                {golDar
                                    ? golDar.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.golongan_darah}
                                          </option>
                                      ))
                                    : ' '}
                            </select>
                            {errors && (
                                <Input.Error errors={errors.gol_darah} />
                            )}
                        </div>
                        {/* {errors && (<div className='text-red-600 text-sm italic'>{errors.golongan_darah}</div>)} */}
                        <div className='flex flex-col md:flex-row gap-1'>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Request Tanggal Pendonoran
                                </label>
                                <Input
                                    onChange={onChange}
                                    type='date'
                                    placeholder='Tanggal Order Donor'
                                    name='tanggal_donor'
                                />
                                {errors && (
                                    <Input.Error
                                        errors={errors.tanggal_donor}
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor='' className='text-white'>
                                    Request Jam Pendonoroan
                                </label>
                                <Input
                                    onChange={onChange}
                                    type='time'
                                    placeholder='Waktu Order Donor'
                                    name='jam_donor'
                                />
                                {errors && (
                                    <Input.Error errors={errors.jam_donor} />
                                )}
                            </div>
                            <div className='w-full'>
                                <label htmlFor='' className='text-white'>
                                    Jenis Donor Darah
                                </label>
                                <select
                                    onChange={onChange}
                                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                    placeholder='Jenis Donor Darah'
                                    name='jenis_donor'
                                >
                                    <option value={''}>
                                        Jenis Donor Darah
                                    </option>
                                    <option value='sukarela'>Sukarela</option>
                                    <option value='bayaran'>Bayaran</option>
                                    <option value='pengganti'>Pengganti</option>
                                </select>
                                {errors && (
                                    <Input.Error errors={errors.jenis_donor} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                onClick={submitHandler}
                className={
                    'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                }
            >
                Submit
            </Button>
        </form>
    );
}
