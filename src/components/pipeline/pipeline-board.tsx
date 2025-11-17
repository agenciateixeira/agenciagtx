import { pipelineStages, leadsTableData } from "@/lib/mock-data";

export function PipelineBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {pipelineStages.map((stage) => (
        <div key={stage.key} className="rounded-3xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">{stage.title}</p>
            <span className="text-xs text-slate-400">{stage.cards.length}</span>
          </div>
          <div className="mt-4 space-y-3">
            {stage.cards.length === 0 && <p className="text-xs text-slate-500">Sem leads</p>}
            {stage.cards.map((leadId) => {
              const lead = leadsTableData.find((item) => item.id === leadId);
              if (!lead) return null;
              return (
                <div key={leadId} className="rounded-2xl border border-white/10 bg-slate-900/40 px-3 py-3">
                  <p className="text-sm font-medium text-white">{lead.name}</p>
                  <p className="text-xs text-slate-400">{lead.company}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
