import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react'
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Edit({ model, closeModal }) {
  const { data, setData, put, errors, reset, progress } = useForm({
    judul_event: '',
    kontent: '',
    tempat: '',
    tanggal_event: '',
    waktu_event: '',
    thumbnail: '',
    status_event: '',
    penyelenggara: ''
  })
  const updateHandler = () =>{
    Inertia.post(route('admin-event-donor-update', model.id), {
      _method: 'put',
      data,
      thumbnail : data.thumbnail
    })
  }
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    setData({
      ...data,
      judul_event: model.judul_even,
      kontent: model.kontent,
      tempat: model.tempat,
      tanggal_event: model.tanggal_event,
      waktu_event: model.waktu_event,
      thumbnail: model.thumbnail,
      status_event: model.status_event,
      penyelenggara: model.penyelenggara
    })

  }, [model])
  return (
    <form action='' encType='multipart/form-data'>
            
      <div className='flex flex-col gap-y-2'>
        <p className='text-white text-sm'>Judul Event</p>
        <Input defaultValue={model.judul_even} onChange={onChangeHandler} placeholder='Judul Event' name='judul_event' />
        <p className='text-white text-sm'>Penyelenggara</p>
        <Input defaultValue={model.penyelenggara} onChange={onChangeHandler} placeholder='Penyelenggara' name='penyelenggara' />
        
        <p className='text-white text-sm'>Kontent</p>
        <textarea defaultValue={model.kontent} onChange={onChangeHandler} name='kontent' placeholder='Kontent' className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full' ></textarea>
        <p className='text-white text-sm'>Tempatt</p>
        <textarea defaultValue={model.tempat} onChange={onChangeHandler} name='tempat' placeholder='Tempat Pelaksanaan' className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full' ></textarea>
        <p className='text-white text-sm'>Tanggal Event</p>
        <Input defaultValue={model.tanggal_event} onChange={onChangeHandler} type='date' name='tanggal_event' placeholder='Tanggal Pelaksanaan Event' />
        <p className='text-white text-sm'>Waktu Event</p>
        <Input defaultValue={model.waktu_event} onChange={onChangeHandler} type='time' name='waktu_event' placeholder='Waktu Pelaksanaan' />
        <p className='text-white text-sm'>Thumbnail</p>
        <Input defaultValue={model.thumbnail} onChange={(e) => setData('thumbnail', e.target.files[0])} type='file' name='thumbnail' placeholder='Thumbnail' />
        {progress && (
          <progress className='bg-white rounded-md border border-dashed border-white' value={progress.percentage} max="100">
            {progress.percentage}%
          </progress>)}
        <div className='flex gap-x-3'>
            <Button onClick={updateHandler} className={ 'bg-gray-700 text-white hover:bg-gray-800' } > Submit </Button>
            <Button onClick={() => closeModal()} className={ 'bg-red-700 text-white hover:bg-red-800' } > Cancell </Button>
        </div>
        
    </div>
</form>
  )
}
