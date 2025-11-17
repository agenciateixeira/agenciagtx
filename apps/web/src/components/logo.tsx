"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  compact?: boolean;
};

export function Logo({ compact }: Props) {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 group">
      <div className="relative size-9 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-300 shadow-brand transition-transform duration-300 group-hover:-translate-y-0.5">
        <Image src="/images/logo.png" alt="GTX" fill sizes="36px" className="object-contain p-1.5" priority />
      </div>
      {!compact && (
        <div className="leading-tight">
          <span className="block text-sm font-semibold text-brand-200">GTX</span>
          <span className="text-xs text-slate-400">SWAS</span>
        </div>
      )}
    </Link>
  );
}
