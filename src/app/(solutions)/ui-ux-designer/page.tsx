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
    name: "Carlos R.",
    role: "UI/UX Designer",
    image: "/images/carlos2.png",
    location: "Mexico",
    experience: "5 years of experience",
    description:
      "Carlos has a passion for creating user-centric designs that are both visually appealing and functional. He focuses on enhancing the user experience through innovative designs.",
    skills: [
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Wireframing",
      "Responsive Design",
    ],
  },
  {
    name: "Sarah K. ",
    role: "UI/UX Designer",
    image: "/images/sofia.png",
    location: "United Kingdom",
    experience: "6 years of experience",
    description:
      "Sarah’s designs focus on user-centric experiences, using the latest design tools and trends to create products that are as functional as they are engaging.",
    skills: [
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Wireframing",
      "UI Design",
    ],
  },
  {
    name: "Razi S ",
    role: "UI/UX Designer",
    image: "/images/david.png",
    location: "Pakistan",
    experience: "4 years of experience",
    description:
      "Razi excels in turning user feedback into intuitive, attractive designs. His deep knowledge of user needs allows him to deliver highly effective design solutions.",
    skills: [
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Wireframing",
      "UI Design",
    ],
  },
  {
    name: "Razi S ",
    role: "UI/UX Designer",
    image: "/images/david.png",
    location: "Pakistan",
    experience: "4 years of experience",
    description:
      "Razi excels in turning user feedback into intuitive, attractive designs. His deep knowledge of user needs allows him to deliver highly effective design solutions.",
    skills: [
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Wireframing",
      "UI Design",
    ],
  },
];

// const studiesData = [
//   {
//     logo: "/images/Sprout.png",
//     logoWidth: 150,
//     logoHeight: 37,
//     title: "Sprout App",
//     description:
//       "DigiReps UI/UX designer helped Sprout rapidly turn their concept into a clickable prototype with expert Figma design, accelerating their journey toward launch.",
//     fileName: "/CaseStudies/Sprout.pdf",
//   },
// ];
const logos = [
  { src: "/images/figma.png" },
  { src: "/images/adobexd.png" },
  { src: "/images/invision.png" },
  { src: "/images/framer.png" },
  { src: "/images/sketch.png" },
  { src: "/images/miro.png" },
  { src: "/images/proto.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["uiuxDesigners"],
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
        imageSrc="/images/uiux.svg"
        heading={
          <>
            Creative <span className="txtYellow"> UI/UX</span>
            <br />
            <span className="txtBlue">Designer</span>
          </>
        }
        description="Leverage our UI/UX Designer to create intuitive and visually appealing digital experiences that engage your users. Our skilled designers, combined with a user-centered design approach, ensure seamless interfaces that enhance customer satisfaction, improve usability, and drive long-term growth."
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
            UI/UX Designers
          </span>,
        ]}
        description="DigiReps UI/UX Designers provide a cost-effective way to enhance your digital products with intuitive, user-friendly designs. Our talented global team works closely with you to create seamless, visually compelling user experiences that drive engagement, improve customer satisfaction, and support long-term business success."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Wireframing and prototyping ",
          "Visual design and branding",
          "Interaction design ",
          "Usability testing ",
          "Intuitive & appealing interfaces ",
          "Collaborate with developers ",
        ]}
        rightSkills={[
          "Conduct user research ",
          "Maintain design consistency ",
          "Design concepts",
          "Engage in constructive feedback ",
          "Collaboration with teams",
        ]}
        imageSrc="/images/uiux.png"
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
        subheading="At DigiReps, our expert UI/UX Designers are proficient in all major design tools and user experience methodologies. Whatever your design needs are, we’ll craft the ideal solution to elevate your digital products and enhance user engagement."
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
            How to Hire UI/UX <span className="txtYellow">Designers </span>
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">UI/UX Designers</span>
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
