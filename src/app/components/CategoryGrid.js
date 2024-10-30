"use client"; // This directive ensures the component is rendered on the client side

import React from 'react'
import { motion } from 'framer-motion'

const CategoryGrid = () => {
  return (
    <div className='flex justify-center items-start w-full overflow-hidden mt-20 '>
      <div className='w-[80vw] h-[90vh] grid gap-6 grid-cols-12'>
        {/* Left Image */}
        <div className='col-span-5'>
          <motion.img 
            className='h-[100vh] w-auto' 
            src="https://utfs.io/f/uurSzZwCUG4tJAeo3pEibM8UwczBrLJt9Ivde5E6mFqoXQVp" 
            alt="Women" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Center Column with Images */}
        <div className='flex flex-col items-center h-[100vh] col-span-3 gap-6'>
          <motion.img 
            className='h-full' 
            src="https://utfs.io/f/uurSzZwCUG4txDLvzxQEXFUCcH4bWZroVOz3pTntL7iGKu6a" 
            alt="Bag" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img 
            className='h-full' 
            src="shoes.jpg" 
            alt="Shoes" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Right Image */}
        <div className='col-span-4'>
          <motion.img 
            className='h-[100vh] w-auto' 
            src="https://utfs.io/f/uurSzZwCUG4tGEeRPKoXyTlcqYULxMKE857wbDVQBjk4hu9m" 
            alt="Watch" 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryGrid
