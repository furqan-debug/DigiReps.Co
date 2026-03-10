import Stats from "@/components/about/Stats";

import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import Brands from "@/components/solutions/Brands";
import DiverseExpertise from "@/components/solutions/DiverseExpertise";
import HiringChoices from "@/components/solutions/HiringChoices";
import HowToHire from "@/components/solutions/HowToHire";
import MeetTeam from "@/components/solutions/MeetTeam";
import SolutionHero from "@/components/solutions/SolutionHero";
import WhyChoose from "@/components/solutions/WhyChoose";
import React from "react";
import { cisaTeamList, logos1 } from "@/data/solutionsData";

export default async function page() {
    return (
        <div>
            {/* <Header /> */}
            {/* <SolutionHero /> */}
            <SolutionHero
                imageSrc="/images/icon sica advisory.png"
                heading={
                    <>
                        Certified <span className="txtYellow">CISA</span>
                        <br />
                        <span className="txtBlue">Auditors</span>
                    </>
                }
                description="Leverage our CISA Advisory Auditors to strengthen your organization’s information security, compliance, and risk management frameworks. Our highly skilled professionals combine deep audit expertise with modern cybersecurity practices to assess controls, identify vulnerabilities, and ensure your systems align with global compliance standards—helping safeguard your business while supporting long-term operational resilience."
            />

            <Brands />
            <WhyChoose
                titleLines={[
                    <span className="txtBlue" key="1">
                        Why choose
                    </span>,
                    <span className="txtYellow" key="2">
                        DigiReps CISA
                    </span>,
                    <span className="txtBlue" key="3">
                        Auditors
                    </span>,
                ]}
                description="Information systems are the backbone of modern businesses, and ensuring their security, reliability, and compliance is critical to long-term success. Our CISA-certified auditors bring a strong combination of technical expertise and audit discipline to help organizations evaluate IT controls, mitigate risks, and strengthen governance frameworks. From security assessments to compliance audits, our professionals provide valuable insights that help protect your digital infrastructure while supporting operational efficiency."
                highlights={[
                    "Cost Effectiveness",
                    "Quick Scalability",
                ]}
                skillsTitle="Top Skills & Expectations"
                leftSkills={[
                    "Information Systems Auditing and Control Assessment",
                    "IT Risk Management and Compliance Advisory",
                    "Cybersecurity and Data Protection Audits",
                    "Internal Control Evaluation and Testing",
                ]}
                rightSkills={[
                    "Governance, Risk, and Compliance (GRC) Frameworks",
                    "Regulatory Compliance (SOX, ISO 27001, SOC 1, SOC 2)",
                    "IT General Controls (ITGC) and Security Reviews",
                    "Audit Reporting, Documentation, and Remediation Planning",
                ]}
                imageSrc="/images/cisa girl.png"
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
                subheading="At DigiReps, our expert CISA Auditors are proficient in leading IT audit frameworks, risk assessment methodologies, and compliance standards. Whatever your governance, security, or compliance needs are, we’ll provide the ideal audit and advisory support to strengthen controls and reduce risk."
                logos={logos1}
                logoWidth={100}
                logoHeight={100}
            />
            <HowToHire
                heading={
                    <>
                        How to Hire <span className="txtYellow">CISA </span>
                        Auditors
                        <br /> with DigiReps
                    </>
                }
            />

            <MeetTeam
                title={
                    <>
                        Meet <span className="txtYellow">DigiReps&apos;</span> <br />
                        <span className="txtBlue">CISA Auditors</span>
                    </>
                }
                teamMembers={cisaTeamList}
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
