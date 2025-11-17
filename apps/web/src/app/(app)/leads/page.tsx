"use client";

import { LeadsTable } from "@/components/leads/leads-table";
import { CreateLeadForm } from "@/components/forms/create-lead-form";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Pipeline</p>
          <h1 className="text-3xl font-semibold text-white">Leads e squads</h1>
        </div>
        <div className="flex gap-2">
          {["Todos", "Quentes", "WhatsApp", "Meta Ads"].map((label) => (
            <button key={label} className="rounded-2xl border border-white/10 px-4 py-2 text-xs text-slate-300 hover:border-brand-500">
              {label}
            </button>
          ))}
        </div>
      </div>
      <LeadsTable />
      <CreateLeadForm />
    </div>
  );
}
