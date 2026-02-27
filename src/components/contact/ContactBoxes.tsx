"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiArrowLineUpRightLight } from "react-icons/pi";
import ScrollReveal from "../home/ScrollReveal";

export default function ContactBoxes() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section comes into view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've seen it, no need to keep observing
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        // Trigger when at least 10% of the element is visible
        threshold: 0.1,
        // Start observing a bit before the element comes into view
        rootMargin: "0px 0px -70px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const contactOptions = [
    {
      image: "/images/sales.svg",
      title: "Talk to Sales",
      description:
        "Looking to boost your business with our solutions? Connect with our sales team to explore pricing, features, and custom plans.",
      action: "Email Us",
      link: "mailto:sales@digireps.co",
    },
    {
      image: "/images/recruiting.svg",
      title: "Recruiting Queries",
      description:
        "Excited to join our team? Whether you're applying for a role or have questions about careers with us, we're happy to help",
      action: "Email Us",
      link: "mailto:recruitment@digireps.co",
    },
    {
      image: "/images/talk.svg",
      title: "Talk to Client Care",
      description:
        "Need assistance with our service? Our client care team is here to provide quick resolutions and expert support for your concerns.",
      action: "Email Us",
      link: "mailto:clientcare@digireps.co",
    },
    {
      image: "/images/portal.svg",
      title: "Portal Queries",
      description:
        "Having trouble accessing your account or facing technical issues? Reach out to our team for seamless portal assistance",
      action: "Email Us",
      link: "mailto:support@digireps.co",
    },
    {
      image: "/images/general.svg",
      title: "General Inquiries",
      description:
        "Have a question that doesn't fit into other categories? Drop us a message, and we'll make sure it reaches the right person.",
      action: "Email Us",
      link: "mailto:contact@digireps.co",
    },
    {
      image: "/images/call.svg",
      title: "Call Us",
      description:
        "Prefer to speak directly with us? Give us a call, and our team will assist you with any questions or concerns right away.",
      action: "+1 (347) 479-1444",
      link: "tel:+13474791444",
    },
  ];

  return (
    <div
      className={`max-w-[90rem] mx-auto px-12 pt-24 pb-8 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 mt-0" : "opacity-40 mt-[70px]"
        }`}
    >
      <div
        ref={sectionRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {contactOptions.map((option, index) => (
          <ScrollReveal key={index} delay={0.2}>
            <div className="border border-[#0B409C36] rounded-[30px] p-8 hover:bg-[#0B409C] cursor-default hover:text-white group">
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.title}
                width={60}
                height={60}
                className="bg-white rounded-2xl"
              />

              <h3 className="text-lg font-medium mb-4 mt-6">{option.title}</h3>

              <p className="!text-lg mb-4">{option.description}</p>

              <Link
                href={option.link}
                className="text-[#0B409C] group-hover:text-white !text-lg font-medium inline-flex items-center"
              >
                {option.action}
                {option.title !== "Call Us" && <PiArrowLineUpRightLight />}
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
