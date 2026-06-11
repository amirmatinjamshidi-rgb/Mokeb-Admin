"use client";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useState } from "react";
export default function StatisticsBarChart() {
  const dataByYear = {
    "1447": [
      {
        name: "رزرو حضوری",
        uv: 550,
        pv: 800,
      },
      {
        name: "رزرو عمومی",
        uv: 750,
        pv: 650,
      },
      {
        name: "رزرو کاروان",
        uv: 780,
        pv: 850,
      },
    ],
    "1448": [
      {
        name: "رزرو حضوری",
        uv: 500,
        pv: 800,
      },
      {
        name: "رزرو عمومی",
        uv: 760,
        pv: 650,
      },
      {
        name: "رزرو کاروان",
        uv: 740,
        pv: 850,
      },
    ],
  };
  const renderCustomDot = (props: any) => {
    const { cx, cy, value } = props;
    return (
      <g key={`dot-${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r={6} fill="#C69F34" />
        <circle cx={cx} cy={cy} r={3} fill="#FFF" />
        <text
          x={cx}
          y={cy - 12}
          fill="#71717a"
          fontSize={12}
          fontWeight="bold"
          textAnchor="middle"
        >
          {value}
        </text>
      </g>
    );
  };
  const [selectedYear, setSelectedYear] = useState<YearKeys>("1448");
  type YearKeys = keyof typeof dataByYear;
  const currentData = dataByYear[selectedYear] || dataByYear["1447"];
  return (
    <div className="bg-white px-8 py-6 rounded-3xl">
      <div className="flex justify-between items-center pb-2">
        <div className="border-b-3 border-amber-500 pb-2">
          <p className="text-lg text-gray-500 font-semibold">نوع رزرو</p>
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
        <ComposedChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={currentData}
          margin={{
            top: 20,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="name"
            scale="band"
            tickLine={false}
            tick={{ fontSize: 14, fill: "#9ca3bf", dy: 10 }}
          />
          <YAxis
            width="auto"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14, fill: "#9ca3bf", dy: -5, dx: -30 }}
            domain={[0, 1000]}
            ticks={[200, 400, 600, 800, 1000]}
          />
          <Tooltip cursor={{ fill: "#f4f4f5", opacity: 0.4 }} />
          <Bar dataKey="uv" barSize={50} fill="#9CBFAD" />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#C69F34"
            strokeWidth={2}
            dot={renderCustomDot}
          />

          <RechartsDevtools />
        </ComposedChart>
      </div>
      <div className="flex justify-center gap-x-8 mt-6 pt-4">
        <div className="flex items-center gap-x-2">
          <span className="w-3 h-3 rounded-full bg-[#9CBFAD]"></span>
          <p className="text-gray-600 font-medium text-xs">۱۴۴۸</p>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-3 h-3 rounded-full bg-[#C69F34]"></span>
          <p className="text-gray-600 font-medium text-xs">۱۴۴۷</p>
        </div>
      </div>
    </div>
  );
}
