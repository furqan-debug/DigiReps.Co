"use client";

import { useEffect, useRef, ReactNode } from "react";  // ReactNode ko import karna hoga
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;  // Explicitly typing 'children'
  delay?: number;       // Optional 'delay' prop
  y?: number;           // Optional 'y' prop
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, y = 50 }) => {
  const revealRef = useRef<HTMLDivElement | null>(null);  // Explicitly typing the ref

  useEffect(() => {
    const el = revealRef.current;

    if (el) {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: y, // default slide from bottom
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // when element top reaches 85% of viewport
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [delay, y]);

  return (
    <div ref={revealRef}>
      {children}
    </div>
  );
};

export default ScrollReveal;
