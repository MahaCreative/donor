import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Creaet() {
    const { data, setData, errors, post, reset, progress } = useForm({
        judul_event: '',
        kontent: '',
        tempat: '',
        tanggal_event: '',
        waktu_event: '',
        thumbnail: '',
        status_event: '',
        penyelenggara: '',
    });
    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = () => {
        post(route('admin-event-donor'));
        console.log('asd');
    };
    return (
        <form action=''>
            <div className='flex flex-col gap-y-1'>
                <label htmlFor='' className='text-white'>
                    Judul Event
                </label>
                <Input
                    onChange={onChangeHandler}
                    placeholder='Judul Event'
                    name='judul_event'
                />
                <label htmlFor='' className='text-white'>
                    Penyelenggara
                </label>
                <Input
                    onChange={onChangeHandler}
                    placeholder='Penyelenggara'
                    name='penyelenggara'
                />
                {errors.judul_event && (
                    <Input.Error
                        className={'text-white'}
                        errors={errors.judul_event}
                    />
                )}
                <label htmlFor='' className='text-white'>
                    Kontent
                </label>
                <textarea
                    onChange={onChangeHandler}
                    name='kontent'
                    placeholder='Kontent'
                    className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full'
                ></textarea>
                {errors.kontent && (
                    <Input.Error
                        classError={'text-white'}
                        errors={errors.kontent}
                    />
                )}
                <label htmlFor='' className='text-white'>
                    Tempat
                </label>
                <textarea
                    onChange={onChangeHandler}
                    name='tempat'
                    placeholder='Tempat Pelaksanaan'
                    className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full'
                ></textarea>
                {errors.tempat && (
                    <Input.Error
                        classError={'text-white'}
                        errors={errors.tempat}
                    />
                )}
                <label htmlFor='' className='text-white'>
                    Tanggal Pelaksanaan Event
                </label>
                <Input
                    onChange={onChangeHandler}
                    type='date'
                    name='tanggal_event'
                    placeholder='dd-mm-yyyy'
                />
                {errors.tanggal_event && (
                    <Input.Error
                        classError={'text-white'}
                        errors={errors.tanggal_event}
                    />
                )}
                <label htmlFor='' className='text-white'>
                    Waktu Pelaksanaan Event
                </label>
                <Input
                    onChange={onChangeHandler}
                    type='time'
                    name='waktu_event'
                    placeholder='Waktu Pelaksanaan'
                />
                {errors.waktu_event && (
                    <Input.Error
                        classError={'text-white'}
                        errors={errors.waktu_event}
                    />
                )}
                <label htmlFor='' className='text-white'>
                    Thumbnail
                </label>
                <Input
                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                    type='file'
                    name='thumbnail'
                    placeholder='Thumbnail'
                />
                {progress && (
                    <progress
                        className='bg-white rounded-md border border-dashed border-white'
                        value={progress.percentage}
                        max='100'
                    >
                        {progress.percentage}%
                    </progress>
                )}
                {/* {errors && <Input.Error classError={'text-white'} errors={errors.judul_event}/>} */}
                <div className='flex gap-x-3'>
                    <Button
                        onClick={submitHandler}
                        className={'bg-gray-700 text-white hover:bg-gray-800'}
                    >
                        Submit
                    </Button>
                    <Button
                        className={'bg-red-700 text-white hover:bg-red-800'}
                    >
                        Cancell
                    </Button>
                </div>
            </div>
        </form>
    );
}
