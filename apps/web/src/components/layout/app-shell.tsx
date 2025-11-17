"use client";

import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.25),_transparent_45%)] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <div className="lg:w-72">
          <div className="block lg:hidden">
            <Sidebar />
          </div>
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <Topbar />
          <main className="min-h-[70vh] rounded-3xl border border-white/5 bg-slate-950/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
