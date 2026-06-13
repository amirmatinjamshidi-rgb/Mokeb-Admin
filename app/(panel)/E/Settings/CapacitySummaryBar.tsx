"use client";

import { toPersianDigits } from "@admin-kit/shared/lib/format";
import { cn } from "@admin-kit/shared/lib/utils";

import { MOCK_CAPACITY_SEGMENTS } from "./mockCapacityData";
import { SETTINGS_PANEL_CLASS } from "./settingsStyles";

function ValueRow({
  partA,
  partB,
  total,
}: {
  partA: number;
  partB: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-4 text-lg font-bold leading-none">
      <span className="text-[#2E7DDC]">({toPersianDigits(partA)},</span>
      <span className="text-[#D22B23]">{toPersianDigits(partB)})</span>
      <span className="text-[#CBA52C]">{toPersianDigits(total)}</span>
    </div>
  );
}

function Divider() {
  return <div className="mx-4 h-12 w-px shrink-0 bg-gray-200" aria-hidden />;
}

export function CapacitySummaryBar() {
  return (
    <div
      className={cn(
        SETTINGS_PANEL_CLASS,
        "flex h-[110px] w-full items-center justify-center px-6 py-5 sm:px-[72px]",
      )}
      dir="rtl"
    >
      {MOCK_CAPACITY_SEGMENTS.map((segment, index) => (
        <div key={segment.title} className="flex items-center">
          {index > 0 ? <Divider /> : null}
          <div className="flex flex-col items-center justify-center gap-4 px-4">
            <ValueRow
              partA={segment.partA}
              partB={segment.partB}
              total={segment.total}
            />
            <span className="text-sm font-medium text-gray-500">
              {segment.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
