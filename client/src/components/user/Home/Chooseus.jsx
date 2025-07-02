"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function EncimexSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const Chooseus = [{
      heading :' PROVEN EXPERTISE,<br />TRUSTED RESULTS',
      description :'AT ENCIMEX, WE BRING TOGETHER YEARS OF TECHNICAL EXPERTISE, INDUSTRY INSIGHT, AND HANDS-ON EXPERIENCE TO DELIVER ENGINEERING SOLUTIONS THAT WORK — AND LAST'
  },
  {
  heading :' CLIENT-CENTERED,<br /> SOLUTION-DRIVEN',
  description :' CHOOSING ENCIMEX MEANS CHOOSING A PARTNER WHO LISTENS FIRST, THEN DELIVERS. WE BELIEVE THAT THE BEST ENGINEERING SOLUTIONS COME FROM DEEP COLLABORATION AND CLEAR COMMUNICATION.'
  },
  {
    heading :'INNOVATION AT THE<br /> CORE',
    description :'IN A RAPIDLY CHANGING WORLD, ENGINEERING NEEDS TO STAY AHEAD. AT ENCIMEX, WE LEVERAGE THE LATEST TECHNOLOGIES, INDUSTRY BEST PRACTICES, AND SUSTAINABLE METHODOLOGIES TO CREATE SMARTER, MORE EFFICIENT SOLUTIONS.'
    }]

  return (
    <div className=" pb-20 pt-12 px-4 md:px-8 w-full bg-[#0D0D0D]  ">

       <div className='text-center  z-10 mb-20'>
              <motion.h1  initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         viewport={{ once: true }}
                         className='text-orang text-3xl'>WHY CHOOSE US  </motion.h1>
       </div> 

      <div className={`max-w-7xl  hidden py-20 mx-auto md:grid grid-cols-1 md:grid-cols-3 gap-14 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left Column */}
        <motion.div initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 ,delay:0.6}}
              viewport={{ once: true }} className="relative  flex justify-center items-center ">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/50"></div>
        <div className="text-left px-8 py-14">
          <h2 className="text-orang text-2xl mb-6">
            PROVEN EXPERTISE,<br />
            TRUSTED RESULTS
          </h2>
          <p className="text-white font-light">
            AT ENCIMEX, WE BRING TOGETHER YEARS OF TECHNICAL EXPERTISE, 
            INDUSTRY INSIGHT, AND HANDS-ON EXPERIENCE TO DELIVER ENGINEERING 
            SOLUTIONS THAT WORK — AND LAST
          </p>
        </div>
        </motion.div>
        
        {/* Center Column - Orange Box */}
        <motion.div  initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }} className="relative -top-20">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/50"></div>
        <div className="bg-orang p-8 m-8 shadow-lg relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-orang blur-2xl opacity-20 "></div>
          
          <h2 className="text-black text-2xl  mb-6">
            CLIENT-CENTERED,<br />
            SOLUTION-DRIVEN
          </h2>
          <p className="text-white font-light">
            CHOOSING ENCIMEX MEANS CHOOSING A PARTNER WHO LISTENS FIRST, THEN 
            DELIVERS. WE BELIEVE THAT THE BEST ENGINEERING SOLUTIONS COME FROM 
            DEEP COLLABORATION AND CLEAR COMMUNICATION.
          </p>
        </div>
        </motion.div>
        
        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 ,delay:0.6}} 
              viewport={{ once: true }} className="relative flex justify-center items-center">
             <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/50"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/50"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/50"></div>
              <div className="text-left px-8 py-14">
              <h2 className="text-orang text-2xl mb-6 ">
                INNOVATION AT THE<br />
                CORE
              </h2>
              <p className="text-white font-light">
                IN A RAPIDLY CHANGING WORLD, ENGINEERING NEEDS TO STAY AHEAD. AT 
                ENCIMEX, WE LEVERAGE THE LATEST TECHNOLOGIES, INDUSTRY BEST 
                PRACTICES, AND SUSTAINABLE METHODOLOGIES TO CREATE SMARTER, 
                MORE EFFICIENT SOLUTIONS.
              </p>
            </div>
        </motion.div>


      </div>

      <div className="max-w-6xl mx-auto relative md:hidden block ">
        
      <Swiper
        //   modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          className="blog-swiper"
        >
          {Chooseus.map((post,index) => (
           <SwiperSlide key={index}>
           <div>
           <div className="relative  flex justify-center items-center ">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/50"></div>
        <div className="text-left px-8 py-14">
          <h2 className="text-orang text-2xl mb-6"
            dangerouslySetInnerHTML={{ __html: post.heading }}
          />
          <p className="text-white font-light">
           {post.description}
          </p>
        </div>
        </div>
           </div>
         </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}

{/* <h3
className="text-white text-lg leading-snug"
dangerouslySetInnerHTML={{ __html: post.heading }}
/> */}