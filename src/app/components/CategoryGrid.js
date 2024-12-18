"use client"; // This directive ensures the component is rendered on the client side

import React from 'react'
import { motion } from 'framer-motion'

const CategoryGrid = () => {
  return (
    <>
   <div className='hidden md:block' >
   <div className="max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold text-[#464648]  leading-tight mb-2 border-b border-[lightgrey] pb-2">
        Our Categories
      </h1>
      <p className=" text-lg text-gray-800 mb-8">
      Explore a wide range of categories curated just for you.
      </p>
    </div>
   <div className='flex justify-center items-start w-full overflow-hidden mt-20 '>
      <div className='w-[80vw] h-[90vh] grid gap-6 grid-cols-12'>
        {/* Left Image */}
        <div className='col-span-5 relative'>
          <motion.img 
            className='h-[100vh] w-auto' 
            src="https://utfs.io/f/uurSzZwCUG4tJAeo3pEibM8UwczBrLJt9Ivde5E6mFqoXQVp" 
            alt="Women" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <div className='absolute w-36 h-12 bg-white top-[80%] left-1/2 rounded-md transform -translate-x-1/2 shadow-md'>
            <div className='flex justify-center items-center h-full'>
            <p className='text-xl font-bold flex justify-center items-center'>Furniture</p>
            </div>
          </div>
          
        </div>

        {/* Center Column with Images */}
        <div className='flex flex-col items-center h-[100vh] col-span-3 gap-6 '>
         <div className='h-full relative'>
         <motion.img 
            className='h-full' 
            src="https://utfs.io/f/uurSzZwCUG4txDLvzxQEXFUCcH4bWZroVOz3pTntL7iGKu6a" 
            alt="Bag" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className='absolute w-36 h-12 bg-white top-[80%] left-1/2 rounded-md transform -translate-x-1/2 shadow-md'>
            <div className='flex justify-center items-center h-full'>
            <p className='text-xl font-bold flex justify-center items-center'>Decoration</p>
            </div>
            </div>
          
         </div>
          <div className="h-full relative">
          <motion.img 
            className='h-full object-contain' 
            src="https://utfs.io/f/uurSzZwCUG4tjasmesGWRcPwSEqmn64iJoejZuy3MHbtXg15" 
            alt="Shoes" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className='absolute w-36 h-12 bg-white top-[60%] left-1/2 rounded-md transform -translate-x-1/2 shadow-md'>
            <div className='flex justify-center items-center h-full'>
            <p className='text-xl font-bold flex justify-center items-center'>Wall Art</p>
            </div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className='col-span-4 relative'>
          <motion.img 
            className='h-[100vh] w-auto' 
            src="https://utfs.io/f/uurSzZwCUG4tGEeRPKoXyTlcqYULxMKE857wbDVQBjk4hu9m" 
            alt="Watch" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className='absolute w-36 h-12 bg-white top-[80%] left-1/2 rounded-md transform -translate-x-1/2 shadow-md'>
            <div className='flex justify-center items-center h-full'>
            <p className='text-xl font-bold flex justify-center items-center'>Lightings</p>
            </div>
          </div>
        </div>

      </div>
    </div>
   </div>

   <div className='lg:hidden px-5 '>

   <div className="max-w-3xl mx-auto text-center mt-20">
      <h1 className="text-2xl lg:text-4xl font-bold text-[#464648]  leading-tight mb-2 border-b border-[lightgrey] pb-2">
        Our Categories
      </h1>
      <p className="  lg:text-lg text-gray-800 mb-8">
      Explore a wide range of categories curated just for you.
      </p>
    </div>

    <div className='grid grid-cols-12 '>

      <div className='col-span-12 relative'>
      <img src="https://utfs.io/f/uurSzZwCUG4tZghhP2dAkWGeBEzfDN9paYMqObXZ5moC1cut" alt="" />

      <div className=' bg-white absolute bottom-5 left-1/2 rounded-md  p-3 shadow-md transform -translate-x-1/2 '>
        <p className='text-lg font-bold'>Furniture</p>
      </div>
      </div>

    </div>

    <div className='grid grid-cols-12 gap-3 mt-5'>

      <div className='col-span-6 relative'>
      <img className='w-full h-[200px]' src="https://utfs.io/f/uurSzZwCUG4tamRIsShJB3qh78jEZ29ObtnNMPCmwXpcevaL" alt="" />
      <div className=' bg-white absolute bottom-5 left-1/2 rounded-md  p-1  shadow-md transform -translate-x-1/2 '>
      <p className='text-lg font-bold'>Decoration</p>
      </div>
      </div>
      <div className='col-span-6 relative'>
      <img className='w-full h-[200px]' src="https://utfs.io/f/uurSzZwCUG4tjasmesGWRcPwSEqmn64iJoejZuy3MHbtXg15" alt="" />
      <div className=' bg-white absolute bottom-5 left-1/2 rounded-md  p-1 shadow-md transform -translate-x-1/2 '>
        <p className='text-lg font-bold'>Wall Art</p>
      </div>
      </div>

    </div>

    <div className='grid grid-cols-12 mt-5 '>

      <div className='col-span-12 relative'>
      <img src="https://utfs.io/f/uurSzZwCUG4t4zH9qmYeO3Yd1Jxs8TzulvBZbRVMFj9G7yIX" alt="" />
      <div className=' bg-white absolute bottom-5 left-1/2 rounded-md  p-3 shadow-md transform -translate-x-1/2 '>
        <p className='text-lg font-bold'>Lightings</p>
      </div>
      </div>

    </div>

   </div>


   
    </>
  )
}

export default CategoryGrid
