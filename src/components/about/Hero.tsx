import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center py-44 bgHero -mt-36">
      <figure className="mb-8">
        <ScrollReveal delay={0.2}>
          <Image
            src="/images/Vector.png"
            alt=" "
            width={141.83}
            height={134.73}
          />
        </ScrollReveal>
      </figure>
      <div className="overflow-hidden">
        <div className="inline-block">
          <ScrollReveal delay={0.2}>
            <h1 className="font-medium text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0">
              <span className="txtBlue">Empowering</span>{" "}
              <span className="txtYellow">Innovation</span>,
              <br />
              <span className="txtYellow">Driving</span> Success
            </h1>
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal delay={0.2}>
        <p className="text-center leading-8 -mt-4">
          Discover who we are, the team behind the vision, and explore the
          <br /> principles that define us.
        </p>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
