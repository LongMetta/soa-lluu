import { SectionTitle } from "@/components/ui/section-title";
import { CaseCard, type CaseCardProps } from "@/components/case-card";
import { AppTypes } from "@/type";

interface Case {
  category: string;
  tagline: string;
  description: string;
  cta: string;
}

interface Block1Data {
  title: string;
  subtitle: string;
  cases: Case[];
}

export default async function Block_1({ data }: { data: AppTypes.Data[] }) {
  const dataBlock_1 = (data?.[0]?.bloc_1 ?? {}) as Block1Data;

  const cards: CaseCardProps[] = [
    {
      image: "/image_1-block-1.png",
      caseTitle: dataBlock_1?.cases?.[0]?.category ?? "",
      subtitle: dataBlock_1?.cases?.[0]?.tagline ?? "",
      description: dataBlock_1?.cases?.[0]?.description ?? "",
      buttonText: dataBlock_1?.cases?.[0]?.cta ?? "",
    },
    {
      image: "/image_2-block-1.png",
      caseTitle: dataBlock_1?.cases?.[1]?.category ?? "",
      subtitle: dataBlock_1?.cases?.[1]?.tagline ?? "",
      description: dataBlock_1?.cases?.[1]?.description ?? "",
      buttonText: dataBlock_1?.cases?.[1]?.cta ?? "",
    },
    {
      image: "/image_3-block-1.png",
      caseTitle: dataBlock_1?.cases?.[2]?.category ?? "",
      subtitle: dataBlock_1?.cases?.[2]?.tagline ?? "",
      description: dataBlock_1?.cases?.[2]?.description ?? "",
      buttonText: dataBlock_1?.cases?.[2]?.cta ?? "",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <SectionTitle
        title={dataBlock_1?.title ?? ""}
        subtitle={dataBlock_1?.subtitle ?? ""}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <CaseCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
