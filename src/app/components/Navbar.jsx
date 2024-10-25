"use client";
import {
  AlignJustify,
  Facebook,
  Instagram,
  Plus,
  Twitter,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Cart from "./Cart";

const Navbar = () => {
  const [opencart, setopencart] = useState(true);
  const [smNavbarDrop, setSmNavbarDrop] = useState(false);
  const [productsDropDown, setProductsDropDown] = useState(false);
  const [categoriesDropDown, setCategoriesDropDown] = useState(false);
  const [pagesSmDropDown, setPagesSmDropDown] = useState(false);
  const [pagesDropDown, setPagesDropDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div className="fixed top-0 left-0 z-20 w-full">
      {/* Navbar Container */}
      <div className="bg-white w-full h-[7vh] lg:h-[9vh] flex justify-between items-center px-3 lg:px-[10vw] relative z-30">
        <div className="flex items-center">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              onClick={() => setSmNavbarDrop(!smNavbarDrop)}
              role="button"
            >
              {!smNavbarDrop ? (
                <AlignJustify size={30} color="#707070" strokeWidth={0.8} />
              ) : (
                <X size={30} color="#707070" strokeWidth={0.8} />
              )}
            </div>

            {/* Dropdown Menu */}
            <motion.div
              transition={{ duration: 0.5 }}
              variants={variants}
              animate={smNavbarDrop ? "open" : "closed"}
              className="absolute left-0  w-full z-30"
            >
              {smNavbarDrop && (
                <div className=" bg-white ml-[-12px] mt-3 h-[auto] w-[100vw]  shadow">
                  <ul className="px-4 py-3">
                    <li className="flex items-center justify-between">
                      <span className="text-xl font-light">Shop</span>
                      <span
                        onClick={() => setProductsDropDown(!productsDropDown)}
                        className="text-3xl font-light"
                      >
                        {!productsDropDown ? <Plus /> : <X />}
                      </span>
                    </li>
                    <hr className="w-full border-[1px] border-[#c5c5c5]  mb-3 mt-3" />
                    {productsDropDown ? (
                      <div className="p-2">
                        <li className="text-lg">Product 1</li>
                        <li className="text-lg mt-1">Product 2</li>
                        <li className="text-lg mt-1">Product 3</li>
                        <hr className="w-full border-[1px] border-[#c5c5c5]  mb-3 mt-3" />
                      </div>
                    ) : (
                      ""
                    )}

                    <li className="flex items-center justify-between">
                      <span className="text-xl font-light">Categories</span>
                      <span
                        onClick={() =>
                          setCategoriesDropDown(!categoriesDropDown)
                        }
                        className="text-3xl font-light"
                      >
                        {!categoriesDropDown ? <Plus /> : <X />}
                      </span>
                    </li>
                    <hr className="w-full border-[#707070] mb-3 mt-3" />
                    {categoriesDropDown ? (
                      <div className="p-2">
                        <li className="text-lg">Category 1</li>
                        <li className="text-lg mt-1">Category 2</li>
                        <li className="text-lg mt-1">Category 3</li>
                        <hr className="w-full border-[1px] border-[#c5c5c5]  mb-3 mt-3" />
                      </div>
                    ) : (
                      ""
                    )}

                    <li className="flex items-center justify-between">
                      <span className="text-xl font-light">Pages</span>
                      <span
                        onClick={() => setPagesSmDropDown(!pagesSmDropDown)}
                        className="text-3xl font-light"
                      >
                        {!pagesSmDropDown ? <Plus /> : <X />}
                      </span>
                    </li>
                    <hr className="w-full border-[#707070] mb-3 mt-3" />
                    {pagesSmDropDown ? (
                      <div className="p-2">
                        <li className="text-lg">page 1</li>
                        <li className="text-lg mt-1">Page 2</li>
                        <li className="text-lg mt-1">Page 3</li>
                        <hr className="w-full border-[1px] border-[#c5c5c5]  mb-3 mt-3" />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mt-5 mb-3 flex items-center gap-2">
                      <Facebook size={30} strokeWidth={1.5} />
                      <Instagram size={30} strokeWidth={1.5} />
                      <Twitter size={30} strokeWidth={1.5} />
                    </div>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          <div className="hidden lg:flex ml-5">
            <ul className="flex gap-5">
              <li className="text-[#707070] ">Home</li>
              <li className="dropdown dropdown-hover">
                <button
                  tabIndex={0}
                  role="button"
                  onMouseEnter={() => setIsVisible(true)}
                  className={`text-[#707070]`}
                >
                  Categories
                </button>
                {isVisible && (
                  <motion.div
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ul
                      tabIndex={0}
                      className="dropdown-content flex justify-center items-center menu bg-base-100 w-[90vw] h-[25vh] ml-[-15.5vw] z-[1] shadow"
                    >
                      <div className="flex justify-center items-center">
                        <div>
                          <div className="hover:text-black cursor-pointer flex flex-col justify-center items-center gap-2 px-14">
                            <Image
                              src="/category-thumb-bags-backpacks.jpeg"
                              width={80}
                              height={80}
                            />
                            <p className="text-[#707070] font-thinlight mt-2 hover:text-black transition-all">
                              Bags & Bagpacks
                            </p>
                          </div>
                        </div>
                        <div className="hover:text-black cursor-pointer flex flex-col justify-center">
                          <div
                            style={{ borderLeft: "1px solid lightgrey" }}
                            className="flex flex-col justify-center items-center gap-2 px-14"
                          >
                            <Image
                              src="/category-thumb-decoration.jpeg"
                              width={80}
                              height={80}
                            />
                            <p className="text-[#707070] font-thinlight mt-2 hover:text-black transition-all">
                              Decoration
                            </p>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ borderLeft: "1px solid lightgrey" }}
                            className="hover:text-black cursor-pointer flex flex-col justify-center items-center gap-2 px-14"
                          >
                            <Image
                              src="/category-thumb-essentials.jpeg"
                              width={80}
                              height={80}
                            />
                            <p className="text-[#707070] font-thinlight mt-2 hover:text-black transition-all">
                              Essentials
                            </p>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ borderLeft: "1px solid lightgrey" }}
                            className="hover:text-black cursor-pointer flex flex-col justify-center items-center gap-2 px-14"
                          >
                            <Image
                              src="/category-thumb-interior.jpeg"
                              width={80}
                              height={80}
                            />
                            <p className="text-[#707070] font-thinlight mt-2 hover:text-black transition-all">
                              Interior
                            </p>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ borderLeft: "1px solid lightgrey" }}
                            className="hover:text-black cursor-pointer flex flex-col justify-center items-center gap-2 px-14"
                          >
                            <Image src="/plus.jpg" width={80} height={80} />
                            <p className="text-[#707070] font-thinlight mt-2 hover:text-black transition-all">
                              Shop All
                            </p>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </motion.div>
                )}
              </li>
              <li>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="text-[#707070]">
                    Pages
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-[#282828] text-white  z-[1] w-60 mt-4 p-2 shadow"
                  >
                    <li>
                      <a>Home</a>
                    </li>
                    <li>
                      <a>About</a>
                    </li>
                    <li>
                      <a>Contact</a>
                    </li>
                    <li>
                      <a>FAQ&apos;S</a>
                    </li>
                  </ul>
                </div>
              </li>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="text-[#707070]">
                  More
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#282828] text-white z-[1] w-60 mt-4 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={"/logo.png"} width={120} height={33} alt="Logo" />
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <div >
            <ul className="flex gap-5 font-medium">
              <li className="hidden lg:block text-[#707070]">Sign In</li>
              <li className="text-[#707070]">
              <div className="drawer drawer-end z-auto">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="text-[#707070]">Cart</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="menu bg-[#282828] text-base-content min-h-full w-96 p-4">
      <Cart/>
    </div>
  </div>
</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Background Blur Effect */}
      {smNavbarDrop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20  z-10"
          onClick={() => setSmNavbarDrop(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
