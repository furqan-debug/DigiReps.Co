import React from "react";
// import PrivacyPolicy from "@/components/policies/PrivacyPolicy";
import { TermsConditionsItem } from "lib/types/contentful";
import { getClient } from "lib/contentful";
import TermsAndConditions from "@/components/policies/TermsAndConditions";

export default async function page() {
  const client = getClient();

  const response = await client.getEntries({
    content_type: "termsAndConditions",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: TermsConditionsItem[] = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      termsContent: item.fields.termsContent as string,
    },
  }));
  // console.log("dataaaa", data);
  return <TermsAndConditions data={data} />;
}
