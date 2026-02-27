import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full">
      <Image
        src={"/images/footerbubbles.png"}
        alt=""
        width={1920}
        height={100}
        className="w-full"
      />
      <div className="fs-row bg-[#0B409C] text-[#FFFFFF80] flex md:flex-row flex-col items-center justify-between md:pl-25 md:pr-25 px-8 pt-10 pb-10">
        <div className="md:flex items-center grid grid-rows-2 grid-cols-3 md:gap-14 gap-x-20 gap-y-6">
          <li>
            <Link href="/aboutus">About</Link>
          </li>
          <li>
            <Link href="/#whydigireps">Why DigiReps?</Link>
          </li>
          <li>
            <Link href="/#empowerSlider">Hire</Link>
          </li>
          <li>
            <Link href="/#casestudies">Case Studies</Link>
          </li>
          <li>
            <Link href="/#testimonials">Testimonials</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </div>
        <p className="md:text-left text-center md:mt-0 mt-6">© Copyright 2025 | Digify Global LLC DBA DigiReps.co</p>
      </div>
    </div>
  );
}
