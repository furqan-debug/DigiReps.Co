import Stats from "@/components/about/Stats";

import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import Brands from "@/components/solutions/Brands";
import CaseStudies from "@/components/solutions/CaseStudies";
import DiverseExpertise from "@/components/solutions/DiverseExpertise";
import HiringChoices from "@/components/solutions/HiringChoices";
import HowToHire from "@/components/solutions/HowToHire";
import MeetTeam from "@/components/solutions/MeetTeam";
import SolutionHero from "@/components/solutions/SolutionHero";
import WhyChoose from "@/components/solutions/WhyChoose";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";
import React from "react";
import { logos, secaTeamList } from "@/data/solutionsData";

export default async function page() {
    const client = getClient();
    const response3 = await client.getEntries({
        content_type: "solutionsCaseStudies",
        "metadata.tags.sys.id[in]": ["salesDevelopmentReps"],
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
                imageSrc="/images/sales1.svg"
                heading={
                    <>
                        Efficient <span className="txtYellow">SECA Advisory</span>
                        <br />
                        <span className="txtBlue">Reps</span>
                    </>  
                } 
                description="Leverage our Sales Development Reps to consistently fill your pipeline with qualified opportunities. Our skilled SDRs coupled with our proven-process empower your business to achieve sustainable growth and maximize ROI"
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
                        SDR
                    </span>,
                ]}
                description="DigiReps SDRs offer a cost-effective way to supercharge your sales pipeline by leveraging top-tier global talent. Our scalable teams are trained to ramp up quickly, helping you reach more prospects and close deals faster."
                highlights={[
                    "Cost Effectiveness",
                    "Bigger & Better Global Talent Pool",
                    "Quick Scalability",
                ]}
                skillsTitle="Top Skills & Expectations"
                leftSkills={[
                    "Cold calling",
                    "Appointment setting",
                    "Follow up & follow through",
                    "Getting around gate-keepers",
                ]}
                rightSkills={[
                    "Identifying the right decision maker",
                    "Top-notch Communication",
                    "No Heavy Accent",
                    "Culturally Fit",
                ]}
                imageSrc="/images/sdr.webp"
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
                subheading="At DigiReps, our expert SDRs are equipped with all major CRM & Sales tools expertise. Whatever your needs are, we’ll deliver the perfect solution to fit your growth mission."
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
                        How to Hire Sales <span className="txtYellow">Development </span>
                        Reps
                        <br /> with DigiReps
                    </>
                }
            />

            <MeetTeam
                title={
                    <>
                        Meet <span className="txtYellow">DigiReps&apos;</span> <br />
                        <span className="txtBlue">Sales Development</span> Reps
                    </>
                }
                teamMembers={secaTeamList}
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
