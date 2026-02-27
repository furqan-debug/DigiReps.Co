import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function CoreValues() {
  const coreValues = [
    {
      icon: "/images/coreValue1.svg",
      title: "Client-Centric Excellence",
      description:
        "We prioritize our clients’ success, tailoring our strategies to meet their unique needs and goals.",
    },
    {
      icon: "/images/coreValue2.svg",
      title: "Innovation at Our Core",
      description:
        "We embrace change and continuously seek innovative solutions to drive growth and efficiency.",
    },
    {
      icon: "/images/coreValue3.svg",
      title: "Integrity & Transparency",
      description:
        "We uphold honesty and transparency in all our interactions, fostering trust and long-term partnerships.",
    },
    {
      icon: "/images/coreValue4.svg",
      title: "Resilience in Action",
      description:
        "We tackle challenges head-on, learning and adapting to emerge stronger and more determined.",
    },
    {
      icon: "/images/coreValue5.svg",
      title: "Ownership and Accountability",
      description:
        "We take full responsibility for our actions, ensuring reliability and commitment in delivering results.",
    },
    {
      icon: "/images/coreValue6.svg",
      title: "Whole > Self",
      description:
        "We believe in the power of teamwork, leveraging diverse perspectives to achieve collective success.",
    },
    {
      icon: "/images/coreValue7.svg",
      title: "Efficiency with Purpose",
      description:
        "We strive to maximize resources, delivering optimal outcomes with strategic precision.",
    },
    {
      icon: "/images/coreValue8.svg",
      title: "Lifelong Learning",
      description:
        "We cultivate a culture of continuous improvement, encouraging personal and professional development.",
    },
    {
      icon: "/images/coreValue9.svg",
      title: "Solution-Oriented Mindset",
      description:
        "We tackle challenges head-on, learning and adapting to emerge stronger and more determined.",
    },
    {
      icon: "/images/coreValue10.svg",
      title: "Doing The Right Thing ",
      description:
        "We are committed to doing the right thing, ensuring our actions positively impact our clients and community.",
    },
  ];
  return (
    <div className="flex flex-col md:py-20 py-12 gap-12 max-w-[115rem] m-auto px-12">
      <div className="flex md:flex-row flex-col w-full">
        <div className="md:w-1/4 p-2">
          <ScrollReveal delay={0.2}>
            <h2 className="txtBlue font-medium mb-5">
              Core
              <span className="txtYellow"> Values </span>
              <br />
              That Define Us
            </h2>
            <p>
              Our core values form the backbone of our culture. We believe in
              integrity, innovation, and excellence. These principles guide
              every decision we make, ensuring that we consistently deliver
              quality and build trust with our clients and partners.
            </p>
          </ScrollReveal>
        </div>
        <div className="md:w-3/4 md:self-end flex flex-col md:gap-8 md:pl-4">
          <Marquee speed={150} direction="left" className="">
            <div className="flex">
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Client-Centric Excellence
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Innovation at Our Core
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Integrity & Transparency
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Resilience in Action
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Ownership and Accountability
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Whole &gt; Self
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Efficiency with Purpose
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Lifelong Learning
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Solution-Oriented Mindset
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Doing The Right Thing{" "}
              </li>
            </div>
          </Marquee>
          <Marquee speed={150} direction="right" className="">
            <div className="flex">
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Client-Centric Excellence
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Innovation at Our Core
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Integrity & Transparency
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Resilience in Action
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Ownership and Accountability
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Whole &gt; Self
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Efficiency with Purpose
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Lifelong Learning
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Solution-Oriented Mindset
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Doing The Right Thing{" "}
              </li>
            </div>
          </Marquee>
          <Marquee speed={150} direction="left" className="">
            <div className="flex">
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Client-Centric Excellence
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Innovation at Our Core
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Integrity & Transparency
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Resilience in Action
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Ownership and Accountability
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Whole &gt; Self
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Efficiency with Purpose
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Lifelong Learning
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Solution-Oriented Mindset
              </li>
              <li className="md:text-4xl text-3xl text-[#404040ae] mr-10 leading-[50px]">
                Doing The Right Thing{" "}
              </li>
            </div>
          </Marquee>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {coreValues.map((value, index) => (
          <ScrollReveal delay={0.2} key={index}>
            <div className="bg-[#F2F7FF] rounded-[30px] flex flex-col gap-3 p-8 pb-20 h-full">
              <Image
                src={value.icon}
                alt={value.title}
                width={100}
                height={100}
              />
              <h4 className="text-[#525D7D] text-2xl font-medium mt-2">
                {value.title}
              </h4>
              <p>{value.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
