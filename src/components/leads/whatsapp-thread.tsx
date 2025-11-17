import { whatsappMessages } from "@/lib/mock-data";

export function WhatsappThread() {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-slate-900/60 p-5">
      <p className="text-sm font-semibold text-white">WhatsApp</p>
      <div className="space-y-3">
        {whatsappMessages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
              message.direction === "in" ? "bg-white/10 text-white" : "ml-auto bg-brand-500 text-slate-950"
            }`}
          >
            <p>{message.content}</p>
            <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
