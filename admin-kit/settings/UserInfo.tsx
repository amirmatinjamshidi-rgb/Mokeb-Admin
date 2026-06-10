import { FileText, SquareCheck } from "lucide-react";

import { cn } from "@admin-kit/shared/lib/utils";
import { SETTINGS_SECTION_BOX_CLASS } from "@admin-kit/settings/box-classes/settingsSectionBox";

type Props = {
  className?: string;
  phone?: string;
};

export function UserInfo({
  className,
  phone = "09123456789",
}: Props) {
  return (
    <div className={cn(SETTINGS_SECTION_BOX_CLASS, className)}>
      <div className="flex flex-row items-center gap-2">
        <FileText className="size-5 text-gray-500" aria-hidden />
        <p className="text-lg font-medium text-gray-500">اطلاعات ورود</p>
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex h-full max-h-10 w-full max-w-109.75 items-center gap-26.75 text-gray-500">
          <p>شماره موبایل اصلی:</p>
          <p>{phone}</p>
        </div>
        <div className="flex h-full max-h-10 w-full max-w-109.75 flex-row items-center gap-26.75 text-gray-500">
          <p>وضعیت حساب :</p>
          <p className="flex flex-row items-center gap-2">
            <SquareCheck className="size-4" stroke="#23D283" />
            <span className="text-sm font-medium text-[#23D283]">فعال</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        dir="rtl"
        className="flex h-14.5 w-full max-w-99.5 items-center justify-center gap-2 self-end rounded-xl border border-[#175E47] text-sm font-medium text-[#175E47]"
      >
        تغییر شماره ورود
      </button>
    </div>
  );
}

export default UserInfo;
