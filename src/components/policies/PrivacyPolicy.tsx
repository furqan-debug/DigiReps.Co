import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Stats from "../about/Stats";
import GrowCostEffectively from "../home/sections/GrowCostEffectively";
import { PrivacyPolicyProps } from "lib/types/contentful";

export default function PrivacyPolicy({ data }: PrivacyPolicyProps) {
  return (
    <div>
      {/* <Header user={user} /> */}
      <div className="bg-[#F0F0F3] -mt-36">
        <div className="container m-auto px-12 pt-52 pb-40">
          <ScrollReveal delay={0.2}>
            <h1 className="font-medium !text-left heroTextAnimate leading-0">
              <span className="txtBlue">Privacy</span>
              <span className="txtYellow"> Policy </span>
            </h1>
            <div
              className="text-[#1E1E1E] flex flex-col gap-4 max-w-5xl policyPage"
              dangerouslySetInnerHTML={{ __html: data[0].fields.policyContent }}
            ></div>
          </ScrollReveal>
        </div>
      </div>
      <div className="py-12">
        <Stats />
      </div>
      <GrowCostEffectively />
    </div>
  );
}
