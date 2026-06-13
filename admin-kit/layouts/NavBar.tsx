"use client";

import { Bell, Bolt, Menu, Search } from "lucide-react";
import Image from "next/image";

type Props = {
  userName?: string;
  avatarSrc?: string;
  onMenuToggle?: () => void;
  menuOpen?: boolean;
};

export function NavBar({
  userName = "مدیر سیستم",
  avatarSrc = "/profile-panel.jpg",
  onMenuToggle,
  menuOpen = false,
}: Props) {
  return (
    <div
      dir="rtl"
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-white px-4 shadow-xs shadow-gray-300 sm:px-10"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-[#61756F] transition-colors hover:bg-[#F5F9F6] lg:hidden"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          <Menu className="size-5" aria-hidden />
        </button>

        <div className="relative min-w-0 flex-1 max-w-md cursor-pointer">
          <input
            type="search"
            placeholder="جستجو"
            className="w-full cursor-pointer rounded-xl border py-2.5 pr-14 pl-10 text-gray-500"
          />
          <Search className="absolute top-3 right-4 size-5 text-gray-500" />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-x-4 sm:gap-x-7">
        <Bolt stroke="#61756F" className="hidden sm:block" />
        <Bell className="hidden cursor-pointer text-[#61756F] sm:block" />
        <div className="flex items-center gap-x-3">
          <p className="hidden text-xs text-gray-500 sm:block">{userName}</p>
          <Image
            src={avatarSrc}
            alt="Profile"
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
