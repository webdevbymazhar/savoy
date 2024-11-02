"use client"
import { Heart} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Card = ({title,images,colors,price, id,}) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showPrice, setShowPrice] = useState(true);

  const handleMouseEnter = () => {
    setCurrentImage(images[1] || images[0]); // Switch to second image
    setShowPrice(false); // Hide price, show "Show more"
  };

  const handleMouseLeave = () => {
    setCurrentImage(images[0]); // Revert to first image
    setShowPrice(true); // Show price again
  };
  return (
    <div onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} className="w-full md:w-[25vw] mx-auto bg-white  overflow-hidden px-10 pt-5 ">
      <div className="relative">
      <div className="absolute top-4 left-4 flex space-x-1">
          {colors?.map((v, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: v }}
            ></span>
          ))}
        </div>
        <div className="absolute right-4 top-4">
          <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer" />
        </div>
        <img
          src={currentImage}
          width={300}
          height={300}
          alt="Product"
          
          className='w-full'
        />
      </div>
      <div className='p-4' >
        <Link href={`/product/${id}`} className="text-lg font-semibold text-gray-800">{title}</Link>
        <p
          className={`mt-1 ${
            showPrice
              ? 'text-gray-900 text-xl  font-bold'
              : 'text-gray-900 text-lg underline cursor-pointer'
          }`}
        >
          {showPrice ? `$${price}` : 'Show more'}
        </p>
      </div>
    </div>
  )
}

export default Card
