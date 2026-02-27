"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import TextReveal from "@/components/home/TextReveal";
import ScrollReveal from "@/components/home/ScrollReveal";
import { usePathname } from "next/navigation";

const Hero = () => {
  const handleClick = () => {
    const target = document.getElementById("competitive");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pathname = usePathname(); // ✅ Safe — no Suspense needed if used alone

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <section className="flex flex-col items-center justify-center pt-12">
      <ScrollReveal>
        <figure className="mb-8">
          <Image
            src="/images/man-work-pc.svg"
            alt=" "
            width={141.83}
            height={134.73}
            className="md:w-[141px] w-[100px] md:h-[134px] h-[100px]"
          />
        </figure>
      </ScrollReveal>
      <TextReveal />
      <ScrollReveal delay={0.2}>
        <p className="text-center leading-8 mb-8 px-4">
          Growing a business is hard we make it a whole lot easier more
          predictable, less <br className="md:block hidden" /> stressful and
          more fun.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <button
          onClick={handleClick}
          className="bgColorBlue text-white rounded-full px-11 py-4 animated-button overflow-x-hidden cursor-pointer"
        >
          <span>Unlock Your Growth Potential</span>
        </button>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
