import React, { useState } from 'react';
import Backend from '../../Layouts/Backend';
import Button from '../../Components/Button';
import Card from '../../Components/Auth/Card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
export default function Dashboard({ darah, stok, jumlahPendonorBulan }) {
    console.log(darah);
    const labels = [];
    const datasets = [];
    const labelGrafikJumlah = [];
    const datasetGrafikJumlah = [];
    for (let i = 0; i < darah.length; i++) {
        labels.push(darah[i].darah);
        datasets.push(darah[i].jumlah_donor);
    }
    for (let i = 0; i < jumlahPendonorBulan.length; i++) {
        labelGrafikJumlah.push(jumlahPendonorBulan[i].month);
        datasetGrafikJumlah.push(jumlahPendonorBulan[i].jumlah);
    }
    console.log(datasets);

    const [data, setData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Grafik Penambahan Darah',
                data: datasets,
                borderColor: 'red',
                backgroundColor: 'red',
                color: 'red',
            },
        ],
    });
    const [grafikJumlahDonor, setgrafikJumlahDonor] = useState({
        labels: labelGrafikJumlah,
        datasets: [
            {
                label: 'Grafik Total Donor Bulan Ini',
                data: datasetGrafikJumlah,
                borderColor: 'red',
                backgroundColor: 'red',
                color: 'red',
            },
        ],
    });

    return (
        <div className='bg-slate-800 h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-1.5 px-3 gap-2 md:h-[450px] lg:h-[350px]'>
                {stok.map((item, id) => (
                    <Card className={'flex flex-col'}>
                        <p className='block w-full text-3xl text-white text-center'>
                            Stok Darah
                        </p>
                        <div className='flex justify-between text-white w-full p-2.5 gap-2'>
                            <p className='border border-dashed p-2.5 text-4xl font-bold text-center border-white rounded-lg w-1/2'>
                                {item.darah.golongan_darah}
                            </p>
                            <p className='border border-dashed p-2.5 text-4xl font-bold text-center border-white rounded-lg w-1/2'>
                                {item.stok}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
            {/* <div className='block py-1.5 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Card>
                    <div className='w-full flex flex-col items-center justify-center text-white'>
                        <p>Grafik Penambahan Darah</p>
                        <Bar className='bg-white border-white border text-white' data={data} options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        // This more specific font property overrides the global property
                                        font: {
                                            size: 12,
                                        }
                                    }
                                }
                            },
                            layout: {
                                padding: 20
                            }
                        }}></Bar>
                    </div>

                </Card>
            </div> */}
            {/* <div className='block py-1.5 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Card>
                    <div className='w-full flex flex-col items-center justify-center text-white'>
                        <p>Grafik Penambahan Darah</p>
                        <Bar className='bg-white border-white border text-white'
                            data={grafikJumlahDonor} options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        // This more specific font property overrides the global property
                                        font: {
                                            size: 12,
                                        }
                                    }
                                }
                            },
                            layout: {
                                padding: 20
                            }
                        }}></Bar>
                    </div>

                </Card>
            </div> */}
        </div>
    );
}

Dashboard.layout = (page) => <Backend children={page} />;
