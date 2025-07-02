"use client";
import { getSubServices } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Maximize2, Eye, ZoomIn } from "lucide-react";
import Link from "next/link";

function page() {
    const [service, setService] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});
    const params = useParams();
    const { subId, id } = params;
    const serviceId = id;
  
    useEffect(() => {
      const fetchServiceDetails = async () => {
        try {
          const result = await getSubServices(serviceId , subId);
          if (result.success) {
            const parsedService = JSON.parse(result.service);
            setService(parsedService.service_detail);
          }
        } catch (error) {
          console.error("Error fetching service details:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchServiceDetails();
    }, [serviceId]);

    const photos = service?.photo || [];

    const handleImageClick = (imageSrc, index) => {
      setSelectedImage(imageSrc);
      setSelectedImageIndex(index);
    };

    const handleNext = () => {
      const nextIndex = (selectedImageIndex + 1) % photos.length;
      setSelectedImage(photos[nextIndex]);
      setSelectedImageIndex(nextIndex);
    };

    const handlePrevious = () => {
      const prevIndex = selectedImageIndex === 0 ? photos.length - 1 : selectedImageIndex - 1;
      setSelectedImage(photos[prevIndex]);
      setSelectedImageIndex(prevIndex);
    };

    const handleImageLoad = (index) => {
      setImageLoading(prev => ({ ...prev, [index]: false }));
    };

    const handleImageLoadStart = (index) => {
      setImageLoading(prev => ({ ...prev, [index]: true }));
    };
    const handleImageLoadEnd = (index) => {
      setImageLoading(prev => ({ ...prev, [index]: false }));
    };
  
    if (loading) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-t-white rounded-full animate-spin animation-delay-150"></div>
            </div>
            <div className="text-white/60 text-lg font-light">Loading Service...</div>
          </div>
        </div>
      );
    }
  
    if (!service) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-2xl font-light mb-4">Service not found</div>
            <div className="text-white/60">Please check the URL and try again</div>
          </div>
        </div>
      );
    }

  return (
    <>
      <section className="relative bg-[#0D0D0D] text-white md:pt-32 pt-28 md:pb-16 pb-8 md:px-20 px-4 min-h-screen">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:gap-7 gap-7 w-full">
          {/* Enhanced Header Section */}
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="flex-1 max-w-4xl">
                  {/* Back arrow button */}
                    <Link href={`/service/${serviceId}`} passHref>
                      <button className="flex text-sm items-center text-white border border-white px-4 py-2 rounded-3xl mb-6 transition-all duration-400 opacity-50 hover:opacity-100 cursor-pointer hover:bg-white hover:text-black ">
                        <ArrowLeft className="mr-2" size={16} />
                        Back
                      </button>
                    </Link>
                <div className="md:mb-3 mb-2">
                  <h1 className="text-4xl md:text-6xl font-normal md:mb-2 capitalize bg-gradient-to-r from-white via-white to-orange-300 bg-clip-text text-transparent leading-tight">
                    {service.heading}
                  </h1>
                  <div className="flex items-center gap-4 md:mb-6 mb-2">
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-300"></div>
                    <div className="w-8 h-1 bg-orange-500/50"></div>
                    <div className="w-4 h-1 bg-orange-500/30"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-white/60">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm">{photos.length} Images</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="max-w-5xl">
            <div 
              className="text-lg md:text-xl leading-relaxed text-white/80 font-light prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: service?.description || '' }}
            />
          </div>

          {/* Enhanced Gallery Section */}
          <div className="w-full md:pt-5">
            <div className="flex items-center justify-between mb-8">
              {photos.length > 0 && (
              <h3 className="text-2xl md:text-3xl font-normal text-white">
                Project Gallery
              </h3>
              )}
              <div className="hidden md:flex items-center gap-4">
                <button className="slidePrev-btn group flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 rounded-full transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-orange-400 transition-colors" />
                </button>
                <button className="slideNext-btn group flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 rounded-full transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-orange-400 transition-colors" />
                </button>
              </div>
            </div>

            <div className="relative w-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                navigation={{
                  prevEl: ".slidePrev-btn",
                  nextEl: ".slideNext-btn",
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 28,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 32,
                  },
                }}
                className="gallery-swiper pb-4"
              >
                {photos.map((project, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-orange-500/50 transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                      onClick={() => handleImageClick(project, index)}
                      onMouseEnter={() => handleImageLoadStart(index)}
                      onMouseLeave={() => handleImageLoadEnd(index)}
                    >
                      {/* Image container with enhanced styling */}
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-black/20">
                        {imageLoading[index] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                          </div>
                        )}
                        
                        <Image
                          src={project}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          onLoad={() => handleImageLoad(index)}
                          quality={85}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Hover icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <div className="bg-orange-500/90 backdrop-blur-sm p-3 rounded-full">
                            <ZoomIn className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Image number indicator */}
                      <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white/80 text-sm font-normal">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mobile navigation buttons */}
              <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
                <button className="slidePrev-btn group flex items-center justify-center w-14 h-14 bg-white/5 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full transition-all duration-300">
                  <ArrowLeft className="w-6 h-6 text-white/70 group-hover:text-orange-400 transition-colors" />
                </button>
                <button className="slideNext-btn group flex items-center justify-center w-14 h-14 bg-white/5 hover:bg-orange-500/20 border border-white/20 hover:border-orange-500/50 rounded-full transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-orange-400 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" 
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-orange-400 transition-all duration-300 z-50 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-50">
            <span className="text-white/80 text-sm font-normal">
              {selectedImageIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Previous button */}
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-orange-400 transition-all duration-300 z-50 bg-black/50 backdrop-blur-sm p-4 rounded-full hover:bg-black/70 disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-orange-400 transition-all duration-300 z-50 bg-black/50 backdrop-blur-sm p-4 rounded-full hover:bg-black/70 disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div className="relative max-w-6xl w-full h-[85vh] animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Enlarged project image"
              fill
              className="object-contain drop-shadow-2xl"
              quality={100}
            />
          </div>

          {/* Bottom navigation dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            {photos.slice(0, Math.min(photos.length, 10)).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex 
                    ? 'bg-orange-500 w-6' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(photos[index]);
                  setSelectedImageIndex(index);
                }}
              />
            ))}
            {photos.length > 10 && (
              <span className="text-white/60 text-xs ml-2">+{photos.length - 10}</span>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default page