"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { DateCarousel } from "@admin-kit/ui/DateCarousel";
import { startOfDay } from "@admin-kit/ui/dateCarouselUtils";

import { PanelDateProvider } from "./PanelDateContext";

type Props = {
  children: ReactNode;
};

export function DLayoutClient({ children }: Props) {
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));

  return (
    <PanelDateProvider value={{ selectedDate, setSelectedDate }}>
      <div className="flex w-full flex-col gap-6 px-6 pt-6 pb-6">
        <DateCarousel
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        {children}
      </div>
    </PanelDateProvider>
  );
}
