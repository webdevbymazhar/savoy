"use client"
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Blog = ({ params }) => {
  let [blog, setBlog] = useState(null);  // null initially to show skeleton loader
  let [loading, setLoading] = useState(true);  // Loading state
  let router = useRouter()

  let GoBack = () =>{
    router.back()
  }

  let fetchBlog = async () => {
    try {
      let response = await axios.get(`/api/blog/${params.id}`);
      console.log(response.data);
      setBlog(response.data.blog);  // Set the blog data
      setLoading(false);  // Turn off the loading state once the data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false);  // Turn off loading even on error to stop skeleton loader
    }
  };

  useEffect(() => {
    fetchBlog(); // Invoke the fetch function when the component mounts
  }, [params.id]); // Ensure it re-fetches when the `id` changes

  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center mt-28'>
        <div className='md:w-[60vw] h-auto p-3 leading-[6vh]'>
          <button className="relative px-4 py-2 mb-5 rounded-lg text-gray-900 hover:text-white font-extrabold text-lg bg-gray-200 overflow-hidden transition-all duration-250 group">
            <span className="relative z-10">
              <div onClick={()=>GoBack()} className='flex justify-center items-center'>
                <ChevronLeft /> Go Back
              </div>
            </span>
            <span className="absolute inset-0 w-0 h-full bg-gray-900 rounded-lg transition-all duration-250 group-hover:text-white group-hover:w-full"></span>
          </button>

          {/* Skeleton loader for the title */}
          {loading ? (
            <div className="w-[70%] h-[30px] bg-gray-300 animate-pulse mb-4 rounded-lg skeleton"></div>
          ) : (
            <h1 className='text-[5.5vh] font-extrabold mb-2'>{blog.title}</h1>
          )}

          {/* Skeleton loader for the category */}
          {loading ? (
            <div className="w-24 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <div className="bg-[#464648] inline text-white py-1 px-2 rounded-md">{blog.category}</div>
          )}

          <hr className='mt-5' />

          {/* Skeleton loader for the image */}
          {loading ? (
            <div className="w-full h-[500px] bg-gray-300 animate-pulse rounded-lg mt-5"></div>
          ) : (
            <img className='w-full h-[500px] object-cover rounded-lg mt-5' src={blog.image} alt={blog.title} />
          )}

          {/* Show the content of the blog if available */}
          <div className="mt-5">
            {loading ? (
              <div className="w-full h-40 bg-gray-300 animate-pulse rounded-md"></div>
            ) : (
              <div dangerouslySetInnerHTML={{__html:blog.description}}></div> // Replace with actual blog content
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Blog;
