import { Button } from "@/components/ui/button";
import { AppTypes } from "@/type";

export default function Block_7({ data }: { data: AppTypes.Data[] }) {
  const dataBlock_7 = data?.[0]?.bloc_6 ?? {};

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/image-block-7.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <div className="px-7">
          <h1 className="text-mainBg text-[52px] font-semibold">
            {dataBlock_7?.title}
          </h1>
          <p className="text-mainBg/60 text-[52px] font-semibold mb-6">
            {dataBlock_7?.subtitle}
          </p>
        </div>
        <p className="text-mainBg text-2xl font-normal mb-8 max-w-6xl mx-auto">
          {dataBlock_7?.text}
        </p>
        <Button className="bg-secondaryBg hover:bg-secondaryBg/80 text-white px-8 py-2 rounded-full text-lg">
          {dataBlock_7?.button}
        </Button>
      </div>
    </div>
  );
}
