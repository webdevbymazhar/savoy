import React from 'react';

const ShopMoreBtn = ({title}) => {
  return (
   <div className='w-full flex justify-center items-center mt-10'>
     <button className="relative inline-block cursor-pointer outline-none border-0 align-middle text-center no-underline bg-transparent p-0 text-inherit font-inherit w-48 h-auto group">
      <span
        className=" relative block w-12 h-12 bg-[#464648] rounded-full transition-all duration-450 ease-[cubic-bezier(0.65, 0, 0.076, 1)] group-hover:w-full"
        aria-hidden="true"
      >
        <span className="absolute  top-0 bottom-0 m-auto left-[10px] w-4 h-0.5 bg-white transition-all duration-450 ease-[cubic-bezier(0.65, 0, 0.076, 1)] group-hover:translate-x-4">
          <span className="absolute left-3 top-[-4px]  w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45"></span>
        </span>
      </span>
      <span className="absolute top-0 left-0 right-0 bottom-0 p-3 ml-7 text-[#282936] font-bold leading-[1.6] uppercase transition-all duration-450 ease-[cubic-bezier(0.65, 0, 0.076, 1)] group-hover:text-white">
        {title}
      </span>
    </button>

   </div>
  );
};

export default ShopMoreBtn