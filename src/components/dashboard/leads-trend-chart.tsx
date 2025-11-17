"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { leadsByDay } from "@/lib/mock-data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function LeadsTrendChart() {
  const data = {
    labels: leadsByDay.map((item) => item.date),
    datasets: [
      {
        label: "Leads",
        data: leadsByDay.map((item) => item.value),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#22c55e",
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#94a3b8", beginAtZero: true },
      },
    },
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Leads por dia</p>
          <p className="text-2xl font-semibold text-white">Últimos 7 dias</p>
        </div>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-200">+28% WoW</span>
      </div>
      <div className="mt-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
