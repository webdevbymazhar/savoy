"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import '../globals.css';

import { Navigation, Autoplay } from 'swiper/modules';

export default function Header() {
  return (
    <div className='pt-16 '>
      <Swiper
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className='relative'>
            <img className='h-[25vh] sm:h-[auto] w-full object-cover' src="/slider1.jpg" alt="" />
            <div className='animation flex flex-col justify-center gap-1 h-[12vh] px-4 lg:hidden'>
              <p className='text-[20px] font-medium mt-3'>Contemporary Pendant Lighting</p>
              <p className='text-[20px] text-[#707070] '>Interior</p>
            </div>
            <div className='animation p-2 hidden lg:block absolute w-[350px] top-[35%] left-[10%]'>
              <p className='text-[3.5vh] text-white '>Contemporary Pendant Lighting</p>
              <p style={{borderBottom:"1px solid #8f8f8f", paddingBottom:"3px", display:"inline-block"}} className='cursor-pointer text-[#8f8f8f] mt-4 text-[3vh] font-medium hover:text-[orange] transition-all'>Interior</p>
            </div>
            <hr className='border-[#e0e0e0] mx-2 sm:hidden' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img className='h-[25vh] sm:h-[auto] w-full object-cover' src="/slider2.jpg" alt="" />
            <div className='animation flex flex-col justify-center gap-1 h-[12vh] px-4 lg:hidden'>
              <p className='text-[20px] font-medium'>Minimal Rotating Disc Wall Clock</p>
              <p className='text-[20px] text-[#707070] '>Decoration</p>
            </div>
            <div className='animation p-2 hidden lg:block absolute w-[350px] top-[35%] left-[10%]'>
              <p className='text-[3.5vh] text-black '>Minimal Rotating Disc Wall Clock</p>
              <p style={{borderBottom:"1px solid #8f8f8f", paddingBottom:"3px", display:"inline-block"}} className='cursor-pointer text-[#8f8f8f] mt-4 text-[3vh] font-medium hover:text-[orange] transition-all'>Decoration</p>
            </div>
            <hr className='border-[#e0e0e0] mx-2 sm:hidden' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img className='h-[25vh] sm:h-[auto] w-full object-cover' src="/slider3.jpg" alt="" />
            <div className='animation flex flex-col justify-center gap-1 h-[12vh] px-4 lg:hidden'>
              <p className='text-[20px] font-medium'>Bamboo Zigzag Pattern Basket</p>
              <p className='text-[20px] text-[#707070]  '>Essentials</p>
            </div>
            <div className='animation p-2 hidden lg:block absolute w-[350px] top-[35%] left-[10%]'>
              <p className='text-[3.5vh] text-black '>Bamboo Zigzag Pattern Basket</p>
              <p style={{borderBottom:"1px solid #8f8f8f", paddingBottom:"3px", display:"inline-block"}} className='text-[#8f8f8f] mt-4 text-[3vh] font-medium cursor-pointer hover:text-[orange] transition-all'>Essentials</p>
            </div>
            <hr className='border-[#e0e0e0] mx-2 sm:hidden' />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}