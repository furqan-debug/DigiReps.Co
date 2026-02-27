import SolutionHero from "@/components/solutions/SolutionHero";
import Brands from "@/components/solutions/Brands";
import DiverseExpertise from "@/components/solutions/DiverseExpertise";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import WhyChoose from "@/components/solutions/WhyChoose";
import Stats from "@/components/about/Stats";
import CaseStudies from "@/components/solutions/CaseStudies";
import HowToHire from "@/components/solutions/HowToHire";
import HiringChoices from "@/components/solutions/HiringChoices";
import MeetTeam from "@/components/solutions/MeetTeam";
import React from "react";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";

const myCustomTeamList = [
  {
    name: "Hamza C.",
    role: "Lead Researcher",
    image: "/images/hamza.png",
    location: "Pakistan",
    experience: "4 years of experience",
    description:
      "Hamza specializes in gathering and analyzing data to identify key business opportunities. He is skilled at creating research strategies that fuel sales and marketing efforts.",
    skills: [
      "Market Research",
      "Lead Generation",
      "Data Analysis",
      "CRM",
      "Survey Design",
    ],
  },
  {
    name: "Anas T. ",
    role: "Lead Researcher",
    image: "/images/anas.png",
    location: "Dubai, UAE",
    experience: "3 years of experience",
    description:
      "Anas excels at using qualitative and quantitative research to identify potential leads and market trends. Her attention to detail ensures that no opportunity is overlooked.",
    skills: [
      "Lead Generation",
      "Data Collection",
      "Research Analysis",
      "CRM",
      "Market Insights",
    ],
  },
  {
    name: "Mohit D. ",
    role: "Lead Researcher",
    image: "/images/mohit.png",
    location: "Dubai, UAE",
    experience: "5 years of experience",
    description:
      "Mohit has an excellent ability to track key trends and convert insights into actionable leads. His research is integral in shaping targeted sales strategies.",
    skills: [
      "Market Research",
      "Data Analysis",
      "Lead Generation",
      "Survey Design",
    ],
  },
  {
    name: "Mohit D. ",
    role: "Lead Researcher",
    image: "/images/mohit.png",
    location: "Dubai, UAE",
    experience: "5 years of experience",
    description:
      "Mohit has an excellent ability to track key trends and convert insights into actionable leads. His research is integral in shaping targeted sales strategies.",
    skills: [
      "Market Research",
      "Data Analysis",
      "Lead Generation",
      "Survey Design",
    ],
  },
];

// const studiesData = [
//   {
//     logo: "/images/legere-logo.webp",
//     logoWidth: 220,
//     logoHeight: 37,
//     title: "Legere Pharmaceuticals",
//     description:
//       "DigiReps helped Legere Pharmaceuticals refine its target audience, optimize outreach, and cut costs by providing a fully managed lead generation solution",
//     fileName: "/CaseStudies/Legere.pdf",
//   },
// ];
const logos = [
  { src: "/images/apollo.png" },
  { src: "/images/zoominfo.png" },
  { src: "/images/dataaxle.png" },
  { src: "/images/rocket.png" },
  { src: "/images/hunter.png" },
  { src: "/images/lusha.png" },
  { src: "/images/excel.png" },
  { src: "/images/googlework.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["leadResearchers"],
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
        imageSrc="/images/lead.svg"
        heading={
          <>
            Meticulous <span className="txtYellow">Lead </span>
            <br />
            <span className="txtBlue">Researchers</span>
          </>
        }
        description="Leverage our Lead Researchers to identify high-quality prospects and fuel your sales pipeline with precision. Our meticulous researchers, combined with data-driven strategies, ensure you connect with the right leads at the right time, accelerating your sales efforts and driving long-term business growth."
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
            LR
          </span>,
        ]}
        description="DigiReps Lead Researchers provide a cost-effective solution to uncover high-quality leads, driving your sales efforts with precision. Our skilled global team uses advanced research techniques to identify the best prospects, helping you target the right audience and accelerate your sales cycle."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Data Scraping",
          "List & Database Building",
          "Data Cleaning & Updation",
          "Data Compilation",
          "100-120 Carefully Curated Leads/Day",
          "95% Data Accuracy",
        ]}
        rightSkills={[
          "Excellent Scaping Skills",
          "Excellent Research & Browsing Skills",
          "Multiple scraping & research techniques",
        ]}
        imageSrc="/images/lr.png"
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
        subheading="At DigiReps, our expert Lead Researchers are proficient in all major data sourcing and research tools. Whatever your lead generation needs are, we’ll provide the ideal solution to fuel your sales strategy and drive growth."
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
            How to Hire Lead <span className="txtYellow">Researchers </span>
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Lead Researchers</span>
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
