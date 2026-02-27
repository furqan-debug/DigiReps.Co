"use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import Marquee from "react-fast-marquee";
import { GlimpseProps } from "lib/types/contentful";

export default function Glimpse({ data4 }: GlimpseProps) {
  // const services = [
  //   {
  //     image: "/images/glimpse1.jpg",
  //     cssProp: "w-[670px]"
  //   },
  //   {
  //     image: "/images/glimpse3.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse4.jpg",
  //     cssProp: "w-[670px]"
  //   },
  //   {
  //     image: "/images/glimpse5.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse6.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse7.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse8.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse10.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse11.jpg",
  //     cssProp: ""
  //   },
  //   {
  //     image: "/images/glimpse12.jpg",
  //     cssProp: ""
  //   },
  // ];

  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);
  // const [swiperReady, setSwiperReady] = useState(false);

  // useEffect(() => {
  //   setSwiperReady(true); // Wait for refs to be set
  // }, []);
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <ScrollReveal delay={0.2}>
          <h3 className="text-center rounded-full dot-heading font-medium mb-5 px-10 py-4">
            <span className="pl-2">Gallery</span>
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="txtBlue font-medium mb-5 text-center">
            A Glimpse into
            <br /> Our
            <span className="txtYellow"> World </span>
          </h2>
        </ScrollReveal>
      </div>
      <div className="pt-10 pb-20">
        <Marquee speed={150} direction="left" className="w-full">
          {data4.map(({ sys, fields }) => (
            <div key={sys.id} className="mx-4">
              <Image
                src={`https:${fields.image.fields.file.url}`}
                alt={fields.image.fields.title}
                width={500}
                height={420}
                className={`rounded-2xl h-[350px] w-[350px] object-cover`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
