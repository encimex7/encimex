"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/pagination';
import { getblogs } from '@/app/actions/actions';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import bottomright from "../../../../public/assets/images/bottomright.png";
import topleft from "../../../../public/assets/images/topleft.png";

const BlogSection = () => {
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

  if (loading) {
    return (
      <div className="w-full text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            className="text-white text-3xl md:text-4xl font-light mt-4 mb-8"
          >
            Recent Blog Posts
          </motion.h2>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
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
          className="blog-swiper"
        >
          {blogs.slice(0, 4).map((post) => (
            <SwiperSlide key={post._id}>
              <div className="bg-[#1A1A1A] rounded-lg overflow-hidden h-full flex flex-col">
                <div className="h-52 overflow-hidden">
                  <Image
                    src={post.photo}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlogSection;