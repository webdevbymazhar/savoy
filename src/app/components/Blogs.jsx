import React from 'react'
import BlogCard from './BlogCard'

const Blogs = () => {
  return (
    <div>
        <div className="max-w-3xl mx-auto text-center mt-28 px-5">
      <h1 className="text-2xl lg:text-4xl font-bold text-[#464648]  leading-tight mb-2 border-b border-[lightgrey] pb-2">
        Our Blogs
      </h1>
      <p className=" lg:text-lg text-gray-800 mb-8">
      Discover a world of insights in our diverse blog collection.
      </p>
    </div>
        <div className='flex flex-col gap-10 px-10 mt-10 md:flex-row md:items-center md:justify-evenly'>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
    </div>
    </div>
  )
}

export default Blogs
