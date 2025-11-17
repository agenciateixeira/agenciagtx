"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { BarChart3, Settings, Users, Workflow } from "lucide-react";
import { Logo } from "../logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/pipeline", label: "Pipeline", icon: Workflow },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-2xl">
      <Logo />
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className={clsx("size-4", isActive ? "text-brand-300" : "text-slate-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
        <p className="text-xs text-slate-400">GTX Squad em modo Alpha</p>
        <p className="mt-1 text-sm font-semibold text-white">Dados em tempo real</p>
      </div>
    </aside>
  );
}
