"use client";

import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useModal } from "../../context/ModalContext";

type DiverseExpertiseProps = {
  heading: React.ReactNode;
  subheading: string;
  logos: {
    src: string
  }[];
  logoWidth?: number;
  logoHeight?: number;
};

export default function DiverseExpertise({
  heading,
  subheading,
  logos,
  logoWidth = 250,
  logoHeight = 100,
}: DiverseExpertiseProps) {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col p-12">
      <ScrollReveal delay={0.2}>
        <h1 className="font-medium text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0">
          {heading}
        </h1>
        <p className="text-center max-w-4xl m-auto">{subheading}</p>
      </ScrollReveal>

      <div>
        <Marquee speed={150} direction="left">
          <div className="flex items-center py-16">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={"logo"}
                className="px-14"
                width={500}
                height={500}
                style={{ height: logoHeight, width: "auto" }}
              />
            ))}
          </div>
        </Marquee>
      </div>

      <button
        onClick={() => openModal()}
        className="bgColorBlue text-white rounded-full py-4 animated-button overflow-x-hidden cursor-pointer w-fit m-auto px-20"
      >
        <span>Book Consultation</span>
      </button>
    </div>
  );
}
