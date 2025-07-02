"use client";
import { getGalleryImages, getServiceDetails } from "@/app/actions/actions";
import Banner from "@/components/user/Service/Banner";
import ProjectSection from "@/components/user/Service/Projects";
import Services from "@/components/user/Service/Services";
import VisionSection from "@/components/user/Service/Vision";
import { use, useEffect, useState } from "react";
import servicebanner from "../../../../../public/assets/images/servicebanner.png";

export default function Service({ params }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const serviceId = use(params).id;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const result = await getServiceDetails(serviceId);
        if (result.success) {
          const parsedService = JSON.parse(result.service);
          setService(parsedService);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGalleryImages = async () => {
      const result = await getGalleryImages(serviceId);
      if (result.success) {
        const parsedGalleryImages = JSON.parse(result.galleryImages);
        setGalleryImages(parsedGalleryImages);
      }
    };

    fetchServiceDetails();
    fetchGalleryImages();
  }, [serviceId]);

  console.log(galleryImages);

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
        <div className="text-white text-xl">Service not found</div>
      </div>
    );
  }

  return (
    <section>
      <Banner 
        heading="service" 
        banner={service.main_photo} 
        title={service.title} 
      />
      
      {/* <ProjectSection 
        photos={service.photos} 
        subtitle={service.subtitle} 
      /> */}

      <ProjectSection
        photos={galleryImages}
        // subtitle={service.subtitle}
      />
      <Services 
      serviceDetail={service.service_detail} 
      serviceId={serviceId}
      />



      {/* <ProjectSection 
        photos={service.photos}
        subtitle={service.subtitle}
        description={service.description}
      /> */}
      
    </section>
  );
}