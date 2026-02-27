"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ScrollReveal from "../home/ScrollReveal";
import HireModal from "../Modals/HireModal";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  location: string;
  experience: string;
  description: string;
  skills: string[];
};

type MeetTeamProps = {
  title: React.ReactNode;
  teamMembers: TeamMember[];
  highlightLast?: boolean;
  showRequestButton?: boolean;
};

export default function MeetTeam({
  title,
  teamMembers,
  highlightLast = true,
  showRequestButton = true,
}: MeetTeamProps) {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  const openModal = () => setHireModalOpen(true);
  const closeModal = () => setHireModalOpen(false);

  return (
    <div className="flex flex-col py-12 md:px-0 px-6 meetTeam">
      <HireModal openState={hireModalOpen} closeModal={closeModal} />
      <ScrollReveal delay={0.2}>
        <h1 className="font-medium txtBlue text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0">
          {title}
        </h1>
      </ScrollReveal>

      <div className="mt-8 relative">
        {swiperReady && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === "object"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            spaceBetween={30}
            slidesPerView={3.3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 2.2 },
              1280: { slidesPerView: 3.2 },
            }}
          >
            {teamMembers.map((member, index) => {
              const isLast = index === teamMembers.length - 1;
              return (
                <SwiperSlide
                  key={index}
                  className={`${index == 0 && "md:ml-12"}`}
                >
                  <div className="rounded-2xl border border-[#0B409C4D] md:py-8 py-6 md:px-10 px-6 md:h-[400px]">
                    <div
                      className={`${
                        highlightLast && isLast ? "blur-lg" : ""
                      } flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={90}
                              height={90}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-[20px]">{member.name}</h3>
                            <p className="!text-sm !text-[#10316B] !font-semibold">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={openModal}
                          className="text-white rounded-full p-4 flex items-center btnAnimate2 cursor-pointer bgColorYellow"
                        >
                          <span>
                            Hire {member.name.split(" ")[0]}
                            <Image
                              src="/images/right-arrow.svg"
                              alt="arrow"
                              width={18}
                              height={18}
                              className="ml-2"
                            />
                          </span>
                        </button>
                      </div>

                      <div className="flex space-x-6 mb-4 justify-between">
                        <div className="flex items-center text-[#021442]">
                          {/* Location Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {member.location}
                        </div>
                        <div className="flex items-center text-[#021442]">
                          {/* Calendar Icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {member.experience}
                        </div>
                      </div>

                      <p className="text-[#545C7B]">{member.description}</p>
                      <div className="flex flex-wrap gap-4 mt-8">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-[#0B409C] text-white text-sm px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {highlightLast && isLast && showRequestButton && (
                    <div className="absolute inset-0">
                      <button
                        onClick={openModal}
                        className="bgColorBlue !absolute -translate-1/2 left-1/2 top-1/2 text-white rounded-full py-4 animated-button overflow-x-hidden cursor-pointer w-[70%] m-auto px-16"
                      >
                        <span>Request Candidates</span>
                      </button>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <div className="button-handle">
          <button ref={prevRef} className="swiper-button-prev !text-black md:!left-0 !-left-6">
            <IoChevronBackOutline />
          </button>
          <button ref={nextRef} className="swiper-button-next !text-black md:!right-0 !-right-6">
            <IoChevronForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
