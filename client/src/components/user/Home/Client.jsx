"use client"

import l1 from '../../../../public/assets/images/l1.png';
import l2 from '../../../../public/assets/images/l2.png';
import l3 from '../../../../public/assets/images/l3.png';
import l4 from '../../../../public/assets/images/l4.png';
import l5 from '../../../../public/assets/images/l5.png';
import worker from '../../../../public/assets/images/worker.png';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';


const Client = () => {
  return (
    <div className=" mx-auto md:pb-80 pb-30 " >

    <div className='bg-white pt-20 md:pb-60 pb-20'>
   
    <div className='max-w-6xl h- mx-auto relative md:px-0 '>
    <Image src={worker} alt='workers' className='w-full h-auto object-contain absolute top-0 left-0 px-4 ' />
    </div>


    </div>


    </div>
  )
};

export default Client;