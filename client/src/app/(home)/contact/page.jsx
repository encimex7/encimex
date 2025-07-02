"use client";
import Banner from "@/components/shared/Banner";
import emailjs from '@emailjs/browser';
import Image from "next/image";
import { useRef, useState } from "react";
import toast from 'react-hot-toast';
import contactbannermob from "../../../../public/assets/images/contactbannermob.png";
import contactbg from "../../../../public/assets/images/contactbg.png";
import contactbgdwn from "../../../../public/assets/images/contactbgdwn.png";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        'service_drw26um', // Replace with your EmailJS service ID
        'template_fwz3zqh', // Replace with your EmailJS template ID
        formRef.current,
        'wYxK-d2GIZaxWbuSN' // Replace with your EmailJS public key
      );

      toast.success('Message sent successfully!', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Banner heading="Contact us" banner={contactbg} bannermob={contactbannermob} title="Start Your Project<br/> Today" /> 

      {/* Contact Form */}
      <section className="w-full bg-white py-10 md:pb-24 md:pt-16 text-gray-800">
        <div className="flex items-center mb-6 max-w-7xl mx-auto px-4 md:pb-20">
          <span className="w-3 h-3 bg-[#FF5A5F] rounded-sm mr-2"></span>
          <span className="text-gray-800 font-medium text-sm">Let's Work Together</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 md:gap-0">
          {/* Left Side */}
          <div className="md:w-1/2 flex flex-col md:pr-16">
            <button className="flex items-center gap-2 bg-[#FF5A5F]/10 text-[#FF5A5F] px-4 py-2 rounded-md mb-7 font-medium w-fit">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform="rotate(-45 0 0)" className="inline-block"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              Contact Now
            </button>
            <h1 className="text-5xl md:text-6xl font-bold text-black md:mb-9 mb-6">Contact Me!</h1>
            <p className="text-gray-500 text-lg md:mb-8 mb-6 max-w-md">Let's create something amazing together! Reach out I'd love to hear about your project and ideas.</p>
            <hr className="border-gray-200 md:mb-9 mb-6" />
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-base text-gray-800">
                <span className="w-6 h-6 flex items-center justify-center bg-[#FF5A5F]/10 rounded-full text-[#FF5A5F]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="#FF5A5F" strokeWidth="2" fill="none"/><text x="8" y="16" fontSize="16" fill="#FF5A5F">+</text></svg>
                </span>
                24/7 Full Time Support
              </li>
              <li className="flex items-center gap-3 text-base text-gray-800">
                <span className="w-6 h-6 flex items-center justify-center bg-[#FF5A5F]/10 rounded-full text-[#FF5A5F]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="#FF5A5F" strokeWidth="2" fill="none"/><text x="8" y="16" fontSize="16" fill="#FF5A5F">+</text></svg>
                </span>
                Available Worldwide
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 flex items-center justify-center relative mt-12 md:mt-0">
            {/* Decorative red corner */}
            <span className="absolute -top-6 -left-4 w-6 h-6 border-t-2 border-l-2 border-[#FF5A5F]"></span>
            <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-xl bg-white flex flex-col gap-6">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*" 
                required
                className="placeholder-gray-400 bg-gray-100 rounded-md px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#FF5A5F]" 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*" 
                required
                className="placeholder-gray-400 bg-gray-100 rounded-md px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#FF5A5F]" 
              />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone*" 
                required
                className="placeholder-gray-400 bg-gray-100 rounded-md px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#FF5A5F]" 
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message*" 
                required
                rows={5} 
                className="placeholder-gray-400 bg-gray-100 rounded-md px-6 py-3 text-lg outline-none focus:ring-2 focus:ring-[#FF5A5F] resize-none" 
              />
              <button 
                type="submit" 
                disabled={loading}
                className={`bg-black text-white text-lg py-3 rounded-md mt-2 transition font-medium ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orang hover:text-black'
                }`}
              >
                {loading ? 'Sending...' : 'Submit Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="w-full h-[50vh] relative">
        <Image src={contactbgdwn} alt="Contact Background" fill className="w-full h-full object-cover" />
      </section>
    </section>
  );
}