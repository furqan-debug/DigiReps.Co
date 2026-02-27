"use client";

import { useEffect, useRef } from "react";
import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";

interface HowToHireProps {
  heading: React.ReactNode;
}

export default function HowToHire({ heading }: HowToHireProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-bg-fill");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bgRef.current) {
      observer.observe(bgRef.current);
    }

    return () => {
      if (bgRef.current) {
        observer.unobserve(bgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={bgRef} className="bgcustom md:my-12 relative overflow-hidden">
      {/* Background fill overlay */}
      <div className="bg-fill-overlay md:block hidden"></div>

      <div className="md:h-screen hirebg md:pt-24 pt-12 relative z-10 md:px-0 px-12">
        <div className="max-w-5xl ml-auto">
          <ScrollReveal delay={0.2}>
            <h2 className="txtBlue font-medium mb-10 pb-4 heading-bottom-line-blue-orange-2">
              {heading}
            </h2>
          </ScrollReveal>
        </div>
        <div
          ref={sectionRef}
          className="relative h-full md:opacity-50 transition-opacity duration-[8000ms] ease-in-out md:block flex flex-col gap-6 items-center"
        >
          <div className="flex flex-col md:items-baseline items-center md:text-left text-center gap-2 max-w-[20rem] md:absolute left-[3%] top-[-4%]">
            <div className="md:bg-transparent bg-[#0b409c] rounded-full">
              <Image
                src="/images/strategize.svg"
                alt=" "
                width={50}
                height={37}
                className="md:block hidden"
              />
              <img
                src="/images/onboard-icon.svg"
                alt=" "
                width={50}
                height={37}
                className="relative z-10 md:hidden block w-28 object-contain rounded-full p-2"
              />
            </div>
            <h4 className="font-medium text-[#10316B] text-3xl">Strategize</h4>
            <p className="text-[#1E1E1E80]">
              Kick-off Session to understand your project & requirements and
              accordingly custom-tailor the next steps
            </p>
          </div>
          <div className="flex flex-col md:items-baseline items-center md:text-left text-center gap-2 max-w-[20rem] md:absolute left-[31%] top-[25%]">
            <div className="md:bg-transparent bg-[#0b409c] rounded-full">
              <Image
                src="/images/onboard.svg"
                alt=" "
                width={50}
                height={37}
                className="md:block hidden"
              />
              <img
                src="/images/launch-icon.svg"
                alt=" "
                width={50}
                height={37}
                className="relative z-10 md:hidden block w-28 object-contain rounded-full p-2"
              />
            </div>
            <h4 className="font-medium text-[#10316B] text-3xl">Onboard</h4>
            <p className="text-[#1E1E1E80]">
              Reps&apos; recruitment, selection, and training (if required)
              according to the plan
            </p>
          </div>
          <div className="flex flex-col md:items-baseline items-center md:text-left text-center gap-2 max-w-[20rem] md:absolute left-[59%] top-[37%]">
            <div className="md:bg-transparent bg-[#0b409c] rounded-full">
              <Image
                src="/images/launch.svg"
                alt=" "
                width={50}
                height={37}
                className="md:block hidden"
              />
              <img
                src="/images/launch-icon.svg"
                alt=" "
                width={50}
                height={37}
                className="relative z-10 md:hidden block w-28 object-contain rounded-full p-2"
              />
            </div>
            <h4 className="font-medium text-[#10316B] text-3xl">Launch</h4>
            <p className="text-[#1E1E1E80]">
              Reps are launched followed by client approval.
            </p>
          </div>
          <div className="flex flex-col md:items-baseline items-center md:text-left text-center gap-2 max-w-[20rem] md:absolute left-[81%] bottom-[25%]">
            <div className="md:bg-transparent bg-[#0b409c] rounded-full">
              <Image
                src="/images/scale.svg"
                alt=" "
                width={50}
                height={37}
                className="md:block hidden"
              />
              <img
                src="/images/scale-icon.svg"
                alt=" "
                width={50}
                height={37}
                className="relative z-10 md:hidden block w-28 object-contain rounded-full p-2"
              />
            </div>
            <h4 className="font-medium text-[#10316B] text-3xl">Scale</h4>
            <p className="text-[#1E1E1E80]">
              Expand and grow your team hassle-free!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
