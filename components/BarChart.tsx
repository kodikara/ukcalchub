"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

type ChartRow = {
  label: string;
  value: number;
  color?: string;
};

type BarChartProps = {
  data: ChartRow[];
};

type TooltipPayload = {
  color?: string;
  name?: string;
  payload?: ChartRow;
  value?: number;
};

function ChartTooltip({
  active,
  payload,
  label,
  total,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  total: number;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  const color = item.color ?? item.payload?.color ?? "#22D3EE";
  const name = item.payload?.label ?? item.name ?? label ?? "Value";
  const value = typeof item.value === "number" ? item.value : 0;
  const share = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="min-w-[180px] rounded-2xl border border-white/10 bg-[#0f1728]/95 px-4 py-3 text-white shadow-[0_20px_40px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        {name}
      </div>
      <div className="mt-2 text-lg font-bold text-white">{formatCurrency(value, true)}</div>
      <div className="mt-1 text-xs font-medium text-slate-300">{share.toFixed(1)}% of this chart total</div>
    </div>
  );
}

function ChartLegend({ data }: { data: ChartRow[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pb-2 pt-1 md:justify-end">
      {data.map((entry) => (
        <div key={entry.label} className="flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color ?? "#22D3EE" }} />
          <span>{entry.label}</span>
        </div>
      ))}
    </div>
  );
}

export function BarChart({ data }: BarChartProps) {
  const total = data.reduce((sum, item) => sum + Math.max(0, item.value), 0);

  return (
    <div className="h-72 w-full md:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={56}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value: number) => formatCompactCurrency(value)}
          />
          <Tooltip
            content={<ChartTooltip total={total} />}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
          <Legend verticalAlign="top" align="right" content={<ChartLegend data={data} />} />
          <Bar dataKey="value" radius={[16, 16, 8, 8]}>
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.color ?? "#0f766e"} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
