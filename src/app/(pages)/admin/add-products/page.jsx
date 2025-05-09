"use client"
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Prevent SSR for this component
  loading: () => <p>Loading...</p>,
});

import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
const AddProduct = () => {
  let [data, setdata] = useState({
    title: "",
    price: "",
    image: [],  // Store multiple images
    stock: "",
    category: "",
    description: "",
    colors: [], // Add colors array to data state
  });

  let [desc, setdesc] = useState("");
  let [loading, setloading] = useState(false);
  let [colorInput, setColorInput] = useState(""); // State for the color input
  let router = useRouter()

  let handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  let handleDescription = (e) => {
    setdesc(e);
  };

  let handleColorInput = (e) => {
    setColorInput(e.target.value);
  };

  // Function to handle adding colors
  let handleAddColor = (e) => {
    // Prevent form submission on Enter
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
  
      if (colorInput) {
        setdata((prev) => ({
          ...prev,
          colors: [...prev.colors, colorInput], // Add color to colors array
        }));
        setColorInput(""); // Clear the input field
      }
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      let response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          description: desc,
        }),
      });

      if (response.status === 400) {
        let result = await response.json(); // Parse the response JSON
        toast.error(result.message || "Something went wrong. Please try again");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let finalres = await response.json();

      if (finalres) {
        toast.success("Product added successfully");
       router.push("/admin/all-products")
       
      }
    console.log(data);
    
    } catch (error) {
      toast.error(error.message || "Something went wrong. Try again!");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6">
        <div>
          <div className="w-full">
            <div className="p-4">
              <form className="flex flex-col">
                <h1 className="text-xl font-extrabold border-b pb-1 w-full">
                  Product Information
                </h1>
                <div className="flex gap-2 items-center">
                  <CldUploadWidget
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(results) => {
                      if (results.info?.secure_url && results.event === "success") {
                        setdata((data) => ({
                          ...data,
                          image: [...data.image, results.info.secure_url],  // Append image URL to the array
                        }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          open();
                        }}
                        className="bg-white border border-black  rounded-md  p-3 mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center "
                      >
                        <span className="flex flex-col justify-center items-center text-sm "><Plus size={20} color="black"/><span >Upload</span></span>
                      </button>
                    )}
                  </CldUploadWidget>
                  <div className="flex items-center gap-3">{data.image.length === 0 ? "No Images Selected" : 
                    data.image.map((v,i)=> {
                      return <div key={i} className="bg-white border border-black  rounded-md text-white mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center"><img className="object-contain" src={v} alt="" /></div>
                    })}</div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Title :</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="title"
                      value={data.title}
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Price :</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="price"
                      value={data.price}
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex gap-3 items-center mt-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Categories :</label>
                    <select
                      value={data.category}
                      onChange={handleChange}
                      name="category"
                      className="border border-black w-[18vw] rounded-md h-8"
                    >
                      <option value="furniture">Furniture</option>
                      <option value="wall-art">Wall Art</option>
                      <option value="lightning">Lightning</option>
                      <option value="decoration">Decoration</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Stock :</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="stock"
                      value={data.stock}
                      type="number"
                    />
                  </div>
                </div>

                {/* Color Input Section */}
                <div className="flex flex-col mt-3 gap-1">
                  <label htmlFor="">Colors :</label>
                  <div className="flex gap-2 items-center">
                    <input
                      className="border rounded-md h-8 px-2"
                      onChange={handleColorInput}
                      value={colorInput}
                      onKeyDown={handleAddColor} // Handle adding color on Enter
                      type="text"
                      placeholder="black or #000"
                      
                    />
                   
                    <div className="flex gap-2">
                      {data.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white"
                          style={{ backgroundColor: color }} // Set background color
                        ></div>
                      ))}
                    </div>
                    <br />
                    
                  </div>
                </div>
                
                <p className="mt-1 text-[#929393]">*Enter Color Name and Press Enter</p>

                <div className="flex flex-col gap-2 mt-5">
                  <label htmlFor="">Description :</label>
                  <ReactQuill
                    className="w-full h-[20vh]"
                    theme="snow"
                    value={desc}
                    onChange={handleDescription}
                  />
                </div>

                <button
                  className="mt-14 bg-black w-[10vw] flex justify-center items-center p-1 rounded-md text-white"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6">
        {/* The card will show here like in the actual website */}
      </div>
    </div>
  );
};

export default AddProduct;
