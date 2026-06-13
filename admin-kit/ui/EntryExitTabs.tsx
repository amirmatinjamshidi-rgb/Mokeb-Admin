"use client";

import { cn } from "@admin-kit/shared/lib/utils";

export type EntryExitTabId = "entry" | "exit";

export const ENTRY_EXIT_TABS: { id: EntryExitTabId; label: string }[] = [
  { id: "entry", label: "ورود" },
  { id: "exit", label: "خروج" },
];

type Props = {
  value: EntryExitTabId;
  onValueChange: (id: EntryExitTabId) => void;
  className?: string;
};

export function EntryExitTabs({ value, onValueChange, className }: Props) {
  return (
    <div className={cn("w-full", className)} dir="rtl">
      <div
        className="flex items-end gap-8 border-b border-[#DFC369]/40"
        role="tablist"
        aria-label="ورود و خروج"
      >
        {ENTRY_EXIT_TABS.map((tab) => {
          const isActive = value === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`entry-exit-tab-${tab.id}`}
              onClick={() => onValueChange(tab.id)}
              className={cn(
                "bg-transparent pb-3 pt-2 text-sm font-medium leading-none outline-none transition-colors",
                "hover:text-[#175E47] focus-visible:ring-2 focus-visible:ring-[#DFC369]/60 focus-visible:ring-offset-2",
                isActive ? "text-[#175E47]" : "text-[#61756F]",
              )}
            >
              <span
                className={cn(
                  "inline-block border-b-[3px] border-transparent pb-1",
                  isActive && "border-[#DFC369]",
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
