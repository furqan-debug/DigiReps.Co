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
    name: "Maria C. ",
    role: "Executive Assistant",
    image: "/images/maria2.png",
    location: "Costa Rica",
    experience: "7 years of experience",
    description:
      "Maria excels in organizing events and managing complex schedules for executives. Her impeccable communication skills ensure smooth day-to-day operations.",
    skills: [
      "Scheduling",
      "Event Planning",
      "Project Management",
      "Organization",
      "Communication",
    ],
  },
  {
    name: "Ahmed D. ",
    role: "Executive Assistant",
    image: "/images/ahmed.png",
    location: "United Kingdom",
    experience: "9 years of experience",
    description:
      "With a strong background in managing projects and coordinating high-level administrative tasks, Ahmed helps executives streamline their workflow to enhance productivity.",
    skills: [
      "Scheduling",
      "Event Planning",
      "Project Management",
      "Organization",
      "Communication",
    ],
  },
  {
    name: "Eva J. ",
    role: "Executive Assistant",
    image: "/images/eva.png",
    location: "Cyprus",
    experience: "4 years of experience",
    description:
      "Eva is known for her organizational skills and ability to handle high-pressure situations. She provides invaluable support to executives, ensuring everything runs smoothly behind the scenes.",
    skills: [
      "Scheduling",
      "Event Planning",
      "Project Management",
      "Organization",
      "Communication",
    ],
  },
  {
    name: "Eva J. ",
    role: "Executive Assistant",
    image: "/images/eva.png",
    location: "Cyprus",
    experience: "4 years of experience",
    description:
      "Eva is known for her organizational skills and ability to handle high-pressure situations. She provides invaluable support to executives, ensuring everything runs smoothly behind the scenes.",
    skills: [
      "Scheduling",
      "Event Planning",
      "Project Management",
      "Organization",
      "Communication",
    ],
  },
];

// const studiesData = [
//   {
//     logo: "/images/solutionmatter.png",
//     logoWidth: 100,
//     logoHeight: 37,
//     title: "Solutions Matter",
//     description:
//       "DigiReps empowered Solutions Matter with high-impact executive support, transforming their chaotic workflow into a streamlined and productive system. By taking over administrative burdens, the Executive Assistant enabled the Leadership to perform at their best and focus on priorities.",
//     fileName: "/CaseStudies/matter.pdf",
//   },
// ];
const logos = [
  { src: "/images/five.png" },
  { src: "/images/office.png" },
  { src: "/images/asana.png" },
  { src: "/images/monday.png" },
  { src: "/images/evernote.png" },
  { src: "/images/trello.png" },
  { src: "/images/calendar.png" },
  { src: "/images/zoom.png" },
  { src: "/images/calendly.png" },
  { src: "/images/slack.png" },
  { src: "/images/micro.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["executiveAssistants"],
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
        imageSrc="/images/executiveass.svg"
        heading={
          <>
            Organized <span className="txtYellow"> Executive</span>
            <br />
            <span className="txtBlue">Assistants</span>
          </>
        }
        description="Leverage our Executive Assistants to streamline your operations and enhance productivity. Our organized and resourceful assistants handle administrative tasks efficiently, allowing you to focus on strategic growth. With their attention to detail and proactive approach, they help optimize workflows and ensure your business runs smoothly."
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
            Executive Assistants
          </span>,
        ]}
        description="DigiReps Executive Assistants provide a cost-effective solution to streamline your daily operations and enhance productivity. Our skilled team efficiently handles administrative tasks, allowing you to focus on high-priority projects. With their proactive approach and attention to detail, they help optimize your workflow, ensuring your business runs smoothly and efficiently."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Execute agency initiatives",
          "Calendar management",
          "Clerical support",
          "Email Management",
          "Handle your Personal Social Media",
          "Setting up and Scheduling Meetings",
        ]}
        rightSkills={[
          "Executive presence",
          "Proactive Decision maker",
          "Stay updated with emerging technologies",
          "Adaptability",
          "Team Player",
        ]}
        imageSrc="/images/ea.png"
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
        subheading="At DigiReps, our expert Executive Assistants are equipped with a wide range of administrative and organizational skills. Whatever your needs are, we’ll provide the ideal support to help optimize your workflow and ensure smooth operations across your business."
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
            How to Hire Executive <span className="txtYellow">Assistants </span>
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Executive Assistants</span>
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
