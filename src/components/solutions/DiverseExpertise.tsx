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
};

export default function DiverseExpertise({
  heading,
  subheading,
  logos,
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
          <div className="flex py-16">
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo.src}
                alt={"logo"}
                className="md:mx-14 mx-8 w-full"
                width={250}
                height={100}
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
