import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'


const Footer = () => {
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div className="sm:col-span-2">
          <a href="/" aria-label="Go home"className="inline-flex items-center">
            <img src={"/logo.png"} alt="Company Logo" className='w-32' />
            
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
            At Savoy, we craft spaces where every detail reflects elegance and purpose. Just as every masterpiece is born from inspiration, we turn your visions into reality with impeccable interior design and décor.
            </p>
            <p className="mt-4 text-sm text-gray-800">
            Discover the beauty of thoughtful design, where style meets functionality—because every home deserves to be a work of art.
            </p>
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">Contacts</p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Phone:</p>
            <a href="tel:850-123-5021" className="text-deep-purple-accent-400 hover:text-deep-purple-800">
              850-123-5021
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a href="mailto:info@lorem.mail" className="text-deep-purple-accent-400 hover:text-deep-purple-800">
              info@lorem.mail
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              312 Lovely Street, NY
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <p className="text-base font-bold tracking-wide text-gray-900">Social</p>
          <div className="flex items-center mt-1 space-x-3">
            <a href="/" className="transition-colors duration-300 hover:text-deep-purple-accent-400">
             <Twitter/>
            </a>
            <a href="/" className="transition-colors duration-300 hover:text-deep-purple-accent-400">
              <Instagram/>
            </a>
            <a href="/" className="transition-colors duration-300 hover:text-deep-purple-accent-400">
            <Facebook />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
          Explore the artistry of premium interiors at Savoy, where every piece and detail is curated to transform spaces into timeless expressions of beauty and comfort.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">© Copyright 2024 Lorem Inc. All rights reserved.</p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              F.A.Q
            </a>
          </li>
          <li>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/" className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
