import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";
import { OurStoryProps, RichTextParagraphNode, RichTextTextNode } from "lib/types/contentful";

export default function OurStory({ data }: OurStoryProps) {
  // console.log(data)

  return (
    <div>
      <div className="bgOurStory h-[700px] !bg-fixed !bg-cover md:block hidden"></div>
      <Image
        src="/images/aboutbg.png"
        alt=""
        width={1900}
        height={1200}
        className="md:hidden block"
      />
      <div className="flex md:flex-row flex-col py-16 gap-10 max-w-[115rem] m-auto px-12">
        <div className="md:w-1/2 w-full">
          <ScrollReveal delay={0.2}>
            <h2 className="txtBlue font-medium mb-5 heading-center-line">
              <span className="txtBlue">Our Story:</span>{" "}
              <span className="txtYellow">Purpose</span>,<br />
              <span className="txtBlue">Passion &</span>{" "}
              <span className="txtYellow">Impact</span>
            </h2>
          </ScrollReveal>

          {data.map(({ sys, fields }) => (
            <div key={sys.id}>
              <ScrollReveal delay={0.2}>
                <h3 className="text-center rounded-full dot-heading font-medium px-10 py-4">
                  <span className="pl-2">{fields.heading}</span>
                </h3>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                {fields.description.content.map(
                  (paragraph: RichTextParagraphNode, pIdx: number) => (
                    <p key={pIdx} className="my-5">
                      {/* join together all the text nodes in this paragraph */}
                      {paragraph.content
                        .map((textNode: RichTextTextNode) => textNode.value)
                        .join("")}
                    </p>
                  )
                )}
              </ScrollReveal>
            </div>
          ))}
        </div>
        <div className="md:w-1/2 w-full">
          <Image
            src={"/images/successimage.png"}
            alt=" "
            width={700}
            height={700}
            className="mx-auto md:w-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
