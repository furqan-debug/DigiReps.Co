import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";

interface SolutionHeroProps {
  imageSrc: string;
  imageAlt?: string;
  heading: React.ReactNode;
  description: string;
  imageWidth?: number;
  imageHeight?: number;
}

const SolutionHero: React.FC<SolutionHeroProps> = ({
  imageSrc,
  imageAlt = "",
  heading,
  description,
  imageWidth = 141.83,
  imageHeight = 134.73,
}) => {
  return (
    <section className={`pt-44 pb-44 bgHero -mt-36 md:px-6 px-12`}>
      <div className="flex flex-col items-center justify-center max-w-4xl m-auto">
        <figure className="mb-8">
          <ScrollReveal delay={0.2}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
            />
          </ScrollReveal>
        </figure>
        <div className="overflow-hidden">
          <div className="inline-block">
            <ScrollReveal delay={0.2}>
              <h1 className="font-medium text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0 txtBlue">
                {heading}
              </h1>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal delay={0.2}>
          <p className="text-center leading-8 -mt-4 !text-lg text-[#1E1E1E]">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SolutionHero;
