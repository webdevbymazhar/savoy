// Import necessary React library
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

// BlogSkeleton component using DaisyUI skeletons
function BlogSkeleton() {
  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      let res = await axios.get("/api/product?limit=3");
      if (res) {
        setProducts(res.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto text-center mt-28 px-5">
        <h1 className="text-2xl lg:text-4xl font-bold text-[#464648] leading-tight mb-2 border-b border-[lightgrey] pb-2">
          Trending Products
        </h1>
        <p className="lg:text-lg text-gray-800 mb-8">
          Explore a wide range of our trending products.
        </p>
      </div>
      <div className='w-full md:px-20'>
        <div className='flex flex-col items-center md:flex-row md:justify-between'>
          {
            isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="card w-full bg-base-100 shadow-md animate-pulse">
                    <div className="card-body">
                      <div className="h-40 bg-gray-300 rounded mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              products.map((product, i) => (
                <Card key={i} title={product.title} images={product.image} price={product.price} colors={product.colors} id={product._id} stock={product.stock} sold={product.sold} />
              ))
            )
          }
        </div>
      </div>
    </>
  );
}

export default BlogSkeleton;
