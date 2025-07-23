
import React from 'react'
import Banner from '../../components/user/Home/Banner.jsx'
import About from '@/components/user/Home/About.jsx'
import Chooseus from '@/components/user/Home/Chooseus.jsx'
import InnovatureSection from '@/components/user/Home/Innovature.jsx'
import ServicesSection from '@/components/user/Home/Services.jsx'
import TestimonialSection from '@/components/user/Home/Testimonial.jsx'
import GallerySection from '@/components/user/Home/Gallery.jsx'
import TextSection from '@/components/user/Home/Text.jsx'
import FaqSection from '@/components/user/Home/Faq.jsx'
import Client from '@/components/user/Home/Client.jsx'
import BlogSection from '@/components/user/Home/Blogs.jsx'
import AcheivementSection from '@/components/user/Home/AcheivementSection.jsx'

export default function Home() {
  return (
    <section >
      <Banner />
      <About />
      <ServicesSection />
      <AcheivementSection />
      <Chooseus />
      <InnovatureSection />
      <TestimonialSection />
      <GallerySection />
      {/* <TextSection /> */}
      <FaqSection />
      <Client />
      <BlogSection />
    </section>
  )
}
