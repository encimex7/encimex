"use client"
import React from 'react'
import innogirl from "../../../../public/assets/images/innogirl.png";
import innobg from "../../../../public/assets/images/innobg.png";
import innobgmob from "../../../../public/assets/images/innobgmob.png";
import Image from 'next/image';
import Link from 'next/link';
import {  ArrowRight } from "lucide-react";
import { isMobile } from 'react-device-detect';
import { motion } from 'framer-motion';


export default function InnovatureSection() {
  return (
    <div className="w-full pt-10 md:pb-0 pb-10 bg-[#0D0D0D]">
      {/* Main hero container */}
      <div className="relative w-full mx-auto max-w-7xl px-2 ">

         {/* Centered person with hard hat */}
         <div className="md:absolute hidden bottom-[18%]  inset-0 md:flex justify-center items-center">
              <div className="relative z-10">
                <Image
                  src={innogirl}
                  alt="Engineer with orange safety helmet and vest"
                  width={400}
                  height={550}
                  className="object-contain"
                  priority
                />
              {/* <div className='bg-[#00da7f4b] w-40 h-20    '></div> */}
              </div>
         </div>

         <div className="absolute md:hidden -top-[69%]  inset-0 flex justify-center items-center">
              <div className="relative z-10">
                <Image
                  src={innogirl}
                  alt="Engineer with orange safety helmet and vest"
                  width={250}
                  height={400}
                  className="object-contain"
                  priority
                />
              <div className='bg-[#BE471E] w-56 h-12  z-50 absolute opacity-100 -bottom-6 blur-sm'></div>
              </div>
         </div>


        {/* Orange background container with rounded corners */}
        <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.7 }} 
         className="relative w-full h-[500px] md:h-[500px] rounded-xl overflow-hidden ">
          {/* Orange background with texture */}

            {/* Add texture pattern */}
            <div className="absolute inset-0 opacity-100">
            <Image
                src={isMobile ? innobgmob : innobg}
                alt="Background texture"
                fill
                style={{ objectFit: 'cover' }}
                priority
            />
            </div>

      
          {/* Content layout */}
          <div className="relative h-full flex ">
            {/* Text on the left */}
            <div className="absolute left-0 md:top-0 -top-8 h-full md:w-1/2 w-full flex md:items-center items-end z-10  ">
              <div className="px-8 md:px-16 ">
                <h1 className="text-4xl md:text-5xl lg:text-5xl  text-white md:leading-tight leading-9 md:mb-8 mb-6">
                  <span className="inline-block bg-black px-2 py-1">Innovating</span> the<br />
                  infrastructure of<br />
                  the future.
                </h1>
                <Link href={`/contact`} passHref>
                <div className='bg-[#C8C8C8]/40  md:w-[77%] w-[100%] border border-white flex text-white rounded-full p-1 hover:scale-105 duration-500  '>
                <div className='py-1 px-9 text-lg'>
                  Discuss a project
                  </div>
                  <div className='bg-white text-black rounded-full px-2 py-2'>
                    <ArrowRight />
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}