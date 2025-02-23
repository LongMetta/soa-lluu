"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppTypes } from "@/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getData } from "@/api/utils";
import Loading from "@/components/Loading";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => (
  <Link href={href} className={`text-white hover:text-white/80 ${className}`}>
    {children}
  </Link>
);

interface IconButtonProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const IconButton = ({
  src,
  alt,
  size = 24,
  className = "",
}: IconButtonProps) => (
  <Image
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`hover:rotate-3 cursor-pointer ${className}`}
  />
);

export function Header() {
  return (
    <Suspense
      fallback={
        <div className="h-dvh flex justify-center">
          <Loading />
        </div>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}

function HeaderContent() {
  const [language, setLanguage] = useState("en");
  const params = useSearchParams();
  const router = useRouter();
  const lang = params.get("lang") || "en";

  const [data, setData] = useState<AppTypes.Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData({ lang });
      setData(data);
    };
    fetchData();
  }, [lang, language]);

  useEffect(() => {
    router.push(`/?lang=${language}`);
  }, [language, router]);

  const menuItems = data?.[0]?.head_menu ?? [];

  const MobileMenu = () => (
    <div className="md:hidden px-3 flex items-center gap-1">
      <div className="block md:hidden">{renderSelectLanguage()}</div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white w-6 h-6"
            aria-label="Open menu"
          >
            <Menu className="h-20 w-20" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-[#4A3B3B]">
          <nav className="flex flex-col gap-4">
            <NavLink href="/" className="text-xl font-bold">
              LOGO SAMPLE
            </NavLink>
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <NavLink key={item} href="#" className="text-lg">
                  {item}
                </NavLink>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );

  const DesktopNav = () => (
    <nav className="hidden md:flex mx-auto justify-center flex-1">
      <div className="flex  md:space-x-5 xl:space-x-20  whitespace-nowrap items-center">
        {menuItems.map((item) => (
          <NavLink key={item} href="#">
            {item}
          </NavLink>
        ))}
      </div>
    </nav>
  );

  const renderSelectLanguage = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-0 text-gray-400 hover:text-white hover:bg-transparent focus:bg-transparent active:bg-transparent uppercase flex items-center"
          >
            <span className="ml-2">{language}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-[#4A3B3B] border-gray-600"
          align="start"
        >
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className="text-gray-400 focus:text-white focus:bg-inherit"
          >
            <span className="text-3xl">🇬🇧</span>
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("fr")}
            className="text-gray-400 focus:text-white focus:bg-inherit"
          >
            <span className="text-3xl">🇫🇷</span>
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const RightIcons = () => (
    <div className="items-center gap-5 hidden md:flex">
      {renderSelectLanguage()}
      <div className="gap-5 hidden md:flex">
        <IconButton src="/icon/moutains-white.svg" alt="Mountains" />
        <IconButton src="/icon/fishing-white.svg" alt="Fishing" />
        <IconButton src="/icon/crosshair-white.svg" alt="Crosshair" />
        <Button
          className="flex bg-[#F2542D] text-white rounded-full px-8 relative hover:rotate-3 hover:bg-[#F2542D]/80"
          aria-label="Action button"
        >
          <IconButton
            src="/icon/move-up-right.svg"
            alt="Arrow"
            size={12}
            className="absolute left-8"
          />
        </Button>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 z-50 w-full bg-mainBg/70 backdrop-blur-sm">
      <div className="container flex h-[72px] items-center px-4 mx-auto relative justify-between">
        <NavLink
          href="/"
          className="lg:text-[15px] text-[10.5px] font-bold whitespace-nowrap"
        >
          LOGO SAMPLE
        </NavLink>

        <MobileMenu />
        <DesktopNav />
        <RightIcons />
      </div>
    </header>
  );
}
