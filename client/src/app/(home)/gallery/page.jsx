"use client";
import { getGalleries } from "@/app/actions/actions";
import Banner from "@/components/shared/Banner";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import gallerybanner from "../../../../public/assets/images/gallerybanner.png";
import gallerybannermob from "../../../../public/assets/images/gallerybannermob.png";

export default function Gallery() {
    const [steelImages, setsteelImages] = useState([]);
    const [rebarImages, setRebarImages] = useState([]);
    const [connectionImages, setConnectionImages] = useState([]);
    const [officeImages, setOfficeImages] = useState([]);
    const [mepImages, setMepImages] = useState([]);
    const [architecturalImages, setArchitecturalImages] = useState([]);
    const [facadeImages, setFacadeImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('steel-detailing');
    const [activeTabOffice, setActiveTabOffice] = useState('Onam celebration 2022');
    const [isLoading, setIsLoading] = useState(true);
    const [visibleOfficeImages, setVisibleOfficeImages] = useState(8);

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const result = await getGalleries();
                if (result.success) {
                    const galleries = JSON.parse(result.galleries);
                    const steel = galleries.filter(g => g.title === 'steel-detailing');
                    const rebar = galleries.filter(g => g.title === 'rebar-detailing');
                    const connection = galleries.filter(g => g.title === 'connection-design-pe-stamping');
                    const mep = galleries.filter(g => g.title === 'mep-bim-services');
                    const architectural = galleries.filter(g => g.title === 'architectural-bimservices');
                    const facade = galleries.filter(g => g.title === 'facade-detailing');
                    const office = galleries.filter(g => g.galleryType === 'office');
                    
                    setOfficeImages(office);
                    setsteelImages(steel);
                    setRebarImages(rebar);
                    setConnectionImages(connection);
                    setMepImages(mep);
                    setArchitecturalImages(architectural);
                    setFacadeImages(facade);

                    // Set the first office title as default if available
                    if (office.length > 0) {
                        const uniqueTitles = Array.from(new Set(office.map(img => img.title)));
                        setActiveTabOffice(uniqueTitles[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching galleries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGalleries();
    }, []);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    const handleLoadMore = () => {
        setVisibleOfficeImages(prev => prev + 8);
    };

    const getCurrentProjectImages = () => {
        switch (activeTab) {
            case 'steel-detailing':
                return steelImages;
            case 'rebar-detailing':
                return rebarImages;
            case 'connection-design-pe-stamping':
                return connectionImages;    
            case 'mep-bim-services':
                return mepImages;
            case 'architectural-bimservices':
                return architecturalImages;
            case 'facade-detailing':
                return facadeImages;
            default:
                return steelImages;
        }
    };

    // New function to get current office images based on selected office tab
    const getCurrentOfficeImages = () => {
        return officeImages.filter(img => img.title === activeTabOffice);
    };

    const handlePrevious = () => {
        const currentImages = getCurrentOfficeImages();
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
        );
        setSelectedImage(currentImages[currentIndex === 0 ? currentImages.length - 1 : currentIndex - 1]);
    };

    const handleNext = () => {
        const currentImages = getCurrentOfficeImages();
        setCurrentIndex((prevIndex) => 
            prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
        );
        setSelectedImage(currentImages[currentIndex === currentImages.length - 1 ? 0 : currentIndex + 1]);
    };

    const uniqueOfficeTitles = Array.from(new Set(officeImages.map(img => img.title)));

    const ProjectGallery = ({ images, onImageClick }) => (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            // navigation
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
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
            className="w-full"
        >
            {images.length > 0 ? (
                images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="flex flex-col gap-2">
                            <div
                                className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
                                onClick={() => onImageClick(img, idx)}
                            >
                                <Image
                                    src={img.image}
                                    alt={`Gallery ${idx + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                            </div>
                            {img.subTitle && (
                                <div className="flex flex-col gap-2 border-2 border-orang py-2 rounded-lg bg-orang/30">
                                <h2 className="text-white text-base text-left pl-4 capitalize">{img.subTitle}</h2>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <div className="col-span-full flex justify-center items-center py-20">
                    <p className="text-white/60 text-lg">No images available</p>
                </div>
            )}
        </Swiper>
    );

    return (
        <section className="min-h-screen bg-[#0D0D0D]">
            <Banner heading="gallery" banner={gallerybanner} bannermob={gallerybannermob} title="Real Projects. Real<br/> Impact" />
            
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-white text-xl">Loading galleries...</div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
                    {/* Project Gallery Section */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-base text-white">Project Gallery</h2>
                        
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap gap-4">
                            {['steel-detailing', 'rebar-detailing', 'connection-design-pe-stamping', 'mep-bim-services', 'architectural-bimservices', 'facade-detailing'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                        activeTab === tab
                                            ? 'bg-orang text-white'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </button>
                            ))}
                        </div>

                        {/* Project Images with Swiper */}
                        <ProjectGallery 
                            images={getCurrentProjectImages()} 
                            onImageClick={handleImageClick}
                        />
                    </div>

                    {/* Office Gallery Section */}
                     <div className="space-y-8">
                        <h2 className="text-3xl font-base text-white">Office Gallery</h2>
                        
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap gap-4">
                            {uniqueOfficeTitles.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTabOffice(tab)}
                                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                                        activeTabOffice === tab
                                            ? 'bg-orang text-white'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </button>
                            ))}
                        </div>

                        {/* Office Images with Swiper */}
                        <ProjectGallery 
                            images={getCurrentOfficeImages()} 
                            onImageClick={handleImageClick}
                        />
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <div className="relative w-full max-w-5xl mx-auto px-8 h-full flex items-center justify-center">
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-10 group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <svg 
                                className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Left Navigation */}
                        <button
                            onClick={handlePrevious}
                            className="absolute md:-left-12 left-6 top-1/2 -translate-y-1/2 z-10 group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                        >
                            <ArrowLeft className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                        </button>

                        <div className="relative w-full h-[80vh] p-6 md:p-28">
                            <Image
                                src={selectedImage.image}
                                alt="Gallery Image"
                                fill
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Right Navigation */}
                        <button
                            onClick={handleNext}
                            className="absolute md:-right-12 right-6 top-1/2 -translate-y-1/2 z-10 group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
                        >
                            <ArrowRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}