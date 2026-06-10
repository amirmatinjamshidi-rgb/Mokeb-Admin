import { Bell, Bolt, Search } from "lucide-react";
import Image from "next/image";

type Props = {
  userName?: string;
  avatarSrc?: string;
};

export function NavBar({
  userName = "مدیر سیستم",
  avatarSrc = "/profile-panel.jpg",
}: Props) {
  return (
    <div
      dir="rtl"
      className="sticky flex h-16 w-full items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-white px-10 shadow-xs shadow-gray-300"
    >
      <div className="relative cursor-pointer">
        <input
          type="search"
          placeholder="جستجو"
          className="cursor-pointer rounded-xl border py-2.5 pr-14 pl-10 text-gray-500"
        />
        <Search className="absolute top-3 right-4 size-5 text-gray-500" />
      </div>
      <div className="flex items-center gap-x-7">
        <Bolt stroke="#61756F" />
        <Bell className="cursor-pointer text-[#61756F]" />
        <div className="flex items-center gap-x-3">
          <p className="text-xs text-gray-500">{userName}</p>
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
