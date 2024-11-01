"use client";

import {
  LayoutDashboard,
  ShoppingBasket,
  CirclePlus,
  UserPen,
  Package,
  SquarePen,
  ChartBar,
  LogOut,
  Settings,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);

    if (tokenFromStorage && pathname === "/admin") {
      router.push("/admin/dashboard");
    } else if (!tokenFromStorage && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [pathname, router]);

  

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  if (pathname === "/admin") return <>{children}</>;

  const menuItems = [
    { href: "/admin/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/admin/all-products", icon: <ShoppingBasket />, label: "All Products" },
    { href: "/admin/add-products", icon: <CirclePlus />, label: "Add Product" },
    { href: "/admin/orders", icon: <Package />, label: "Orders" },
    { href: "/admin/blogs", icon: <Newspaper />, label: "Blogs" },
    { href: "/admin/create-blog", icon: <SquarePen />, label: "Create Blog" },
    { href: "/admin/orders", icon: <ChartBar />, label: "Categories" },
  ];

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-2/12 bg-[#F1F3F4] shadow h-screen fixed flex flex-col justify-between py-10 items-center">
        <img src="/logo.png" width={150} alt="Logo" />
        <div>
        <ul className="flex flex-col gap-6 w-full">
          {menuItems.map(({ href, icon, label }, index) => (
            <Link key={index} href={href}>
              <li className="flex text-xl font-bold gap-2 items-center w-full hover:text-[#828282] cursor-pointer">
                {icon} {label}
              </li>
            </Link>
          ))}
        </ul>
        </div>
        <div className="bg-[#262626] px-3 py-1 rounded-md text-white">
          <button
            className="flex items-center gap-2 py-1"
            onClick={() => document.getElementById("logoutModal").showModal()}
          >
            <LogOut /> Log Out
          </button>
          <dialog id="logoutModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-[#828282]">Log Out!</h3>
              <p className="py-4 text-[#828282]">Are you sure you want to Log Out?</p>
              <div className="flex gap-3">
                <button onClick={handleLogOut} className="bg-[#262626] px-3 py-1 rounded-md text-white">
                  Log Out
                </button>
                <button
                  onClick={() => document.getElementById("logoutModal").close()}
                  className="text-[#828282] text-lg"
                >
                  Close
                </button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>Close</button>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[16.666%] w-full h-screen overflow-y-auto p-7">
        <div className="flex items-center justify-between border-b border-[lightgrey] pb-2">
          <p className="text-2xl font-bold">Admin Dashboard</p>
          <div className="flex items-center gap-3">
            <span className="animate-spin-slow">
              <Settings size={30} />
            </span>
            <img src="/user.jpg" className="w-8 h-8 rounded-full border border-black" alt="User" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
