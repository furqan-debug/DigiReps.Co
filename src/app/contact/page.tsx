import ContactBoxes from "@/components/contact/ContactBoxes";
import HeadQuarter from "@/components/contact/HeadQuarter";
import Hero from "@/components/contact/Hero";

import React from "react";

export default async function page() {
  return (
    <div>
      {/* <Header user={user} /> */}
      <Hero />
      <ContactBoxes />
      <HeadQuarter />
    </div>
  );
}
