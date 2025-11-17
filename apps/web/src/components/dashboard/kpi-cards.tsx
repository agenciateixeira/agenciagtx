"use client";

import { dashboardMetrics } from "@/lib/mock-data";

export function KpiCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboardMetrics.map((metric) => (
        <div key={metric.label} className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 to-white/5 p-5">
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
          <p className="text-xs text-brand-200">{metric.delta}</p>
        </div>
      ))}
    </div>
  );
}
