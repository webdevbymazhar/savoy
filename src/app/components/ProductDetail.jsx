"use client"
import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";

const { useCart } = require("@/context/CardContext");
const { default: Navbar } = require("./Navbar");
const { ShoppingCart, Minus, Box, PackageCheck, Plus } = require("lucide-react");
const { default: Footer } = require("./Footer");

const ProductDetail = ({ params }) => {
    const [mainImage, setMainImage] = useState("");
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    
    const { addToCart, getCartCount, setIsCartOpen } = useCart();
  
    const changeImage = (src) => {
      setMainImage(src);
    };
  
    const fetchProductDetails = async () => {
      setLoading(true);
      let id = params.id;
      try {
        let res = await axios.get(`/api/product/${id}`);
        console.log(res);
        
        setProduct(res.data.product);
        setImages(res.data.product.image);
        setColors(res.data.product.colors);
        setMainImage(res.data.product.image[0]);
        setSelectedColor(res.data.product.colors[0] || "");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProductDetails();
    }, []);
  
    const handleAddToCart = () => {
      if (quantity > 0 && selectedColor) {
        addToCart(product, quantity, selectedColor);
      }
    };
  
    const increaseQuantity = () => {
      if (quantity < product.stock) {
        setQuantity(prevQty => prevQty + 1);
      }
    };
  
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(prevQty => prevQty - 1);
      }
    };
  
    return (
      <>
        <Navbar />
        
        
        {/* Cart Drawer */}
        <Cart/>
        
        <div className='flex justify-center items-center w-full'>
          <div className="bg-[#EEEEEE] mt-[5vh] md:mt-[10vh] py-14 w-full">
            <div className="container mx-auto px-4 py-8">
              {loading ? (
                <div className="flex flex-wrap md:flex-nowrap mx-4">
                  {/* Skeleton for Product Images */}
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex flex-col justify-center items-center">
                    <div className='skeleton h-64 w-[80%] rounded-lg mb-4'></div>
                    <div className="flex gap-4 py-4 justify-center items-center overflow-x-auto">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="skeleton w-16 h-16 rounded-md"></div>
                      ))}
                    </div>
                  </div>
  
                  {/* Skeleton for Product Details */}
                  <div className="w-full md:w-1/2 px-4">
                    <div className="skeleton skeleton-text h-10 w-3/4 mb-2"></div>
                    <div className="skeleton h-8 w-1/3 mb-4"></div>
                    <div className="skeleton skeleton-text h-6 w-[70%] mb-6"></div>
                    <div className="skeleton h-6 w-1/4 mb-4"></div>
                    <div className="flex space-x-4 mb-6">
                      <div className="skeleton-circle w-10 h-10"></div>
                      <div className="skeleton-circle w-10 h-10"></div>
                    </div>
                    <div className="skeleton h-10 w-1/2 mb-6"></div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap md:flex-nowrap mx-4">
                  {/* Product Images */}
                  <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex flex-col justify-center items-center">
                    <div className='flex justify-center items-center w-full md:w-[80%]'>
                      <img src={mainImage} alt="Product" className="h-auto rounded-lg shadow-md mb-4" />
                    </div>
                    <div className="flex gap-4 py-4 justify-center items-center overflow-x-auto">
                      {images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className={`w-16 h-16 border ${mainImage === src ? 'border-black' : 'border-gray-300'} object-cover rounded-md cursor-pointer ${mainImage === src ? 'opacity-100' : 'opacity-60'} hover:opacity-100 transition duration-300`}
                          onClick={() => changeImage(src)}
                        />
                      ))}
                    </div>
                  </div>
  
                  {/* Product Details */}
                  <div className="w-full md:w-1/2 px-4">
                    <h2 className="text-3xl mb-2 font-light">{product.title}</h2>
                    <div className="mb-4">
                      <span className="text-2xl font-bold mr-2">${product.price}</span>
                    </div>
                    <div className="mb-6 text-xl w-full md:w-[70%]" dangerouslySetInnerHTML={{ __html: product.description }}></div>
  
                    {/* Ratings */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                    </div>
  
                    {/* Colors */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Color:</h3>
                      <div className="flex space-x-2">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            style={{ backgroundColor: color }}
                            className={`w-8 h-8 rounded-full focus:outline-none ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : 'border border-black'}`}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
  
                    {/* Quantity */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
                      <div className='flex items-center'>
                        <button 
                          className='px-4 py-2 text-xl' 
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                        >
                          <Minus />
                        </button>
                        <span className='text-xl font-bold mx-4'>{quantity}</span>
                        <button 
                          className='px-4 py-2 text-xl' 
                          onClick={increaseQuantity}
                          disabled={quantity >= product.stock}
                        >
                          <Plus/>
                        </button>
                      </div>
                    </div>
  
                    {/* Add to Cart Button */}
                    <div className="flex space-x-4 mb-6">
                      <button 
                        className="bg-[#464648] flex gap-2 items-center justify-center text-white px-6 py-2 rounded-md hover:bg-[#727276] w-[50%] h-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
  
                    <div>
                      <ul className='flex flex-col gap-4'>
                        <li className='flex items-center gap-2 text-lg'> 
                          <Box /> <span className='font-bold'>Stock</span>: {product.stock > 0 ? product.stock : 'Out of stock'}
                        </li>
                        <li className='flex items-center gap-2 text-lg'> 
                          <PackageCheck /> <span className='font-bold'>Sold</span>: {product.sold} 
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
  };

  export default ProductDetail