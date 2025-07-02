"use client"
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import bottomright from "../../../../public/assets/images/bottomright.png";
import encimexbg from "../../../../public/assets/images/encimexbg.png";
import encimexbgmob from '../../../../public/assets/images/encimexbgmob.png';
import t1 from "../../../../public/assets/images/t1.png";
import t2 from "../../../../public/assets/images/t2.png";
import t3 from "../../../../public/assets/images/t3.png";
import testibg from "../../../../public/assets/images/testibg.png";
import testibg2 from "../../../../public/assets/images/testibg2.png";
import testimobbg from "../../../../public/assets/images/testimobbg.png";
import topleft from "../../../../public/assets/images/topleft.png";
import useIsMobile from '../../../hooks/useIsMobile';
import { motion } from 'framer-motion';


export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const pathname = usePathname();
  const showBg2 = pathname === '/about';
  const isMobile = useIsMobile();

  const testimonials = [
    {
        name: "Senior Engineer, Public Works Department",
        heading: "Infrastructure Project<br/>Government Client",
        content: "“Working with Encimex was a seamless experience. Their team brought deep technical knowledge and a proactive approach that kept our infrastructure project on schedule and within budget. Their professionalism truly stands out.”",
        image: t1,
    },
    {
        name: "Plant Manager, Steel Manufacturing Company",
        heading: "Industrial Facility Upgrade<br/>Private Sector",
        content: "“Encimex delivered an outstanding engineering solution for our facility upgrade. They listened to our challenges, proposed practical strategies, and ensured everything complied with strict safety standards. We couldn't have asked for a better partner.”",
        image: t2,
    },
    {
        name: "Director, EcoBuild Developers",
        heading: "Green Building Design<br/>Real Estate Developer",
        content: "“The sustainability expertise Encimex brought to our green building project was exceptional. Their energy-efficient design and environmental insights added real value to our development. Highly recommended for forward-thinking projects.”",
        image: t3,
    },
    {
        name: "Project Supervisor, National Highway Authority",
        heading: "Bridge Rehabilitation<br/>Transportation Authority",
        content: "“Encimex showed strong technical leadership and attention to detail during the rehabilitation of our critical bridge structure. Their team was collaborative, responsive, and deeply committed to quality.”",
        image: t1,
    },
    {
        name: "Head of Engineering, Municipal Utilities Board",
        heading: "Water Treatment Plant<br/>Municipal Client",
        content: "“We were impressed by Encimex's ability to manage complex systems and deliver an efficient water treatment solution under tight timelines. Their engineers were both innovative and reliable from day one.”",
        image: t2,
    },
    {
        name: "Project Lead, UrbanCore Construction",
        heading: "Commercial Complex<br/>Construction Firm",
        content: "“Encimex brought clarity and precision to every stage of our commercial complex design. Their multidisciplinary coordination helped us avoid costly delays and achieve flawless execution.”",
        image: t3,
    },
    {
        name: "Technical Director, GreenVolt Energy Solutions",
        heading: "Energy Project<br/>Renewable Sector Client",
        content: "“From feasibility to final inspection, Encimex proved to be an outstanding engineering consultant. Their understanding of renewable energy systems and regulatory requirements was key to our project's success.”",
        image: t1,
    }
];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex );
  };

  return (
    <>
    <section className={`${showBg2 ? 'md:pt-48 pt-10 md:pb-20 pb-10' : 'md:pt-20 pt-10 md:pb-48 pb-16 '}  px-4 relative overflow-hidden bg-[#0D0D0D]`}>


      <div className="max-w-6xl mx-auto relative z-[1] md:mb-0 mb-0 pt-10">
        <div className="flex justify-center mb-4">

        <div className="relative md:mb-5 mb-3 px-4 py-1">
            <Image src={topleft} alt="topleft shape" className="-top-2 left-0  absolute z-20"  />
            <p className="text-white text-sm tracking-wider">WHAT CLIENT&apos;S SAY</p>
            <Image src={bottomright} alt="bottomright shape" className="-bottom-2 right-0  absolute z-20"  />           
          </div>  
        </div>

        <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl text-center mb-12">
          <span className="text-white">Honest </span>
          <span className="text-orang">Feedback</span>
          <span className="text-white"> From</span>
          <br />
          <span className="text-white">Valued People</span>
        </motion.h2>

        <div className="bg-white rounded-2xl overflow-hidden max-w-xl mx-auto p-2 md:block hidden">
  <div className="h-[450px] overflow-hidden">
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      onSlideChange={handleSlideChange}
      className="h-full"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-[450px] bg-gradient-to-b from-[#14090D] via-[#6B111D] to-[#D25326] px-8 pt-12 pb-20 text-white flex flex-col justify-between rounded-lg">
            <div>
              <h3 
                className="text-2xl md:text-3xl mb-6" 
                dangerouslySetInnerHTML={{ __html: testimonial.heading }} 
              />
              <p className="mb-8 font-light text-lg w-[95%]">
                {testimonial.content}
              </p>
            </div>
            <div>
              <p className="text-xl font-medium">{testimonial.name}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>


        <div className=" md:hidden block ">
        <Swiper
        //   modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="blog-swiper"
        >
          {testimonials.map((testimonial,index) => (
           <SwiperSlide key={index} >
           <div className="bg-gradient-to-b from-[#14090D] via-[#6B111D] to-[#D25326] rounded-xl p-6 h-full flex flex-col justify-between shadow-lg">
             <div className="flex items-start justify-between">
               <h3
                 className="text-white text-lg leading-snug"
                 dangerouslySetInnerHTML={{ __html: testimonial.heading }}
               />
               <div className="ml-4 flex-shrink-0">
                 <Image
                   src={testimonial.image}
                   alt={testimonial.name}
                   width={56}
                   height={56}
                   className="rounded-lg object-cover border-2 border-white"
                 />
               </div>
             </div>
             <p className="text-white text-sm mt-4 mb-6 font-light">
               {testimonial.content}
             </p>
             <div>
               <p className="text-white text-base ">{testimonial.name}</p>
             </div>
           </div>
         </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>

      <div className="absolute inset-0 z-0 top-0">
        {showBg2 ? (
          <Image
            src={testibg2}
            alt="testimonial background"
            fill
            className="object-contain object-center"
            quality={100}
            priority
          />
        ) : (
          <Image
            src={isMobile ? testimobbg : testibg}
            alt="testimonial background"
            fill
            className="object-contain object-center"
            quality={80}
            priority
          />
        )}
      </div>

    </section>
    {!showBg2 && (
      <section className="relative md:py-20 bg-[#0D0D0D] md:h-screen h-[80vh]">
        <Image src={isMobile? encimexbgmob : encimexbg} alt="encimex background"
        // width={1000}
        // height={1000}
        fill
        className="w-full h-auto object-contain"
         />
    </section>
    )}
    </>
  )
} 