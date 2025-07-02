
"use client"
import { motion } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import SplitType from 'split-type';


gsap.registerPlugin(ScrollTrigger);


function AboutSection() {

   useLayoutEffect(() => {
          const initializeAnimations = () => {
            const splitType = document.querySelector('.middle-textt');
            
            if (splitType) {
              if (splitType.isSplit) {
                splitType.revert();
              }
            
              const text = new SplitType(splitType, { 
                types: 'chars,words',
                absolute: false 
              });
      
              ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === '.middle-textt') {
                  st.kill();
                }
              });
      
              gsap.from(text.chars, {
                scrollTrigger: {
                  trigger: '.middle-textt',
                  start: 'top 80%',// when the top of the text reaches 80% of the viewport
                  end: 'top 20%',// when the top of the text reaches 20% of the viewport
                  scrub: true,// smooth scrubbing
                  markers: false,
                },
                opacity: 0.2,
                stagger: 0.1,
              });
      
              ScrollTrigger.refresh();
            }
          };
      
          const timer = setTimeout(() => {
            initializeAnimations();
          }, 100);
      
          return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.killTweensOf('.middle-textt');        
          };
        }, []);

    return (
      <div className='relative w-full h-[107vh] bg-[#0D0D0D] overflow-hidden flex items-center pb-10'>
        <div className='relative w-full h-full  '>
        {/* Left Circle */}
        <motion.div
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut",  }}
         className='md:block absolute hidden left-[33%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[80vh] h-[80vh] rounded-full border-2 border-white/10'></motion.div>
        {/* Right Circle */}
        <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut",  }}
         className='md:block absolute hidden right-[33%] top-1/2 -translate-y-1/2 translate-x-1/2 w-[80vh] h-[80vh] rounded-full border-2 border-white/10'></motion.div>

        <div className="max-w-7xl relative md:py-32 py-10 mx-auto"> 
        <div className=" z-10 flex w-full md:px-16 px-4 ">
          <h2 className="md:text-3xl text-3xl font-light md:pb-20 pb-4">
              <span className="text-orang font-normal">ABOUT</span> <span className="text-white">COMPANY</span>
          </h2>
        </div>

        <div className=" z-10 flex w-full md:px-16 px-4 ">
          {/* Left Title */}
          <div className="md:w-1/3 flex flex-col justify-start pt-8">
          </div>
          {/* Right Description */}
          <div className="md:w-2/3 flex flex-col justify-center gap-6">
            <p className="text-white leading-relaxed mb-6 md:pr-5 text-lg middle-textt">
            Encimex Engineering Services Pvt. Ltd is a holistic BIM solution company mainly focused on steel detailing services using Tekla structural software. Since our incorporation in 2018, we have constantly set new standards to provide seamless engineering services.Our decades of business expertise contribute to the preservation of satisfied clients from the United States, Canada, and the United Kingdom.<br/><br/>
            We offer a wide range of engineering services, including designing, detailing and all kinds of building information modeling, which helps the consultants, contractors and fabricators to fulfill their engineering requirements effortlessly. We strive to provide cutting-edge solutions to assist clients in overcoming obstacles that arise on the worksite.
            </p>
            
          </div>
        </div>
        </div>
        </div>
      </div>
    )
  }

export default AboutSection
