"use client";
import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
import { SuccessStoryItem } from "lib/types/contentful";

interface CaseStudiesProps {
  heading: React.ReactNode;
  subheading: string;
  caseStudies: SuccessStoryItem[];
}

export default function CaseStudies({
  heading,
  subheading,
  caseStudies,
}: CaseStudiesProps) {
  const openPDF = (fileName: string) => {
    window.open(fileName, "_blank");
  };

  return (
    <div className="bg-[#F2F7FF] py-16 md:px0 px-12">
      <div className="max-w-5xl m-auto flex flex-col gap-6 items-center">
        <ScrollReveal delay={0.2}>
          <h1 className="font-medium txtBlue text-center heroTextAnimate md:!text-[3.75rem] !text-[2.75rem] leading-0">
            {heading}
          </h1>
          <p className="text-center">{subheading}</p>
        </ScrollReveal>

        <div className="flex items-stretch justify-center gap-6 w-full mt-6 flex-wrap">
          {caseStudies.map(({ sys, fields }) => (
            <div
              key={sys.id}
              className="w-full sm:w-[48%] border border-[#0B409C99] rounded-3xl p-10 flex flex-col gap-2 items-start justify-between"
            >
              <Image
                src={`https:${fields.logo.fields.file.url}`}
                alt={fields.logo.fields.title}
                width={120}
                height={40}
              />
              <h4 className="txtBlue mb-3 font-black uppercase mt-2">
                {fields.heading}
              </h4>
              <p className="mb-3">{fields.description}</p>

              <button
                onClick={() => openPDF(fields.pdfFile.fields.file.url)}
                className="bgColorYellow text-white rounded-full p-5 flex items-center px-10 btnAnimate2 cursor-pointer"
              >
                <span className="flex items-center">
                  View Now
                  <Image
                    src="/images/right-arrow.svg"
                    alt="arrow"
                    width={18}
                    height={18}
                    className="ml-2"
                  />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
