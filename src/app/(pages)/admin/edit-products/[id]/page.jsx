"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

import "react-quill/dist/quill.snow.css";

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: [],
    stock: "",
    category: "",
    description: "",
    colors: [],
  });
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorInput, setColorInput] = useState("");

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/product/${params.id}`);
      setProduct(response.data.product);
      setDesc(response.data.product.description); // Set description
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product details.");
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleDescription = (e) => {
    setDesc(e);
  };

  const handleColorInput = (e) => {
    setColorInput(e.target.value);
  };

  const handleAddColor = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (colorInput) {
        setProduct((prev) => ({
          ...prev,
          colors: [...prev.colors, colorInput],
        }));
        setColorInput("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/product/${params.id}`, {
        method: "PUT", // Use PUT for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          description: desc,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const finalRes = await response.json();
      if (finalRes) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="animate-pulse mt-5">
        <div className="flex gap-4">
        <div className="skeleton h-20 w-20 mb-4 bg-gray-300 rounded" />
        <div className="skeleton h-20 w-20 mb-4 bg-gray-300 rounded" />
        <div className="skeleton h-20 w-20 mb-4 bg-gray-300 rounded" />
        </div>
        <div className="flex gap-3 mt-4">
        <div className="skeleton h-10 w-96 mb-4 bg-gray-300 rounded" />
        <div className="skeleton h-10 w-96 mb-4 bg-gray-300 rounded" />
        </div>
        <div className="flex gap-3 mt-4">
        <div className="skeleton h-10 w-96 mb-4 bg-gray-300 rounded" />
        <div className="skeleton h-10 w-96 mb-4 bg-gray-300 rounded" />
        </div>
        
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6">
        <div>
          <div className="w-full">
            <div className="p-4">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <h1 className="text-xl font-extrabold border-b pb-1 w-full">
                  Edit Product Information
                </h1>
                <div className="flex gap-2 items-center">
                  <CldUploadWidget
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={(results) => {
                      if (results.info?.secure_url && results.event === "success") {
                        setProduct((prev) => ({
                          ...prev,
                          image: [...prev.image, results.info.secure_url],
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
                        className="bg-white border border-black rounded-md p-3 mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center"
                      >
                        <span className="flex flex-col justify-center items-center text-sm">
                          <Plus size={20} color="black" />
                          <span>Upload</span>
                        </span>
                      </button>
                    )}
                  </CldUploadWidget>
                  <div className="flex items-center gap-3">
                    {product.image.length === 0 ? "No Images Selected" :
                      product.image.map((v, i) => (
                        <div key={i} className="bg-white border border-black rounded-md text-white mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center">
                          <img className="object-contain" src={v} alt="" />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Title:</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="title"
                      value={product.title}
                      type="text"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Price:</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="price"
                      value={product.price}
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex gap-3 items-center mt-5">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">Categories:</label>
                    <select
                      value={product.category}
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
                    <label htmlFor="">Stock:</label>
                    <input
                      className="w-[18vw] h-8 border rounded-md border-black px-2"
                      onChange={handleChange}
                      name="stock"
                      value={product.stock}
                      type="number"
                    />
                  </div>
                </div>

                {/* Color Input Section */}
                <div className="flex flex-col mt-3 gap-1">
                  <label htmlFor="">Colors:</label>
                  <div className="flex gap-2 items-center">
                    <input
                      className="border rounded-md h-8 px-2"
                      onChange={handleColorInput}
                      value={colorInput}
                      onKeyDown={handleAddColor}
                      type="text"
                      placeholder="black or #000"
                    />
                    <div className="flex gap-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="mt-1 text-[#929393]">*Enter Color Name and Press Enter</p>

                <div className="flex flex-col gap-2 mt-5">
                  <label htmlFor="">Description:</label>
                  <ReactQuill
                    className="w-full h-[20vh]"
                    theme="snow"
                    value={desc}
                    onChange={handleDescription}
                  />
                </div>

                <button
                  className="mt-14 bg-black w-[10vw] flex justify-center items-center p-1 rounded-md text-white"
                  type="submit"
                >
                  {loading ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    "Update Product"
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

export default EditProduct;
