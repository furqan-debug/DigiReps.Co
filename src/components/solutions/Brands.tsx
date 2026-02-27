import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function Brands() {
  const images = [
    {
      src: "/images/grow.png",
    },
    {
      src: "/images/legere.png",
    },
    {
      src: "/images/filtrous.png",
    },
    {
      src: "/images/iron.png",
    },
    {
      src: "/images/predi.png",
    },
    {
      src: "/images/drip.png",
    },
    {
      src: "/images/basik.png",
    },
    {
      src: "/images/clear.png",
    },
    {
      src: "/images/trans.png",
    },
    {
      src: "/images/americom.png",
    },
    {
      src: "/images/verishield.png",
    },
    {
      src: "/images/rketek.png",
    },
    {
      src: "/images/tlk.png",
    },
    {
      src: "/images/agm.png",
    },
    {
      src: "/images/impact.png",
    },
    {
      src: "/images/tuff.png",
    },
  ];

  return (
    <div>
      <Marquee speed={150} direction="left" className="">
        <div className="flex py-24 bg-white">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt=" "
              className="md:mx-14 mx-8 w-full mix-blend-luminosity"
              width={300}
              height={40}
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
}
