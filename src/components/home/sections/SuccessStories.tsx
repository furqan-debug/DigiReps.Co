"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import ScrollReveal from "@/components/home/ScrollReveal";
import { SuccessStoriesProps } from "lib/types/contentful";

// Array of success story data
// const stories = [
//   {
//     id: 1,
//     logo: {
//       src: "/images/drip-logo.webp",
//       alt: "Drip",
//       width: 105,
//       height: 37,
//     },
//     title: "Drip",
//     description:
//       "DigiReps enabled Drip's seamless global expansion by providing flexible sales reps, targeted lead research, and end-to-end SDR management.",
//     pdf: "/CaseStudies/DRIP.pdf",
//   },
//   {
//     id: 2,
//     logo: {
//       src: "/images/legere-logo.webp",
//       alt: "Legere Pharmaceuticals",
//       width: 105,
//       height: 37,
//     },
//     title: "Legere Pharmaceuticals",
//     description:
//       "DigiReps helped Legere Pharmaceuticals refine its target audience, optimize outreach, and cut costs by providing a fully managed lead generation solution.",
//     pdf: "/CaseStudies/Legere.pdf",
//   },
//   {
//     id: 3,
//     logo: {
//       src: "/images/Sprout.png",
//       alt: "Sprout App",
//       width: 105,
//       height: 37,
//     },
//     title: "Sprout App",
//     description:
//       "DigiReps' UI/UX team helped Sprout turn their concept into a clickable prototype with expert Figma design, accelerating their journey toward launch.",
//     pdf: "/CaseStudies/Sprout.pdf",
//   },
//   {
//     id: 4,
//     logo: {
//       src: "/images/Black.png",
//       alt: "Black Diamond Radio",
//       width: 80,
//       height: 37,
//     },
//     title: "Black Diamond Radio",
//     description:
//       "DigiReps delivered a full-cycle sales solution for Black Diamond Radio by deploying and training a dedicated SDR team.",
//     pdf: "/CaseStudies/Black.pdf",
//   },
//   {
//     id: 5,
//     logo: {
//       src: "/images/medianug.webp",
//       alt: "MediaNug",
//       width: 105,
//       height: 37,
//     },
//     title: "MediaNug",
//     description:
//       "DigiReps optimized MediaNug's sales process by implementing structured lead tracking, consistent outreach, and workflow improvements.",
//     pdf: "/CaseStudies/MediaNugs.pdf",
//   },
// ];

const SuccessStories: React.FC<SuccessStoriesProps> = ({ data3 }) => {
  const openPDF = (url: string) => window.open(`https:${url}`, "_blank");
  // console.log(data3);

  return (
    <section
      className="successStories pt-25 md:pl-25 pl-12 md:pr-25 pr-12 flex md:flex-row flex-col justify-between md:gap-0 gap-10"
      id="casestudies"
    >
      {/* LEFT COLUMN */}
      <div className="leftCol">
        <ScrollReveal delay={0.2}>
          <h3 className="text-center rounded-full dot-heading font-medium mb-5 px-10 py-4">
            <span className="pl-2">Case Studies</span>
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="txtBlue font-medium mb-5 heading-bottom-line">
            Success <span className="txtYellow">Stories</span>: How We Help{" "}
            <span className="txtYellow">Businesses</span> Scale
          </h2>
        </ScrollReveal>
        <div className="text-center">
          <ScrollReveal delay={0.2}>
            <Image
              src="/images/cs-graphic.webp"
              alt=""
              width={320}
              height={320}
              className="mx-auto"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* RIGHT COLUMN WITH DYNAMIC SLIDES */}
      <div className="rightCol">
        <div className="md:h-[730px] h-[500px]">
          <Swiper
            direction="vertical"
            breakpoints={{
              0: { slidesPerView: 1.6, slidesPerGroup: 1, loop: false },
              400: { slidesPerView: 1.7, slidesPerGroup: 1, loop: false },
              768: { slidesPerView: 2.7, slidesPerGroup: 1, loop: true },
              1024: { slidesPerView: 2.5, slidesPerGroup: 1, loop: true },
              1280: { slidesPerView: 2.5, slidesPerGroup: 1, loop: true },
              1440: { slidesPerView: 3, slidesPerGroup: 1, loop: true },
              1500: { slidesPerView: 2.5, slidesPerGroup: 1, loop: true },
            }}
            spaceBetween={30}
            mousewheel
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            style={{ height: "100%" }}
          >
            {data3.map(({ sys, fields }) => (
              <SwiperSlide key={sys.id} className="md:!h-fit !h-[300px]">
                <div className="slide lightGray p-10 md:!h-fit !h-[300px]">
                  <Image
                    src={`https:${fields.logo.fields.file.url}`}
                    alt={fields.logo.fields.title}
                    width={80}
                    height={40}
                  />
                  <h4 className="txtBlue mb-3 font-black uppercase !leading-[24px]">
                    {fields.heading}
                  </h4>
                  <p className="mb-3">{fields.description}</p>
                  <button
                    className="bgColorYellow text-white rounded-full p-5 flex items-center px-10 btnAnimate2 cursor-pointer"
                    onClick={() => openPDF(fields.pdfFile.fields.file.url)}
                  >
                    <span>
                      View Now{" "}
                      <Image
                        src="/images/right-arrow.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="ml-2"
                      />
                    </span>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
