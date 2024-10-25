"use client";
import {
  AlignJustify,
  AlignLeft,
  ChartBar,
  CirclePlus,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBasket,
  SquarePen,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromStorage = localStorage.getItem("token");
      setToken(tokenFromStorage);

      if (tokenFromStorage) {
        if (pathname === "/admin") {
          router.push("/admin/dashboard");
        }
      } else {
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
    }
  }, [pathname, router]);

  useEffect(() => {
    const formatTitle = (path) => {
      const segments = path.split("/").filter(Boolean);
      const lastSegment = segments[segments.length - 1];
      return lastSegment
        ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase()
        : "";
    };

    setPageTitle(formatTitle(pathname));
  }, [pathname]);

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const handleLogOut = () => {
   localStorage.removeItem("token")
   router.push("/admin")
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-2/12 bg-[#F1F3F4] shadow h-screen fixed">
        <div className="flex flex-col justify-between h-full items-center py-10">
          <div className="flex justify-center items-center">
            <img src="/logo.png" width={150} alt="Logo" />
          </div>
          <div>
            <ul className="flex flex-col gap-6 w-full">
              <Link href="/admin/dashboard">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <LayoutDashboard /> Dashboard
                </li>
              </Link>
              <Link href="/admin/all-products">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <ShoppingBasket /> All Products
                </li>
              </Link>
              <Link href="/admin/add-products">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <CirclePlus /> Add Product
                </li>
              </Link>
              <Link href="/admin/edit-products">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <UserPen /> Update Product
                </li>
              </Link>
              <Link href="/admin/orders">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <Package /> Orders
                </li>
              </Link>
              <Link href="/admin/orders">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                  <SquarePen /> Blogs
                </li>
              </Link>
              <Link href="/admin/orders">
                <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                <ChartBar /> Categories
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="flex flex-col gap-5">
              <div className="bg-[#262626] px-3 py-1 rounded-md text-white">
                <li className="flex  font-bold gap-2 items-center hover:text-[#828282] cursor-pointer">
                <button className="flex items-center gap-2 py-1" onClick={()=>document.getElementById('my_modal_2').showModal()}><span><LogOut/></span> <span>Log Out</span></button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-[#828282]">Log Out !</h3>
    <p className="py-4 text-[#828282]">Are you sure you want to Log Out ? </p>
    <div className="flex gap-3">
      <button onClick={handleLogOut} className="bg-[#262626] px-3 py-1 rounded-md text-white">Log Out</button>
     
    <button onClick={() => {
      document.getElementById('my_modal_2').close()
      handleLogOut()
    }} className="text-[#828282] text-lg ">Close</button>
 

    </div>
    <form method="dialog" className="modal-backdrop">
    <button className="">lose</button>
  </form>
  </div>
 
</dialog>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[16.666%] w-full h-screen overflow-y-auto p-7">
        <div className="flex items-center justify-between border-b border-[lightgrey] pb-2">
          <p className="text-2xl font-bold">{pageTitle}</p>
          <div className="flex items-center gap-3">
            <span className="animate-spin-slow">
              <Settings size={30} />
            </span>
            <img
              src="/user.jpg"
              className="w-8 h-8 rounded-full border border-black"
              alt="User"
            />
          </div>
        </div>

        {/* Scrollable children */}
        <div >{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
