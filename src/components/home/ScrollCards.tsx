"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    img: "/images/strategize-icon.svg",
    label: "Strategize",
    text: "Kick-off Session to understand your project & requirements and accordingly custom-tailor the next steps",
  },
  {
    img: "/images/onboard-icon.svg",
    label: "Onboard",
    text: "Reps recruitment, selection, and training (if required) according to the plan",
  },
  {
    img: "/images/launch-icon.svg",
    label: "Launch",
    text: "Reps are launched followed by client approval.",
  },
  {
    img: "/images/scale-icon.svg",
    label: "Scale",
    text: "Expand and grow your team hassle-free!",
  },
];

const HorizontalSteps = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (pathRef.current && containerRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength.toString();
      pathRef.current.style.strokeDashoffset = pathLength.toString();

      const ctx = gsap.context(() => {
        // Main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // Animate the line
        tl.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "none",
        });

        // Add icon fill animations at specific points
        steps.forEach((_, index) => {
          const position = (index + 1) / steps.length;
          tl.to(
            fillRefs.current[index],
            {
              scaleX: 1,
              duration: 0.4,
              transformOrigin: "left center",
              ease: "power2.out",
            },
            position * 2.5 - 0.1
          ); // Adjust timing to match line position
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Full-width SVG line */}
      <div className="absolute left-0 top-16 w-full h-10 overflow-hidden md:block hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 0 5 H 100"
            stroke="#0b409c"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Steps container with edge padding */}
      <div className="relative z-10 flex md:flex-row flex-col justify-between items-start px-4 sm:px-6 lg:px-8 md:gap-0 gap-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="colStep flex flex-col items-center text-center md:w-1/2 w-full"
          >
            <div
              ref={(el) => {
                if (el) iconRefs.current[idx] = el;
              }}
              className="relative w-35 h-35 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden"
            >
              <div
                ref={(el) => {
                  if (el) fillRefs.current[idx] = el;
                }}
                className="absolute inset-0 bg-[#0b409c] scale-x-0 transform origin-left"
              />
              <img
                src={step.img}
                alt={`Step ${idx + 1}`}
                className="relative z-10 w-4xl object-contain rounded-full p-2"
              />
            </div>
            <h4 className="mt-5 mb-5">{step.label}</h4>
            <p className="px-2 max-w-xs">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSteps;
