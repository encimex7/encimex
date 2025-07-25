"use client";
import React, { useState, useEffect } from 'react';
import blogbanner from "../../../../public/assets/images/blogbanner.png";
import blogbannermob from "../../../../public/assets/images/blogbannermob.png";
import { getMinimalServices } from '@/app/actions/actions';
import Banner from '@/components/shared/Banner';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getMinimalServices();
        if (result.success) {
          const parsedServices = JSON.parse(result.services);
          setServices(parsedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  return (
    <section>
      <Banner
        heading="services" 
        banner={blogbanner} 
        bannermob={blogbannermob} 
        title="Your Needs. Our <br/>Priority" 
      />

      {/* Services Section */}
      <div className="bg-black py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
              <h2 className="md:text-4xl text-4xl font-light md:pb-4 pb-4">
              <span className="text-orang font-normal">OUR</span> <span className="text-white">SERVICES</span>
          </h2>
          {/* </div> */}
            <p className="text-base md:text-base text-orang max-w-2xl mx-auto font-light leading-tight">
              We offer a wide range of specialized services tailored to adapt to your project's evolving requirements.
            </p>
          </div>

          {/* Services Grid */}
          <div className="md:space-y-24 space-y-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-4 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-[45%] p-4">
                  <div className="relative overflow-hidden rounded-lg shadow-lg ">
                  <Link href={`/service/${service.slug}`}>
                    <img
                      src={service.main_photo}
                      alt={service.title}
                      className="w-full h-64 md:h-68 object-cover"
                    />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-gradient-to-b from-[#14090D]/50 via-[#6B111D]/30 to-[#D25326]/40 transition-all duration-500 z-10'></div>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-[55%]  p-8 md:p-1 rounded-lg text-white">
                  <div className="space-y-6">

                     <div>
                      <h3 className="text-2xl md:text-3xl font-medium capitalize text-orang mb-6">
                        {service.title}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm md:text-base leading-relaxed mb-6 line-clamp-5 text-justify"
                         dangerouslySetInnerHTML={{ __html: service.description || '' }} />
                      {/* </p> */}
                    </div>

                    <div className="flex md:justify-end md:items-end pb-4">
                        <Link href={`/service/${service.slug}`}>
                            <div className="flex flex-row items-center justify-center gap-2 md:w-full w-full border border-orang rounded-full cursor-pointer px-1">
                            <p className="text-white text-xl font-light p-1">Read More</p>
                            <ArrowRight className="text-black bg-white rounded-full p-1" />
                            </div>
                        </Link>
                    </div>

                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;