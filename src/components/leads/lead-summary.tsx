import { defaultLeadId, leadsTableData } from "@/lib/mock-data";

type Props = {
  leadId?: string;
};

export function LeadSummary({ leadId = defaultLeadId }: Props) {
  const lead = leadsTableData.find((item) => item.id === leadId) ?? leadsTableData[0];

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-slate-500">{lead.id}</p>
          <p className="text-2xl font-semibold text-white">{lead.name}</p>
          <p className="text-sm text-slate-400">
            {lead.company} · {lead.source}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-slate-500">Score</p>
          <p className="text-3xl font-semibold text-brand-200">{lead.score}</p>
          <p className="text-xs text-slate-500">Stage: {lead.stage}</p>
        </div>
      </div>
    </div>
  );
}
