import React, { useCallback, useEffect, useState } from 'react';
import Backend from '../../../Layouts/Backend';
import Button from '../../../Components/Button';
import Card from '../../../Components/Guest/Card';
import Modal from '../../../Components/Guest/Modal';
import Table from '../../../Components/Table';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Input from '../../../Components/Input';
import moment from 'moment';
import { Menu } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import Update from './Update';
import { debounce } from 'lodash';
export default function index({ dataproses, berhasil, gagal }) {
    const proses = dataproses
    const [params, setParams] = useState({q:''})
    const { open: modalEditButton, close: closeModalEdit, modal: ModalEditTrigger, } = UseModal();
    const { open: modalDeleteButton, close: closeModalDelete, modal: modalDeleteTrigger, } = UseModal();
    const [dataProses, dataSetProses] = useState([]);
    console.log(proses);
    const deletetHandler = () => {
        Inertia.delete(route('delete-proses-registrasi', dataProses.id));
        {onSuccess: () => closeModalDelete()}
    };

    const deleteDialog = (dataProses) => {
        dataSetProses(dataProses);
        modalDeleteButton();
    };
    const editDialog = (dataProses) => {
        dataSetProses(dataProses)
        modalEditButton();
    }
    const reload = useCallback( debounce((query) => { Inertia.get(route('proses-donor'), query, { preserveState:true }, 150 ) }) , [])
    // const reload = useCallback( debounce((query) => { Inertia.get(route('proses-donor'), query, { preserve:true }, 150 ) } ), [] )
        useEffect(() => reload(params), [params])
    // href={route('update-proses-registrasi', item.id)
    return (
        <div className='px-3 py-3'>
            <Modal
                closeModal={closeModalEdit}
                trigger={ModalEditTrigger}
                headerTitle={'Edit Data'}
                className=' bg-white/10'
            >
                <Update model={dataProses}/>
                <div className='flex justify-between my-3'>
                    <Button
                        onClick={(closeModalEdit)}
                        className={
                            'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                        }
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            <Modal closeModal={closeModalDelete}
                trigger={modalDeleteTrigger}
                headerTitle={'Alert Hapus Data Proses '}
                className=' bg-white/10'
            >
                <p className='text-white'>Apakah anda yakin ingin menghapus?</p>
                <div className='flex justify-between my-3'>
                    <Button
                        onClick={() => deletetHandler(proses.id)}
                        className={
                            'bg-emerald-600 text-white text-center hover:text-black hover:bg-white'
                        }
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={closeModalDelete}
                        className={
                            'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                        }
                    >
                        Cancelll
                    </Button>
                </div>
            </Modal>
         
            <Breadcrumb active={route().current('proses-donor')}>
                Proses Registrasi
            </Breadcrumb>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 my-6'>
                <Card onClick={() => setParams({...params, q: 'berhasil'})} className='hover:cursor-pointer hover:bg-gray-700'>
                    <div className='flex justify-between items-center px-4 py-1 '>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Berhasil</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {berhasil}
                        </div>
                    </div>
                </Card>
                <Card onClick={() => setParams({...params, q: 'gagal'})} className='hover:cursor-pointer hover:bg-gray-700'>
                    <div className='flex justify-between items-center px-4 py-1 '>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Gagal</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {gagal}
                        </div>
                    </div>
                </Card>
            </div>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='w-1/5'>
                    
                </div>
            </div>
            <div>
                <Table className='h-[450px] bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Proses</Table.Th>
                            <Table.Th>Nama Petugas</Table.Th>
                            <Table.Th>Nama Pendonor</Table.Th>
                            <Table.Th>Jumlah Darah</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Keterangan</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataproses.map((item) => (
                            <tr>
                                <Table.Td>{item.registrasi_donor.kode_registrasi}</Table.Td>
                                <Table.Td>{moment(item.created_at).format( 'DD-MMMM-YYYY' )}</Table.Td>
                                <Table.Td>{item.petugas.profile.nama}</Table.Td>
                                <Table.Td>{item.registrasi_donor.pendonor.nama}</Table.Td>
                                <Table.Td>{item.jumlah_darah}</Table.Td>
                                <Table.Td>{item.status =='berhasil' ? (<p className='text-green-600'>{item.status}</p>) : (<p className='text-red-600'>{item.status}</p>)}</Table.Td>
                                <Table.Td>{item.keterangan == null ? 'Keterangan Kosong' : item.keterangan}</Table.Td>
                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            <Table.DropdownButton 
                                                onClick={() => editDialog(item)}
                                            >
                                                Edit
                                            </Table.DropdownButton>
                                            <Table.DropdownButton onClick={() => deleteDialog(item)}> Delete </Table.DropdownButton>
                                        </Table.Dropdown>
                                    </Menu>
                                </Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
index.layout = (page) => <Backend children={page} />;
