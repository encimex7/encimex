"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';


function Banner({heading , banner , title}) {
  return (
    <div className="relative h-[60vh] w-full ">
          <div className="relative h-full w-full  text-white">
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#14090D]/90 via-[#6B111D]/70 to-[#D25326]/80 z-10'></div>
                <div className="absolute inset-0 z-0 ">
                <Image
                    src={banner}
                    alt="about banner image"
                    fill
                    className='object-cover object-center'
                    quality={100}
                    priority
                />
                </div>

                <div className='absolute md:left-[65%] left-[2%] md:top-[45%] md:-translate-x-1/2 md:-translate-y-[0%] bottom-20 w-full md:max-w-md  h-auto z-10 '>
                {heading !== 'service' &&(
                  <div className={`${
                                      heading === 'about' ? 'md:pl-6' :
                                      heading === 'service' ? 'md:pl-24' :
                                      heading === 'gallery' ? 'md:pl-12' :
                                      heading === 'blogs' ? 'md:pl-10' :
                                      heading === 'Contact us' ? 'md:pl-14' : ''
                                    } flex items-center `}>       
                   <motion.div 
                   initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut",delay:0.1}} className='bg-white text-orang rounded-lg px-6 py-2 w-fit h-fit flex items-center justify-center mb-4 md:text-right capitalize'>
                        <span className='text-sm'>{heading}</span>
                    </motion.div>
                  </div>
                  )}

                    <motion.h1 
                     initial={{ y: 10, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 1, ease: "easeOut",delay:0.6}}
                        className='md:text-5xl text-[7.9vw] font-light leading-tight md:text-right font-PPTelegraf capitalize'
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    
                </div>
            </div>
    </div>
  )
}

export default Banner;