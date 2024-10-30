"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const Cards = () => {

  let [products,setproducts] = useState([])

  const fetchData = async () =>{
    try {
      let res = await axios.get("/api/product")
      if(res){
        setproducts(res.data.products)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
   fetchData()
  },[])

  return (
   <>
    <div className="max-w-3xl mx-auto text-center mt-28">
      <h1 className="text-4xl font-bold text-[#464648]  leading-tight mb-2 border-b border-[lightgrey] pb-2">
        Trending Products
      </h1>
      <p className=" text-lg text-gray-800 mb-8">
      Explore a wide range of our trending products.
      </p>
    </div>
    <div className='w-full md:px-20'>
        <div className='flex flex-col items-center md:flex-row md:justify-between'>

           {
            products.map((product,i)=>{
              return <Card key={i} title={product.title} images={product.image} price={product.price} colors={product.colors}/>
            })
           }
            
        </div>

        
      
    </div></>
  )
}

export default Cards
