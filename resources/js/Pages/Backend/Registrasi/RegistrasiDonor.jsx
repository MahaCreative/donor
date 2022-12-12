import React, { useCallback, useEffect, useRef, useState } from 'react';
import Backend from '../../../Layouts/Backend';
import Card from '../../../Components/Auth/Card';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import Input from '../../../Components/Input';
import Table from '../../../Components/Table';
import moment from 'moment/moment';
import { Menu } from '@headlessui/react';
import Button from '../../../Components/Button';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Modal from '../../../Components/Guest/Modal';
import CreateRegitstrasi from './CreateRegitstrasi';
import Update from './Update';
import Lihat from './Lihat'
import UseModal from '../../../CostumHook/Modal/UseModal';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';

export default function RegistrasiDonor({ registrasi, golDar, sukarela, pengganti, bayaran }) {
    const { open: modallAddButon,close:closeAddButton, modal: modalAdd } = UseModal();
    const { open: modalLihatButton, close:closeModalLihat, modal: modalLihatTrigger } = UseModal();
    const { open: modalEditButton, close:closeModalEdit, modal: modalEditTrigger } = UseModal();
    const { open: modalDeleteButton, close:closeModalDelete, modal: modalDeleteTrigger } = UseModal();
    const [dataRegist, setDataRegis] = useState([])
    const lihatModal = (data) => { setDataRegis(data), modalLihatButton(); }
    const prosesModal = (data) => { prosesModal() }
    const editModal = (data) => { setDataRegis(data), modalEditButton() }
    const deleteModal = (data) => { setDataRegis(data), modalDeleteButton(); }
    const deleteHandler = () => { console.log(dataRegist); Inertia.delete(route('admin-registrasi-donor-delete', dataRegist.kode_registrasi)), { onSuccess: () => closeModalDelete() } }
    
    const [params, setParams] = useState({
        j: '',
        search: '',
        p: ''
    })
    const reload = useCallback( debounce((query) => { Inertia.get( route('admin-registrasi-donor'), query, { preserveState:true }, 150 ) }) , [])
    const jenisHandler = (data) => {
        console.log(data);
    }
    useEffect(() => reload(params), [params])
    
    return (
        <div className='px-3 py-3'>
            {/* Modal Lihat Registrasi */}
            <Modal
                closeModal={closeModalLihat}
                trigger={modalLihatTrigger}
                headerTitle={'Tambah Register Modal'}
                className=' bg-white/10'
            >
                <Lihat closeModal={(closeModalLihat)} registrasi={dataRegist}/>
            </Modal>
            {/* Modal Tambah */}
            <Modal
                trigger={modalAdd}
                closeModal={closeAddButton}
                headerTitle={'Tambah Register Modal'}
                className=' bg-white/10'
            >
                <CreateRegitstrasi closeModal={closeAddButton} golDar={golDar} />
            </Modal>
            {/* Modal Edit */}
            <Modal
                trigger={modalEditTrigger}
                closeModal={closeModalEdit}
                headerTitle={'Tambah Register Modal'}
                className=' bg-white/10'
            >
                <Update golDar={golDar} model={dataRegist}/>
            </Modal>
            {/* Modal delete */}
            <Modal
                trigger={modalDeleteTrigger}
                closeModal={closeModalDelete}
                headerTitle={'Hapus Data Register Modal'}
                className=' bg-white/10'
            >
                <p className='text-white'>Apakah anda yakin ingin menghapus?</p>
                <p className='text-white'>Menghapus data akan menghapus data yang terkait juga?</p>
                <div className='flex justify-between'>
                <Button className={'bg-emerald-500 text-white'} onClick={() => deleteHandler()}>Submit</Button>
                <Button className={'bg-red-600 text-white'} onClick={closeModalDelete}>Cancell</Button>
                </div>
            </Modal>
            <Breadcrumb active={route().current('admin/event-donor')}>
                Event Donor
            </Breadcrumb>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-3 my-6'>
                <Card onClick={() => setParams({...params, j:'sukarela'})} className='hover:cursor-pointer hover:bg-gray-700'>
                    <div className='flex justify-between items-center px-4 py-1 '>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Sukarela</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {sukarela}
                        </div>
                    </div>
                </Card>
                <Card onClick={() => setParams({...params, j:'pengganti'})} className='hover:cursor-pointer hover:bg-gray-700'>
                    <div className='flex justify-between items-center px-4 py-1'>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Pengganti</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {pengganti}
                        </div>
                    </div>
                </Card>
                <Card onClick={() => setParams({...params, j:'bayaran'})} className='hover:cursor-pointer hover:bg-gray-700'>
                    <div className='flex justify-between items-center px-4 py-1'>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Bayaran</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {bayaran}
                        </div>
                    </div>
                </Card>
            </div>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    <Button
                        onClick={modallAddButon}
                        className={'bg-blue-600 hover:bg-slate-800'}
                    >
                        Tambah Registrasi Donor
                    </Button>
                </div>
                <div className='w-1/5'>
                    <Input onChange={(e) => setParams({...params, search:e.target.value})} className='bg-white' placeholder='Search...' />
                </div>
            </div>
            <div>
                <Table className='h-[450px] bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Registrasi</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Status Donor</Table.Th>
                            <Table.Th>Waktu Order Donor</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {registrasi.map((item) => (
                            <tr key={item.id} className='odd:hover:bg-gray-100'>
                                <Table.Td>{item.kode_registrasi}</Table.Td>
                                <Table.Td> {moment(item.created_at).format( 'DD-MMMM-YYYY' )}
                                </Table.Td>
                                <Table.Td> {item.user_id ? item.user.nama : item.pendonor.nama} </Table.Td>
                                {(() => { if (item.status_donor === 'verifikasi') { return ( <Table.Td className='text-orange-600 capitalize'> {item.status_donor} </Table.Td> ); } else if (item.status_donor === 'gagal') { return ( <Table.Td className='text-red-500 capitalize'> {item.status_donor} </Table.Td> ); } else if ( item.status_donor === 'berhasil' ) { return ( <Table.Td className='text-green-500 capitalize'> {item.status_donor} </Table.Td> ); } })()}
                                <Table.Td className='flex flex-col gap-y-1'>
                                    <div className='border-b border-dashed border-gray-800'>
                                        Tanggal Order :
                                        {item.tanggal_donor_darah}
                                    </div>
                                    <div className=''>
                                        Waktu Order :{item.jam_donor_darah}
                                    </div>
                                </Table.Td>
                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            {item.status_donor == 'berhasil' && (<Table.DropdownButton
                                                onClick={() => lihatModal(item)}
                                            >
                                                Lihat
                                            </Table.DropdownButton>)}
                                            {item.status_donor == 'verifikasi' && (<Table.DropdownItem href={route('proses-registrasi', item.kode_registrasi)}>
                                                Proses
                                            </Table.DropdownItem>)}
                                            <Table.DropdownButton 
                                                onClick={() => editModal(item)}
                                            >
                                                Edit
                                            </Table.DropdownButton>
                                            <Table.DropdownButton onClick={() => deleteModal(item)}> Delete </Table.DropdownButton>
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
RegistrasiDonor.layout = (page) => <Backend children={page} />;
