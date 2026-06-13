"use client";

import StatisticsAreaChart from "@/chart/StatisticsAreaChart";
import StatisticsBarChart from "@/chart/StatisticsBarChart";
import StatisticsPieChart from "@/chart/StatisticsPieChart";

export function ReportsContent() {
  return (
    <div className="flex w-full flex-col gap-6" dir="rtl">
      <div className="flex w-full flex-col gap-6 xl:flex-row xl:items-stretch">
        <div className="min-w-0 flex-1">
          <StatisticsBarChart />
        </div>
        <div className="min-w-0 flex-1">
          <StatisticsPieChart />
        </div>
      </div>

      <StatisticsAreaChart />
    </div>
  );
}
