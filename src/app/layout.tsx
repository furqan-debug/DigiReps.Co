// layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "../components/Footer";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import BookConsultationModal from "@/components/Modals/BookConsultationModal";
import Header from "@/components/Headers/Header";
import { AuthProvider } from "../context/AuthContext";
import { getClient } from "lib/contentful";
import { AssetField } from "lib/types/contentful";
import FacebookPixel from '../components/metaData/FacebookPixel';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiReps - Smart Way To Grow Your Team Remotely!",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("===> ROOT LAYOUT RENDER <===");

  const client = getClient();
  const response = await client.getEntries({
    content_type: "footerContactDetails",
  });
  const response1 = await client.getEntries({
    content_type: "footerReviewsPlatform",
  });

  const data = response.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      address: item.fields.address as string,
      email: item.fields.email as string,
      number: item.fields.number as string,
    },
  }));

  const data1 = response1.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      logo: item.fields.logo as AssetField,
      link: item.fields.link as string,
    },
  }));

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <ModalProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthProvider>
            <Header />
            {children}
            <FacebookPixel />
            <BookConsultationModal />
            <Footer contactDetails={data} reviewPlatforms={data1} />
          </AuthProvider>
        </body>
      </ModalProvider>
    </html>
  );
}