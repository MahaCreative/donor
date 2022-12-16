import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Create({ golDar, onClose }) {
    const { auth } = usePage().props;
    console.log(auth);
    const { data, setData, errors, post } = useForm({
        nama: '',
        tanggal_lahir: '',
        gol_darah: '',
        tanggal_lahir: '',
        jumlah_permintaan: '',
        keterangan: '',
    });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = () => {
        post(route('permintaan-darah'));
    };
    return (
        <div>
            <form>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        <label className='text-white' htmlFor='nama'>
                            Nama Lengkap
                        </label>
                        <Input
                            onChange={onChange}
                            type='text'
                            name='nama'
                            placeholder='Nama Lengkap'
                        />
                        {errors.nama && <Input.Error errors={errors.nama} />}
                    </div>
                    <div>
                        <label className='text-white' htmlFor='nama'>
                            Tanggal Lahir
                        </label>
                        <Input
                            onChange={onChange}
                            type='date'
                            name='tanggal_lahir'
                            placeholder='Tanggal Lahir'
                        />
                        {errors.tanggal_lahir && (
                            <Input.Error errors={errors.tanggal_lahir} />
                        )}
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        <label className='text-white' htmlFor='gol_darah'>
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
                        {errors.gol_darah && (
                            <Input.Error errors={errors.gol_darah} />
                        )}
                    </div>
                    <div>
                        <label
                            className='text-white'
                            htmlFor='jumlah_permintaan'
                        >
                            Jumlah Permintaan
                        </label>
                        <Input
                            onChange={onChange}
                            type='number'
                            name='jumlah_permintaan'
                            placeholder='Jumlah Permintaan'
                        />
                        {errors.jumlah_permintaan && (
                            <Input.Error errors={errors.jumlah_permintaan} />
                        )}
                    </div>
                    <div>
                        <label className='text-white' htmlFor='petugas'>
                            Nama Petugas
                        </label>
                        <Input
                            value={auth.user.name}
                            onChange={onChange}
                            type='text'
                            disabled
                            name='petugas'
                            placeholder='Nama Petugas'
                        />
                    </div>
                </div>
                <div>
                    <label className='text-white' htmlFor='keterangan'>
                        keterangan
                    </label>
                    <textarea
                        onChange={onChange}
                        name='keterangan'
                        placeholder='Keterangan'
                        className='py-1 w-full px-4 otline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    ></textarea>
                    {errors.keterangan && (
                        <Input.Error errors={errors.keterangan} />
                    )}
                </div>
                <div className='flex gap-2'>
                    <Button
                        className={'bg-green-600 text-white'}
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                    <Button
                        className={'bg-red-600 text-white'}
                        onClick={() => onClose()}
                    >
                        Cancell
                    </Button>
                </div>
            </form>
        </div>
    );
}
