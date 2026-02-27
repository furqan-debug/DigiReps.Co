import CoreValues from "@/components/about/CoreValues";
import Glimpse from "@/components/about/Glimpse";
import GlobalMap from "@/components/about/GlobalMap";
import Hero from "@/components/about/Hero";
import Leadership from "@/components/about/Leadership";
import Management from "@/components/about/Management";
import Mission from "@/components/about/Mission";
import OurEvolution from "@/components/about/OurEvolution";
import OurStory from "@/components/about/OurStory";
import Stats from "@/components/about/Stats";

import GrowCostEffectively from "@/components/home/sections/GrowCostEffectively";
import { getClient } from "lib/contentful";
import { AssetField, RichTextDocument, StoryItem } from "lib/types/contentful";
import React from "react";

export default async function page() {
  const client = getClient();
  const response = await client.getEntries({ content_type: "ourStory" });
  const response1 = await client.getEntries({ content_type: "evolution" });
  const response2 = await client.getEntries({
    content_type: "digiRepsManagement",
  });
  const response3 = await client.getEntries({
    content_type: "digiRepsLeadership",
  });
  const response4 = await client.getEntries({
    content_type: "glimpse",
  });

  // Map into your own TestimonialItem shape
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: StoryItem[] = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      heading: item.fields.heading as string,
      description: item.fields.description as RichTextDocument,
    },
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data1 = response1.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      icon: item.fields.icon as AssetField,
      subHeading: item.fields.subHeading as string,
      heading: item.fields.heading as string,
    },
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data2 = response2.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      image: item.fields.image as AssetField,
      name: item.fields.name as string,
      role: item.fields.role as string,
    },
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data3 = response3.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      name: item.fields.name as string,
      role: item.fields.role as string,
      image: item.fields.image as AssetField,
      linkedinUrl: item.fields.linkedinUrl as string,
    },
  }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data4 = response4.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      image: item.fields.image as AssetField,
    },
  }));

  return (
    <div>
      {/* <Header user={user} /> */}
      <Hero />
      {/* <OurStory /> */}
      <OurStory data={data} />
      <OurEvolution data1={data1} />
      <Mission />
      <CoreValues />
      <Leadership data3={data3} />
      <Management data2={data2} />
      <GlobalMap />
      <Glimpse data4={data4} />
      <Stats />
      <GrowCostEffectively />
    </div>
  );
}
