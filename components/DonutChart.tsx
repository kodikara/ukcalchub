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
  total,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  total: number;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const color = item.color ?? "#22D3EE";
  const name = item.name ?? "Value";
  const value = typeof item.value === "number" ? item.value : 0;
  const share = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="min-w-[180px] rounded-2xl border border-white/10 bg-[#0f1728]/95 px-4 py-3 text-white shadow-[0_20px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        {name}
      </div>
      <div className="mt-2 text-lg font-bold text-white">{formatCurrency(value, true)}</div>
      <div className="mt-1 text-xs font-medium text-slate-300">{share.toFixed(1)}% of total</div>
    </div>
  );
}

function DonutLegend({
  data,
}: {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-3 text-xs text-slate-300">
      {data.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.name}</span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ data }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0);

  return (
    <div className="h-72 w-full md:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={64} outerRadius={94} paddingAngle={3}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip total={total} />} />
          <Legend verticalAlign="bottom" align="center" content={<DonutLegend data={data} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
