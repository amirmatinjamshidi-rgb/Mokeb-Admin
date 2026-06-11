"use client";
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useState } from "react";

const dataByYear = {
  "1447": [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
  ],
  "1448": [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 300 },
  ],
};
const RADIAN = Math.PI / 180;
const COLORS = ["#2f5e97", "#8A1538"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};
// #endregion
export default function StatisticsPieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const [selectedYear, setSelectedYear] = useState<YearKeys>("1448");
  type YearKeys = keyof typeof dataByYear;
  const currentData = dataByYear[selectedYear] || dataByYear["1447"];
  return (
    <div className="bg-white px-8 py-6 rounded-3xl">
      <div className="flex justify-between items-center pb-2">
        <div className="border-b-3 border-amber-500 pb-2">
          <p className="text-lg text-gray-500 font-semibold">
            جنسیت زائران امسال
          </p>
        </div>

        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as YearKeys)}
            className="appearance-none text-xs bg-white border border-gray-300 rounded-lg px-4 py-1.5 pl-8
             text-gray-600 cursor-pointer focus:outline-none"
          >
            <option value="1447" className="cursor-pointer text-xs">
              سال 1447
            </option>
            <option value="1448" className="cursor-pointer text-xs">
              سال 1448
            </option>
          </select>
        </div>
      </div>

      <div className="w-130">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "50vh",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={currentData}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
          />
          <RechartsDevtools />
        </PieChart>
      </div>
      <div className="flex justify-center gap-x-8 mt-6 pt-4">
        <div className="flex items-center gap-x-2">
          <span className="w-3 h-3 rounded-full bg-[#2f5e97]"></span>
          <p className="text-gray-600 font-medium text-xs">آقایان</p>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-3 h-3 rounded-full bg-[#8A1538]"></span>
          <p className="text-gray-600 font-medium text-xs">بانوان</p>
        </div>
      </div>
    </div>
  );
}
