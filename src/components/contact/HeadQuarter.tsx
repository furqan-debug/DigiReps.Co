import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";

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
        <Image
          src="/images/headquarter (3).svg"
          alt=" "
          width={700}
          height={500}
          className="w-full md:block hidden"
        />
        <Image
          src="/images/headquarter (3)Mob.svg"
          alt=" "
          width={700}
          height={500}
          className="w-full md:hidden block"
        />
      </ScrollReveal>
    </div>
  );
}
