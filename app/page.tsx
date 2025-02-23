import { getData } from "@/api/utils";
import { Banner } from "@/components/banner";
import Block_2 from "@/components/block_2";
import Block_3 from "@/components/block_3";
import { Block_4 } from "@/components/block_4";
import Block_5 from "@/components/block_5";
import Block_6 from "@/components/block_6";
import Block_7 from "@/components/block_7";
import AnimatedSection from "@/components/AnimatedSection";
import Block_1 from "@/components/block_1";

type Params = Promise<{ slug: string }>;

// export async function generateMetadata(props: {
//   params: Params;
//   searchParams: SearchParams;
// }) {
//   const params = await props.params;
//   const searchParams = await props.searchParams;
//   const slug = params.slug;
//   const query = searchParams.query;

//   return {
//     title: "Home",
//   };
// }

export default async function Home({
  params,
}: {
  params: Params;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.slug || "en";

  const data = await getData({ lang });

  return (
    <main className="relative overflow-hidden">
      <AnimatedSection>
        <Banner data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.2}>
        <Block_1 data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.3}>
        <Block_2 data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.4}>
        <Block_3 />
      </AnimatedSection>
      
      <AnimatedSection delay={0.5}>
        <Block_4 data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.6}>
        <Block_5 data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.7}>
        <Block_6 data={data} />
      </AnimatedSection>
      
      <AnimatedSection delay={0.8}>
        <Block_7 data={data} />
      </AnimatedSection>
    </main>
  );
}
