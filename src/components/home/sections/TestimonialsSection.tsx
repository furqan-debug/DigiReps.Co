import { AssetField, TestimonialItem } from "lib/types/contentful";
import HearClientsSuccessWorlds from "./HearClientsSuccessWorlds";
import { getClient } from "lib/contentful";

export const revalidate = 60; // if you want ISR

export default async function TestimonialsSection() {
  const client = getClient();
  const response = await client.getEntries({ content_type: "testimonial" });

  // Map into your own TestimonialItem shape
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts: TestimonialItem[] = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      clientReview: item.fields.clientReview as string,
      clientImage: item.fields.clientImage as AssetField,
      reviewImageOrVideo: item.fields.reviewImageOrVideo as AssetField,
      clientName: item.fields.clientName as string,
      clientRoleCompanyName: item.fields.clientRoleCompanyName as string,
    },
  }));

  return <HearClientsSuccessWorlds posts={posts} />;
}
