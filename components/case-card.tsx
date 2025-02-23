import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CaseCardProps {
  image: string;
  caseTitle: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

export function CaseCard({
  image,
  caseTitle,
  subtitle,
  description,
  buttonText,
}: CaseCardProps) {
  return (
    <div className="flex flex-col transform transition-all duration-300 hover:-translate-y-10 hover:shadow-xl rounded-lg overflow-hidden bg-white">
      <div className="relative aspect-[4/3] mb-4 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={caseTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="md:space-y-2 space-y-4 md:p-4">
        <h3 className="text-secondaryBg font-medium text-xl">{caseTitle}</h3>
        <h4 className="text-xl font-medium text-textMain  sm:h-fit md:h-fit">
          {subtitle}
        </h4>
        <p className="text-textMain/80 line-clamp-2 sm:h-fit md:h-20">{description}</p>
        <Button variant="outline" className="md:mt-4 group rounded-full">
          {buttonText}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#0E9594]" />
        </Button>
      </div>
    </div>
  );
}
