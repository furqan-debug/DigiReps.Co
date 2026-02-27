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
    name: "Isabella M",
    role: "Digital Marketing Rep",
    image: "/images/isabella.png",
    location: "Colombia",
    experience: "6 years of experience",
    description:
      "Isabella’s diverse skill set in digital marketing ensures that every campaign she manages is both creative and results-driven. She excels in creating engaging content that attracts customers.",
    skills: [
      "SEO",
      "Social Media Marketing",
      "Content Creation",
      "Google Ads",
      "Email Campaigns",
    ],
  },
  {
    name: "Marco T. ",
    role: "Digital Marketing Rep",
    image: "/images/marco.png",
    location: "Ecuador",
    experience: "7 years of experience",
    description:
      "Marco has a deep understanding of digital marketing tools, and his strategies consistently drive web traffic and improve ROI for businesses looking to increase online visibility.",
    skills: [
      "Content Creation",
      "SEO",
      "Email Campaigns",
      "Google Ads",
      "Social Media Marketing",
    ],
  },
  {
    name: "Jennifer S. ",
    role: "Digital Marketing Rep",
    image: "/images/jennifer.png",
    location: "Philippines",
    experience: "4 years of experience",
    description:
      "Jennifer specializes in developing digital marketing strategies that increase brand awareness and drive conversions, creating effective online campaigns for a range of industries.",
    skills: [
      "Content Creation",
      "SEO",
      "Email Campaigns",
      "Google Ads",
      "Social Media Marketing",
    ],
  },
  {
    name: "Jennifer S. ",
    role: "Digital Marketing Rep",
    image: "/images/jennifer.png",
    location: "Philippines",
    experience: "4 years of experience",
    description:
      "Jennifer specializes in developing digital marketing strategies that increase brand awareness and drive conversions, creating effective online campaigns for a range of industries.",
    skills: [
      "Content Creation",
      "SEO",
      "Email Campaigns",
      "Google Ads",
      "Social Media Marketing",
    ],
  },
];

// const studiesData = [
//   {
//     logo: "/images/medianug.webp",
//     logoWidth: 170,
//     logoHeight: 37,
//     title: "MediaNug",
//     description:
//       "DigiReps optimized MediaNug sales process by implementing structured lead tracking, consistent outreach, and workflow improvements to boost conversions",
//     fileName: "/CaseStudies/MediaNugs.pdf",
//   },
// ];
const logos = [
  { src: "/images/high.png" },
  { src: "/images/googleanalytics.png" },
  { src: "/images/semrush.png" },
  { src: "/images/mailchimp.png" },
  { src: "/images/hub.png" },
  { src: "/images/googletrends.png" },
  { src: "/images/buffer.png" },
  { src: "/images/trello.png" },
  { src: "/images/hoot.png" },
  { src: "/images/canva.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["digitalMarketingReps"],
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
        imageSrc="/images/digmark.svg"
        heading={
          <>
            Strategic <span className="txtYellow"> Digital Marketing </span>
            <br />
            <span className="txtBlue">Reps</span>
          </>
        }
        description="Leverage our Digital Marketing Reps to drive targeted campaigns and amplify your online presence. Our results-driven team, equipped with the latest marketing tools and strategies, helps you reach the right audience, increase conversions, and achieve measurable growth."
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
            DMR
          </span>,
        ]}
        description="DigiReps Digital Marketing Reps deliver a cost-effective solution to boost your online visibility and drive engagement. With access to top-tier global talent and cutting-edge marketing tools, our scalable teams quickly adapt to your needs, helping you reach your target audience and maximize your digital marketing ROI."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Paid Ads",
          "Cold Email Outreach",
          "Content Creation",
          "Content Management",
          "Social Media Outreach",
          "Content Marketing",
        ]}
        rightSkills={[
          "Automation & Workflows",
          "Landing Pages & Forms",
          "Excellent Leadership Qualities",
        ]}
        imageSrc="/images/dmr.png"
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
        subheading="At DigiReps, our expert Digital Marketing Reps are skilled in all major digital platforms and marketing tools. Whatever your marketing objectives are, we’ll craft the perfect strategy to accelerate your growth and enhance your online presence."
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
            How to Hire Digital <span className="txtYellow">Marketing </span>
            Reps
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Digital Marketing Reps</span>
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
