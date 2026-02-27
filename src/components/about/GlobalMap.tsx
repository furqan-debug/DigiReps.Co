import React from "react";
import ScrollReveal from "../home/ScrollReveal";
import Image from "next/image";

export default function GlobalMap() {
  const countries = [
    ["United States", "Belize", "Dominican Republic", "Mexico"],
    ["Canada", "Costa Rica", "Ecuador", "Honduras"],
    ["Columbia", "Nicaragua", "Jamaica", "Pakistan"],
    ["Nigeria", "United Kingdom", "Trinidad and Tobago", "Dubai"],
    ["Guyana", "Turkey", "Cyprus", "Kosovo"],
    ["Ukraine", "Philippines", "Bangladesh", "Egypt"],
    ["", "", "", ""],
  ];
  return (
    <div className="flex flex-col items-center gap-4 md:px-24 px-6 md:py-20 py-12">
      <ScrollReveal delay={0.2}>
        <h2 className="txtBlue font-medium mb-5 text-center">
          Global
          <span className="txtYellow"> Talent </span>
          From Around
          <br className="md:block hidden" /> The
          <span className="txtYellow"> World </span>
        </h2>
      </ScrollReveal>
      <Image
        src="/images/globalmap.svg"
        alt=" "
        width={700}
        height={500}
        className="w-full sm:block hidden"
      />
      {/* <Image
        src="/images/globalmapMob.svg"
        alt=" "
        width={700}
        height={500}
        className="w-full sm:hidden block"
      /> */}
      <Image
        src="/images/globalmapMob.png"
        alt=" "
        width={1100}
        height={700}
        className="w-full sm:hidden block"
      />
      <div className="w-full max-w-[110rem] m-auto md:px-12 mt-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 md:border-0 border-r border-t border-[#0B409C]">
          {countries.map((row, rowIndex) =>
            row.map((country, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  ${rowIndex === countries.length - 1 ? 'hidden md:flex' : 'flex'}
                flex items-center justify-center md:p-10 p-5 md:border-l-0 border-l
                ${colIndex < row.length - 1 ? "md:border-r border-[#0B409C]" : ""}
                ${rowIndex < countries.length - 1 ? "border-b border-[#0B409C]" : ""}
              `}
              >
                <span className="text-center font-medium text-[#021442]">
                  {country}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
