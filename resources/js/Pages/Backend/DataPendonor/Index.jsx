import { Menu } from '@headlessui/react'
import { Inertia } from '@inertiajs/inertia'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../../Components/Auth/Breadcrumb'
import Button from '../../../Components/Button'
import Input from '../../../Components/Input'
import Table from '../../../Components/Table'
import Backend from '../../../Layouts/Backend'
export default function Index(props) {
    
    const { data: pendonor } = props.pendonors
    
    const [params, setParams] = useState({
        search: '',
        perPage:''
    })
    const openData = () => {
       let data = Inertia.get(route('admin-get-data-pendonor', 1))
        
    }
    const onChange = (e) => {setParams({...params, [e.target.name]: e.target.value})}
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('admin-data-pendonor'),
                query, 
                {
                    preserveState:true
                }, 150
            )
        })
        , [])
    useEffect (() => reload(params), [params])
  return (
      <div className='px-3 py-3 min-h-screen'>
         <Breadcrumb href={route('admin-data-pendonor')} active={route().current('admin-data-pendonor')}>
            Data Pendonor
          </Breadcrumb>
          <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center' onClick={openData}>
                    Filter
                </div>
                <div className='w-1/5'>
                    <Input name='search' onChange={onChange} className='bg-white' placeholder='Search...' />
                </div>
          </div>
          <div className='h-[530px] py-3 bg-white px-3 rounded-lg'>
                <Table className='my-3  max-h-[520px] overflow-hidden rounded-md shadow-lg shadow-gray-400/50 w-full'>
                    <Table.Thead
                        className={
                            'bg-gray-900/50 backdrop-blur-sm sticky top-0 w-full'
                        }
                    >
                        <Table.Th>Nama</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Alamat</Table.Th>
                      <Table.Th>Telp</Table.Th>
                      <Table.Th>Jumlah Donor</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                    </Table.Thead>
                    <Table.Tbody>
                        {pendonor ? pendonor.map((item, id) => (
                                                    <tr key={item.id}>
                                                    <Table.Td>{item.nama}</Table.Td>
                                                    <Table.Td>{item.email}</Table.Td>
                                                    <Table.Td>{item.alamat}</Table.Td>
                                <Table.Td>{item.telp}</Table.Td>
                                <Table.Td>{item.total}</Table.Td>
                                                    <Table.Td>
                                                        <Table.Dropdown>
                                                            <Menu>
                                                                <Table.DropdownButton onClick={() => lihatModal(item)}>
                                                                    Lihat History Donor
                                                                </Table.DropdownButton>
                                                            </Menu>
                                                        </Table.Dropdown>
                                                    </Table.Td>
                                                </tr>
                        )) : ''}
                    </Table.Tbody>
                </Table>
        </div>

      </div>
  )
}
Index.layout = (page) => <Backend children={page}/>
