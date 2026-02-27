import React from "react";
import ScrollReveal from "../home/ScrollReveal";

export default function Mission() {
  return (
    <div className="bg-[#F2F7FF]">
      <div className="bgabout">
        <div className="max-w-7xl m-auto flex flex-col items-center px-10 md:pt-24 pt-12 md:pb-40 pb-12 gap-6">
          <ScrollReveal delay={0.2}>
            <h2 className="txtBlue font-medium mb-5 heading-center-line text-center">
              Beyond <span className="txtYellow">Business</span>: A Mission{" "}
              <br />
              <span className="txtBlue">That</span>{" "}
              <span className="txtYellow">Matters</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h3 className="text-center rounded-full dot-heading font-medium px-10 py-4">
              <span className="pl-2">Our Mission</span>
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h3 className="mb-5 text-center md:text-4xl text-2xl text-[#010716] md:leading-12">
              To ensure the most satisfying experience ever for our valuable
              clients through a robust ecosystem of remote professionals.
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h3 className="text-center rounded-full dot-heading font-medium px-10 py-4">
              <span className="pl-2">Our Vision</span>
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h3 className="mb-5 text-center md:text-4xl text-2xl text-[#010716] md:leading-12">
              To be the largest ecosystem of top-tier remote professionals,
              revolutionizing the outsourcing industry with smart, efficient,
              and high-quality workforce solutions that empower businesses to
              thrive globally.
            </h3>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
