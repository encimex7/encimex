"use client";
import { getMinimalServices } from '@/app/actions/actions';
import { Disclosure } from '@headlessui/react';
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from "react";
import servicegrid from "../../../../public/assets/images/servicegrid.png";
import sminus from "../../../../public/assets/images/sminus.png";
import splus from "../../../../public/assets/images/splus.png";
import { AnimatePresence } from "framer-motion";
import l1 from '../../../../public/assets/images/l1.png';
import l2 from '../../../../public/assets/images/l2.png';
import l3 from '../../../../public/assets/images/l3.png';
import l4 from '../../../../public/assets/images/l4.png';
import l5 from '../../../../public/assets/images/l5.png';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';



export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getMinimalServices();
        if (result.success) {
          const parsedServices = JSON.parse(result.services);
          // Add numbers to services for display
          const servicesWithNumbers = parsedServices.map((service, index) => ({
            ...service,
            number: String(index + 1).padStart(2, '0')
          }));
          setServices(servicesWithNumbers);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const PlusMinusIndicator = ({ isOpen }) => (
    <div className="w-full">
      <div className="w-6 h-10 flex items-center justify-center ">
        <Image 
          src={isOpen ? sminus : splus} 
          alt={isOpen ? "Minus" : "Plus"}
          width={24}
          height={24}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="bg-[#0D0D0D] md:pb-16 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-white text-center py-10">Loading services...</div>
        </div>
      </div>
    );
  }

  const panelVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

  return (
    <div className="bg-[#0D0D0D] md:pb-16 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto md:pb-0 pb-4 ">
        <div className="relative">
          <div className="relative z-10">
            <div className="flex flex-row items-center justify-center ">
              <div className="w-[10%]  md:pb-0 pb-4 ">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }} 
                  className="text-white md:text-[4vw] text-[12vw] font-light mb-2 whitespace-nowrap md:leading-18 leading-14 md:pt-12"
                >
                  Services we<br />offer
                </motion.h2>
              </div>
              <div className="w-[90%]  "> 
                <Image src={servicegrid} alt="servicegrid" className="w-full h-auto object-cover md:block hidden"/>
              </div>
            </div>
            
            <div className="border-t border-b border-white/50">
              {services.map((service, index) => (
                <Disclosure key={service._id}>
                  {({ open }) => (
                    <div className="border-b border-white/50 last:border-b-0">
                      <Disclosure.Button
                        className="w-full flex items-center py-6 relative"
                        onClick={() => setOpenIndex(index)}
                      >
                        <span className="text-[#595959]">{service.number}</span>
                        <p className="text-white uppercase text-xl text-left md:pl-32 pl-6 md:w-full w-[80%]">
                          {service.title}
                        </p>
                        <div className="absolute right-4 top-10 -translate-y-1/2">
                          <PlusMinusIndicator isOpen={open} />
                        </div>
                      </Disclosure.Button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <Disclosure.Panel
                            static
                            as={motion.div}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={panelVariants}
                            className="overflow-hidden"
                          >
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.15 }}
                            >
                              <div className="flex flex-col md:flex-row md:gap-16 gap-8 pt-10 md:pl-32 md:pb-10 pb-4">
                                <div className="md:w-[45%] w-full bg-gradient-to-t from-[#14090D] via-[#6B111D] to-[#D25326] px-3 pt-3 pb-5 rounded-xl cursor-pointer">
                                  <Link href={`/service/${service.slug}`}>
                                  <Image
                                    src={service.main_photo}
                                    alt={service.title}
                                    width={500}
                                    height={200}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  </Link>
                                </div>
                                <div className="md:w-[57%] w-full">
                                  <p className="text-white text-xl font-light md:pr-20 leading-relaxed line-clamp-5"
                                    dangerouslySetInnerHTML={{ __html: service.description || '' }} />
                                    {/* {service.description} */}
                                  {/* </p> */}
                                  <div className="flex md:justify-end md:items-end pt-4">
                                    <Link href={`/service/${service.slug}`}>
                                      <div className="flex flex-row items-center justify-center gap-2 md:w-full w-full border border-orang rounded-full cursor-pointer px-1">
                                        <p className="text-white text-xl font-light p-1">Read More</p>
                                        <ArrowRight className="text-black bg-white rounded-full p-1" />
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </Disclosure.Panel>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>


    <div className=" min-h-[200px] md:min-h-[200px] z-0 max-w-7xl mx-auto pt-20 ">
    <div className="w-full mx-auto ">

        {/* First Logo Section: Left to Right Scroll */}
        <Swiper
          slidesPerView={3} // Adjusts for mobile
          spaceBetween={10} // Mobile spacing
          loop={true}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          speed={3000} // Adjusts scrolling speed
          modules={[Autoplay]}
          className="mySwiper "
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 10 }, // Tablet view
            1024: { slidesPerView: 4, spaceBetween: 40 }, // Desktop view

          }}
        >
          {[l1, l2, l3, l4, l5,l1, l2, l3, l4, l5, ].map((logo, index) => (
            <SwiperSlide key={index}>
              <div className='h-14 md:h-16 lg:h-24 bg-white border flex items-center justify-center mx-auto rounded-lg'>
                <Image 
                    src={logo} 
                    alt={`logo-${index + 1}`} 
                    className="h-full w-auto object-contain" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

    </div>
    </div>


      <div className="mx-auto flex flex-col items-center justify-center relative">
        <h1 className="md:text-[19vw] text-[19vw] text-orang text-4xl font-base">SERVICES</h1>
        <div className="w-full md:h-20 h-10 bg-[#0D0D0D] absolute md:bottom-6 bottom-0 blur-md"></div>
      </div>
    </div>
  );
}