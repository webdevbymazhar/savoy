"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import axios from 'axios'
import Link from 'next/link'

const Blogs = () => {

  let [blogs,setblogs] = useState([])

let fetchBlogs = async () =>{
try {
  let res = await axios.get("/api/blog?limit=3")
  console.log(res.data.blogs); 
  setblogs(res.data.blogs)
} catch (error) {
  console.log(error); 
}
}

useEffect(()=>{
  fetchBlogs()
 },[])
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
          {
            blogs.map((blog)=>{
              return <Link href={`/blog/${blog._id}`}><BlogCard category={blog.category} image={blog.image} title={blog.title} content={blog.description} author={blog.author}/></Link>
            })
          }
     
    </div>
    </div>
  )
}

export default Blogs
