"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";

type DonutChartProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

type TooltipPayload = {
  color?: string;
  name?: string;
  value?: number;
};

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const color = item.color ?? "#22D3EE";
  const name = item.name ?? "Value";
  const value = typeof item.value === "number" ? item.value : 0;

  return (
    <div className="min-w-[180px] rounded-2xl border border-white/10 bg-[#0f1728]/95 px-4 py-3 text-white shadow-[0_20px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        {name}
      </div>
      <div className="mt-2 text-lg font-bold text-white">{formatCurrency(value, true)}</div>
    </div>
  );
}

export function DonutChart({ data }: DonutChartProps) {
  return (
    <div className="h-72 w-full md:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={64} outerRadius={94} paddingAngle={3}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => <span style={{ color: "#cbd5e1", fontSize: "12px" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
