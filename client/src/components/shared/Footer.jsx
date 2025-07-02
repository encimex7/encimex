"use client"
import Image from "next/image";
import footerimg from "../../../public/assets/images/footerimg.png";
import footerlogo from "../../../public/assets/images/footerlogo.png";
import topleft from "../../../public/assets/images/topleft.png";
import bottomright from "../../../public/assets/images/bottomright.png";
import { CircleArrowRight, Linkedin } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
// import { Youtube } from 'lucide-react';
import {motion} from 'framer-motion'



export default function ContactSection() {
    const nav_items1 = [
        { item: "Home", path: "/" },
        { item: "About us", path: "/about" },
        { item: "Service", path: "/service" },


      ];
      const nav_items2 = [
        { item: "Blogs", path: "/blogs" },
        { item: "Gallery", path: "/gallery" },
        { item: "Contact us", path: "/contact" },
      ];
    
    return (
    <div className="relative bg-[#0D0D0D] ">
      <div className="relative text-white pt-16 overflow-hidden">
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-40 z-0">
          <Image
            src={footerimg}
            alt="footer image"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            quality={80}
            priority
          />
        </div>
  
        <div className="container mx-auto lg:px-20 px-4 relative z-10">
          {/* Contact Us Header */}
          <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8 flex justify-start items-start w-32">
            <Image src={topleft} alt="topleft shape" className="-top-2 left-0  absolute z-20"  />
            <h3 className="uppercase text-sm font-medium tracking-wider pl-4">Contact Us</h3>
            <Image src={bottomright} alt="bottomright shape" className="-bottom-2 right-0  absolute z-20"  />           
          </motion.div>
  
          {/* Main Heading */}
          <motion.h2 
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="md:text-4xl text-3xl   mb-5">Let's get in touch</motion.h2>
  
          {/* Email with underline */}
          <motion.a
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            href="mailto:business@encimex.com"
            className="md:text-4xl text-3xl border-b border-white/50 pb-1 inline-block hover:text-gray-300 transition-colors"
          >
            business@encimex.com
          </motion.a>
  
          {/* Navigation and Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-16 gap-4 mt-16 ">
            {/* Navigation Links */}
            <ul className="space-y-4 ">
            {nav_items1.map((x, index) => (
                <li key={index} className="border-b border-white/20 pb-1">
                <a
                    href={x.path}
                    className="text-black hover:text-white inline-flex items-center group relative"
                >
                    <span className="relative text-lg md:text-xl text-white font-light">
                    {x.item}
                    <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <CircleArrowRight className="hidden group-hover:block ml-2 text-black group-hover:text-white transition-colors duration-300 stroke-[1.5] " />
                </a>
                </li>
            ))}
            </ul>
  
            <ul className="space-y-4 md:mb-0 mb-8 ">
            {nav_items2.map((x, index) => (
                <li key={index} className="border-b border-white/20 pb-1">
                <a
                    href={x.path}
                    className="text-black hover:text-white inline-flex items-center group relative"
                >
                    <span className="relative text-lg md:text-xl text-white font-light">
                    {x.item}
                    <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <CircleArrowRight className="hidden group-hover:block ml-2 text-black group-hover:text-white transition-colors duration-300 stroke-[1.5] " />
                </a>
                </li>
            ))}
            </ul>
  
            {/* Contact Information */}
            <div className="space-y-2 font-light">
              <p>IND : +91 7012127746</p>
              <p>UK : +44 770 915 5662</p>
              <p>USA : +1(515)302-1187</p>
              <div className="mt-6">
                <p>GS2 Heavenly Plaza Vazhakkala,</p>
                <p>Cochin,India 682021</p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-8">
              <a href="https://www.linkedin.com/company/14486987/admin/dashboard/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="hover:text-[#BEBEBE] transition-colors" />
              </a>
              <a href="https://www.facebook.com/encimex" target="_blank" rel="noopener noreferrer">
                <Facebook className="hover:text-[#BEBEBE] transition-colors" />
              </a>
              {/* <a href="https://www.instagram.com/encimexengineering/" target="_blank" rel="noopener noreferrer">
                <Instagram className="hover:text-[#BEBEBE] transition-colors" />
              </a> */}
            </div>
        </div>
  
          
  
          {/* Logo */}
          <div className="mt-16  relative">
            <Image 
              src={footerlogo}
              alt="footer image"
              className="w-full h-auto"
              priority
            />
            
            {/* Scroll to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="absolute md:-top-20 -top-16 md:-right-14 -right-0 bg-orang text-white md:p-3 p-1 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 z-50"
              aria-label="Scroll to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
        </div>
  
          {/* Footer */}
       
        </div>
      </div>
      <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full h-0.5 absolute bg-[#ffffff] md:bottom-[8%] bottom-[6%] left-0 right-0"
        />
        
      <div className=" text-xs  pt-4 pb-4 font-light  mx-auto">
            <div className="lg:px-20 px-4">
            <p>Copyright © 2025</p>
            <p>Designed and Maintained by Tapclone</p>
            </div>
          </div>
      </div>
    )
  }
  