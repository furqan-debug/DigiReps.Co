// 'use client'; // very important in app/ directory
// import React from 'react'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/autoplay';
// import { Autoplay } from 'swiper/modules';

// const SmartWay = () => {
//   return (
//     <section className='smartWay pt-20 pb-20 bgColorBlue'>
//       <Swiper modules={[Autoplay]} slidesPerView={1} spaceBetween={30} loop={true} autoplay={{delay: 0, disableOnInteraction: false,}} speed={3000} freeMode={true}>
//         <SwiperSlide>
//           <div className='flex items-center'>
//               <Image src="/images/digireps-icon-logo.webp" alt=" " width={213} height={189} />
//               <h2>The smart way to grow your team remotely!</h2>
//           </div>
//         </SwiperSlide>
//         <SwiperSlide>
//           <div className='flex items-center'>
//               <Image src="/images/digireps-icon-logo.webp" alt=" " width={213} height={189} />
//               <h2>The smart way to grow your team remotely!</h2>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </section>
//   )
// }

// export default SmartWay;

import Marquee from "react-fast-marquee";
import Image from "next/image";

import React from "react";

export default function SmartWay() {
  return (
    <div className="smartWay py-12 bgColorBlue">
      <Marquee speed={150}>
        <div className="flex items-center">
          <Image
            src="/images/digireps-icon-logo.webp"
            className="opacity-60 mx-10 md:w-[213px] w-[113px] md:h-[189px] h-[89px]"
            alt=" "
            width={213}
            height={189}
          />
          <h2 className="md:!text-[4.5rem] !text-[3.5rem]">The smart way to grow your team remotely!</h2>
        </div>
      </Marquee>
    </div>
  );
}
