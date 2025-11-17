"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [webhook, setWebhook] = useState(true);
  const [alerts, setAlerts] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Admin</p>
        <h1 className="text-3xl font-semibold text-white">Configurações</h1>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
        <p className="text-sm font-semibold text-white">Integrações</p>
        <div className="mt-4 space-y-4 text-sm text-slate-300">
          <label className="flex items-center justify-between">
            <span>Webhook WhatsApp</span>
            <input type="checkbox" checked={webhook} onChange={() => setWebhook(!webhook)} className="size-4" />
          </label>
          <label className="flex items-center justify-between">
            <span>Alertas de automações</span>
            <input type="checkbox" checked={alerts} onChange={() => setAlerts(!alerts)} className="size-4" />
          </label>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-6">
        <p className="text-sm font-semibold text-white">Tokens</p>
        <p className="text-xs text-slate-400">Configure as chaves JWT e credenciais externas no backend.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-500">Supabase URL</p>
            <code className="mt-1 block truncate rounded-2xl bg-black/40 p-3 text-xs text-slate-200">
              {process.env.NEXT_PUBLIC_SUPABASE_URL}
            </code>
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">API Base</p>
            <code className="mt-1 block truncate rounded-2xl bg-black/40 p-3 text-xs text-slate-200">
              {process.env.NEXT_PUBLIC_API_URL}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
