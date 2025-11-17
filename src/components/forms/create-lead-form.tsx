"use client";

import { useState } from "react";

export function CreateLeadForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("Lead enviado para o pipeline ✨");
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-5">
      <div>
        <label className="text-xs uppercase text-slate-500">Nome</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
          placeholder="Cliente GTX"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase text-slate-500">Email</label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="cliente@exemplo.com"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-slate-500">Telefone</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="+55 11 99999-0000"
          />
        </div>
      </div>
      <div>
        <label className="text-xs uppercase text-slate-500">Origem</label>
        <select
          name="source"
          className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none"
        >
          <option value="meta">Meta Ads</option>
          <option value="google">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <div>
        <label className="text-xs uppercase text-slate-500">Notas</label>
        <textarea
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
          placeholder="Contexto para o squad"
        />
      </div>
      {message && <p className="text-xs text-brand-200">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-brand-500 py-3 font-semibold text-slate-950 transition hover:bg-brand-400 disabled:opacity-60"
      >
        {loading ? "Sincronizando..." : "Criar lead"}
      </button>
    </form>
  );
}
