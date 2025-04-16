"use client";
import axios from 'axios';
import { Eye, SquarePen, Truck } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/order");
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className='mt-5'>
      {loading ? (
        <div className='w-full flex justify-center items-center'>
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-[#484846]">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Payment</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b`}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id.slice(-6).toUpperCase()}
                  </th>
                  <td className="px-6 py-4">
                    {order.billingAddress.firstName + " " + order.billingAddress.lastName}
                  </td>
                  <td className="px-6 py-4">
                    {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "completed" ? "bg-green-100 text-green-800" :
                      order.status === "processing" ? "bg-blue-100 text-blue-800" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      order.status === "cancelled" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.paymentStatus === "paid" ? "bg-green-100 text-green-800" :
                      order.paymentStatus === "processing" ? "bg-blue-100 text-blue-800" :
                      order.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
                      order.paymentStatus === "failed" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">${order.total?.toFixed(2) || "0.00"}</td>
                  <td className="px-6 py-4">
                    <div className='flex items-center'>
                      <Link href={`/admin/edit-order/${order._id}`}>
                        <SquarePen color='orange' />
                      </Link>
                      <Link className='ml-2' href={`/admin/view-order/${order._id}`}>
                        <Eye color='lightblue' />
                      </Link>
                      <Link className='ml-2' href={`/admin/ship-order/${order._id}`}>
                        <Truck color='green' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrders;