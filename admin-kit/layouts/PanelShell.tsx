"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PanelRightClose } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { ROUTES } from "@admin-kit/navigation/routes";
import { cn } from "@admin-kit/shared/lib/utils";
import { USER_PANEL_NAV } from "@admin-kit/navigation/nav";
import { useAuthStore } from "@admin-kit/shared/store/authStore";
import { SidebarNav } from "@admin-kit/layouts/SidebarNav";
import { NavBar } from "@admin-kit/layouts/NavBar";
type Props = {
  children: ReactNode;
};

const sidebarSurfaceClass =
  "flex w-[268px] max-w-[88vw] shrink-0 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl bg-[#71A792] px-4 py-10";

export function PanelShell({ children }: Props) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push(ROUTES.home);
    router.refresh();
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      <div className="flex min-h-36 w-59 max-w-full flex-col items-center gap-6 ps-4">
        <Link
          href={ROUTES.home}
          onClick={closeMobile}
          className="flex w-full flex-col items-center gap-6 outline-none"
        >
          <Image
            src="/Logo-white.png"
            alt="موکب"
           
            width={56}
            height={56}
            className="size-14 object-contain"
          />
          <div className="flex h-16 w-55 max-w-full flex-col items-center justify-center gap-4 text-center">
            <p className="text-base font-bold leading-6 text-white">
              پنل کاربری
            </p>
            <p className="truncate text-sm font-medium leading-5 text-white/95">
              {user?.name ?? "زائر گرامی"}
            </p>
          </div>
        </Link>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-[#71A792]">
        <SidebarNav items={USER_PANEL_NAV} onNavigate={closeMobile} />
      </div>
    </>
  );

  return (
    <div className="flex min-h-dvh w-full bg-[#F5F9F6]" dir="rtl">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        // aria-hidden={!mobileOpen}
        onClick={closeMobile}
      />

      <aside
        className={cn(
          sidebarSurfaceClass,
          "relative inset-y-0 right-0 z-50 shadow-2xl transition-transform lg:static lg:z-0 lg:top-0 lg:h-dvh lg:max-h-256 lg:translate-x-0 lg:shadow-none",
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        <button
          type="button"
          className="absolute inset-e-4 top-4 rounded-lg p-2 text-white hover:bg-white/15 lg:hidden"
          aria-label="بستن منو"
          onClick={closeMobile}
        >
          <PanelRightClose className="size-5" />
        </button>
        {sidebarContent}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col " dir="ltr">
        <NavBar />

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

/** @deprecated Use PanelShell */
export const UserPanelShell = PanelShell;
