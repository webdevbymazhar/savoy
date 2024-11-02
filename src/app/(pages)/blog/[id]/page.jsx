import Navbar from '@/app/components/Navbar'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const Blog = () => {
  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center mt-28'>
    
  
        <div className='w-[60vw] h-auto  p-3 leading-[6vh]'>
        <button className="relative px-4 py-2 mb-5 rounded-lg text-gray-900 hover:text-white font-extrabold text-lg bg-gray-200  overflow-hidden transition-all duration-250 group">
      <span className="relative z-10"><div className='flex justify-center items-center'>
        <ChevronLeft/> Go Back</div></span>
      <span className="absolute inset-0 w-0 h-full bg-gray-900 rounded-lg transition-all duration-250 group-hover:text-white group-hover:w-full"></span>
    </button>
         <h1 className='text-[5.5vh] font-extrabold'>Essential JavaScript Techniques for Every Developer.</h1>
         <img className='w-full h-[500px] object-cover rounded-lg mt-5' src="/furniture.jpg" alt="" />
        </div>
    </div>
    </>
  )
}

export default Blog
