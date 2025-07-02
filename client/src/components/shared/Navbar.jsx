"use client";

import { getServiceName } from "@/app/actions/actions";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleArrowRight, Menu, X } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import e from "../../../public/assets/images/e.png";
import logo from "../../../public/assets/images/logo.svg";
import { usePathname } from 'next/navigation'; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); 
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleMouseLeave = (event) => {
      if (isOpen && navbarRef.current) {
        setIsOpen(false);
      }
    };
  
    if (isOpen) {
      navbarRef.current?.addEventListener('mouseleave', handleMouseLeave);
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }
  
    return () => {
      navbarRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [isOpen]);

  const nav_items1 = [
    { item: "Home", path: "/" },
    { item: "About", path: "/about" },
    { item: "Services", path: "/service",},
  ];
  const nav_items2 = [
    { item: "Blogs", path: "/blogs" },
    { item: "Gallery", path: "/gallery" },
    { item: "Contact us", path: "/contact" },
  ];

  return (
    <>
      <header className="z-50 w-full font-roboto md:hidden block">

      <AnimatePresence>
            <motion.div
            key="logo"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-auto h-auto cursor-pointer  z-50 absolute top-5 md:left-[4%] left-[2%] transition-opacity duration-300"
            onClick={() => {
                router.push('/')
            }}
            >
            <Image
                src={logo}
                alt="logo"
                width={180} // Set appropriate width
                height={40} // Set appropriate height
                style={{
                width: 'auto',
                height: 'auto',
                }}
                priority
            />
            </motion.div>        
      </AnimatePresence>

        <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute top-[4%] z-[999] right-[5%]">
          <div className="relative  md:-top-0 -top-2 md:right-0 gap-2 justify-end flex items-center mx-auto">
            <div className="group text-black bg-white flex pt-1 pr-1 pb-1 pl-4 gap-4 rounded-lg justify-center items-center text-lg font-medium">
                menu
              <div
                className="navbar-toggle-button bg-[#F15A2B] text-white relative overflow-hidden transition-transform md:duration-700 duration-400 ease-in-out p-1 rounded-lg flex items-center justify-center md:focus:outline-none "
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X  fill="white" /> : <Menu  fill="white"/>}
              </div>
            </div>
          </div>
        </motion.div>

      </header>

       <nav className={` absolute font-league-spartan bg-transparent w-full z-50`}>
      <div className={`max-w-7xl mx-auto px-4 py-7 `}>
        
      <div className={`flex justify-between items-center h-16 w-full `}>

          {/* Logo Section */}
          <div className="hidden lg:flex items-center w-1/4">
            <div className="flex-shrink-0">
              <div 
              onClick={()=>{navigate('/')}}
              className="flex items-center cursor-pointer">
                <Image
                  src={logo}
                  alt="Logo"
                  className=""
                />
             </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between border  rounded-full backdrop-blur-md py-2 pl-4 pr-4 w-3/4">
            {nav_items1.map((item) => (
              <a
                key={item.item}
                href={item.path}
               className={`px-6 py-2 rounded-full font-medium ${
                pathname === item.path 
                  ? 'text-orang bg-white rounded-full' 
                  : 'text-white hover:text-orang'
              }`}
              >
                {item.item}
              </a>              
            ))}
             {nav_items2.map((item) => (
              <a
                key={item.item}
                href={item.path}
               className={`px-6 py-2 rounded-full font-medium ${
                pathname === item.path 
                  ? 'text-orang bg-white rounded-full' 
                  : 'text-white hover:text-orang'
              }`}
              >
                {item.item}
              </a>              
            ))}
          </div>          
        </div>       
      </div>
      </nav>

      {/* Expanded Navigation Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={navbarRef}
            initial={{ y: "-110%" }}
            animate={{ y: isOpen ? "0%" : "110%" }}
            exit={{ y: "-110%" }}
            transition={{ type: "tween", duration: 0.3, exit: { delay: 2 } }}
            className="absolute inset-0 bg-orang text-white  md:h-[67vh] h-[100vh]  z-50 overflow-y-auto pt-6  max-w-8xl lg:pl-10 "
          >
             <AnimatePresence>
              <motion.div
              key="logo"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-auto h-auto cursor-pointer  z-[999] absolute top-7 md:left-[5.5%] left-[2%] transition-opacity duration-300"
              onClick={() => {
                  router.push('/')
              }}
              >
              <Image
                  src={e}
                  alt="logo"
                  width={200} // Set appropriate width
                  height={40} // Set appropriate height
                  style={{
                  width: 'auto',
                  height: 'auto',
                  }}
                  priority
              />
              </motion.div>        
            </AnimatePresence>

            <div className="container mx-auto px-4 md:pb-0 pb-16 md:pt-0  pt-22  ">
              

              {/* Menu content in 2 columns */}

              <motion.div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 w-full h-full md:absolute md:w-[95%] md:h-[72%] md:bottom-[1%] md:left-10 lg:px-10">
                {/* Address */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="md:block hidden  "
                >
                  <ul className="space-y-0 text-white uppercase">
                    <li>ind : +91 7012127749</li>
                    <li>uk : +44 770 015 5652</li>
                    <li>usa : +1(315)302-1187</li>
                  </ul>
                  <p className="pt-10 text-lg">GS2 Heavenly Plaza Vazhakkala,<br/> Cochin, India 682021</p>
                  <p className="pt-5 text-lg">business@encimex.com</p>
                </motion.div>

                {/* Quick Links Column */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4 w-full pt-5"
                >
                  <ul className="md:space-y-7 space-y-3">
                    {nav_items1.map((x, index) => (
                      <li key={index} className="border-b border-white/30 pb-1">
                          <a
                            href={x.path}
                            className="text-white hover:text-white inline-flex items-center group relative"
                          >
                            <span className="relative text-lg md:text-2xl">
                              {x.item}
                              {/* <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span> */}
                            </span>
                            <CircleArrowRight className="hidden group-hover:block ml-2 text-white group-hover:text-white transition-colors duration-300 stroke-[1.5]" />
                          </a>
                      </li>
                    ))}
                  </ul>

                  <ul className="md:space-y-7 space-y-3">
                    {nav_items2.map((x, index) => (
                      <li key={index} className="border-b border-white/30 pb-1">
                      <a
                        href={x.path}
                        className="text-white hover:text-white inline-flex items-center group relative"
                      >
                        <span className="relative text-lg md:text-2xl">
                          {x.item}
                          {/* <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span> */}
                        </span>
                        <CircleArrowRight className="hidden group-hover:block ml-2 text-white group-hover:text-white transition-colors duration-300 stroke-[1.5] " />
                      </a>
                    </li>
                    ))}
                  </ul>
                </motion.div>

                 <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="md:hidden block   "
                >
                  <ul className="space-y-0 text-white uppercase md:pt-2">
                    <li>ind : +91 7012127749</li>
                    <li>uk : +44 770 015 5652</li>
                    <li>usa : +1(315)302-1187</li>
                  </ul>
                  <p className="pt-8 text-lg">GS2 Heavenly Plaza Vazhakkala<br/> Cochin,India 682021</p>
                  <p className="pt-5 text-lg">business@encimex.com</p>
                </motion.div>


              </motion.div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </>
  );
}

export default Navbar;
