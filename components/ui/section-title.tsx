interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center md:mb-20 mb-14">
      <div className="relative inline-block">
        <h2 className="text-2xl md:text-4xl font-semibold text-secondaryBg px-8 relative">
          <span className="absolute left-[-200px] top-1/2 w-[180px] h-[1px] bg-[#BBBBBB]"></span>
          {title}
          <span className="absolute right-[-200px] top-1/2 w-[180px] h-[1px] bg-[#BBBBBB]"></span>
        </h2>
      </div>
      {subtitle && (
        <p className="text-[14px] md:text-[52px] text-textMain font-normal mt-2">{subtitle}</p>
      )}
    </div>
  );
}
