import React from 'react'
import Guest from '../../../Layouts/Guest';
import Container from '../../../Components/Container'
import Table from '../../../Components/Table';
export default function Index() {
  return (
    <Container>
      
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
                    {/* <Table.Tbody>
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
                                                                <Table.DropdownButton onClick={() => editModal(item)}>
                                                                    Delete
                                                                </Table.DropdownButton>
                                                            </Menu>
                                                        </Table.Dropdown>
                                                    </Table.Td>
                                                </tr>
                        )) : ''}
                    </Table.Tbody> */}
                </Table>
    </Container>
  )
}
Index.layout = (page) => <Guest children={page} />;