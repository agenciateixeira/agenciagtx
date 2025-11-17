import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

const PORTAL_URL = process.env.NEXT_PUBLIC_APP_PORTAL_URL || '/dashboard';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    setLoading(true);
    setError('');

    let supabaseClient;
    try {
      supabaseClient = getSupabaseClient();
    } catch (clientError) {
      setError(clientError.message);
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    window.location.href = PORTAL_URL;
  }

  async function handlePasswordReset(event) {
    event.preventDefault();
    setResetMessage('');

    if (!emailForReset) {
      setResetMessage('Informe seu e-mail corporativo.');
      return;
    }

    setResetLoading(true);
    let supabaseClient;

    try {
      supabaseClient = getSupabaseClient();
    } catch (clientError) {
      setResetMessage(clientError.message);
      setResetLoading(false);
      return;
    }

    const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(emailForReset, {
      redirectTo: process.env.NEXT_PUBLIC_APP_PORTAL_URL || window.location.origin,
    });

    if (resetError) {
      setResetMessage(resetError.message);
    } else {
      setResetMessage('Enviamos um link de redefinição para seu e-mail.');
    }

    setResetLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login · GTX SWAS</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" aria-hidden />
        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="relative w-12 h-12 overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-300">
              <Image src="/images/logo.png" alt="GTX" fill sizes="48px" className="object-contain" priority />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">GTX</p>
              <p className="text-lg font-semibold">Sales With a Service</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-300">Email corporativo</label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-gray-500 focus:border-green-400 focus:outline-none"
                placeholder="voce@empresa.com"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Senha</label>
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-gray-500 focus:border-green-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-green-500 py-3 font-semibold text-gray-900 transition hover:bg-green-400 disabled:opacity-60"
            >
              {loading ? 'Conectando...' : 'Entrar'}
            </button>
          </form>

          <form
            className="mt-6 rounded-2xl border border-white/10 p-4 space-y-3 bg-white/5"
            onSubmit={handlePasswordReset}
          >
            <p className="text-sm font-semibold text-white">Esqueceu a senha?</p>
            <p className="text-xs text-gray-400">Informe seu e-mail para receber o link de redefinição.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                name="resetEmail"
                value={emailForReset}
                onChange={(event) => setEmailForReset(event.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm placeholder:text-gray-500 focus:border-green-400 focus:outline-none"
                placeholder="voce@empresa.com"
                required
              />
              <button
                type="submit"
                disabled={resetLoading}
                className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-60"
              >
                {resetLoading ? 'Enviando...' : 'Enviar link'}
              </button>
            </div>
            {resetMessage && <p className="text-xs text-green-300">{resetMessage}</p>}
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            Precisa de acesso? <Link href="https://wa.me/5519990122773" className="text-green-300">Fale com nosso squad</Link>
          </p>
        </div>
      </div>
    </>
  );
}
