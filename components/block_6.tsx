"use client";
import Image from "next/image";
import dayjs from "dayjs";
import { ArrowUpRight, Instagram } from "lucide-react";
import { AppTypes } from "@/type";
import { useState } from "react";

export default function Block_6({ data }: { data: AppTypes.Data[] }) {
  const [indexActiveCard, setIndexActiveCard] = useState<number>(0);
  const dataBlock_6 = data?.[0]?.bloc_5 ?? {};

  const galleryImages = [
    {
      src: "/image-1-block-6.png",
      background: "bg-[#F8D7E3]",
      alt: "Avocado on pink background",
      reviews: dataBlock_6?.reviews?.[0] ?? [],
    },
    {
      src: "/image-2-block-6.png",
      background: "bg-[#D7F8E3]",
      alt: "Cherries on mint background",
      reviews: dataBlock_6?.reviews?.[1] ?? [],
    },
    {
      src: "/image-3-block-6.png",
      background: "bg-[#D7E3F8]",
      alt: "Orange on blue background",
      reviews: dataBlock_6?.reviews?.[2] ?? [],
    },
    {
      src: "/image-4-block-6.png",
      background: "bg-[#D7E3F8]",
      alt: "Orange slice on blue background",
      reviews: dataBlock_6?.reviews?.[3] ?? [],
    },
  ];

  const previewCard = () => {
    return (
      <div className="rounded-[2rem] p-6 mb-8">
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="relative aspect-[16/9]">
            <Image
              src={galleryImages[indexActiveCard]?.src || "/placeholder.svg"}
              alt="Plate of fresh fruits and food"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-3 md:space-x-40 gap-3">
              <div>
                <div className="flex items-center justify-between mb-4 md:mb-0">
                  <h2 className="md:text-2xl text-lg font-semibold md:mb-4">
                    {galleryImages[indexActiveCard]?.reviews?.author}
                  </h2>
                  <span className="text-[14px] text-black items-center md:hidden block whitespace-nowrap">
                    {galleryImages[indexActiveCard]?.reviews?.date
                      ? dayjs(
                          galleryImages[indexActiveCard]?.reviews?.date
                        ).format("DD MMM YYYY")
                      : ""}
                  </span>
                </div>
                <p className="text-[#666666] md:text-lg text-[14px] font-normal">
                  {galleryImages[indexActiveCard]?.reviews?.review}
                </p>
              </div>
              <span className="text-xl text-black hidden md:block whitespace-nowrap">
                {galleryImages[indexActiveCard]?.reviews?.date
                  ? dayjs(galleryImages[indexActiveCard]?.reviews?.date).format(
                      "DD MMM YYYY"
                    )
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#EAFCFF] to-[#FFFFFF] ">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 md:flex-row-reverse md:gap-8 gap-3 mb-8">
          <h1 className="text-[2.5rem] font-extrabold leading-tight text-[#4A2B2B]">
            {dataBlock_6?.title}
            <span className="text-[#FF6B6B]"> #BASIC</span>
          </h1>
          <p className="text-[#666666] text-lg leading-relaxed">
            {dataBlock_6?.text}
          </p>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 w-full h-full ">
            <Image
              src="/image-bg-block-6.png"
              alt="Background pattern"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative z-10 ">{previewCard()}</div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-5">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`${image.background} rounded-[1.25rem] overflow-hidden`}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center text-white bg-black/30 backdrop-blur-sm cursor-pointer"
                  onClick={() => setIndexActiveCard(index)}
                >
                  <div className="flex items-center gap-2">
                    <Instagram size={18} />
                    <span className="text-sm font-medium">
                      {image.reviews?.author}
                    </span>
                  </div>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-lg">
          Consultez <span className="font-medium">@BASIC</span> et{" "}
          <span className="text-[#FF6B6B] font-medium">#BASIC</span> pour
          découvrir les ex périences inoubliables des pourvoiries et activités
          BASIC.
        </p>
      </div>
    </div>
  );
}
