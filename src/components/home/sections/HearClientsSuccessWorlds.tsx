"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ScrollReveal from "@/components/home/ScrollReveal";
import { HearClientsSuccessWorldsProps } from "lib/types/contentful";

export default function HearClientsSuccessWorlds({
  posts,
}: HearClientsSuccessWorldsProps) {
  // const testimonials = [
  //   {
  //     text: `DigiReps has been handling my lead gen for about a year now, delivering solid, high-quality leads. They check in regularly via Slack, join team meetings, and provide end-of-week reports. If you need a team that can generate leads and stay on top of communication, these guys do it all.`,
  //     name: "George Schwartz",
  //     title: "Founder & CEO - Extension eComm",
  //     avatar: "/images/george.png",
  //     video: "/images/business-women.webp",
  //   },
  //   {
  //     text: `Hiring is a difficult task at any company. Filtering applicants, spending weeks interviewing, etc. DigiReps helps skip all that by doing the heavy lifting for you. I am immensely impressed by the quality of candidates they bring to the table. Some of the best I've seen. For an affordable fee, they save me weeks of work and headaches. I am grateful for their services.`,
  //     name: "Alexander Toth",
  //     title: "Chief Executive Officer - Clear Brands",
  //     avatar: "/images/image-1.png",
  //     image: "/images/trustpilot.png",
  //   },
  //   {
  //     text: `Working with DigiReps was an easy and successful process. Rehan and the entire team were wonderful to work with.`,
  //     name: "Julie Sponagel",
  //     title: "Vice President - Artisun Solar",
  //     avatar: "/images/image-4.png",
  //     image: "/images/google.png",
  //   },
  //   {
  //     text: `Partnering with DigiReps was a great experience. I hired 2 developers and a UX/UI designer through them, and the talent they provided was excellent. The team delivered high-quality work on time and fit in really well. The whole process was smooth, thanks to their supportive management. If you need skilled remote talent, I definitely recommend DigiReps.`,
  //     name: "Gary H",
  //     title: "Tech Director - NovaLabs",
  //     avatar: "/images/gary.png",
  //     video: "/images/business-women.webp",
  //   },
  //   {
  //     text: `DigiReps have been easy to work with and presented qualified candidates. We are happy to recommend them`,
  //     name: "Carl Hewitt",
  //     title: "Checkers Cleaning Supply",
  //     avatar: "/images/image-2.png",
  //     image: "/images/trustpilot.png",
  //   },
  //   {
  //     text: `Words cannot adequately express the immense positive impact Muhammad and DigiReps has had on my businesses. Their unparalleled expertise, strategic insights, and unwavering commitment to the clients' success set them apart.. Their personalized approach, attention to detail, and genuine passion for what they do are evident in every interaction. I wholeheartedly recommend Muhammad and DigiReps.`,
  //     name: "Dr. Jonathan Hyslop",
  //     title: "The Art of Online Prosperity",
  //     avatar: "/images/image-3.png",
  //     image: "/images/google.png",
  //   },
  //   {
  //     text: `I was initially skeptical but working with DigiReps has been a game-changer. The setup was fast and effortless, and our rep was making calls within days. He consistently hits 100–150 calls a day and now handles everything from outreach to invoicing and payments. DigiReps has delivered exactly what they promised—reliable support, great communication, and zero drama. It’s been a smooth, productive experience from day one. We’re already planning to bring on another rep. This system truly works.`,
  //     name: "David Eames",
  //     title: "Founder & CEO - BDRadio",
  //     avatar: "/images/david2.png",
  //     video: "/images/business-women.webp",
  //   },
  //   {
  //     text: `I’ve had the pleasure of working with DigiReps, and I couldn’t be more impressed with their service. From start to finish, their team was thorough, prompt, and truly understood my needs. They took the time to onboard and train my virtual executive assistant, ensuring a seamless transition into my business. What really sets DigiReps apart is their commitment to customer satisfaction – they provide regular check-ins to ensure everything is running smoothly and that I’m happy with the support I’m receiving. If you’re looking to hire remote workers, DigiReps is the real deal.`,
  //     name: "Sharon D. Jones",
  //     title: "Founder & CEO - Nonprofit Solutions Matter, Inc.",
  //     avatar: "/images/image-5.png",
  //     image: "/images/google.png",
  //   },
  // ];

  return (
    <div className="hearClientsParent" id="testimonials">
      <section className="hearClients">
        <div className="md:pt-76 pt-44 pb-12 md:pl-43 pl-12 md:pr-43 pr-12">
          <ScrollReveal delay={0.2}>
            <h2 className="text-white font-medium heading-bottom-line-white">
              Hear It from Our <span className="txtYellow">Clients</span>:{" "}
              <br /> Success in Their Own <br className="md:block hidden" />{" "}
              <span className="txtYellow">Words</span>
            </h2>
          </ScrollReveal>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={30}
            // autoplay={true}
            speed={3000}
            freeMode={true}
            className="w-full"
          >
            {posts.map(({ sys, fields }) => (
              <SwiperSlide key={sys.id}>
                <div className="flex md:flex-row flex-col md:gap-0 gap-10 justify-between">
                  <div className="leftCol md:w-1/2 w-full">
                    <p className="text-white mb-6 pt-10 pl-5 md:!text-[1.25rem]">
                      {fields.clientReview}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={`https:${fields.clientImage.fields.file.url}`}
                        alt={fields.clientImage.fields.title}
                        className="mr-6 bg-gray-500 rounded-full size-[70px] object-cover"
                        width={70}
                        height={70}
                      />
                      <p className="text-white">
                        {fields.clientName}
                        <br /> {fields.clientRoleCompanyName}
                      </p>
                    </div>
                  </div>
                  <div className="rightCol md:w-1/2 w-full">
                    {fields.reviewImageOrVideo.fields.file.contentType ==
                    "video/mp4" ? (
                      <video
                        src={`https:${fields.reviewImageOrVideo.fields.file.url}`}
                        controls
                        autoPlay
                        muted
                        playsInline 
                        className="md:w-[400px] md:h-[400px] w-[400px] h-[300px] m-auto rounded-2xl border-[#e0dfe6] border-6"
                      ></video>
                    ) : (
                      <img
                        src={`https:${fields.reviewImageOrVideo.fields.file.url}`}
                        alt={fields.reviewImageOrVideo.fields.title}
                        width={500}
                        height={500}
                        className="m-auto"
                      />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
