// "use client";

// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// const LineAnimation = () => {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     gsap.to('.line', {
//       scrollTrigger: {
//         trigger: '.line-container',
//         start: 'top center',
//         end: 'bottom top',
//         scrub: true,
//       },
//       height: '100%',
//       ease: 'none',
//       duration: 2,
//     });
//   }, []);

//   return (
//     <div className="line-container" style={{ height: '100%', position: 'absolute', left: '0', right: '0', margin: '0 auto' }}>
//       <div
//         className="line"
//         style={{
//           width: '2px',
//           height: '0%',
//           backgroundColor: '#FEB402',
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           right: '0',
//           margin: '0 auto',
//           transform: 'translateX(-50%)',
//         }}
//       ></div>
//     </div>
//   );
// };

// export default LineAnimation;

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function VerticalTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const top = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
    ref={sectionRef}

      className="relative h-full flex justify-center"
    >
      <div className="relative w-[2px] h-full">
        <div className="absolute w-[2px] h-full bg-[#ffffff33]"></div>
        <div
          ref={lineRef}
          className={`absolute w-[2px] bg-[#FEB402] transition-all duration-3000 ease-in-out ${
            animate ? "h-full" : "h-0"
          }`}
        ></div>
      </div>

      <div className="absolute top-0 rounded-2xl shadow-lg">
        <Image
          src="/images/digireps-logo-icon.webp"
          alt="Digi Reps"
          width={140}
          height={140}
        />
      </div>
    </div>
  );
}