import Brands from "@/components/solutions/Brands";
import SolutionHero from "@/components/solutions/SolutionHero";
import DiverseExpertise from "@/components/solutions/DiverseExpertise";
import React from "react";
import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import Stats from "@/components/about/Stats";
import WhyChoose from "@/components/solutions/WhyChoose";
import CaseStudies from "@/components/solutions/CaseStudies";
import HowToHire from "@/components/solutions/HowToHire";
import HiringChoices from "@/components/solutions/HiringChoices";
import MeetTeam from "@/components/solutions/MeetTeam";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";

const myCustomTeamList = [
  {
    name: "Yusuf A",
    role: "Backend Developer",
    image: "/images/yusuf.png",
    location: "Dubai",
    experience: "6 years of experience",
    description:
      "Yusuf has a wealth of experience in backend development, particularly in building secure and scalable applications that handle high volumes of data efficiently.",
    skills: [
      "Node.js",
      "API Development",
      "Python",
      "Ruby on Rails",
      "Database Management",
    ],
  },
  {
    name: "Fatima R",
    role: "Backend Developer",
    image: "/images/fatima.png",
    location: "Egypt",
    experience: "5 years of experience",
    description:
      "Fatima specializes in backend solutions that are robust and scalable, ensuring applications are both efficient and reliable under various conditions.",
    skills: [
      "Node.js",
      "API Development",
      "Python",
      "Ruby on Rails",
      "Database Management",
    ],
  },
  {
    name: "Emir A. ",
    role: "Backend Developer",
    image: "/images/emir.png",
    location: "Turkey",
    experience: "4 years of experience",
    description:
      "Emir’s focus on clean and efficient code allows him to build complex backend systems that ensure seamless operations for businesses across industries.",
    skills: [
      "Node.js",
      "API Development",
      "Python",
      "Ruby on Rails",
      "Database Management",
    ],
  },
  {
    name: "Emir A. ",
    role: "Backend Developer",
    image: "/images/emir.png",
    location: "Turkey",
    experience: "4 years of experience",
    description:
      "Emir’s focus on clean and efficient code allows him to build complex backend systems that ensure seamless operations for businesses across industries.",
    skills: [
      "Node.js",
      "API Development",
      "Python",
      "Ruby on Rails",
      "Database Management",
    ],
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
//     fileName: "/CaseStudies/solving.pdf",
//   },
// ];
const logos = [
  { src: "/images/laravel.png" },
  { src: "/images/rails.png" },
  { src: "/images/django.png" },
  { src: "/images/node.png" },
  { src: "/images/mysql.png" },
  { src: "/images/python.png" },
  { src: "/images/java.png" },
  { src: "/images/apache.png" },
  { src: "/images/js.png" },
  { src: "/images/chash.png" },
  { src: "/images/php.png" },
  { src: "/images/rust.png" },
  { src: "/images/go.png" },
  { src: "/images/kotlin.png" },
];
export default async function page() {
  const client = getClient();
  const response3 = await client.getEntries({
    content_type: "solutionsCaseStudies",
    "metadata.tags.sys.id[in]": ["backendDevelopers"],

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
        imageSrc="/images/backend.svg"
        heading={
          <>
            Skilled <span className="txtYellow"> Backend</span>
            <br />
            <span className="txtBlue">Developers</span>
          </>
        }
        description="Leverage our Backend Developers to build powerful, scalable, and secure server-side solutions. Our skilled team, combined with robust frameworks and best practices, ensures your systems run efficiently, support high traffic, and integrate seamlessly with frontend technologies to drive long-term business success."
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
            Backend Developers
          </span>,
        ]}
        description="DigiReps Backend Developers provide a cost-effective solution to build robust, scalable, and secure server-side systems. Our expert team uses cutting-edge technologies to ensure seamless integration, optimal performance, and long-term scalability, empowering your business to deliver high-quality digital products."
        highlights={[
          "Cost Effectiveness",
          "Bigger & Better Global Talent Pool",
          "Quick Scalability",
        ]}
        skillsTitle="Top Skills & Expectations"
        leftSkills={[
          "Node.js, Python, or Ruby",
          "Database management (SQL/NoSQL) ",
          "API design and development ",
          "Authentication and authorization",
          "Server, network, and hosting ",
          "Develop and maintain server-side logic",
        ]}
        rightSkills={[
          "Ensure database integrity and security ",
          "Integrate elements with server-side logic ",
          "Stay updated with emerging technologies",
          "Maximum speed and scalability ",
          "Identify and resolve performance issues",
          "Implement security measures",
        ]}
        imageSrc="/images/bd.png"
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
        subheading="At DigiReps, our expert Backend Developers are proficient in all major server-side technologies and frameworks. Whatever your backend needs are, we’ll deliver the ideal solution to ensure your systems are scalable, secure, and optimized for performance."
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
            How to Hire Backend <span className="txtYellow">Developers </span>
            <br /> with DigiReps
          </>
        }
      />
      <MeetTeam
        title={
          <>
            Meet <span className="txtYellow">DigiReps&apos;</span> <br />
            <span className="txtBlue">Backend Developers</span>
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
