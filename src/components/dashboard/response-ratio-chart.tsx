"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { whatsappResponseRate } from "@/lib/mock-data";

ChartJS.register(ArcElement, Tooltip);

export function ResponseRatioChart() {
  const data = {
    labels: whatsappResponseRate.map((item) => item.label),
    datasets: [
      {
        data: whatsappResponseRate.map((item) => item.value),
        backgroundColor: ["rgba(34,197,94,0.9)", "rgba(15,23,42,0.8)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
      <p className="text-sm text-slate-400">WhatsApp · taxa de resposta</p>
      <p className="text-2xl font-semibold text-white">64%</p>
      <div className="mt-6">
        <Doughnut data={data} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        {whatsappResponseRate.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 px-3 py-2 text-center text-slate-300">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="text-lg font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
