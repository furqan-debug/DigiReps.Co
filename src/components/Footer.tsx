"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaFacebookSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FooterProps } from "lib/types/contentful";

const Footer: React.FC<FooterProps> = ({ contactDetails, reviewPlatforms }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  if (pathname === "/portal" || pathname === "/forget-password") {
    return null;
  }
  return (
    <footer className="relative bg-white z-10">
      <div className="flex md:flex-row flex-col">
        <div className="col-01 flex flex-col items-center justify-center md:py-0 py-8">
          <Link href="/" onClick={handleLogoClick}>
            <Image
              src="/images/digireps-logo-sm.png"
              alt=" "
              width={191}
              height={62}
              className="mb-5"
            />
          </Link>
          <p className="text-center">
            The smart way to grow your team <br /> remotely!
          </p>
        </div>
        <div className="col-02">
          <ul className="md:block flex w-full">
            <li className="border-t md:border-b-0 border-b md:border-x-0 border-x border-[#ffffff80] md:w-auto w-1/4">
              <Link href="https://www.facebook.com/digirepsco" target="_blank">
                <span className="md:block hidden">Facebook</span>
                <FaFacebookSquare className="md:hidden block text-3xl" />
              </Link>
            </li>
            <li className="border-t md:border-b-0 border-b md:border-x-0 border-x border-[#ffffff80] md:w-auto w-1/4">
              <Link
                href="https://www.youtube.com/@DigiRepsOfficial"
                target="_blank"
              >
                <span className="md:block hidden">Youtube</span>
                <FaYoutube className="md:hidden block text-3xl" />
              </Link>
            </li>
            <li className="border-t md:border-b-0 border-b md:border-x-0 border-x border-[#ffffff80] md:w-auto w-1/4">
              <Link
                href="https://www.linkedin.com/company/digireps"
                target="_blank"
              >
                <span className="md:block hidden">LinkedIn</span>
                <FaLinkedin className="md:hidden block text-3xl" />
              </Link>
            </li>
            <li className="border-t md:border-b-0 border-b md:border-x-0 border-x border-[#ffffff80] md:w-auto w-1/4">
              <Link href="https://www.instagram.com/digi.reps" target="_blank">
                <span className="md:block hidden">Instagram</span>
                <PiInstagramLogoFill className="md:hidden block text-3xl" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-03 p-8">
          <h3 className="text-white mb-5 md:text-left text-center">
            Globally Recognized & Trusted
          </h3>
          <div className="flex items-center md:flex-nowrap flex-wrap mb-5 md:gap-5 gap-8 md:flex-row flex-col">
            {reviewPlatforms.map(({ sys, fields }) => (
              <Link href={fields.link} target="_blank" key={sys.id}>
                <Image
                  src={`https:${fields.logo.fields.file.url}`}
                  alt={fields.logo.fields.title}
                  width={150}
                  height={70}
                />
              </Link>
            ))}
          </div>
          <h3 className="text-white mb-5 md:text-left text-center md:mt-8 mt-16">
            Get in Touch
          </h3>
          {contactDetails.map(({ sys, fields }) => (
            <div key={sys.id}>
              <p className="mb-2 md:text-left text-center">
                <Link href={`tel:${fields.number}`}>{fields.number}</Link>
              </p>
              <p className="mb-2 md:text-left text-center">
                <Link href={`mailto:${fields.email}`}>{fields.email}</Link>
              </p>
              <p className="md:text-left text-center">{fields.address}</p>
            </div>
          ))}
        </div>
        <div className="col-04 flex flex-col justify-end">
          <ul className="flex md:flex-col flex-row w-full border-[#ffffff80]">
            <li className="md:border-t md:border-x-0 md:border-b-0 border-x border-t border-[#ffffff80] md:flex-none flex-1/3">
              <Link href="/portal">Apply Now</Link>
            </li>
            <li className="md:border-t md:border-x-0 md:border-b-0 border-x border-t border-[#ffffff80] md:flex-none flex-1/3">
              <Link href="/terms-condition">Terms & Conditions</Link>
            </li>
            <li className="md:border-t md:border-x-0 md:border-b-0 border-x border-t border-[#ffffff80] md:flex-none flex-1/3">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="fs-row bg-[#0B409C] text-[#FFFFFF80] flex md:flex-row flex-col items-center justify-between md:pl-25 pl-6 md:pr-25 pr-6 pt-10 pb-10">
        <div className="md:flex flex-row items-center grid grid-rows-2 grid-cols-3 md:gap-14 gap-x-20 gap-y-6">
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
        <p className="md:text-left text-center md:mt-0 mt-6">
          © Copyright 2025 | Digify Global LLC DBA DigiReps.co
        </p>
      </div>
    </footer>
  );
};

export default Footer;
