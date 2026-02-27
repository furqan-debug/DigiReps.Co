import React from "react";
import VideoModal from "../VideoModal";
import ScrollReveal from "@/components/home/ScrollReveal";
import { DigiRepsDifferenceProps } from "lib/types/contentful";

const DigiRepsDifference: React.FC<DigiRepsDifferenceProps> = ({ data2 }) => {
  if (!data2 || data2.length === 0) return null;
  return (
    <section
      className="videoSec w-full md:h-[983px] h-[683px] bg-cover bg-no-repeat bg-center"
      id="whydigireps"
      style={{
        backgroundImage: `url(https:${data2[0].fields.backgroundImage.fields.file.url})`,
      }}
    >
      <div className="playArea flex items-center justify-center flex-col">
        <ScrollReveal delay={0.2}>
          <h2 className="text-white font-medium text-center mb-5">
            The DigiReps Difference <br /> — Explained
          </h2>
        </ScrollReveal>
        <VideoModal src={data2[0].fields.popupVideo.fields.file.url} />
      </div>
    </section>
  );
};

export default DigiRepsDifference;
