import React from "react";
import PrivacyPolicy from "@/components/policies/PrivacyPolicy";
import { getClient } from "lib/contentful";
import { PrivacyPolicyItem } from "lib/types/contentful";

export default async function Page() {
  const client = getClient();
  const response = await client.getEntries({ content_type: "privacyPolicy" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: PrivacyPolicyItem[] = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      policyContent: item.fields.policyContent as string, // or as RichTextDocument
    },
  }));

  return <PrivacyPolicy data={data} />;
}
