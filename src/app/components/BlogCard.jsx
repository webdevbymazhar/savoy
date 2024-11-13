import React from 'react'

const BlogCard = ({image,category,title,content,author}) => {

  function compressContent(htmlContent, maxWords = 20) {
    // Strip HTML tags using a regex
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
  
    // Split the plain text into an array of words
    const wordsArray = plainText.split(/\s+/);
  
    // Join the first `maxWords` words and add "..." if the content is longer
    const compressedText = wordsArray.length > maxWords
      ? wordsArray.slice(0, maxWords).join(" ") + "..."
      : wordsArray.join(" ");
  
    return compressedText;
  }
  
  return (
    <div className="flex flex-col overflow-hidden rounded-lg h-[60vh] shadow-lg w-full md:w-[25vw]">
            <div className="flex-shrink-0">
              <img
                className="h-48 w-full object-cover"
                src={image}
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <a href="#" className="hover:underline">{category}</a>
                </p>
                <a href="#" className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">{title}</p>
                  <p className="mt-3 text-base text-gray-500">
                    {compressContent(content,19)}
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <a href="#">
                    <span className="sr-only">Roel Aufderehar</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">{author}</a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime="2020-03-16">Mar 16, 2020</time>
                    <span aria-hidden="true">·</span>
                    <span>6 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default BlogCard
