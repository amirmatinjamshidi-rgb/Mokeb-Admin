"use client";

import { cn } from "@admin-kit/shared/lib/utils";

export type AdminSettingsTabId = "capacity" | "rules";

export const ADMIN_SETTINGS_TABS: { id: AdminSettingsTabId; label: string }[] = [
  { id: "capacity", label: "مدیریت ظرفیت" },
  { id: "rules", label: "قوانین رزرو" },
];

type Props = {
  value: AdminSettingsTabId;
  onValueChange: (id: AdminSettingsTabId) => void;
  className?: string;
};

export function AdminSettingsTabs({ value, onValueChange, className }: Props) {
  return (
    <div className={cn("w-full", className)} dir="rtl">
      <div
        className="flex h-12 w-full items-end border-b-2 border-[#DFC369]"
        role="tablist"
        aria-label="تنظیمات ادمین"
      >
        {ADMIN_SETTINGS_TABS.map((tab) => {
          const isActive = value === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`admin-settings-tab-${tab.id}`}
              onClick={() => onValueChange(tab.id)}
              className={cn(
                "flex h-12 min-w-0 flex-1 flex-col items-center justify-start px-5 pt-4",
                "text-sm font-medium leading-none outline-none transition-colors",
                "border-b-4 border-transparent -mb-0.5",
                "hover:text-[#175E47] focus-visible:ring-2 focus-visible:ring-[#DFC369]/60 focus-visible:ring-offset-2",
                isActive ? "border-[#DFC369] text-[#175E47]" : "text-[#61756F]",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
