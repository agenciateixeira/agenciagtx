import { leadEvents } from "@/lib/mock-data";
import { CheckCircle2 } from "lucide-react";

export function EventTimeline() {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
      <p className="text-sm font-semibold text-white">Timeline de eventos</p>
      <ol className="mt-4 space-y-4">
        {leadEvents.map((event, index) => (
          <li key={event.id} className="relative pl-8">
            <div className="absolute left-1 top-1.5 flex items-center">
              <span className="absolute left-3 top-5 h-8 w-px bg-white/10" />
              <CheckCircle2 className="relative size-4 text-brand-400" />
            </div>
            <p className="text-sm font-medium text-white">{event.label}</p>
            <p className="text-xs text-slate-500">{event.timestamp}</p>
            {index === leadEvents.length - 1 ? null : <span className="absolute left-[15px] top-[30px] h-4 w-px bg-white/5" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
