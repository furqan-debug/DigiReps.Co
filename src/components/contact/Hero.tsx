import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-44 pb-16 bgHero -mt-36">
      <figure className="mb-8">
        <ScrollReveal delay={0.2}>
          <Image
            src="/images/contact.svg"
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
              Get In
              <span className="txtBlue"> Touch</span>
              <br />
              With
              <span className="txtYellow"> Us</span>
            </h1>
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal delay={0.2}>
        <p className="text-center leading-8 -mt-4">
          Have questions or need assistance? We&apos;re here to help!
        </p>
      </ScrollReveal>
    </section>
  );
};

export default Hero;
