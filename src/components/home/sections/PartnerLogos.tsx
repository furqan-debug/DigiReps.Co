"use client"; // very important in app/ directory
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { PartnerLogosProps } from "lib/types/contentful";

// Array of partner logo data
// const logos = [
//   {
//     src: "/images/americal-general-media-logo.webp",
//     alt: "Americal General Media",
//   },
//   { src: "/images/americom-logo.webp", alt: "Americom" },
//   { src: "/images/arketek-logo.webp", alt: "Arketek" },
//   { src: "/images/basik-wall-logo.webp", alt: "Basik Wall" },
//   { src: "/images/clear-brand-logo.webp", alt: "Clear Brand" },
//   { src: "/images/drip-logo-2.webp", alt: "Drip" },
//   { src: "/images/filtrous-logo.webp", alt: "Filtrous" },
//   { src: "/images/growtoro-logo.webp", alt: "Growtoro" },
//   { src: "/images/impact-suite-logo.webp", alt: "Impact Suite" },
//   { src: "/images/iron-orbit-logo.webp", alt: "Iron Orbit" },
//   {
//     src: "/images/legere-pharmaceuticals-logo.webp",
//     alt: "Legere Pharmaceuticals",
//   },
//   { src: "/images/predibase-logo.webp", alt: "Predibase" },
//   { src: "/images/solving-services-logo.webp", alt: "Solving Services" },
//   { src: "/images/tlk-fusion-logo.webp", alt: "TLK Fusion" },
//   { src: "/images/trans-act-logo.webp", alt: "Trans-Act" },
//   { src: "/images/tuff-wrap-logo.webp", alt: "Tuff Wrap" },
//   { src: "/images/verishield-logo.webp", alt: "Verishield" },
// ];

const PartnerLogos: React.FC<PartnerLogosProps> = ({ data1 }) => {
  return (
    <section className="partnerLogos pt-20 pb-20 md:px-0 px-6">
      <div>
        <Swiper
          modules={[Autoplay]}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 },
          }}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={1000}
          freeMode={true}
        >
          {data1.map(({ sys, fields }) => (
            <SwiperSlide key={sys.id}>
              <Image
                src={`https:${fields.image.fields.file.url}`}
                alt={fields.image.fields.title}
                width={300}
                height={50}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnerLogos;
