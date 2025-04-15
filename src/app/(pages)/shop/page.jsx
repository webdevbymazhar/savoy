// app/shop/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from 'lucide-react';
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Card Component defined within the same file
const Card = ({ title, images, colors, price, id, stock }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showPrice, setShowPrice] = useState(true);

  // Handle case where images might be empty
  const productImages = images && images.length > 0 ? images : ['/placeholder.jpg'];
  
  const handleMouseEnter = () => {
    setCurrentImage(productImages[1] || productImages[0]); // Switch to second image if available
    setShowPrice(false); // Hide price, show "Show more"
  };

  const handleMouseLeave = () => {
    setCurrentImage(productImages[0]); // Revert to first image
    setShowPrice(true); // Show price again
  };

  return (
   <>
  
   <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      className="w-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm"
    >
      <div className="relative pb-[100%]"> {/* This creates a perfect square aspect ratio */}
        <div className="absolute top-2 left-2 flex space-x-1">
          {colors?.map((v, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: v }}
            ></span>
          ))}
        </div>
        
        <div className="absolute right-2 top-2">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
        </div>
        
        <img
          src={currentImage}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover object-center transition-all duration-300"
        />
        
        {/* Stock indicators inside the card image */}
        {stock < 5 && stock > 0 && (
          <span className="absolute bottom-2 right-2 bg-orange-500 text-white px-2 py-0.5 text-xs font-bold rounded-md">
            Low Stock
          </span>
        )}
        {stock === 0 && (
          <span className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-0.5 text-xs font-bold rounded-md">
            Sold Out
          </span>
        )}
      </div>
      
      <div className="p-3">
        <Link href={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1 hover:underline">{title}</h3>
        </Link>
        
        <p className={`mt-1 ${
          showPrice 
            ? 'text-gray-900 font-bold' 
            : 'text-gray-900 text-sm underline cursor-pointer'
        }`}>
          {showPrice ? `$${price}` : 'Show more'}
        </p>
      </div>
    </div>
   
   </>
  );
};

// Main Shop Component
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        
        if (data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          
          // Extract unique categories
          const uniqueCategories = [...new Set(data.products.map(product => product.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const filterProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to format category name for display
  const formatCategoryName = (category) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
   <>
   <Navbar/>
   <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
   
      
      {/* Search and Filter Section */}
      <div className="mt-12 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === "all"
                  ? "bg-[#454643] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Products
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-[#454643] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Products Display */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              title={product.title}
              images={product.image || []}
              colors={product.colors || []}
              price={product.price}
              id={product._id}
              stock={product.stock}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
          <button 
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
   <Footer/>
   </>
  );
}