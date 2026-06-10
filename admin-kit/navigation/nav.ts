import {
  LogOut,
  Settings,
  UserRoundPen ,
  Users2,
  FilePenLine,
  Receipt,
  Users,
} from "lucide-react";

import type { NavItem } from "../shared/types";

export const ADMIN_PANEL_NAV: NavItem[] = [
  {
    href: "/D/Dashboard",
    label: "داشبورد",
    icon: FilePenLine,
  },
  {
    href: "/D/Onsite-Registration",
    label: " ثبت نام حضوری",
    icon: UserRoundPen,
  },
  {
    href: "/D/Karvan-reservations",
    label: "مدیریت رزرو ها",
    icon: Receipt,
  },
  {
    href: "/D/Manage-Requests",
    label: " مدیریت درخواست ها",
    icon: Receipt,
  },
  {
    href: "/E/Manage-Karvan",
    label: " مدیریت کاروان‌ها",
    icon: Users
  },
  {
    href: "/E/Manage-Users",
    label: "مدیریت کاربران",
    icon: Users2,
  },
  {
    href: "/E/Content-Management",
    label: "مدیریت محتوا",
    icon: LogOut,
  },
  {
    href: "/E/Reports",
    label: "گزارشات و آمار",
    icon: LogOut,
  },
  {
    href: "/E/Settings",
    label: "تنظیمات",
    icon: LogOut,
  },
   
];

/** @deprecated Use ADMIN_PANEL_NAV — kept for drop-in compatibility */
export const USER_PANEL_NAV = ADMIN_PANEL_NAV;
