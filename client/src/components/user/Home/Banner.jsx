"use client"
import Image from 'next/image';
import bannerimg from "../../../../public/assets/images/bannerimg.png";
import eng from "../../../../public/assets/images/eng.png";
import engmob from "../../../../public/assets/images/engmob.png";
import enimex from "../../../../public/assets/images/enimex.png";
import enimexmob from "../../../../public/assets/images/enimexmob.png";
import { motion } from "framer-motion";


function Banner() {
  return (
    <div className="relative h-screen ">
          <div className="relative text-white  bg-gradient-to-b from-[#14090D] via-[#6B111D] to-[#D25326]">

                {/* Background texture overlay */}
                <motion.div 
                //  initial={{ scaleX: 1 }}
                //  whileInView={{ scaleX: 1.2 }}
                //  transition={{ duration: 1, }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut",  }}
                  className="absolute inset-0 top-0 opacity-100 z-0 ">
                <Image
                    src={bannerimg}
                    alt=""
                    fill
                    style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                    }}
                    quality={80}
                    priority
                />
                </motion.div>

    
                <div className='h-screen relative overflow-hidden'>               
                <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                className="md:block absolute hidden left-[80%] bottom-0 -translate-x-1/2 -translate-y-[0%] w-full  h-auto z-10">
                    <Image
                    src={eng}
                    alt="Engineer with safety equipment"
                    className="w-[40%] h-[40%] object-contain"
                    priority
                    />
                </motion.div>

                <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                className="md:hidden absolute left-[50%] bottom-[20%] -translate-x-1/2 -translate-y-[0%] w-full  h-auto z-10">
                <div className='relative'>
                    <Image
                    src={engmob}
                    alt="Engineer with safety equipment"
                    className="w-[100%] h-[100%] object-contain"
                    priority
                    />
                <div className="absolute left-0 -bottom-7 w-full h-20 z-10 bg-[#0D0D0D] blur-md"></div>
                <div className="absolute -left-14 -bottom-8 w-40 h-20 z-10 bg-[#0D0D0D] blur-xl"></div>
                <div className="absolute -right-14 -bottom-8 w-40 h-20 z-10 bg-[#0D0D0D] blur-xl"></div>
                </div>

                </motion.div>

                {/* carosel */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                 className="absolute left-[50%] top-[35.2%] -translate-x-1/2 -translate-y-[50%] w-full h-auto z-0">
                <div className="w-full bg-black/50 overflow-hidden">
                    <div className="container mx-auto relative">
                    <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Steel detailing</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Rebar detailing </div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Connection design & PE stamping</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">MEP BIM services</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Architectural BIM services</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Facade detailing</div>


                        {/* Duplicate items for seamless looping */}
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Steel detailing</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Rebar detailing </div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Connection design & PE stamping</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">MEP BIM services</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Architectural BIM services</div>
                        <div className="inline-block px-20 py-2 text-white md:text-[1vw] text-[5vw] tracking-wider uppercase">Facade detailing</div>
                    </div>
                    </div>
                </div>
                </motion.div>

                {/* encimex - laptop*/}
                <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className="md:block hidden absolute left-[55%] top-[53%] -translate-x-1/2 -translate-y-[50%] w-full   h-auto z-0">
                    <Image
                    src={enimex}
                    alt="Engineer with safety equipment"
                    width={600}  // Set your desired width
                    height={400} // Set proportional height
                    className="w-[90%] h-full object-contain"
                    priority
                    />
                </motion.div>

                 {/* encimex - mobile*/}
                <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
                className="md:hidden block absolute left-[55%] top-[53%] -translate-x-1/2 -translate-y-[50%] w-full   h-auto z-0">
                    <Image
                    src={enimexmob}
                    alt="Engineer with safety equipment"
                    width={600}  // Set your desired width
                    height={400} // Set proportional height
                    className="w-[90%] h-full object-contain"
                    priority
                    />
                </motion.div>

                {/* Bottom Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 1.9 }}
                   className="container mx-auto md:px-6 mt-8 flex flex-col md:flex-row bottom-6 absolute">

                    {/* Left Content */}
                    <div className="md:w-1/2 z-40 bg-[#0D0D0D] md:bg-transparent md:pl-0 pl-6 ">
                    <h2 className="text-white text-3xl font-light mb-2 leading-tight ">
                        Engineering solutions
                        <br />
                        for a <span className="text-white px-2 bg-orang">smarter tomorrow</span>
                    </h2>

                    <div className="mt-6 z-20 relative">
                        <a
                        href="contact"
                        className="inline-flex items-center bg-transparent hover:bg-white/10 text-white border border-white rounded-full px-6 py-2 transition-all duration-300  z-20 "
                        >
                        contact
                        <span className="ml-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        </a>
                    </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:w-1/2 z-10 md:block hidden  ">
                    <div className="text-white max-w-xs ml-auto">
                        <p className="text-base font-light text-white pl-10">
                        "At Encimex, we don’t just consult — we engineer the future. With deep technical expertise and a passion for solving complex challenges"
                        </p>
                    </div>
                    </div>

                </motion.div>

                {/*  shadow */}
                <div className="absolute left-0 -bottom-7 w-full h-20 z-10 bg-[#0D0D0D] blur-md"></div>
                <div className="absolute -left-14 -bottom-7 w-40 h-20 z-10 bg-[#0D0D0D] blur-md"></div>
                <div className="absolute -right-14 -bottom-7 w-40 h-20 z-10 bg-[#0D0D0D] blur-md"></div>




                </div>
            </div>
    </div>
  )
}

export default Banner
