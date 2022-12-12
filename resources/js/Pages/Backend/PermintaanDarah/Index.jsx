import { Menu } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import moment from 'moment/moment';
import React, { useState } from 'react'
// import { setDatasets } from 'react-chartjs-2/dist/utils';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Card from '../../../Components/Auth/Card';
import Button from '../../../Components/Button';
import Modal from '../../../Components/Guest/Modal';
import Input from '../../../Components/Input';
import Table from '../../../Components/Table';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Backend from '../../../Layouts/Backend'
import Create from './Create';
import Proses from './Proses';
import Update from './Update';
export default function Index({golDar, permintaan}) {

    const [params, setParams] = useState({ s: '', });
    const [model, setModel] = useState([])
    const {open:addModalButton, close:closeAddModal, modal:modalAddTrigger} = UseModal()
    const { open: EditModalButton, close: closeEditModal, modal: modalEditTrigger } = UseModal()
    const { open: DeleteModalButton, close: closeDeleteModal, modal: modalDeleteTrigger } = UseModal()
    const { open: ProsesModalButton, close: closeProsesModal, modal: modalProsesTrigger } = UseModal()
    
    const editModal = (data) => {
        EditModalButton()
        setModel(data)
    }
    const deleteModal = (data) => {
        setModel(data)
        DeleteModalButton();
    }
    const deleteHandler = () => {
        Inertia.delete(route('permintaan-darah-delete', model.id),
        {onSuccess: closeDeleteModal()})
    }
    const prosesModal = () => {
        ProsesModalButton()
    }
  return (
    <div>
      <Modal
                closeModal={closeAddModal}
                trigger={modalAddTrigger}
                headerTitle={'Tambah Permintaan Darah'}
                className=' bg-white/10'
            >
                <Create golDar={golDar} onClose={closeAddModal}></Create>
            </Modal>
      <Modal
                closeModal={closeEditModal}
                trigger={modalEditTrigger}
                headerTitle={'Edit Permintaan Darah'}
                className=' bg-white/10'
            >
                <Update golDar={golDar} model={model} onClose={closeEditModal}></Update>
          </Modal>
          <Modal
                closeModal={closeDeleteModal}
                trigger={modalDeleteTrigger}
                headerTitle={'Delete Permintaan Darah'}
                className=' bg-white/10'
            >
              <p className='text-white'>Yakin Ingin Menghapus Data, data yang di hapus akan mempengaruhi data lainnya ?</p>
              <div className="flex gap-2 mt-2">
                  <Button className={'bg-green-600 text-white'} onClick={deleteHandler}>Submit</Button>
                  <Button className={'bg-red-600 text-white'} onClick={closeDeleteModal}>Cancell</Button>
              </div>
          </Modal>
          <Modal
                closeModal={closeProsesModal}
                trigger={modalProsesTrigger}
                headerTitle={'Edit Permintaan Darah'}
                className=' bg-white/10'
            >
                <Proses></Proses>
          </Modal>
      <Breadcrumb href={route('permintaan-darah')} active={route().current('permintaan-darah')}>
          Permintaan Darah
      </Breadcrumb>
  
      <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    <Button
                        onClick={addModalButton}
                        className={'bg-blue-600 hover:bg-slate-800'}
                    >
                        Tambah Permintaan
                    </Button>
                </div>
                <div className='w-1/5'>
                    <Input onChange={(e) => setParams({...params, s:e.target.value})} className='bg-white' placeholder='Search...' />
                </div>
            </div>
            <div>
                <Table className='h-[450px] bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Permintaan</Table.Th>
                            <Table.Th>Tanggal Permintaan</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Permintaan Darah</Table.Th>
                            <Table.Th>keterangan</Table.Th>
                            <Table.Th>Jumlah Permintaan</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {permintaan.map((item) => (
                            <tr key={item.id} className='odd:hover:bg-gray-100'>
                                <Table.Td>{item.kode_permintaan}</Table.Td>
                                <Table.Td> {moment(item.created_at).format( 'DD-MMMM-YYYY' )}
                                </Table.Td>
                                <Table.Td>{ item.nama}</Table.Td>
                                <Table.Td>{ item.golongan_darah}</Table.Td>
                                <Table.Td>{ item.keterangan}</Table.Td>
                                <Table.Td>{ item.jumlah_permintaan}</Table.Td>
                                {/* <Table.Td> {item.user_id ? item.user.nama : item.pendonor.nama} </Table.Td> */}
                                {(() => { if (item.status === 'verifikasi') { return ( <Table.Td className='text-orange-600 capitalize'> {item.status} </Table.Td> ); } else if (item.status === 'gagal') { return ( <Table.Td className='text-red-500 capitalize'> {item.status} </Table.Td> ); } else if ( item.status === 'berhasil' ) { return ( <Table.Td className='text-green-500 capitalize'> {item.status} </Table.Td> ); } })()}

                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            {item.status == 'berhasil' && (<Table.DropdownButton
                                                onClick={() => lihatModal(item)}
                                            >
                                                Lihat
                                            </Table.DropdownButton>)}
                                            {item.status == 'verifikasi' && (<Table.DropdownButton onClick={() => prosesModal()}>
                                                Proses
                                            </Table.DropdownButton>)}
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
  )
}
Index.layout = (page) => <Backend children={page} />;