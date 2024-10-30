"use client";
import axios from 'axios';
import { Eye, SquarePen, Trash, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading,setloading] = useState(false)

  const fetchProducts = async () => {
    setloading(true)
    try {
      const response = await axios.get("/api/product");
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }finally{
      setloading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='mt-5'>
      {
        loading ? <div className='w-full flex justify-center items-center'><span className="loading loading-spinner loading-md"></span>
</div> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#484846] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Stock</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                } border-b dark:border-gray-700`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.title}
                </th>
                <td className="px-6 py-4 flex space-x-2">
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: color }}
                      className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700"
                    ></div>
                  ))}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 ">
                  <div className=' flex items-center'>

                <Link  href={"/"}><SquarePen color='orange' /></Link>
                  <Link className='ml-2' href={"/"}><Eye color='lightblue'/></Link>
                  <Link  className='ml-2'  href={"/"}><Trash2 color='red' /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default EditProducts;
