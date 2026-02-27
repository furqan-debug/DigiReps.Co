import React from "react";
import Image from "next/image";
import LineAnimation from "../LineAnimation";
import ScrollReveal from "@/components/home/ScrollReveal";

const CompetitiveEdge = () => {
  return (
    <div className="blueCloud lg:pt-48 sm:pt-20 md:pt-28 pt-16 sticky" id="competitive">
      <div className="bgColorBlue pb-20 md:pt-0 pt-20">
        <div className="ceContainer mx-auto flex">
          <div className="logoLine md:ml-20 ml-12">
            <LineAnimation />
            {/* <ScrollReveal delay={0.2}>
              <Image
                src="/images/digireps-logo-icon.webp"
                alt="Digi Reps"
                width={112}
                height={110}
              />
            </ScrollReveal> */}
          </div>
          <div className="contentArea mt-25">
            <ScrollReveal delay={0.2}>
              <h2 className="text-white font-medium">
                Your Competitive Edge
                <br className="sm:block hidden" /> with <span className="txtYellow">DigiReps</span>
              </h2>
            </ScrollReveal>
            <div className="pointList md:-ml-[150px] md:mt-0 mt-8">
              <div className="plArea flex md:items-center mb-18 md:gap-0 gap-6 md:-ml-0 -ml-16">
                <ScrollReveal delay={0.2}>
                  <span className="star">
                    <Image
                      src="/images/star-icon.svg"
                      alt=" "
                      width={25}
                      height={25}
                    />
                  </span>
                </ScrollReveal>
                <div className="plContentArea md:ml-[130px] flex-1">
                  <ScrollReveal delay={0.2}>
                    <h3 className="text-white opacity-50">
                      Access to top talent
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-white opacity-50">
                      Our team of experts handpicks the best candidates for each
                      role,
                      <br /> ensuring you get the best possible fit for your
                      business.
                    </p>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2}>
                  <span>
                    <Image
                      className="moving-image1 md:-ml-0 -ml-4 md:w-[210px] w-[120px] md:h-[234px] h-[120px]"
                      src="/images/access-to-top-talent.svg"
                      alt=" "
                      width={210}
                      height={234}
                    />
                  </span>
                </ScrollReveal>
              </div>
              <div className="plArea flex md:items-center mb-18 md:gap-0 gap-6 md:-ml-0 -ml-16">
                <ScrollReveal delay={0.2}>
                  <span className="star">
                    <Image
                      src="/images/star-icon.svg"
                      alt=" "
                      width={25}
                      height={25}
                    />
                  </span>
                </ScrollReveal>
                <div className="plContentArea md:ml-[130px] flex-1">
                  <ScrollReveal delay={0.2}>
                    <h3 className="text-white opacity-50">
                      Hassle-free hiring process
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-white opacity-50">
                      DigiReps handles the recruitment, management and quality
                      assurance, so <br /> you can focus on growing your
                      business.
                    </p>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2}>
                  <span>
                    <Image
                      className="moving-image2 md:-ml-0 -ml-4 md:w-[220px] w-[120px] md:h-[200px] h-[120px]"
                      src="/images/hassle-free-hiring-process.svg"
                      alt=" "
                      width={217.72}
                      height={197.05}
                    />
                  </span>
                </ScrollReveal>
              </div>
              <div className="plArea flex md:items-center md:gap-0 gap-6 md:-ml-0 -ml-16">
                <ScrollReveal delay={0.2}>
                  <span className="star">
                    <Image
                      src="/images/star-icon.svg"
                      alt=" "
                      width={25}
                      height={25}
                    />
                  </span>
                </ScrollReveal>
                <div className="plContentArea md:ml-[130px] flex-1">
                  <ScrollReveal delay={0.2}>
                    <h3 className="text-white opacity-50">
                      upto 50% cost savings
                    </h3>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-white opacity-50">
                      With DigiReps, you get all the benefits of remote work
                      without breaking <br /> the bank.
                    </p>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2}>
                  <span>
                    <Image
                      className="moving-image3 md:-ml-0 -ml-4 md:w-[220px] w-[120px] md:h-[170px] h-[120px]"
                      src="/images/upto-cost-savings.svg"
                      alt=" "
                      width={213.46}
                      height={169.34}
                    />
                  </span>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveEdge;
