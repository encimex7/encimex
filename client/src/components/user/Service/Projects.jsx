"use client";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProjectsSection({ photos }) {
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
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-white text-center py-10">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-[#0D0D0D]  text-white pt-5 md:pb-12 pb-4 px-4">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-col gap-6 w-full">

        <Link href="/service" passHref>
            <button className="flex text-sm items-center text-white border border-white px-4 py-2 rounded-3xl mb-6 transition-all duration-400 opacity-50 hover:opacity-100 cursor-pointer hover:bg-white hover:text-black ">
              <ArrowLeft className="mr-2" size={16} />
              Back
            </button>
          </Link>


          {/* Left: Title and description */}
          <div className="w-full flex justify-between pb-4 "> 
            <div className="w-[60%]">
              <h2 className="text-5xl mb-2">Projects</h2>
              <div className="w-50 h-1 bg-white " />
            </div>
          </div>

          <div className="md:max-w-7xl max-w-5xl w-full relative mx-auto md:px-0 px-8">
            <Swiper
              modules={[Navigation,Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".slidePrev-btn",
                nextEl: ".slideNext-btn",
              }}
              autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
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
                    className="relative flex items-center justify-center min-h-[270px] min-w-[230px]  group hover:bg-orange-500/30 cursor-pointer"
                    onClick={() => handleImageClick(project, index)}
                  >
                    {/* Corners */}
                    <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-700 transition-all duration-200"></span>
                    <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-700 transition-all duration-200"></span>
                    {/* Image */}
                    <Image
                      src={project.image}
                      alt={`Gallery ${index + 1}`}
                      width={230}
                      height={220}
                      className="object-cover z-10 transition-all duration-200 "
                    />
                  </div>
                  <div className="flex flex-col gap-2 border-2 border-orang py-2  bg-orang/30 mt-3">
                    <h2 className="text-white text-base text-left pl-4 capitalize  ">{project.subTitle}</h2>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Navigation buttons */}
            <div className="flex justify-between mt-6 mx-10 md:hidden ">
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
          <div className="relative max-w-4xl w-full h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.image}
              alt="Enlarged project image"
              fill
              className="object-contain"
              quality={100}
            />
            {selectedImage.subTitle && (
              <div className="mt-4 text-white text-center">
                {/* <h3 className="text-xl font-semibold">{selectedImage.subTitle}</h3> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
