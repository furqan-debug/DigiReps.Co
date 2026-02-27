import Brands from "@/components/solutions/Brands";
import SolutionHero from "@/components/solutions/SolutionHero";
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
    name: "Maria G. ",
    role: "Customer Support Rep",
    image: "/images/maria.png",
    location: "Dominican Republic",
    experience: "6 years of experience",
    description:
      "Maria thrives in high-pressure environments and enjoys providing exceptional customer experiences. Her problem-solving skills make her a trusted support representative.",
    skills: [
      "Product Knowledge",
      "Problem Solving",
      "Communication",
      "Conflict Resolution",
      "Customer Service",
    ],
  },
  {
    name: "Ali R",
    role: "Customer Support Rep",
    image: "/images/ali.png",
    location: "Pakistan",
    experience: "7 years of experience",
    description:
      "Ali has a proven track record of resolving customer issues swiftly while providing thorough support. His attention to detail makes him a valuable asset to any customer service team.",
    skills: [
      "Product Knowledge",
      "Multi-Tasking",
      "Communication",
      "Conflict Resolution",
      "Customer Service",
    ],
  },
  {
    name: "Janet W. ",
    role: "Customer Support Rep",
    image: "/images/janet.png",
    location: "Nigeria",
    experience: "5 years of experience",
    description:
      "Janet’s ability to manage customer expectations and find creative solutions ensures that every customer interaction is positive and impactful.",
    skills: [
      "Product Knowledge",
      "Product Knowledge",
      "Communication",
      "Conflict Resolution",
      "Customer Service",
    ],
  },
  {
    name: "Janet W. ",
    role: "Customer Support Rep",
    image: "/images/janet.png",
    location: "Nigeria",
    experience: "5 years of experience",
    description:
      "Janet’s ability to manage customer expectations and find creative solutions ensures that every customer interaction is positive and impactful.",
    skills: [
      "Product Knowledge",
      "Product Knowledge",
      "Communication",
      "Conflict Resolution",
      "Customer Service",
    ],
  },
];

// const studiesData = [
//   {
//     logo: "/images/lajaunies.png",
//     logoWidth: 150,
//     logoHeight: 37,
//     title: "Lajaunies Pest Control",
//     description:
//       "By partnering with DigiReps, LaJaunie’s Pest Control significantly enhanced their customer support, ensuring no inquiry went unanswered. This strategic approach not only improved client satisfaction but also freed up the team to drive focus business expansion while reducing operational costs.",
//     fileName: "/CaseStudies/lajaunies.pdf",
//   },
// ];

const logos = [
  { src: "/images/zendesk.png" },
  { src: "/images/hub.png" },
  { src: "/images/zoho.png" },
  { src: "/images/ring.png" },
  { src: "/images/five.png" },
  { src: "/images/copilot.png" },
  { src: "/images/slack.png" },
  { src: "/images/googlework.png" },
  { src: "/images/micro.png" },
  { src: "/images/zoom.png" },
  { src: "/images/skype.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["customerSupportReps"],
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
        imageSrc="/images/customersup.svg"
        heading={
          <>
            Reliable <span className="txtYellow">Customer Support </span>
            <br />
            <span className="txtBlue">Reps</span>
          </>
        }
        description="Leverage our Customer Support Reps to deliver exceptional service experiences that build trust and retain customers. Our responsive CSRs, combined with streamlined support processes, ensure faster resolution times, higher customer satisfaction, and long-term brand loyalty—all while keeping operational costs low."
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
            CSR
          </span>,
        ]}
        description="DigiReps CSRs provide a reliable, cost-effective solution to elevate your customer experience. With skilled global talent and a focus on responsiveness, our support teams scale effortlessly to meet demand—ensuring satisfied customers, stronger retention, and round-the-clock service."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Dealing customer with a smile",
          "Handling high volume calls & chats",
          "Resolving customer issues",
          "Answering inquiries",
          "Creating & Managing Support Tickets",
          "Tier-1 & 2 Level Customer Support",
        ]}
        rightSkills={[
          "Tier-1 Level Technical Support",
          "90% CSAT ratio",
          "Maintaining your NPS",
          "Maintaining AHT at minimum",
          "Great communication",
        ]}
        imageSrc="/images/csr.png"
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
        subheading="At DigiReps, our skilled CSRs are well-versed in all major helpdesk, ticketing, and customer communication platforms. Whatever your support needs may be, we’ll tailor the ideal solution to enhance customer satisfaction and loyalty."
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
            How to Hire Customer <span className="txtYellow">Support </span>
            Reps
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Customer Support</span> Reps
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
