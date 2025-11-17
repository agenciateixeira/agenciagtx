"use client";

import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LeadsTrendChart } from "@/components/dashboard/leads-trend-chart";
import { ResponseRatioChart } from "@/components/dashboard/response-ratio-chart";
import { CreateLeadForm } from "@/components/forms/create-lead-form";
import { LeadsTable } from "@/components/leads/leads-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Operação</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">GTX Intelligence Board</h1>
        <p className="text-sm text-slate-400">Monitoramento em tempo real dos squads e funis da agência.</p>
      </div>

      <KpiCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeadsTrendChart />
        </div>
        <ResponseRatioChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <LeadsTable />
        <CreateLeadForm />
      </div>
    </div>
  );
}
