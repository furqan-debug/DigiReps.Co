"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ScrollCounter({ target = 100, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const incrementTime = duration / target;

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === target) clearInterval(counter);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
    </span>
  );
}