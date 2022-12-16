import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Guest from '../../../Layouts/Backend';
import Card from '../../../Components/Guest/Card';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Modal from '../../../Components/Guest/Modal';
import Table from '../../../Components/Table';
import { Menu } from '@headlessui/react';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Creaet from './Creaet';
import { Inertia } from '@inertiajs/inertia';
import Edit from './Edit';
import { debounce } from 'lodash';
export default function EventDonor({ event }) {
    console.log(event);
    const {
        open: addModalButton,
        close: addModalClose,
        modal: addModalTrigger,
    } = UseModal();
    const {
        open: editModalButton,
        close: editModalClose,
        modal: editModalTrigger,
    } = UseModal();
    const {
        open: deleteModalButton,
        close: deleteModalClose,
        modal: deleteModalTrigger,
    } = UseModal();
    const [dataModel, setDataModel] = useState([]);
    const editModal = (data) => {
        editModalButton(), setDataModel(data);
    };
    const deleteModal = (data) => {
        deleteModalButton(), setDataModel(data);
    };
    const deleteHandler = () => {
        Inertia.delete(route('admin-event-donor-delete', dataModel.id), {
            onSuccess: () => {
                deleteModalClose();
            },
        });
    };
    const [params, setParams] = useState({ search: '' });
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('admin-event-donor'),
                query,
                {
                    preserveState: true,
                },
                150
            );
        }),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div className='px-3 py-3 min-h-screen'>
            <Modal
                size={'w-[80%]'}
                closeModal={addModalClose}
                trigger={addModalTrigger}
                headerTitle='Tambah Event Donor'
                className='bg-white/10'
            >
                <Creaet />
            </Modal>
            <Modal
                size={'w-[80%]'}
                closeModal={editModalClose}
                trigger={editModalTrigger}
                headerTitle='Edit Event Donor'
                className=' bg-white/10'
            >
                <Edit model={dataModel} closeModal={editModalClose} />
            </Modal>
            <Modal
                closeModal={deleteModalClose}
                trigger={deleteModalTrigger}
                headerTitle='Hapus Event Donor'
                className='w-[350px] bg-white/10'
            >
                <p className='text-white'>
                    Apakah Anda Yakin ingin mengahpus data?
                </p>
                <div className='flex gap-x-3'>
                    <Button
                        onClick={deleteHandler}
                        className={
                            'bg-emerald-400 text-white hover:bg-gray-800'
                        }
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={deleteModalClose}
                        className={'bg-red-600 text-white hover:bg-red-800'}
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            <Breadcrumb active={route().current('admin/event-donor')}>
                Event Donor
            </Breadcrumb>

            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    <Button
                        onClick={addModalButton}
                        className={'bg-blue-600 hover:bg-slate-800'}
                    >
                        Tambah Event Donor
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
                <Table className='my-3 min-h-[450px] max-h-[500px] overflow-hidden rounded-sm shadow-lg shadow-gray-400/50'>
                    <Table.Thead
                        className={
                            'bg-gray-900/50 backdrop-blur-sm sticky top-0'
                        }
                    >
                        <Table.Th>Kode Event</Table.Th>
                        <Table.Th>Tema Event</Table.Th>
                        <Table.Th>Penyelenggara</Table.Th>
                        <Table.Th>Tempat Event</Table.Th>
                        <Table.Th>Waktu Event</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                    </Table.Thead>
                    <Table.Tbody>
                        {event
                            ? event.map((item, id) => (
                                  <tr key={item.id}>
                                      <Table.Td>{item.kode_event}</Table.Td>
                                      <Table.Td>{item.judul_even}</Table.Td>
                                      <Table.Td>{item.penyelenggara}</Table.Td>
                                      <Table.Td>{item.tempat}</Table.Td>
                                      <Table.Td className='flex flex-col'>
                                          <p>{item.tanggal_event}</p>
                                          <p>{item.waktu_event}</p>
                                      </Table.Td>
                                      <Table.Td>
                                          <Table.Dropdown>
                                              <Menu>
                                                  <Table.DropdownButton
                                                      onClick={() =>
                                                          lihatModal(item)
                                                      }
                                                  >
                                                      Lihat
                                                  </Table.DropdownButton>
                                                  <Table.DropdownButton
                                                      onClick={() =>
                                                          editModal(item)
                                                      }
                                                  >
                                                      Edit
                                                  </Table.DropdownButton>
                                                  <Table.DropdownButton
                                                      onClick={() =>
                                                          deleteModal(item)
                                                      }
                                                  >
                                                      Delete
                                                  </Table.DropdownButton>
                                              </Menu>
                                          </Table.Dropdown>
                                      </Table.Td>
                                  </tr>
                              ))
                            : ''}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
EventDonor.layout = (page) => <Guest children={page} />;
