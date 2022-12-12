import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Update({ golDar, model }) {
    console.log(model);
    const { data, setData, errors, put, reset } = useForm({
        model_id:'',
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
    useEffect(() => {
        setData({
            ...data,
            model_id: model.id,
            email: model.pendonor ? model.pendonor.email : '',
            nama: model.pendonor ? model.pendonor.nama : '',
            tempat_lahir: model.pendonor ? model.pendonor.tempat_lahir : '',
            tanggal_lahir: model.pendonor ? model.pendonor.tanggal_lahir : '',
            telp: model.pendonor ? model.pendonor.telp : '',
            alamat: model.pendonor ? model.pendonor.alamat : '',
            jenis_kelamin: model.pendonor ? model.pendonor.jenis_kelamin : '',
            berat_badan: model.pendonor ? model.pendonor.berat_badan : '',
            tinggi_badan: model.pendonor ? model.pendonor.tinggi_badan : '',
            gol_darah: model.pendonor ? model.pendonor.gol_darah : '',
            pekerjaan: model.pendonor ? model.pendonor.pekerjaan : '',
            riwayat_penyakit: model.pendonor ? model.pendonor.riwayat_penyakit : '',
            tanggal_donor: model.tanggal_donor_darah,
            jam_donor: model.jam_donor_darah,
            jenis_donor: model.jenis_donor ,
        })
    }, [model])
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = () => {
        put(route('admin-registrasi-donor-update', data.model_id));
    };

    return (
        <form action='' className='px-3'>
            <div className='flex flex-col gap-y-3 px-3 py-3'>
                <div className='flex flex-col gap-y-3'>
                    <div>
                        <Input
                            onChange={onChange}
                            placeholder='Nama Lengkap'
                            name='nama'
                            value={data.nama}
                        />
                        {errors && <Input.Error errors={errors.nama} />}
                    </div>
                    <div>
                        <Input
                            onChange={onChange}
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={data.email}
                        />
                        {errors && <Input.Error errors={errors.email} />}
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <div>
                            <Input
                                onChange={onChange}
                                placeholder='Tempat Lahir'
                                name='tempat_lahir'
                                value={data.tempat_lahir}
                            />
                            {errors && (
                                <Input.Error errors={errors.tempat_lahir} />
                            )}
                        </div>
                        <div>
                            <Input
                                onChange={onChange}
                                type='date'
                                placeholder='Tanggal Lahir'
                                name='tanggal_lahir'
                                value={data.tanggal_lahir}
                            />
                            {errors && (
                                <Input.Error errors={errors.tanggal_lahir} />
                            )}
                        </div>
                        <div>
                            <select
                                onChange={onChange}
                                className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                placeholder='Select Jenis Kelamin'
                                name='jenis_kelamin'
                            >
                                <option defaultValue={data.jenis_kelamin}>
                                    {data.jenis_kelamin}
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
                            <Input
                                onChange={onChange}
                                placeholder='Telp'
                                name='telp'
                                value={data.telp}
                            />{' '}
                            {errors && <Input.Error errors={errors.telp} />}
                        </div>
                    </div>

                    <div>
                        <textarea
                            value={data.alamat}
                            onChange={onChange}
                            name='alamat'
                            placeholder='Alamat'
                            className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                        ></textarea>
                        {errors && <Input.Error errors={errors.alamat} />}
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div>
                                <Input
                                    value={data.pekerjaan}
                                    onChange={onChange}
                                    placeholder='Pekerjaan'
                                    name='pekerjaan'
                                />
                                {errors && (
                                    <Input.Error errors={errors.pekerjaan} />
                                )}
                            </div>
                            <div>
                                <Input
                                    value={data.riwayat_penyakit}
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
                                <Input
                                    value={data.berat_badan}
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
                                <Input
                                    value={data.tinggi_badan}
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
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div>
                                <Input
                                    value={data.tanggal_donor}
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
                                <Input
                                    onChange={onChange}
                                    type='time'
                                    placeholder='Waktu Order Donor'
                                    name='jam_donor'
                                    value={data.jam_donor}
                                />
                                {errors && (
                                    <Input.Error errors={errors.jam_donor} />
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
                                        {data.jenis_donor}
                                    </option>
                                    <option value='pengganti'>Sukarela</option>
                                    <option value='bayaran'>Bayaran</option>
                                    <option value='pengganti'>Pengganti</option>
                                </select>
                                {errors && (
                                    <Input.Error
                                        errors={errors.jenis_kelamin}
                                    />
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
