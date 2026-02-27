import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
import { OurEvolutionProps } from "lib/types/contentful";

export default function OurEvolution({ data1 }: OurEvolutionProps) {

  return (
    <div className="bg-[#10316B] py-20 md:px-0 px-6">
      <div className="max-w-[90rem] m-auto flex flex-col items-center">
        <ScrollReveal delay={0.2}>
          <h2 className="text-white text-center font-medium mb-5 md:!pb-8 !pb-16 heading-bottom-line-right md:!mx-0 !mx-12 md:!text-[4.5rem] !text-[2.8rem] md:!leading-[80px] !leading-[50px]">
            <span className="text-white">Our Evolution: </span>
            <span className="txtYellow"> Learning,</span>
            <br />
            <span className="">Growing, </span>
            <span className="txtYellow">Succeeding</span>
          </h2>
        </ScrollReveal>
        <div className="flex md:flex-row flex-col items-center w-full gap-2 mt-12">
          <div className="md:w-1/2 w-full">
            <ScrollReveal delay={0.2}>
              <Image
                src={"/images/evolution.png"}
                alt=" "
                width={600}
                height={600}
              />
            </ScrollReveal>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="flex flex-col gap-6">
              {data1.map(({ sys, fields }) => (
                <ScrollReveal delay={0.2} key={sys.id}>
                  <div className="flex items-center gap-3 bg-[#ffffff10] md:w-4/5 md:mx-0 mx-4 rounded-[20px] px-4 py-5">
                    <Image
                      src={`https:${fields.icon.fields.file.url}`}
                      alt={fields.icon.fields.title}
                      width={65}
                      height={65}
                    />
                    <div>
                      <h3 className="text-[16px] uppercase text-white font-medium tracking-wider">
                        {fields.subHeading}
                      </h3>
                      <h3 className="sm:text-[32px] text-[24px] text-[#FEB402] leading-none">
                        {fields.heading}
                      </h3>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
