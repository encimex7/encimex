// GallerySection.jsx
"use client"
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import bottomright from "../../../../public/assets/images/bottomright.png";
import g1 from "../../../../public/assets/images/g1.png";
import g2 from "../../../../public/assets/images/g2.png";
import g3 from "../../../../public/assets/images/g3.png";
import g4 from "../../../../public/assets/images/g4.png";
import topleft from "../../../../public/assets/images/topleft.png";


export default function GallerySection() {
  const [slidesPerView, setSlidesPerView] = useState(3.2);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3.2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample gallery images - replace with your actual images
  const galleryImages = [
    {
      src: g1,
      alt: 'Construction workers on a modern building platform'
    },
    {
      src: g2,
      alt: 'Modern building architecture corner'
    },
    {
      src: g3,
      alt: 'Engineers reviewing blueprints at construction site'
    },
    {
      src: g4,
      alt: 'Aerial view of construction site'
    },
    {
      src: g1,
      alt: 'Interior of modern building structure'
    },
    {
      src: g2,
      alt: 'Modern building architecture corner'
    },
    {
      src: g3,
      alt: 'Engineers reviewing blueprints at construction site'
    },
    {
      src: g4,
      alt: 'Aerial view of construction site'
    },
  ];

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
    setSelectedImage(galleryImages[currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedImage(galleryImages[currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1]);
  };

  return (
    <div className="w-full md:py-16 py-4">
      <div className="lg:px-28 mx-auto px-4">
        {/* Gallery header */}
        {/* <div className="mb-2">
          <span className="text-orang text-sm uppercase tracking-wider">GALLERY</span>
        </div> */}
         <div className="relative mb-10 flex justify-start items-start w-28">
            <Image src={topleft} alt="topleft shape" className="-top-3 left-0  absolute z-20"  />
            <h3 className="uppercase text-sm font-medium tracking-wider pl-6">Gallery</h3>
            <Image src={bottomright} alt="bottomright shape" className="-bottom-3 right-0  absolute z-20"  />           
          </div>
        
        {/* Gallery title */}
        <motion.div  
         initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} 
        className="flex  md:flex-row flex-col md:flex-wrap items-baseline mb-16 md:gap-0  gap-8">
          <div className='md:w-[70%] w-full'>
          <h2 className="text-white text-4xl md:text-5xl mr-2 md:leading-14 leading-12">Built with precision <br/>
            <span className="bg-orang text-white px-2 ">captured</span> with pride
            </h2>
          </div>
          <div className='md:w-[30%] w-full'> 
          <p className="text-gray-400 text-base font-light">
             Explore our curated collection of moments captured in frames. Each image tells a story of creativity and inspiration.
            </p>
          </div>
        </motion.div>
        
       
        
       
        
        {/* Gallery slider */}
        <div className="relative bg-[#1F1F1F] rounded-lg md:px-10 px-5 md:pt-12 pt-6 md:pb-32 pb-28">
          <Swiper
            spaceBetween={16}
            slidesPerView={slidesPerView}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              type: 'bullets',
              bulletActiveClass: 'bg-orang w-8',
              bulletClass: 'inline-block h-2 w-2 bg-gray-400 rounded-full mx-1 transition-all duration-300'
            }}
            className="gallery-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
              <div 
                className="relative aspect-[3/2.5] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(image, index)}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>            
            ))}
          </Swiper>
          
          {/* Custom pagination */}
          <div className=" swiper-pagination bg-[#0D0D0D] px-4 py-3 rounded-full"></div>
        </div>
      </div>
      
      {/* Custom styles for Swiper */}
      <style jsx>{`
        :global(.swiper-pagination) {
          width: 10rem !important; 
          position: absolute;
          left: 45% !important;
          bottom: 9% !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          :global(.swiper-pagination) {
            left: 25% !important;
            width: 10rem !important; 
            position: absolute;
            bottom: 9% !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/70 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
            {/* Close button */}
            <div className="flex justify-end items-end w-full absolute md:right-[7%] right-[7%] z-50">
              <button
                onClick={handleClose}
                className="text-gray-800 bg-white rounded-lg md:px-4 px-2 md:py-2 py-1 transition-colors hover:bg-gray-100"
              >
                <span className="text-4xl">×</span>
              </button>
            </div>

            {/* Image container */}
            <div className="relative w-full flex justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={500}
                className="md:h-[80vh] h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Controls outside the image */}
            <div className="w-full flex justify-between items-center mt-4 absolute top-1/2 -translate-y-1/2">
              {/* Previous button */}
              <button
                onClick={handlePrevious}
                className="text-gray-800 bg-white rounded-full md:p-3 p-2 transition-colors hover:bg-gray-100"
              >
                <ArrowLeft size={24} />
              </button>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="text-gray-800 bg-white rounded-full md:p-3 p-2 transition-colors hover:bg-gray-100"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}