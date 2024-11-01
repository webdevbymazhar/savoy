"use client";
import { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const AddProduct = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // Configure Jodit editor settings
  const config = {
    height: "70vh",
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      category,
      content,
    });
  };

  return (
    <div>
      <h1 className="text-xl font-extrabold border-b pb-1 w-full py-5">
        Create Blog
      </h1>
      <div className="grid grid-cols-12">
        <div className="col-span-10">
          <div className="p-4">
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
                  <option value="Technology">Technology</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
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
                    onChange={(newContent) => {}}
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

export default AddProduct;
