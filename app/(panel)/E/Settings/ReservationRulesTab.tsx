"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";

import FormTextInput from "@admin-kit/ui/FormTextInput";
import { cn } from "@admin-kit/shared/lib/utils";

import { SETTINGS_PANEL_CLASS } from "./settingsStyles";
import { UserSquareIcon } from "./settingsIcons";

type PublicRulesForm = {
  pilgrimDeadlineMinutes: string;
  maxPersonsPerReservation: string;
  maxStayDays: string;
};

type CaravanRulesForm = {
  pilgrimDeadlineDays: string;
  maxStayDays: string;
};

function RuleRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-3 sm:h-14 sm:flex-row sm:items-center sm:gap-10">
      <p className="shrink-0 text-sm font-medium text-gray-600 sm:min-w-[280px]">
        {label}
      </p>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function RulesPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(SETTINGS_PANEL_CLASS, "flex flex-col gap-8 p-6 sm:p-8")}
      dir="rtl"
    >
      <h3 className="text-base font-bold text-[#175E47]">{title}</h3>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

export function ReservationRulesTab() {
  const publicForm = useForm<PublicRulesForm>({
    defaultValues: {
      pilgrimDeadlineMinutes: "30",
      maxPersonsPerReservation: "10",
      maxStayDays: "7",
    },
    mode: "onChange",
  });

  const caravanForm = useForm<CaravanRulesForm>({
    defaultValues: {
      pilgrimDeadlineDays: "3",
      maxStayDays: "14",
    },
    mode: "onChange",
  });

  const inputClass = "[&_input]:h-14 [&_div]:h-14 [&_div]:rounded-xl";

  return (
    <div className="flex w-full flex-col gap-8">
      <RulesPanel title="قوانین رزرو عمومی">
        <RuleRow label="مهلت ثبت اطلاعات زایران (دقیقه)">
          <FormTextInput
            name="pilgrimDeadlineMinutes"
            control={publicForm.control}
            placeholder="دقیقه"
            rightIcon={UserSquareIcon}
            valueFilter="digits"
            className={inputClass}
          />
        </RuleRow>

        <RuleRow label="حداکثر نفرات هر رزرو عمومی (نفر)">
          <FormTextInput
            name="maxPersonsPerReservation"
            control={publicForm.control}
            placeholder="نفر"
            rightIcon={UserSquareIcon}
            valueFilter="digits"
            className={inputClass}
          />
        </RuleRow>

        <RuleRow label="حداکثر مدت اقامت (روز)">
          <FormTextInput
            name="maxStayDays"
            control={publicForm.control}
            placeholder="روز"
            rightIcon={UserSquareIcon}
            valueFilter="digits"
            className={inputClass}
          />
        </RuleRow>
      </RulesPanel>

      <RulesPanel title="قوانین رزرو کاروان">
        <RuleRow label="مهلت ثبت اطلاعات زایران (روز)">
          <FormTextInput
            name="pilgrimDeadlineDays"
            control={caravanForm.control}
            placeholder="روز"
            rightIcon={UserSquareIcon}
            valueFilter="digits"
            className={inputClass}
          />
        </RuleRow>

        <RuleRow label="حداکثر مدت اقامت (روز)">
          <FormTextInput
            name="maxStayDays"
            control={caravanForm.control}
            placeholder="روز"
            rightIcon={UserSquareIcon}
            valueFilter="digits"
            className={inputClass}
          />
        </RuleRow>
      </RulesPanel>
    </div>
  );
}
