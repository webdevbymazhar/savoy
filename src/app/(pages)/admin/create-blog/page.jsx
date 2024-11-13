"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  // Configure Jodit editor settings
  const config = {
    height: "70vh",
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
        title,
        category,
        description: content,
        image,
    });
    
    try {
      let res = await axios.post("/api/blog", {
        title,
        category,
        description: content,
        image,
        author : "admin"
      });
      if (res) {
        toast.success("Blog added successfully");
        router.push("/admin/blogs");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-extrabold border-b pb-1 w-full py-5">
        Create Blog
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-10">
          <div className="p-4">
            <div className="flex gap-2 items-center">
              <CldUploadWidget
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(results) => {
                  if (results.info?.secure_url && results.event === "success") {
                    setImage(results.info.secure_url);
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
                      <PlusIcon size={20} color="black" />
                      <span>Upload</span>
                    </span>
                  </button>
                )}
              </CldUploadWidget>
              <div className="flex items-center gap-3">
                {image === "" ? (
                  "No Images Selected"
                ) : (
                  <div className="bg-white border border-black rounded-md text-white mt-5 mb-5 w-16 h-16 flex gap-3 justify-center items-center">
                    <img className="object-contain" src={image} alt="Uploaded" />
                  </div>
                )}
              </div>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded"
                />
              </div>

              {/* Category Selection */}
              <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select a category</option>
                  <option value="furniture">Furniture</option>
                  <option value="lightings">Lightings</option>
                  <option value="wallart">Wall Art</option>
                  <option value="Education">Education</option>
                  {/* Add more categories as needed */}
                </select>
              </div>

              {/* Description / Content (Jodit Editor) */}
              <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="description">Description:</label>
                <div className="h-[70vh]">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={() => {}}
                  />
                </div>
              </div>

              {/* Create Blog Button */}
              <button
                type="submit"
                className="mt-6 p-2 bg-black text-white rounded w-32"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
