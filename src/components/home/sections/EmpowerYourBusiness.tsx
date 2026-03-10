"use client"; // very important in app/ directory
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ScrollReveal from "@/components/home/ScrollReveal";
import { EmpowerYourBusinessProps } from "lib/types/contentful";

const EmpowerYourBusiness: React.FC<EmpowerYourBusinessProps> = ({ data }) => {
  // console.log(data);
  // const cards = [
  //   {
  //     title: "Sales Development Rep​",
  //     description:
  //       "More qualified leads. More meaningful conversations. More closed deals. With top global SDRs at DigiReps, it’s not just about filling a    pipeline—it’s about opening doors that others can’t.",
  //     image: "/images/sales-development-rep.svg",
  //   },
  //   {
  //     title: "Customer Support Rep",
  //     description:
  //       "A great product gets you noticed. Exceptional support keeps you remembered. Our top global CSRs handle every conversation with care—because every interaction shapes your brand’s reputation.",
  //     image: "/images/customer-support-rep.svg",
  //   },
  //   {
  //     title: "Leads Researcher",
  //     description:
  //       "The right data changes everything. With our DigiReps LDRs, you don’t waste time chasing the wrong prospects—you get precise, actionable insights that keep your outreach a step ahead.",
  //     image: "/images/leads-researcher.svg",
  //   },
  //   {
  //     title: "Digital Marketing Representative",
  //     description:
  //       "Growth isn’t guesswork—it’s execution. With a skilled Digital Marketing Rep from DigiReps, driving your campaigns, every message is sharper, every audience is targeted, and every opportunity is maximized.",
  //     image: "/images/digital-marketing-representative.svg",
  //   },
  //   {
  //     title: "UX/UI Designer",
  //     description:
  //       "Design isn’t just about how things look—it’s how they work. Our handpicked UX/UI Designers craft experiences that don’t just catch the eye—they guide every click, tap, and scroll with purpose. When user journeys are intuitive, conversions follow.",
  //     image: "/images/ux-ui-designer.svg",
  //   },
  //   {
  //     title: "Front-end Developer",
  //     description:
  //       "First impressions happen fast. Our elite Front-end Developers ensure your digital presence is as sharp as your vision—responsive, seamless, and built to perform. Because when design meets flawless execution, users stay longer and engage deeper.",
  //     image: "/images/front-end-developer.svg",
  //   },
  //   {
  //     title: "Back-end Developer",
  //     description:
  //       "What happens behind the scenes is what keeps everything running. Our highly vetted Back-end Developers build the systems that power your business—scalable, secure, and built for growth. When your infrastructure is strong, everything else just works",
  //     image: "/images/backend-developer.svg",
  //   },
  //   {
  //     title: "Executive Assistant",
  //     description:
  //       "Time isn’t just money—it’s your most valuable asset. With an Executive Assistant managing the details, your focus stays where it belongs: on leading and growing without distraction",
  //     image: "/images/executive-assistant.svg",
  //   },
  //    
  //    { 
  //     title: "Certified CISA Auditors",
  //     description:
  //       "Compliance is about more than rules—it's about reputation. Our Certified CISA Auditors aren't just experts; they're trusted advisors. We ensure your systems are secure, compliant, and thoroughly protected.",
  //     image: "/cisa-auditor.svg",
  //    },
  // ];

  return (
    <section id="empowerSlider" className="md:py-30 py-12">
      <ScrollReveal delay={0.2}>
        <h2 className="txtBlue font-medium md:ml-43 mb-20 heading-bottom-line md:px-0 px-12">
          Empower Your <span className="txtYellow">Business</span> <br /> with
          Top Talent
        </h2>
      </ScrollReveal>
      <div className="">
        <Swiper
          className="overflow-visible"
          // mousewheel={true}
          // modules={[Autoplay, Mousewheel]}
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          // slidesPerView={3.5}
          centeredSlides={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          freeMode={true}
          breakpoints={{
            320: { slidesPerView: 1.1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3.5 },
          }}
        >
          {data.map(({ sys, fields }) => (
            <SwiperSlide
              key={sys.id}
              className="paperBg md:!h-[40rem] !h-[35rem]"
            >
              <div>
                <figure className="">
                  <img
                    src={fields.image.fields.file.url.startsWith('/') && !fields.image.fields.file.url.startsWith('//') ? fields.image.fields.file.url : `https:${fields.image.fields.file.url}`}
                    alt={fields.image.fields.title}
                    className="mb-5 2xl:h-52 md:h-32 h-24"
                  />
                </figure>
                <h3 className="txtBlue font-normal mb-3 sm:!text-[1.75rem] !text-[1.25rem]">
                  {fields.heading}
                </h3>
                <p className="sm:!text-[1.063rem] !text-base">
                  {fields.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default EmpowerYourBusiness;
