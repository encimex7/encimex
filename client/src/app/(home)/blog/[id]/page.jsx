"use client"
import { getblogDetails, getblogs } from '@/app/actions/actions';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

export default function BlogArticlePage({ params }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current blog post
        const blogResult = await getblogDetails(resolvedParams.id);
        if (blogResult.success) {
          const parsedBlog = JSON.parse(blogResult.blog);
          setBlog(parsedBlog);
        }

        // Fetch other blogs for the sidebar
        const blogsResult = await getblogs();
        if (blogsResult.success) {
          const parsedBlogs = JSON.parse(blogsResult.blogs);
          // Filter out the current blog and take up to 3 other blogs
          const filteredBlogs = parsedBlogs
            .filter(b => b.slug !== resolvedParams.id)
            .slice(0, 3);
          setOtherBlogs(filteredBlogs);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="md:py-20 py-8 mx-auto bg-[#0D0D0D]">
      <div className="min-h-screen p-8 flex justify-center items-center">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
    );
  }

  if (!blog) {
    return (
      <div className="md:py-20 py-8 mx-auto bg-[#0D0D0D]">
        <div className="min-h-screen p-8 flex justify-center items-center">
          <div className="text-white">Blog not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:py-28 py-14 mx-auto bg-[#0D0D0D]">

      <div className="min-h-screen p-8 flex flex-col md:flex-row gap-8 justify-center">
        {/* Main Article */}
        <div className="flex-1 max-w-2xl ">

           {/* Back arrow button */}
          <Link href="/blogs" passHref>
            <button className="flex text-sm items-center text-white border border-white px-4 py-2 rounded-3xl mb-6 transition-all duration-400 opacity-50 hover:opacity-100 cursor-pointer hover:bg-white hover:text-black ">
              <ArrowLeft className="mr-2" size={16} />
              Back
            </button>
          </Link>

          <div className="rounded-xl overflow-hidden mb-4">
            <Image
              src={blog.photo}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="text-gray-400 text-sm mb-2">
            {blog.author_name} • {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-3xl mb-4 text-white">
            {blog.title}
          </h1>
          <p className="text-gray-300 leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-96 flex flex-col">
          {otherBlogs.map((otherBlog) => (
            <Link href={`/blog/${otherBlog.slug}`} key={otherBlog._id}>
              <div className="flex gap-4 items-start border-b border-gray-600 px-6 py-10 hover:bg-gray-900 transition-colors">
                <div className="w-40 h-20 relative">
                  <Image
                    src={otherBlog.photo}
                    alt={otherBlog.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">
                    {otherBlog.author_name} • {new Date(otherBlog.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-white text-base">
                    {otherBlog.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
