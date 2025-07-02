"use client";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import projectbg from "../../../../public/assets/images/projectbg.png";

export default function ProjectsSection({ photos, subtitle, description }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    setSelectedImage(photos[currentIndex === 0 ? photos.length - 1 : currentIndex - 1]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    setSelectedImage(photos[currentIndex === photos.length - 1 ? 0 : currentIndex + 1]);
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  if (!photos || photos.length === 0) {
    return (
      <section className="relative bg-[#0D0D0D]  text-white min-h-screen md:pt-20 pt-20 md:pb-40 pb-10 px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectbg}
            alt="about banner image"
            className='object-contain object-center w-full'
            quality={100}
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-white text-center py-10">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-[#0D0D0D]  text-white min-h-screen md:pt-20 pt-20 md:pb-40 pb-10 px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectbg}
            alt="about banner image"
            className='object-contain object-center w-full'
            quality={100}
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-col gap-12 w-full">
          {/* Left: Title and description */}
          <div className="w-full flex justify-between gap-50 pb-14"> 
            <div className="w-[60%]">
              <h2 className="text-5xl mb-2">Projects</h2>
              <div className="w-50 h-1 bg-white mb-6" />
            </div>
            <div className="w-[40%] md:block hidden">
              <p className="text-gray-200 text-sm leading-relaxed">
                We're dedicated to delivering precise, innovative, and client-focused solutions that set new industry standards. Our team is committed to leveraging cutting-edge technology and expert craftsmanship to ensure exceptional quality and efficiency in every project we undertake.
              </p>
            </div>
          </div>

          {/* Right: Projects grid */}
          <div className="md:grid hidden md:grid-cols-2 lg:grid-cols-4 gap-x-28 gap-y-40">
            {photos.map((project, index) => (
              <div
                key={index}
                className={`${index % 2 === 0 ? 'top-[4%]' : 'top-40'} relative flex items-center justify-center min-h-[260px] min-w-[220px] group hover:bg-orange-500/30 cursor-pointer`}
                onClick={() => handleImageClick(project, index)}
              >
                {/* Corners */}
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                {/* Image */}
                <Image
                  src={project}
                  alt={`Gallery ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover z-10 transition-all duration-200"
                />
              </div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="max-w-5xl w-full relative md:hidden block mx-auto px-1">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.4}
              navigation={{
                prevEl: ".slidePrev-btn",
                nextEl: ".slideNext-btn",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="gallery-swiper"
            >
              {photos.map((project, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative flex items-center justify-center min-h-[260px] min-w-[220px] group hover:bg-orange-500/30 cursor-pointer"
                    onClick={() => handleImageClick(project, index)}
                  >
                    {/* Corners */}
                    <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                    {/* Image */}
                    <Image
                      src={project}
                      alt={`Gallery ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover z-10 transition-all duration-200 aspect-[1/1]"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation buttons */}
            <div className="flex justify-between mt-6 mx-10">
              <div className="flex justify-center items-center space-x-1 bg-orang border border-orang px-5 py-1.5">
                <button className="slidePrev-btn w-10 h-10 flex items-center justify-center hover:bg-orang transition-colors cursor-pointer">
                  <ArrowLeft className="w-6 h-7" />
                </button>
              </div>
              <div className="flex justify-center items-center space-x-1 bg-orang border border-orang px-5 py-1.5">
                <button className="slideNext-btn w-10 h-10 flex items-center justify-center hover:bg-orang transition-colors cursor-pointer">
                  <ArrowRight className="w-6 h-7" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-500 transition-colors z-50 bg-black/50 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <ArrowLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-orange-500 transition-colors z-50 bg-black/50 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div className="relative max-w-4xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Enlarged project image"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
