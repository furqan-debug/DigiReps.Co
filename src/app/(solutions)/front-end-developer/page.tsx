import SolutionHero from "@/components/solutions/SolutionHero";
import Brands from "@/components/solutions/Brands";
import DiverseExpertise from "@/components/solutions/DiverseExpertise";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import Stats from "@/components/about/Stats";
import WhyChoose from "@/components/solutions/WhyChoose";
import CaseStudies from "@/components/solutions/CaseStudies";
import HowToHire from "@/components/solutions/HowToHire";
import HiringChoices from "@/components/solutions/HiringChoices";
import MeetTeam from "@/components/solutions/MeetTeam";
import React from "react";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";

const myCustomTeamList = [
  {
    name: "Marta G. ",
    role: "Frontend Developer",
    image: "/images/marta.png",
    location: "Colombia",
    experience: "3 years of experience",
    description:
      "Marta is skilled in creating responsive websites that are both fast and user-friendly. She uses the latest technologies to bring designs to life with precision and creativity.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
  {
    name: "John W. ",
    role: "Frontend Developer",
    image: "/images/john.png",
    location: "Jamaica",
    experience: "5 years of experience",
    description:
      "John has worked on numerous web projects, delivering high-quality, efficient, and scalable frontend solutions that keep user experience at the forefront of his designs.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
  {
    name: "Bella M. ",
    role: "Frontend Developer",
    image: "/images/bella.png",
    location: "Trinidad & Tobago",
    experience: "4 years of experience",
    description:
      "Bella’s frontend development expertise focuses on ensuring web applications are smooth, responsive, and interactive, resulting in excellent user experiences across devices.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
  {
    name: "Bella M. ",
    role: "Frontend Developer",
    image: "/images/bella.png",
    location: "Trinidad & Tobago",
    experience: "4 years of experience",
    description:
      "Bella’s frontend development expertise focuses on ensuring web applications are smooth, responsive, and interactive, resulting in excellent user experiences across devices.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
];

// const studiesData = [
//   {
//     logo: "/images/gonative.png",
//     logoWidth: 150,
//     logoHeight: 37,
//     title: "GoNative LLC",
//     description:
//       "DigiReps provided GoNative with a vetted team of junior and senior fullstack developers—both front and backend—sourced globally at significantly reduced costs. This allowed seamless integration into existing systems, eased the workload on internal teams, and accelerated project timelines with scalable development support.",
//     fileName: "/CaseStudies/gonative.pdf",
//   },
// ];
const logos = [
  { src: "/images/js.png" },
  { src: "/images/react.png" },
  { src: "/images/angular.png" },
  { src: "/images/vue.png" },
  { src: "/images/backbone.png" },
  { src: "/images/css.png" },
  { src: "/images/flutter.png" },
  { src: "/images/bootstrap.png" },
  { src: "/images/tailwind.png" },
  { src: "/images/vscode.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["frontendDevelopers"],
  });
  //   response3.items.forEach(item => {
  //   console.log('TAGS:', item.metadata.tags.map(t => t.sys.id));
  // });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data3 = response3.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      logo: item.fields.logo as AssetField,
      heading: item.fields.heading as string,
      description: item.fields.description as string,
      pdfFile: item.fields.pdfFile as AssetField,
    },
  }));
  return (
    <div>
      {/* <Header /> */}
      {/* <SolutionHero /> */}
      <SolutionHero
        imageSrc="/images/frontend.svg"
        heading={
          <>
            Robust <span className="txtYellow"> Frontend</span>
            <br />
            <span className="txtBlue">Developers</span>
          </>
        }
        description="Leverage our Frontend Developers to build dynamic, responsive, and user-friendly web experiences. Our robust team, combined with industry-leading tools and best practices, ensures your digital products perform seamlessly across all devices, driving user engagement and supporting your business growth."
      />
      <Brands />
      <WhyChoose
        titleLines={[
          <span className="txtBlue" key="1">
            Why choose
          </span>,
          <span className="txtYellow" key="2">
            DigiReps
          </span>,
          <span className="txtBlue" key="3">
            Frontend Developers
          </span>,
        ]}
        description="DigiReps Frontend Developers provide a cost-effective solution to create engaging, responsive, and high-performing web interfaces. Our skilled team leverages the latest technologies to deliver seamless user experiences, ensuring your digital products are visually appealing and optimized for all devices, helping your business stay ahead of the competition."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "HTML, CSS, and JavaScript ",
          "React or Angular",
          "Responsive and adaptive design ",
          "Cross-browser compatibility ",
          "Performance optimization ",
          "user-friendly web pages and apps ",
        ]}
        rightSkills={[
          "High performance and responsiveness",
          "Collaborate with Different Teams",
          "Stay updated with emerging technologies",
          "Debug and troubleshoot UI issues ",
          "Optimize code for better performance ",
          "Use best practices for maintainable code",
        ]}
        imageSrc="/images/fd.png"
      />

      <DiverseExpertise
        heading={
          <>
            <span className="txtBlue">
              a Team with Diverse
              <br />
              Expertise
            </span>
          </>
        }
        subheading="At DigiReps, our expert Frontend Developers are proficient in all major web technologies and frameworks. Whatever your development needs are, we’ll craft the perfect solution to enhance your user experience and accelerate your digital growth."
        logos={logos}
      />
      <CaseStudies
        heading={
          <>
            Case Studies: How We <br />
            Help <span className="txtYellow">Businesses Scale</span>
          </>
        }
        subheading="Discover how DigiReps has helped businesses grow by providing top-tier remote professionals. See real-world examples of our impact and how we drive success remotely."
        caseStudies={data3}
      />
      <HowToHire
        heading={
          <>
            How to Hire Frontend <span className="txtYellow">Developers </span>
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Frontend Developers</span>
          </>
        }
        teamMembers={myCustomTeamList}
        highlightLast={true}
        showRequestButton={true}
      />
      <HiringChoices />
      <TestimonialsSection />
      <div className="md:pt-24 md:pb-12">
        <Stats />
      </div>
      <GrowCostEffectively />
    </div>
  );
}
