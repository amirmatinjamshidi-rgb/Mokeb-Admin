"use client";

import type { ComponentType } from "react";
import {
  Profile2User,
  Receipt,
  UserAdd,
  UserMinus,
} from "iconsax-reactjs";
import { ArrowDown, ArrowUp } from "lucide-react";

import { toPersianDigits } from "@admin-kit/shared/lib/format";
import { cn } from "@admin-kit/shared/lib/utils";
import { toDateKey } from "@admin-kit/ui/dateCarouselUtils";

import { usePanelDate } from "../PanelDateContext";

type StatTrend = {
  value: number;
  changePercent: number;
};

type StatConfig = {
  id: string;
  title: string;
  icon: ComponentType<{
    variant?: "Outline";
    color?: string;
    size?: string | number;
  }>;
};

const STAT_CONFIG: StatConfig[] = [
  { id: "entries", title: "ورودی های امروز", icon: UserAdd },
  { id: "exits", title: "خروجی های امروز", icon: UserMinus },
  {
    id: "remainingCapacity",
    title: "ظرفیت باقی مانده (عمومی)",
    icon: Profile2User,
  },
  { id: "unseenRequests", title: "درخواست های دیده نشده", icon: Receipt },
];

function getStatsForDate(date: Date): Record<string, StatTrend> {
  const seed = date.getDate() + date.getMonth() * 31;

  return {
    entries: { value: 120 + (seed % 40), changePercent: 21 - (seed % 8) },
    exits: { value: 95 + (seed % 30), changePercent: -12 + (seed % 6) },
    remainingCapacity: { value: 340 + (seed % 50), changePercent: 8 - (seed % 5) },
    unseenRequests: { value: 14 + (seed % 10), changePercent: -5 + (seed % 4) },
  };
}

function StatCard({
  title,
  value,
  changePercent,
  icon: Icon,
}: StatConfig & StatTrend) {
  const isUp = changePercent >= 0;
  const TrendIcon = isUp ? ArrowUp : ArrowDown;

  return (
    <article
      className="flex h-[164px] w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-md"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-2">
        <Icon variant="Outline" color="#279F78" size={28} aria-hidden />

        <div className="flex flex-row flex-wrap items-center justify-end gap-1">
          <TrendIcon
            className={cn(
              "size-4 shrink-0",
              isUp ? "text-[#279F78]" : "text-[#D22B23]",
            )}
            aria-hidden
          />
          <span
            className={cn(
              "text-sm font-semibold",
              isUp ? "text-[#279F78]" : "text-[#D22B23]",
            )}
          >
            ({toPersianDigits(`${Math.abs(changePercent)}%`)})
          </span>
          <span className="text-xs text-[#61756F]">نسبت به دیروز</span>
        </div>
      </div>

      <p className="text-3xl font-bold leading-none text-[#CBA52C]">
        {toPersianDigits(value)}
      </p>

      <p className="mt-auto text-sm font-medium text-gray-500">{title}</p>
    </article>
  );
}

export function DashboardStatCards() {
  const { selectedDate } = usePanelDate();
  const stats = getStatsForDate(selectedDate);

  return (
    <div
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      dir="rtl"
      aria-label={`آمار داشبورد برای ${toDateKey(selectedDate)}`}
    >
      {STAT_CONFIG.map((config) => (
        <StatCard key={config.id} {...config} {...stats[config.id]} />
      ))}
    </div>
  );
}
