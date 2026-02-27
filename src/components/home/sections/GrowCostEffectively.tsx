"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useModal } from "@/context/ModalContext";

export const GrowCostEffectively = () => {
  const { openModal } = useModal();

  return (
    <section className="growCostEffectively md:pl-25 pl-6 md:pr-25 pr-6 md:py-25 py-12 bg-white">
      <div className="blueBox flex md:flex-row flex-col md:gap-0 gap-10 items-center md:pl-25 pl-12 pr-12 py-12">
        <div className="leftCol md:w-1/2 w-full">
          <ScrollReveal delay={0.2}>
            <h3 className="text-center rounded-full dot-heading font-medium mb-5 px-10 py-4">
              <span className="pl-2">Book Session</span>
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-white font-medium mb-5 md:!text-[40px] !text-[30px] md:!leading-loose">
              want to learn more how we can help you grow cost-effectively?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <button
              onClick={() => openModal()}
              className="bgColorBlue text-white rounded-full sm:px-11 px-6 py-4 animated-button overflow-x-hidden cursor-pointer"
            >
              <span>Book Discovery Session</span>
            </button>
          </ScrollReveal>
        </div>
        <div className="rightCol md:w-1/2 w-full">
          <ScrollReveal delay={0.2}>
            <Image
              src="/images/grow-cost-effectively.svg"
              alt=" "
              width={1035.87}
              height={726.94}
              className="md:-my-24"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GrowCostEffectively;
