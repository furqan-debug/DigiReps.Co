import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";

export const GrowFasterBetterSmarter = () => {
  return (
    <section className="growFastBetterSmarter md:pt-25 pt-12 md:pl-25 pl-12 md:pr-25 pr-12 md:pb-25 pb-12">
      <div className="flex md:flex-row flex-col items-center md:gap-0 gap-10">
        <div className="leftCol">
          <ScrollReveal delay={0.2}>
            <Image
              src="/images/grow-faster-better-smarter.svg"
              alt="Digi Reps"
              width={668}
              height={507}
            />
          </ScrollReveal>
        </div>
        <div className="rightCol">
          <ScrollReveal delay={0.2}>
            <h3 className="text-center rounded-full dot-heading font-medium mb-5 px-10 py-4">
              <span className="pl-2">Faster Approach</span>
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="txtBlue font-medium mb-5 heading-bottom-line-black-orange">
              Grow 10x Faster, <span className="txtYellow">Better,</span>{" "}
              <br className="md:block hidden" /> Smarter.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mb-5">
              Say goodbye to endless job postings, endless resumes, and endless
              frustration. With our proven solutions, you can finally focus on
              what you do best – growing your business.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              Get the right people, at the right time, every time, and hello to
              success.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GrowFasterBetterSmarter;
