import Image from "next/image";
import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import { IoChevronForwardOutline } from "react-icons/io5";

interface WhyChooseProps {
  titleLines: React.ReactNode[];
  description: string;
  highlights: string[];
  skillsTitle: string;
  leftSkills: string[];
  rightSkills: string[];
  iconSrc?: string;
  imageSrc: string;
}

export default function WhyChoose({
  titleLines,
  description,
  highlights,
  skillsTitle,
  leftSkills,
  rightSkills,
  iconSrc = "/images/fadedcircle.svg",
  imageSrc,
}: WhyChooseProps) {
  return (
    <div className="max-w-[110rem] m-auto flex md:flex-row flex-col-reverse gap-4 px-12 py-12">
      <div className="md:w-[53%] w-full flex flex-col gap-4">
        <ScrollReveal delay={0.2}>
          <h1 className="font-medium heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0 !text-left">
            {titleLines.map((line, idx) => (
              <React.Fragment key={idx}>{line} {idx != 1 && <br />}</React.Fragment>
            ))}
          </h1>
        </ScrollReveal>

        <p className="!text-lg text-[#47525B]">{description}</p>

        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-2 first:mt-4">
            <IoChevronForwardOutline className="bg-[#10316B] text-white rounded-full p-[2px] text-lg font-medium" />
            <p className="!text-xl">{highlight}</p>
          </div>
        ))}

        <p className="!text-2xl !font-semibold mt-4 mb-3 text-[#10316B]">
          {skillsTitle}
        </p>

        <div className="flex md:flex-row flex-col gap-2">
          <div className="flex flex-col gap-5 md:w-1/2 w-full">
            {leftSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image src={iconSrc} alt="skill icon" width={34} height={34} />
                <p className="!text-xl">{skill}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 md:w-1/2 w-full">
            {rightSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image src={iconSrc} alt="skill icon" width={34} height={34} />
                <p className="!text-[18px]">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-[47%] w-full flex items-center">
        <Image src={imageSrc} alt="section visual" width={900} height={900} />
      </div>
    </div>
  );
}
