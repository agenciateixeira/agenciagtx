import { PipelineBoard } from "@/components/pipeline/pipeline-board";

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Fluxo comercial</p>
        <h1 className="text-3xl font-semibold text-white">Pipeline e squads</h1>
      </div>
      <PipelineBoard />
    </div>
  );
}
