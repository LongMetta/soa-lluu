"use client";

import { AppTypes } from "@/type";
import MapComponent from "@/components/ui/map-component";

export default function Block_2({ data }: { data: AppTypes.Data[] }) {
  const dataBlock_2 = data?.[0]?.bloc_2 ?? {};

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <div className="relative inline-block">
          <h2 className="text-2xl md:text-4xl mb-3 md:mb-0 font-semibold text-secondaryBg px-8 relative">
            <span className="absolute left-[-200px] top-1/2 w-[180px] h-[1px] bg-[#BBBBBB]"></span>
            {dataBlock_2?.title ?? ""}
            <span className="absolute right-[-200px] top-1/2 w-[180px] h-[1px] bg-[#BBBBBB]"></span>
          </h2>
        </div>
      </div>

      <div className="w-full rounded-lg overflow-hidden shadow-lg -z-20 relative"></div>
      <MapComponent data={data} />
    </section>
  );
}
