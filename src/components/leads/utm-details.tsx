import { utmBreakdown } from "@/lib/mock-data";

export function UTMDetails() {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-5">
      <p className="text-sm font-semibold text-white">UTM Fingerprint</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {utmBreakdown.map((item) => (
          <div key={item.key} className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
            <p className="text-xs uppercase text-slate-500">{item.key}</p>
            <p className="truncate text-sm text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
