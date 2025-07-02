"use client"
import { getblogs } from '@/app/actions/actions';
import Banner from "@/components/shared/Banner";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import bottomright from "../../../../public/assets/images/bottomright.png";
import topleft from "../../../../public/assets/images/topleft.png";
import servbann from "../../../../public/assets/images/servbann.png";
import servbannmob from "../../../../public/assets/images/servbannmob.png";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await getblogs();
                if (result.success) {
                    const parsedBlogs = JSON.parse(result.blogs);
                    setBlogs(parsedBlogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    
    return (
      <section>
      <Banner heading="blogs" banner={servbann} bannermob={servbannmob} title="Engineering Minds<br/> At Work" />
  
      {/* Blog Posts Section */}
      <section className="w-full bg-[#0D0D0D] py-16 md:pb-28 md:pt-10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
              <div className="mb-10">
                  <div className="relative mb-8 flex justify-start items-start w-22">
                      <Image src={topleft} alt="topleft shape" className="-top-2 left-0 absolute z-20" />
                      <h3 className="uppercase text-sm font-medium tracking-wider pl-5">BLOGS</h3>
                      <Image src={bottomright} alt="bottomright shape" className="-bottom-2 right-0 absolute z-20" />           
                  </div>
  
                  <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }} 
                      className="text-white text-3xl md:text-4xl font-light mt-4 mb-8">Recent Blog Posts</motion.h2>
              </div>
  
              {loading ? (
                  <div className="text-white text-center text-lg py-10">Loading blogs...</div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
                      {blogs.map((post) => (
                          <div key={post._id} className="bg-[#1A1A1A] rounded-lg overflow-hidden h-full flex flex-col">
                              <div className="h-64 overflow-hidden">
                                  <Image 
                                      src={post.photo} 
                                      alt={post.title}
                                      width={400}
                                      height={300}
                                      className="w-full h-full object-cover"
                                  />
                              </div>
                              <div className="p-4 flex-grow flex flex-col">
                                  <div className="flex items-center text-sm text-[#717171] mb-4">
                                      <span>{post.author_name}</span>
                                      <span className="mx-2">•</span>
                                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                  </div>
                                  <h3 className="text-xl mb-4 leading-tight">{post.title}</h3>
                                  <Link href={`/blog/${post.slug}`} passHref>
                                      <div className="flex justify-start items-center">
                                          <div className="flex flex-row items-center justify-center gap-2 w-[56%] border border-orang rounded-full cursor-pointer">
                                              <p className="text-white text-lg font-light px-2 py-1">Read More</p>
                                              <ArrowRight className="text-black bg-white rounded-full p-1" />
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </section>
  </section>
  
    );
}