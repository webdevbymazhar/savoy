"use client";
import {
  AlignJustify,
  Facebook,
  Instagram,
  ShoppingCart,
  Twitter,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CardContext";

const Navbar = () => {
  const [smNavbarDrop, setSmNavbarDrop] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, getCartCount } = useCart();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 z-20 w-full  shadow">
      <div className="bg-white w-full h-[7vh] lg:h-[9vh] flex justify-between items-center px-3 lg:px-[10vw] relative z-30">
        {/* Left Section */}
        <div className="flex items-center">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setSmNavbarDrop(!smNavbarDrop)}>
              {smNavbarDrop ? <X size={30} color="#707070" /> : <AlignJustify size={30} color="#707070" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex ml-5">
            <ul className="flex gap-5">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-[#707070] ${pathname === href ? "font-bold" : "font-light"}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/logo.png" width={120} height={33} alt="Logo" />
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart color="#707070" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {smNavbarDrop && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 w-full z-20 bg-white shadow mt-2 px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setSmNavbarDrop(false)}
                    className={`text-[#707070] ${pathname === href ? "font-bold" : "font-light"}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-6">
              <Facebook size={24} />
              <Instagram size={24} />
              <Twitter size={24} />
            </div>
          </motion.div>

          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-10"
            onClick={() => setSmNavbarDrop(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default Navbar;
