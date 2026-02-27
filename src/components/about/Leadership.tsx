import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { LeadershipProps } from "lib/types/contentful";

export default function Leadership({ data3 }: LeadershipProps) {

  // const teamMembers = [
  //   {
  //     name: "Noah Siddic",
  //     role: "GM & Controller",
  //     image: "/images/noah.png",
  //     linkedin: "/images/linkedin.svg",
  //     LinkedinUrl: "https://www.linkedin.com/in/noah-sidd/",
  //   },
  //   {
  //     name: "Rehan Nasir",
  //     role: "Head of Recruitment",
  //     image: "/images/rehan.png",
  //     linkedin: "/images/linkedin.svg",
  //     LinkedinUrl: "https://www.linkedin.com/in/rehannasir887",
  //   },
  //   {
  //     name: "Moses Kije",
  //     role: "Head of Operations",
  //     image: "/images/moses.png",
  //     linkedin: "/images/linkedin.svg",
  //     LinkedinUrl: "https://www.linkedin.com/in/moses-kije-8471a3185/",
  //   },
  // ];
  return (
    <div className="bg-[#10316B] px-12 py-16">
      <div className="flex flex-col items-center gap-4 max-w-[90rem] m-auto">
        <ScrollReveal delay={0.2}>
          <h3 className="text-center rounded-full dot-heading2 font-medium px-10 py-4 text-white border-white">
            <span className="pl-2">Our Team</span>
          </h3>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="font-medium mb-5 text-white">
            DigiReps
            <span className="txtYellow"> Leadership </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="bg-[#0E2856] flex md:flex-row flex-col gap-4 w-full rounded-[20px] sm:p-12 p-8 mt-4">
            <div className="md:w-3/5 w-full text-white flex flex-col justify-center gap-4">
              <p className="text-[#FEB402] text-xl font-medium -mb-2">
                Founder & CEO
              </p>
              <h4 className="text-4xl font-bold">Muhammad N. Shamim</h4>
              <p className="md:pr-16 md:!text-[20px] md:leading-[30px] text-[#E0DFE6]">
                Muhammad Nabeel Shamim is a <b>Forbes-recognized</b> successful entrepreneur
                and business leader who has spent over 12 years solving critical business
                challenges for U.S. companies. As the Founder and CEO of DigiReps, he is
                on a mission to help businesses scale faster by connecting them with
                highly skilled, pre-vetted, qualified, and experienced remote
                professionals. Having worked closely with hundreds of companies,
                Muhammad saw firsthand how businesses struggled with hiring,
                training, and retaining top talent— often at high costs. This
                problem led him to create DigiReps, a solution and ecosystem
                that delivers elite-level professionals in sales, support, and
                tech niches while reducing operational costs and overheads.
                Before launching DigiReps, Muhammad built Prodigy Solutions into
                a top-tier biz-dev agency, maintaining a 94% success rate
                helping numerous U.S. businesses achieve the Inc. 5000 status
                by driving sustainable revenue growth. His ability to identify
                inefficiencies, implement high-impact strategies, and build
                performance-driven teams has positioned DigiReps as a trusted
                partner for ambitious companies looking to scale without
                limitations. With a relentless focus on innovation and
                execution, Muhammad continues to lead the way in transforming
                how businesses leverage remote talent to achieve exponential
                growth.
              </p>
            </div>
            <div className="md:w-2/5 w-full">
              <Image
                src="/images/nabeel.jpg"
                alt=""
                width={550}
                height={650}
                className="rounded-[20px] object-cover h-full w-full"
              />
              <Link
                href={"https://www.linkedin.com/in/mnabeelshamim "}
                className="absolute bottom-16 right-16"
              >
                <Image
                  src={"/images/linkedin.svg"}
                  alt="LinkedIn"
                  width={55}
                  height={55}
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <ScrollReveal delay={0.2}>
        <div className="flex md:flex-row flex-col items-center justify-between w-full gap-4 max-w-[90rem] m-auto mt-20">
        {/* <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-between w-full gap-4 max-w-[90rem] m-auto mt-20"> */}
          {data3.map(({ sys, fields }) => (
            <div key={sys.id} className="bg-[#0E2856] rounded-2xl p-6 w-fit">
              <Image
                src={`https:${fields.image.fields.file.url}`}
                alt={fields.image.fields.title}
                width={350}
                height={420}
                className="rounded-2xl"
              />
              <div className="bg-[#10316B] mt-4 rounded-2xl text-2xl flex justify-between w-full items-center p-4">
                <div className="flex flex-col gap-1 text-white">
                  <h4>{fields.name}</h4>
                  <p className="text-[#ffffff50]">{fields.role}</p>
                </div>
                <Link href={fields.linkedinUrl} target="_blank">
                  <Image
                    src={"/images/linkedin.svg"}
                    alt="LinkedIn"
                    width={55}
                    height={55}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
