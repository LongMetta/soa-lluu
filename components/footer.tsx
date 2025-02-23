"use client";
import Link from "next/link";
import Image from "next/image";
import { AppTypes } from "@/type";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getData } from "@/api/utils";

export function Footer() {
  return (
    <Suspense fallback={<div>Loading footer...</div>}>
      <FooterContent />
    </Suspense>
  );
}

function FooterContent() {
  const [data, setData] = useState<AppTypes.Data[]>([]);
  const params = useSearchParams();
  const lang = params.get("lang") || "en";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData({ lang });
      setData(data);
    };
    fetchData();
  }, [lang]);

  const dataFooter = data?.[0]?.footer ?? {};

  const renderSocialLinks = () => {
    return (
      <div className="flex items-center gap-3 justify-center relative bottom-12 md:bottom-0 ">
        <Link href="#" className="flex h-8 w-8 items-center justify-center">
          <Image
            src="/facebook.png"
            alt="Facebook Icon"
            width={24}
            height={24}
            className="hover:rotate-3 cursor-pointer"
          />
        </Link>
        <Link href="#" className="flex h-8 w-8 items-center justify-center">
          <Image
            src="/instagram.png"
            alt="Instagram Icon"
            width={24}
            height={24}
            className="hover:rotate-3 cursor-pointer"
          />
        </Link>{" "}
        <Link href="#" className="flex h-8 w-8 items-center justify-center">
          <Image
            src="/youtube.png"
            alt="Youtube Icon"
            width={24}
            height={24}
            className="hover:rotate-3 cursor-pointer"
          />
        </Link>
      </div>
    );
  };

  const renderNavLink = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 md:mt-0 xl:gap-x-44 gap-5 ">
        {dataFooter?.links?.map((item, index) => (
          <Link
            key={index}
            href={item.url || "#"}
            className="text-white/60 hover:text-white text-center md:text-left text-sm font-normal whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  };
  return (
    <footer className="bg-mainBg text-white text-lg pb-10">
      <div className="container mx-auto px-4">
        <div className="py-16">
          <div className="md:flex justify-between gap-8 text-center md:text-left">
            {/* Company Info */}
            <div className="space-y-1 font-normal text-lg">
              <h2>{dataFooter?.address?.name}</h2>
              <p>{dataFooter?.address?.phone}</p>
              <p>{dataFooter?.address?.location}</p>
            </div>

            {renderNavLink()}
          </div>
        </div>

        {/* Social Links */}

        {/* Separator Line */}
        <div className="ml-[25%] w-[75%] top-3 md:top-0 relative">
          <div className="h-px bg-gray-600/50" />
        </div>

        {/* Bottom Bar */}
        <div className="md:flex flex-row-reverse items-center justify-between md:py-6 relative">
          {renderSocialLinks()}

          <p className="text-center font-normal">
            © {dataFooter?.address?.name} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
