"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import { ManagementProps } from "lib/types/contentful";

export default function Management({ data2 }: ManagementProps) {
  // console.log(data2)
  // const services = [
  //   {
  //     name: "Ken Akil ",
  //     role: "Business Development Manager",
  //     image: "/images/ken.png",
  //   },
  //   {
  //     name: "Angelica Voca",
  //     role: "Talent Acquisition Manager",
  //     image: "/images/angelica.png",
  //   },
  //   {
  //     name: "Marsha Khan",
  //     role: "Manager - Sales & Partnerships",
  //     image: "/images/marsha.png",
  //   },
  //   {
  //     name: "Prince Onyeme",
  //     role: "Training & QA Specialist",
  //     image: "/images/prince.png",
  //   },
  //   {
  //     name: "Nash Siddic",
  //     role: "Manager - IT & Systems",
  //     image: "/images/nash.png",
  //   },
  // ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true); // Wait for refs to be set
  }, []);
  return (
    <div className="bg-[#10316B] md:pt-16 pt-12 md:pb-24 pb-12 md:pl-20 pl-12">
      <div className="max-w-[115rem] m-auto pr-12 mb-12">
        <ScrollReveal delay={0.2}>
          <h2 className="font-medium mb-5 text-white">
            DigiReps
            <span className="txtYellow"> Management </span>
          </h2>
        </ScrollReveal>
      </div>
      <ScrollReveal delay={0.2}>
        {swiperReady && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === "object"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            spaceBetween={30}
            slidesPerView={3.5}
            className=""
            breakpoints={{
              0: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
            }}
          >
            {data2.map(({ sys, fields }) => (
              <SwiperSlide key={sys.id} className="">
                <div className="bg-[#0E2856] rounded-2xl p-6">
                  <Image
                    src={`https:${fields.image.fields.file.url}`}
                    alt={fields.image.fields.title}
                    width={350}
                    height={420}
                    className="rounded-2xl"
                  />
                  <div className="bg-[#10316B] mt-4 rounded-2xl text-2xl flex justify-between w-full items-center p-4">
                    <div className="flex flex-col gap-1 text-white">
                      <h4>{fields.name}</h4>
                      <p className="text-[#ffffff50]">{fields.role}</p>
                    </div>
                    {/* <Image
                    src={member.linkedin}
                    alt="LinkedIn"
                    width={55}
                    height={55}
                  /> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </ScrollReveal>
    </div>
  );
}
