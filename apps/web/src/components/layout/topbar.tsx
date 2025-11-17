"use client";

import { Bell, Filter, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex w-full flex-wrap items-center gap-3 rounded-3xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-2xl">
      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
        <Search className="size-4 text-slate-400" />
        <input
          className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          placeholder="Buscar leads, squads ou UTMs…"
        />
      </div>
      <button className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand-500">
        <Filter className="mr-2 inline size-4" />
        Filtros
      </button>
      <button className="relative rounded-2xl border border-white/10 p-3 text-slate-200 transition hover:border-brand-500">
        <Bell className="size-4" />
        <span className="absolute -right-1 -top-1 size-2 rounded-full bg-brand-400" />
      </button>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-500/20 to-brand-400/20 px-4 py-2">
        <div className="size-10 rounded-2xl bg-brand-500 text-center text-lg font-semibold leading-10 text-slate-950">G</div>
        <div>
          <p className="text-sm font-semibold text-white">Gui Teixeira</p>
          <p className="text-xs text-slate-400">Squad Lead</p>
        </div>
      </div>
    </header>
  );
}
