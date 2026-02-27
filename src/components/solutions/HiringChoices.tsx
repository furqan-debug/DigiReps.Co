"use client";
import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
// import {  SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
// import { Mousewheel } from "swiper/modules";

const remoteBenefits = [
  {
    title: "Wider talent pool",
    desc: "By enabling remote work, you can hire top talent regardless of location. This is a major advantage for companies in areas with a small or highly competitive talent market.",
  },
  {
    title: "Increased productivity",
    desc: "Remote employees often report higher productivity thanks to fewer distractions, no commute, and greater control over their work environment and schedule.",
  },
  {
    title: "Lower costs",
    desc: "Companies save big on office rent, utilities, in-office perks, and can optimize payroll and tax strategies by adopting a remote-first model.",
  },
  {
    title: "Improved work-life balance",
    desc: "Remote work supports a healthier balance between personal and professional life, which boosts morale and loyalty, especially for parents and caregivers.",
  },
  {
    title: "Crisis-Proof Operations",
    desc: "Distributed teams can keep working during crises like natural disasters or pandemics. Remote work ensures continuity when offices are inaccessible.",
  },
];

const onsiteDrawbacks = [
  {
    title: "Limited talent pool",
    desc: "With in-office roles, you’re confined to candidates who live nearby or are open to relocating. This can narrow your options and slow down the hiring process.",
  },
  {
    title: "Distractions & Commute",
    desc: "Commuting can be draining and time-consuming. Traditional office settings can also be distracting or demotivating, impacting employee performance and focus.",
  },
  {
    title: "Higher costs",
    desc: "Maintaining office space, covering utilities, and managing on-site perks increases expenses. These fixed costs add up, especially in high-rent locations.",
  },
  {
    title: "Poor work-life balance",
    desc: "Long commutes, rigid hours, and lack of schedule flexibility can cause burnout, making it hard for on-site employees to manage personal commitments.",
  },
  {
    title: "Vulnerability to Disruptions",
    desc: "On-site-only setups are more exposed during emergencies. Office closures due to disasters or health risks can halt operations and affect output.",
  },
];

// const renderSlides = (data: { title: string; desc: string }[]) =>
//   data.map((item, index) => (
//     <SwiperSlide
//       key={index}
//       className="!mb-8 !h-fit bg-[#F2F7FF] p-10 rounded-4xl"
//     >
//       <div className="slide">
//         <div className="flex gap-3 items-center">
//           <p className="bg-[#10316B] py-[2px] px-[10px] rounded-full text-white">
//             {index + 1}
//           </p>
//           <h4 className="font-medium !text-2xl">{item.title}</h4>
//         </div>
//         <p className="mt-3 md:pr-10 text-[#525D7D] leading-6">{item.desc}</p>
//       </div>
//     </SwiperSlide>
//   ));

export default function HiringChoices() {
  return (
    <div className="flex flex-col md:px-24 px-12 md:py-20 py-12 gap-2">
      <ScrollReveal delay={0.2}>
        <h1 className="font-medium text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0 txtBlue">
          Smart Hiring <span className="txtBlue">Choices:</span>
          <br />
          Local vs <span className="txtYellow">Remote</span>
        </h1>
      </ScrollReveal>

      <div className="flex  md:flex-row flex-col w-full md:gap-28 gap-10">
        {/* Remote Hiring Section */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="!text-3xl font-medium">
            What you get in Remote Hiring!
          </h2>
          <p className="text-[#525D7D] md:max-w-[90%]">
            Remote work unlocks access to a global talent pool, reduces overhead
            costs, and boosts employee satisfaction. With the right tools and
            structure, remote teams can be just as, if not more, productive than
            in-office teams.
          </p>
          <Image
            src="/images/remote.png"
            alt="Remote Hiring"
            width={500}
            height={500}
            className="w-full"
          />
          {/* <div className="mt-4 md:h-[730px] h-[550px] md:block hidden">
            <Swiper
              direction="vertical"
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3.2 },
              }}
              spaceBetween={0}
              mousewheel={{ releaseOnEdges: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              // loop={true}
              modules={[Mousewheel]}
              style={{ height: "100%" }}
            >
              {renderSlides(remoteBenefits)}
            </Swiper>
          </div> */}
          <div className="mt-4">
            {remoteBenefits.map((item, index) => (
              <ScrollReveal delay={0.5} key={index + 1}>
                <div
                  key={index}
                  className="md:!mb-8 !mb-4 !h-fit bg-[#F2F7FF] p-10 rounded-4xl"
                >
                  <div className="slide">
                    <div className="flex gap-3 items-center">
                      <p className="bg-[#10316B] py-[2px] px-[10px] rounded-full text-white">
                        {index + 1}
                      </p>
                      <h4 className="font-medium !text-2xl">{item.title}</h4>
                    </div>
                    <p className="mt-3 md:pr-10 text-[#525D7D] leading-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Onsite Hiring Section */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="!text-3xl font-medium">
            What you get in Onsite Hiring!
          </h2>
          <p className="text-[#525D7D] max-w-[90%]">
            On-site teams come with higher overhead costs, limited talent pools,
            and reduced flexibility. In-person environments can lead to rigid
            schedules, longer commutes, and challenges in scaling teams quickly,
            making it harder to adapt to evolving business needs.
          </p>
          <Image
            src="/images/onsite.png"
            alt="Onsite Hiring"
            width={500}
            height={500}
            className="w-full"
          />
          {/* <div className="mt-4 md:h-[730px] h-[550px] md:block hidden">
            <Swiper
              direction="vertical"
              slidesPerView={3.2}
              spaceBetween={0}
              mousewheel={{ releaseOnEdges: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              // loop={true}
              modules={[Mousewheel]}
              style={{ height: "100%" }}
            >
              {renderSlides(onsiteDrawbacks)}
            </Swiper>
          </div> */}
          <div className="mt-4">
            {onsiteDrawbacks.map((item, index) => (
              <ScrollReveal delay={0.5} key={index + 1}>
                <div
                  key={index}
                  className="md:!mb-8 !mb-4 !h-fit bg-[#F2F7FF] p-10 rounded-4xl"
                >
                  <div className="slide">
                    <div className="flex gap-3 items-center">
                      <p className="bg-[#10316B] py-[2px] px-[10px] rounded-full text-white">
                        {index + 1}
                      </p>
                      <h4 className="font-medium !text-2xl">{item.title}</h4>
                    </div>
                    <p className="mt-3 md:pr-10 text-[#525D7D] leading-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
