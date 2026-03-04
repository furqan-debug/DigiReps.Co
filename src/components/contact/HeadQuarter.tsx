import React from "react";
import ScrollReveal from "../home/ScrollReveal";

export default function HeadQuarter() {
  return (
    <div className="flex flex-col items-center gap-4 md:px-12 py-20 max-w-[90rem] m-auto">
      <ScrollReveal delay={0.2}>
        <h2 className="font-medium mb-5 text-center px-4">
          <span className="regular-sentence"> Rooted </span>
          <span className="lowercase"> in </span>
          <span className="txtYellow">NYC,</span>
          <br /> <span className="regular-sentence"> Scaling </span>
          <span className="txtYellow">Globally.</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/headquarter (3).svg"
          alt="Office Headquarters"
          className="w-full md:block hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/headquarter (3).svg"
          alt="Office Headquarters Mobile"
          className="w-full md:hidden block"
        />
      </ScrollReveal>
    </div>
  );
}
