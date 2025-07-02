"use client"

import React from 'react'
import cardimg from "../../../../public/assets/images/cardimg.png";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';



function AcheivementSection() {
    const { ref: section2Ref, inView: section2InView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
      });
  return (
    <div className='relative h-auto  overflow-hidden bg-[#0D0D0D] px-2'>
         <div className='max-w-7xl z-10'>
            <div className='lg:pl-28'>
            < motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='text-orang  text-3xl'>OUR <br /> ACHIEVEMENT  </motion.h1>
            </div> 
            </div>  

        <div
              className='max-w-7xl mx-auto py-10 md:h-[42vh] h-auto relative'
              ref={section2Ref}
            >

                <div className="h-full w-1 border-l border-white/40  absolute left-4 top-0 md:hidden block" />
                <div className="h-full w-1 border-l border-white/40  absolute right-4 top-0 md:hidden block" />

                <div className='flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 relative '> {/* Improved flex settings */}
                    {/* Card 1 */}
                    <div className='relative w-full max-w-xs md:max-w-none md:px-0 px-4 py-1'> 
                    <Image 
                        src={cardimg} 
                        alt="Project card" 
                        className='w-full h-auto' // Made image responsive
                    />
                    <div className='absolute top-[45%] left-[37%] transform -translate-x-1/2 -translate-y-1/2 text-left'> {/* Centered text */}
                        <p className='md:text-[5.5vw] text-[15vw] text-white font-anta'>
                          <CountUp end={350} duration={2} start={section2InView ? 0 : null} />+
                        </p>
                        <p className='text-xl text-white pl-2'>Completed Projects</p>
                    </div>
                <div className="h-1 w-94 border-t border-white/40  absolute -left-7 -top-3 md:hidden block " />
                <div className="h-1 w-94 border-t border-white/40  absolute -left-7  md:hidden block " />



                    </div>

                    {/* Card 2 */}
                    <div className='relative w-full max-w-xs md:max-w-none md:px-0 px-4 py-1'>
                    <Image 
                        src={cardimg} 
                        alt="Project card" 
                        className='w-full h-auto'
                    />
                    <div className='absolute top-[45%] left-[37%] transform -translate-x-1/2 -translate-y-1/2 text-left'>
                        <p className='md:text-[5.5vw] text-[15vw] text-white font-anta'>
                          <CountUp end={120} duration={2} start={section2InView ? 0 : null} />+
                        </p>
                        <p className='text-xl text-white pl-2'>Happy Clients</p>
                    </div>
                    <div className="h-1 w-94 border-t border-white/40  absolute -left-7  md:hidden block " />
                    </div>

                    {/* Card 3 */}
                    <div className='relative w-full max-w-xs md:max-w-none md:px-0 px-4 py-1'>
                    <Image 
                        src={cardimg} 
                        alt="Project card" 
                        className='w-full h-auto'
                    />
                    <div className='absolute top-[45%] left-[37%] transform -translate-x-1/2 -translate-y-1/2 text-left'>
                        <p className='md:text-[5.5vw] text-[15vw] text-white font-anta'>
                          <CountUp end={10} duration={2} start={section2InView ? 0 : null} />+
                        </p>
                        <p className='text-xl text-white pl-2'>Years Experience</p>
                    </div>
                <div className="h-1 w-94 border-t border-white/40  absolute -left-7  md:hidden block " />
                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default AcheivementSection
