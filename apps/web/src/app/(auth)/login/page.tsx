"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";

export default function LoginPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="relative size-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-300 p-1.5 shadow-brand">
          <Image src="/images/logo.png" alt="GTX" fill sizes="48px" className="object-contain" priority />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">GTX</p>
          <p className="text-lg font-semibold text-white">Sales With a Service</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="gui@agenciagtx.com"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Senha</label>
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-brand-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-brand-400 disabled:opacity-60"
        >
          {loading ? "Conectando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Dúvidas? fale com{" "}
        <Link href="https://wa.me/5511987654321" className="text-brand-300 underline">
          nosso squad
        </Link>
      </p>
    </div>
  );
}
