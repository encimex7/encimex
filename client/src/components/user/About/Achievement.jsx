"use client"
import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';



function Achievement() {

  const { ref: section21Ref, inView: section2InView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  

  return (
    <section className="w-full bg-[#0D0D0D] md:py-32 py-10 relative overflow-hidden">
      {/* Background image if on /about */}
     
       
     
      <div ref={section21Ref} className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-center text-orang text-2xl md:text-2xl font-normal mb-24 tracking-wide">
          OUR <br className="md:hidden" /> ACHIEVEMENTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative md:px-0">
          {/* Grid lines overlay */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {/* <div className="h-full w-1 border-l border-white/10 absolute left-1/3 top-0" /> */}
            {/* <div className="h-full w-1 border-l border-white/10 absolute left-2/3 top-0" /> */}
          </div>
          {/* 1st Achievement */}
          <div className="flex flex-col items-center py-12 relative border-t md:border-b border-white/40 ">
            <div className="h-72 w-1 border-l border-white/40  absolute left-10 -top-10" />
            <div className="h-72 w-1 border-l border-white/40  absolute right-10 -top-10" />
            <span className="text-white text-6xl md:text-7xl font-anta font-bold mb-4 ">
            <CountUp end={350} duration={2} start={section2InView ? 0 : null} />+
            </span>
            <span className="text-white text-lg md:text-xl font-light">Completed Projects</span>
          </div>
          {/* 2nd Achievement */}
          <div className="flex flex-col items-center py-12 relative border-t border-b border-white/40">
            <div className="h-72 w-1 border-l border-white/40  absolute left-10 -top-10" />
            <div className="h-72 w-1 border-l border-white/40  absolute right-10 -top-10" />
            <span className="text-white text-6xl md:text-7xl font-anta font-bold mb-4">
            <CountUp end={120} duration={2} start={section2InView ? 0 : null} />
            <span className="text-4xl md:text-5xl align-top">+</span></span>
            <span className="text-white text-lg md:text-xl font-light">Happy Clients</span>
          </div>
          {/* 3rd Achievement */}
          <div className="flex flex-col items-center py-12 relative md:border-t border-b border-white/40">
            <div className="h-72 w-1 border-l border-white/40  absolute left-10 -top-10" />
            <div className="h-72 w-1 border-l border-white/40  absolute right-10 -top-10" />
            {/* <span className="text-white text-6xl md:text-7xl font-anta font-bold mb-4">15<span className="text-4xl md:text-5xl align-top">+</span></span> */}
            <p className='text-white text-6xl md:text-7xl font-anta font-bold mb-4'>
              <CountUp end={10} duration={2} start={section2InView ? 0 : null} />+
            </p>
            <span className="text-white text-lg md:text-xl font-light">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievement;
