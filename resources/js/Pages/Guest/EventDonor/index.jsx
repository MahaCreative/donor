import React from 'react'
import Guest from '../../../Layouts/Guest';
import Card from '../../../Components/Guest/Card'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Container from '../../../Components/Container';
export default function index({event}) {
  const indicators = (index) => (<div className="indicator mx-1 border border-dashed border-white rounded-md text-white py-1.5 px-2 hover:cursor-pointer">{index + 1}</div>);
  return (
    <Container>
    <div className='w-full'>
            <div className='border-b border-dashed border-white text-center text-white'>
                <h1 className='my-3  font-bold '>Event Donor Terbaru</h1>
                <p>Check disini event donor darah yang akan berlangsung pada bulan ini</p>
            </div>
    <Slide autoplay={true} indicators={indicators}>
 {event.map((slideImage, index)=> (
    <div className="each-fade" key={index}>
        <div className="relative">
         <img className='object-center object-cover h-[460px] w-full hover:cursor-pointer' src={'storage/'+slideImage.thumbnail} />
             <div className='text-center  absolute bottom-0 py-6 inset-x-auto text-white w-full bg-gray-700/50 backdrop-blur-sm'>
                 <p className='w-full'>{slideImage.kontent}</p>
                 <p>Dilaksanankan Pada Tanggal : { slideImage.tanggal_event}</p>
                 <p>Tempat :{ slideImage.tempat}</p>
                 <p>Diselenggarakan Oleh :{ slideImage.penyelenggara}</p>
         </div>
         </div>
      </div>
    
  ))} 
</Slide>
</div>  
    </Container>
  )
}
index.layout = (page) => <Guest children={page} />;