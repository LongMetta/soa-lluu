import { AppTypes } from "@/type";
import Image from "next/image";

interface BannerImageProps {
  alt?: string;
  priority?: boolean;
}

const BannerImage = ({
  alt = "Banner image",
  priority = true,
}: BannerImageProps) => (
  <Image
    src="/image-banner.png"
    alt={alt}
    fill
    className="object-cover"
    priority={priority}
  />
);

interface ActivityIconProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

const ActivityIcon = ({
  src,
  alt,
  label,
  className = "",
}: ActivityIconProps) => (
  <div className={`flex flex-col items-center ${className}`}>
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className="hover:rotate-3 cursor-pointer"
    />
    {label && (
      <span className="text-white text-sm mt-2 font-medium">{label}</span>
    )}
  </div>
);

interface ActivityIconsProps {
  activities: string[];
  showLabels?: boolean;
  className?: string;
}

const ActivityIcons = ({
  activities,
  showLabels = false,
  className = "",
}: ActivityIconsProps) => {
  const icons = [
    { src: "/icon/moutains.svg", alt: "Mountains" },
    { src: "/icon/fishing.svg", alt: "Fishing" },
    { src: "/icon/crosshair.svg", alt: "Crosshair" },
  ];

  return (
    <div className={className}>
      {icons.map((icon, index) => (
        <ActivityIcon
          key={icon.src}
          {...icon}
          label={showLabels ? activities[index] : undefined}
        />
      ))}
    </div>
  );
};

export async function Banner({ data }: { data: AppTypes.Data[] }) {
  const activities = data?.[0]?.banner_menu ?? [];

  return (
    <div className="relative w-full">
      {/* Desktop Banner */}
      <div className="hidden lg:block relative w-full h-screen">
        <BannerImage alt="Banner desktop view" />
        <div className="absolute bottom-12 left-0 right-0">
          <ActivityIcons
            activities={activities}
            className="flex justify-center gap-[360px]"
          />
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="lg:hidden relative w-full h-[100dvh]">
        <BannerImage alt="Banner mobile view" />
        <div className="absolute bottom-24 left-0 right-0">
          <ActivityIcons
            activities={activities}
            showLabels
            className="flex justify-around"
          />
        </div>
      </div>
    </div>
  );
}
