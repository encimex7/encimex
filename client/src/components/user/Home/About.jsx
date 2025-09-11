"use client"
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import aboutimg from "../../../../public/assets/images/aboutimg.png";
import aboutimgmob from "../../../../public/assets/images/aboutimgmob.png";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SplitType from 'split-type';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getGalleryImages } from '@/app/actions/actions';

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

gsap.registerPlugin(ScrollTrigger);

function About() {
    const isMobile = useIsMobile();
    const [slidesPerView, setSlidesPerView] = useState(2);
    const [galleryImages, setGalleryImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const swiperRef = useRef(null);
    

    useLayoutEffect(() => {
      const initializeAnimations = () => {
        const splitType = document.querySelector('.middle-text');
        
        if (splitType) {
          if (splitType.isSplit) {
            splitType.revert();
          }
        
          const text = new SplitType(splitType, { 
            types: 'chars,words',
            absolute: false 
          });
  
          ScrollTrigger.getAll().forEach(st => {
            if (st.vars.trigger === '.middle-text') {
              st.kill();
            }
          });
  
          gsap.from(text.chars, {
            scrollTrigger: {
              trigger: '.middle-text',
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
        gsap.killTweensOf('.middle-text');        
      };
    }, []);

    useEffect(() => {
        const fetchGalleryImages = async () => {
          try {
            const result = await getGalleryImages("steel-detailing");
            if (result.success) {
              const parsedGalleryImages = JSON.parse(result.galleryImages);
              setGalleryImages(parsedGalleryImages);
              setImagesLoaded(true);
            }
          } catch (error) {
            console.error("Error fetching gallery images:", error);
            setImagesLoaded(true); // Set to true even on error to prevent infinite loading
          }
        };
    
        fetchGalleryImages();
    }, []);

    // Restart autoplay when images are loaded
    useEffect(() => {
      if (imagesLoaded && galleryImages.length > 0 && swiperRef.current) {
        const timer = setTimeout(() => {
            if (swiperRef.current?.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.start();
          }
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }, [imagesLoaded, galleryImages]);

    // const handleSwiperInit = (swiper) => {
    //   // Ensure autoplay starts when swiper is initialized with images
    //   if (galleryImages.length > 0  && swiper?.autoplay) {
    //     setTimeout(() => {
    //       swiper.autoplay.start();
    //     }, 100);
    //   }
    // };

    console.log(galleryImages)

  return (
     <div className="relative h-auto  overflow-hidden bg-[#0D0D0D]  ">
            <div className="relative text-white md:h-screen h-[79vh] w-full mx-auto ">
    
                    {/* Background picture */}
                    <div className="absolute inset-0 top-0 opacity-40 z-0 w-full">
                    <Image
                        src={isMobile ? aboutimgmob : aboutimg}
                        alt=""
                        fill
                        quality={80}
                        priority
                    />
                    </div>

                   
                        
                    {/* text */}
                    <div className='h-screen relative   px-3 w-full mx-auto '>
                        <div className='absolute  top-[7%] md:top-[14%]  md:left-[10%] left-[10%] '>
                        <motion.h1 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         className='text-orang text-3xl'>WHO WE <span className='text-white'>ARE</span>   </motion.h1>
                        </div>

                        <div className='md:block absolute hidden md:top-[28.5%] top-[15%] md:left-[0%] w-[57.7%] pr-4 h-[62vh] px-12 '>
                            <div className="relative w-full h-full bg-transparent rounded-lg overflow-hidden">
                              {!imagesLoaded ? (
                                // Loading placeholder
                                <div className="flex items-center justify-center h-full bg-transparent rounded-lg">
                                  <div className="text-white">Loading images...</div>
                                </div>
                              ) : galleryImages.length > 0 ? (
                                <Swiper
                                  ref={swiperRef}
                                  spaceBetween={20}
                                  slidesPerView={slidesPerView}
                                  modules={[Pagination, Autoplay]}
                                  autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: false,
                                    waitForTransition: false,
                                  }}
                                  loop={true}
                                  // onSwiper={handleSwiperInit}
                                  onAutoplayStart={() => {
                                    console.log('Autoplay started');
                                  }}
                                  className="h-full w-full"
                                >
                                  {galleryImages.map((photo, index) => (
                                    <SwiperSlide key={index} className="h-full">
                                      <Link href={`/service/steel-detailing`} passHref>
                                      <div className="relative h-[87%] rounded-lg overflow-hidden cursor-pointer">
                                        <Image 
                                          src={photo.image} 
                                          alt="steel detail image"
                                          fill
                                          className="rounded-lg overflow-hidden h-full object-cover"
                                          onLoad={() => {
                                            // Restart autoplay when image loads
                                            if (swiperRef.current?.swiper) {
                                              swiperRef.current.swiper.autoplay.start();
                                            }
                                          }}
                                        />
                                      </div>

                                       {/* {photo.subTitle && ( */}
                                          <div className="flex flex-col gap-2 border-2 border-orang py-1 rounded-lg bg-orang/30 h-auto mt-3">
                                              <h2 className="text-white  text-left pl-3 capitalize  text-sm">{photo.subTitle}</h2>
                                          </div>
                                      {/* )} */}


                                      </Link>
                                    </SwiperSlide>            
                                  ))}
                                </Swiper>
                              ) : (
                                // No images placeholder
                                <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
                                  <div className="text-white">No images available</div>
                                </div>
                              )}
                            </div>
                          </div>

                        <div className='absolute  md:top-[28%] top-[15%] md:left-[60%] flex flex-col gap-8 md:max-w-md max-w-sm md:pr-0  pr-4  '>
                        <div className='middle-text flex flex-col gap-6 text-base'>
                        <p>Encimex Engineering Services Pvt. Ltd is a holistic BIM solution company mainly focused on steel detailing services using Tekla structural software. Since our incorporation in 2018, we have constantly set new standards to provide seamless engineering services.Our decades of business expertise contribute to the preservation of satisfied clients from the United States, Canada, and the United Kingdom.</p>
                        <p>We offer a wide range of engineering services, including designing, detailing and all kinds of building information modeling, which helps the consultants, contractors and fabricators to fulfill their engineering requirements effortlessly. We strive to provide cutting-edge solutions to assist clients in overcoming obstacles that arise on the worksite.</p>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <div className="flex-grow border-t border-dashed border-gray-400"></div>
                            <Link href={`/about`} passHref>
                            <div className='flex justify-between items-center'>
                            <span className="px-4 text-white text-sm font-medium">Read More</span>
                            <span><ArrowUpRight /></span>
                            </div>
                            </Link>
                            <div className="flex-grow border-t border-dashed border-gray-400"></div>
                        </div>
                        </div>

                               
                    </div>
            </div>

            
            

              
    </div>
  )
}

export default About