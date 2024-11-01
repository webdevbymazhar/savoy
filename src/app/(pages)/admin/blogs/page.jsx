"use client";
import axios from 'axios';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const sampleData = [
    {
      _id: "1",
      title: "Understanding JavaScript Closures",
      category: "JavaScript",
      publishedDate: "2024-10-01T10:00:00Z",
      views: 300,
    },
    {
      _id: "2",
      title: "Getting Started with Next.js",
      category: "React",
      publishedDate: "2024-09-15T12:00:00Z",
      views: 420,
    },
    {
      _id: "3",
      title: "A Guide to Node.js",
      category: "Node.js",
      publishedDate: "2024-08-20T08:30:00Z",
      views: 500,
    }
  ];

const AllBlogs = () => {
  const [blogs, setBlogs] = useState(sampleData);
  const [loading, setLoading] = useState(false);

 

  return (
    <div className='mt-5'>
      {
        loading ? <div className='w-full flex justify-center items-center'><span className="loading loading-spinner loading-md"></span></div> : 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-[#484846] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Blog Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Published Date</th>
                <th scope="col" className="px-6 py-3">Views</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"} border-b dark:border-gray-700`}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {blog.title}
                  </th>
                  <td className="px-6 py-4">{blog.category}</td>
                  <td className="px-6 py-4">{new Date(blog.publishedDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{blog.views}</td>
                  <td className="px-6 py-4 ">
                    <div className='flex items-center'>
                      <Link href={`/admin/edit-blog/${blog._id}`}><SquarePen color='orange' /></Link>
                      <Link className='ml-2' href={`/blog/${blog._id}`}><Eye color='lightblue'/></Link>
                      <button className='ml-2' onClick={() => handleDelete(blog._id)}><Trash2 color='red' /></button>
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


export default AllBlogs;
