import React from "react";
import ScrollCounter from "../home/Counter";
import { StatItem } from "lib/types/contentful";
import { getClient } from "lib/contentful";

export default async function Stats() {
  const client = getClient();

  const response4 = await client.getEntries({ content_type: "stats" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data4: StatItem[] = response4.items.map((item: any) => ({
    sys: { id: item.sys.id },
    fields: {
      stat: item.fields.stat as string,
      description: item.fields.description as string,
    },
  }));
  return (
    <div className="bg-white">
      <div className="w-full max-w-[110rem] mx-auto md:pb-24 pb-12 md:pt-20 pt-12 px-12 bg-white">
        <div className="md:border-t md:border-b md:border-x-0 border-[#0B409C]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:-my-12">
            {data4.map((item, idx) => {
              const raw = item.fields.stat as string; // e.g. "$1M+", "150+", "1", "1+"

              // 1) Extract leading digits (if any)
              const m = raw.match(/^(\d+)/);
              const val = m ? parseInt(m[1], 10) : NaN;

              // 2) Animate only when val > 1
              if (val > 1) {
                // suffix is whatever follows the digits, e.g. "+" or "M+"
                const suffix = raw.slice(m![1].length);
                return (
                  <div
                    key={idx}
                    className={`
                      flex flex-col items-center justify-center md:py-20 py-10 px-4
                      ${idx < data4.length - 1
                        ? "md:border-r md:border-b-0 border-b-2 border-[#0B409C]"
                        : ""
                      }
                    `}
                  >
                    <span className="text-[#0B409C] text-8xl font-medium md:mb-4">
                      <ScrollCounter target={val} duration={2000} />
                      {suffix}
                    </span>
                    <span className="text-[#021442] !text-base text-center mt-2">
                      {item.fields.description}
                    </span>
                  </div>
                );
              }

              // 3) All other cases (val ≤ 1 or non-numeric) render raw
              return (
                <div
                  key={idx}
                  className={`
                    flex flex-col items-center justify-center md:py-20 py-10 px-4
                    ${idx < data4.length - 1
                      ? "md:border-r md:border-b-0 border-b-2 border-[#0B409C]"
                      : ""
                    }
                  `}
                >
                  <span className="text-[#0B409C] text-8xl font-medium md:mb-4">
                    {raw}
                  </span>
                  <span className="text-[#021442] !text-base text-center mt-2">
                    {item.fields.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
