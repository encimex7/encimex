"use client"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const TextSection = () => {
  useLayoutEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".text-section",
        start: "top top",
        pin: true,
        scrub: true,
        end: "+=1000", 
        markers: false,
      }
    });

    tl.fromTo(".bg", 
      { width: "0%" }, 
      { width: "100%", duration: 1 } 
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="relative h-screen text-section">
      <div className="bg absolute top-0 left-0 h-full w-0 bg-white"></div> 

      {/* <p className='font-bold text-7xl z-[999] mix-blend-difference'> hello</p> */}
      
      <div className="flex justify-center items-center h-full w-full px-4 text-center">
    <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 z-[999] tracking-tight" style={{ mixBlendMode: "difference" }}>
      With Unlimited Creativity, <span className="italic font-helveticanowdisplay font-extralight">We Transform Your Vision <br />
      Into Reality, Inviting You To</span> Discover A Universe Of <br />
      <span className="italic font-helveticanowdisplay font-extralight">Unique And Memorable Experiences.</span>
    </h1>
  </div>
    </div>
  );
};

export default TextSection;