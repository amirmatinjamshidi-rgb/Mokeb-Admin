import type { ReactNode } from "react";

import { cn } from "@admin-kit/shared/lib/utils";

type Props = {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  underCarousel?: boolean;
  className?: string;
};

export function PanelPageShell({
  title,
  icon,
  children,
  underCarousel = false,
  className,
}: Props) {
  return (
    <section
      dir="rtl"
      className={cn(
        "flex w-full flex-col gap-4",
        underCarousel ? "px-0 pt-0 pb-0" : "px-6 pt-6 pb-6",
        className,
      )}
    >
      <h2 className="flex items-center gap-3 text-2xl font-bold leading-8 text-gray-500">
        {icon}
        <span>{title}</span>
      </h2>

      {children}
    </section>
  );
}

export const panelPageIconClass =
  "size-6 shrink-0 text-[#D8B648]";
