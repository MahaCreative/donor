import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import Breadcrumb from '../../../Components/Auth/Breadcrumb'
import Button from '../../../Components/Button'
import Modal from '../../../Components/Guest/Modal'
import NavLink from '../../../Components/Guest/NavLink'
import Input from '../../../Components/Input'
import Table from '../../../Components/Table'
import UseModal from '../../../CostumHook/Modal/UseModal'
import Backend from '../../../Layouts/Backend'
import Create from './Create'
import Update from './Update'

export default function Index({ users }) {
    const { open: modallAddButon, close: closeAddButton, modal: modalAdd, } = UseModal();
    const { open: modallEditButon, close: closeEditButton, modal: modalEdit, } = UseModal();
    const [data, setData] = useState([])
    const editModal = (data) => {
        modallEditButon()
        setData(data)
    }
  return (
      <div className='min-h-screen bg-slate-900 p-3'>
          <Modal
                trigger={modalAdd}
                closeModal={closeAddButton}
                headerTitle={'Tambah User'}
                className=' bg-white/10'
                size={'w-[80%]'}
            >
              <Create onClose={closeAddButton} />
          </Modal>
          <Modal
                trigger={modalEdit}
                closeModal={closeEditButton}
                headerTitle={'Edit User'}
                className=' bg-white/10'
                size={'w-[80%]'}
            >
              <Update user={ data}></Update>
            </Modal>
          <Breadcrumb
                href={route('admin-data-pendonor')}
                active={route().current('admin-data-pendonor')}
            >
                Users
            </Breadcrumb>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
              <div>
                    <Button
                        onClick={modallAddButon}
                        className={'bg-blue-600 hover:bg-slate-800 text-white'}
                    >
                        Tambah Users
                  </Button>
              </div>  
              <div className='w-1/5'>
                    <Input
                        onChange={(e) =>
                            setParams({ ...params, search: e.target.value })
                        }
                        className='bg-white'
                        placeholder='Search...'
                    />
                </div>
          </div>
          <div>
          <Table className='min-h-[450px] max-h-[500px] bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Username</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Nama Lengkap</Table.Th>
                            <Table.Th>Level User</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                  <Table.Tbody>
                  {users.map((item) => (
                            <tr key={item.id} className='odd:hover:bg-gray-100'>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.email}</Table.Td>
                                <Table.Td>{item.profile ? item.profile.nama : 'Profile Belum Di Buat'}</Table.Td>
                                <Table.Td>{item.roles[0].name}</Table.Td>
                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            <Table.DropdownButton
                                                onClick={() => editModal(item)}
                                            >
                                                Edit
                                            </Table.DropdownButton>
                                            <Table.DropdownButton
                                                onClick={() =>
                                                    deleteModal(item)
                                                }
                                            >
                                                {' '}
                                                Delete{' '}
                                            </Table.DropdownButton>
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