"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import ScrollReveal from "@/components/home/ScrollReveal";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/ModalContext";

const services = [
  {
    title: "Sales Development Rep",
    skills: [
      "Cold calling",
      "Appointment setting",
      "Follow up & follow through",
      "Getting around gate-keepers",
    ],
    link: "Sales Development Rep",
  },
  {
    title: "Customer Support Rep",
    skills: [
      "Dealing customer with a smile",
      "Handling high volume calls & chats",
      "Resolving customer issues",
      "Answering inquiries",
    ],
    link: "Customer Support Rep",
  },
  {
    title: "Leads Researcher",
    skills: [
      "Data Scraping",
      "List & Database Building",
      "Data Cleaning & Updation",
      "Data Compilation",
    ],
    link: "Leads Researcher",
  },
  {
    title: "Digital Marketing Rep",
    skills: [
      "Paid Ads",
      "Cold Email Outreach",
      "Lead Generation",
      "Content Creation",
    ],
    link: "Digital Marketing Rep",
  },
  {
    title: "UI/UX Designer",
    skills: [
      "Wireframing",
      "Visual design",
      "Interaction Design",
      "Usability Testing",
    ],
    link: "UI-UX Designer",
  },
  {
    title: "Frontend Developer",
    skills: [
      "HTML, CSS, and JavaScript proficiency ",
      "Skilled in frameworks like React or Angular",
      "Responsive and adaptive design",
      "Cross-browser compatibility ",
    ],
    link: "Front-end Developer",
  },
  {
    title: "Backend Developer",
    skills: [
      "languages like Node.js, Python, or Ruby",
      "Database management (SQL and NoSQL)",
      "API design and development",
      "Authentication and authorization",
    ],
    link: "Back-end Developer",
  },
  {
    title: "Executive Assistant",
    skills: [
      "Execute agency initiatives",
      "Calendar management",
      "Clerical support",
      "Email Management",
    ],
    link: "Executive Assistant",
  },
  {
    title: "Certified CISA Auditors",
    skills: [
      "ITGC Reviews",
      "Regulatory Compliance",
      "GRC Frameworks",
      "Cybersecurity & Data Audits",
    ],
    link: "CISA Advisory",
  },
];

const ScopeServices = () => {
  const { openModal } = useModal();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true); // Wait for refs to be set
  }, []);
  return (
    <section className="scopeServices md:py-25 py-12 md:pl-6">
      <div className="md:px-25 px-12">
        <ScrollReveal delay={0.2}>
          <h2 className="txtdarkGray font-medium mb-2">
            Scope Of <span className="txtYellow">Talent</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-8">
            Explore the specialized roles and responsibilities we cover to power
            your growth
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="mb-17">
            <button
              onClick={() => openModal()}
              className="bgColorBlue text-white rounded-full px-20 py-4 animated-button overflow-x-hidden cursor-pointer"
            >
              <span>Book Consultation</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
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
          // slidesPerView={3.5}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            550: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.7 },
            1280: { slidesPerView: 3.5 },
            1500: { slidesPerView: 4.5 },
            2200: { slidesPerView: 5.5 },
          }}
        >
          {services.map((service, index) => {
            const slug = "/" + service.link.toLowerCase().replace(/\s+/g, "-");

            return (
              <SwiperSlide
                key={index}
                className="paperBg2 !py-[2rem] min-[550px]:!px-[2rem] !px-[20%]"
              >
                <div className="h-full flex flex-col justify-between">
                  <h3 className="txtBlue mb-5">{service.title}</h3>
                  <h4 className="txtYellow mb-5">Top Skills & Expectations</h4>
                  <ul className="check-sign">
                    {service.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    {/* <button className='bgColorYellow text-white rounded-full p-5 flex items-center px-10 ml-auto'>
                                See More <Image src="/images/right-arrow.svg" alt=" " width={16} height={16} className='ml-2' />
                            </button> */}
                    <a
                      href={slug}
                      className="bgColorYellow w-fit text-white rounded-full p-5 flex items-center px-10 ml-auto btnAnimate2"
                    >
                      <span>
                        See More{" "}
                        <Image
                          src="/images/right-arrow.svg"
                          alt=" "
                          width={18}
                          height={18}
                          className="ml-2"
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="button-handle">
        <button ref={prevRef} className="swiper-button-prev">
          <FaChevronLeft />
        </button>
        <button ref={nextRef} className="swiper-button-next">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ScopeServices;
