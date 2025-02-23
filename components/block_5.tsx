import Image from "next/image";
import type React from "react";
import { AppTypes } from "@/type";

interface ValueItemProps {
  src: string;
  title: string;
  subtitle: string;
}

export default function Block_5({ data }: { data: AppTypes.Data[] }) {
  const dataBlock_5 = data?.[0]?.bloc_4 ?? {};

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Main content section */}
      <div className="grid lg:grid-cols-2 items-start lg:mb-24 mb-12 relative p-7 pb-10 pt-10 md:p-0">
        <div className="space-y-12 relative z-10 bg-white/80 lg:bg-transparent rounded-xl p-6 lg:p-0">
          <h1 className="text-5xl md:text-[32px] lg:text-[48px] font-bold leading-[1.1]">
            <span className="text-secondaryBg block mb-2 text-2xl md:text-5xl">
              {" "}
              {dataBlock_5?.title}
            </span>
          </h1>

          <div className="space-y-6 md:pl-24">
            <div className="flex gap-1">
              <span className="text-gray-400 font-bold">|</span>
              <h2 className="text-base md:text-[28px] font-semibold text-gray-800">
                {dataBlock_5?.subtitle}
              </h2>
            </div>
            <p className="text-textMain/60 leading-relaxed md:text-lg text-[14px]">
              {dataBlock_5?.text}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 md:relative lg:h-[600px] rounded-2xl overflow-hidden bg-[#FFE5BA]">
          <Image
            src="/image-block-5.png"
            alt="Ice cream cone with pink ice cream on yellow background"
            fill
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Values section */}
      <div className="flex flex-wrap justify-center lg:justify-between gap-12">
        <ValueItem
          src="/icon/icon-1.svg"
          title={dataBlock_5?.pictos?.[0]?.title}
          subtitle={dataBlock_5?.pictos?.[0]?.description}
        />
        <ValueItem
          src="/icon/icon-2.svg"
          title={dataBlock_5?.pictos?.[1]?.title}
          subtitle={dataBlock_5?.pictos?.[1]?.description}
        />
        <ValueItem
          src="/icon/icon-3.svg"
          title={dataBlock_5?.pictos?.[2]?.title}
          subtitle={dataBlock_5?.pictos?.[2]?.description}
        />
        <ValueItem
          src="/icon/icon-4.svg"
          title={dataBlock_5?.pictos?.[3]?.title}
          subtitle={dataBlock_5?.pictos?.[3]?.description}
        />
        <ValueItem
          src="/icon/icon-5.svg"
          title={dataBlock_5?.pictos?.[4]?.title}
          subtitle={dataBlock_5?.pictos?.[4]?.description}
        />
      </div>
    </section>
  );
}

function ValueItem({ src, title, subtitle }: ValueItemProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-20 h-20 rounded-full bg-[#0E9594] flex items-center justify-center">
        {/* <Icon className="w-10 h-10 text-white" /> */}
        <Image
          src={src}
          alt="Icon"
          width={40}
          height={40}
          className="hover:rotate-3 cursor-pointer"
        />
      </div>
      <h3 className="text-lg font-medium text-textMain">{title}</h3>
      <p className="text-sm text-textMain/80 font-normal">{subtitle}</p>
    </div>
  );
}
