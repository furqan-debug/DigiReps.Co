import CompetitiveEdge from "../components/home/sections/CompetitiveEdge";
import EmpowerYourBusiness from "../components/home/sections/EmpowerYourBusiness";
import ProvenProcessStep from "../components/home/sections/ProvenProcessStep";
import DigiRepsDifference from "../components/home/sections/DigiRepsDifference";
import SuccessStories from "../components/home/sections/SuccessStories";
import PartnerLogos from "../components/home/sections/PartnerLogos";
import SmartWay from "../components/home/sections/SmartWay";
import ScopeServices from "../components/home/sections/ScopeServices";
import GrowFasterBetterSmarter from "../components/home/sections/GrowFasterBetterSmarter";
import GrowCostEffectively from "../components/home/sections/GrowCostEffectively";
import BookConsultationModal from "@/components/Modals/BookConsultationModal";
import Stats from "@/components/about/Stats";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";

export default async function Home() {
  console.log("===> HOME PAGE RENDER <===");

  const client = getClient();
  const response = await client.getEntries({ content_type: "solutionCards" });
  const response1 = await client.getEntries({ content_type: "partnerLogos" });
  const response2 = await client.getEntries({
    content_type: "digirepsDifferenceVideo",
  });
  const response3 = await client.getEntries({
    content_type: "homepageCaseStudies",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      image: item.fields.image as AssetField,
      heading: item.fields.heading as string,
      description: item.fields.description as string,
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data1 = response1.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      image: item.fields.image as AssetField,
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data2 = response2.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      backgroundImage: item.fields.backgroundImage as AssetField,
      popupVideo: item.fields.popupVideo as AssetField,
    },
  }));
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
    <>
      <BookConsultationModal />
      {/* <Header user={user} /> */}
      <main className="overlap xl:mt-[45rem] lg:mt-[50rem] md:mt-[50rem] sm:mt-[45rem] mt-[55rem]">
        {/* Competitive Edge */}
        <CompetitiveEdge />
        {/* Empower Your Business */}
        <EmpowerYourBusiness data={data} />
        {/* Proven Process Step by Step */}
        <ProvenProcessStep />
        {/* The DigiReps Difference — Explained */}
        <DigiRepsDifference data2={data2} />
        {/* Success Stories: How We Help Businesses Scale */}
        <SuccessStories data3={data3} />
        {/* Partner Sliding Logos */}
        <PartnerLogos data1={data1} />
        {/* Hear It from Our Clients: Success in Their Own Words */}
        <TestimonialsSection />
        {/* SmartWay */}
        <SmartWay />
        {/* Scope Of Services */}
        <ScopeServices />
        {/* Grow Faster Better Smarter */}
        <GrowFasterBetterSmarter />
        {/* Stats */}
        <Stats />
        {/* Grow Cost Effectively */}
        <GrowCostEffectively />
      </main>
    </>
  );
}
