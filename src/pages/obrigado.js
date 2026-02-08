import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { CheckCircle, ArrowRight, Instagram } from 'lucide-react';

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

export default function Obrigado() {
  const [visible, setVisible] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);

  useEffect(() => {
    // Dispara evento de conversão ao carregar a página
    if (typeof window !== 'undefined') {
      if (window.fbq) {
        window.fbq('track', 'Lead', { content_name: 'Obrigado Page' });
      }
      if (window.gtag) {
        window.gtag('event', 'conversion', { send_to: 'AW-16834266345' });
        window.gtag('event', 'generate_lead', { event_label: 'Obrigado Page' });
      }
    }
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const handleEnter = () => setCursorHover(true);
    const handleLeave = () => setCursorHover(false);
    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <Head>
        <title>Obrigado! — GTX Marketing e Vendas</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        {/* Custom Cursor */}
        <div
          className="fixed pointer-events-none z-[9999] hidden md:block"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)', transition: 'transform 0.1s ease' }}
        >
          <div
            className="rounded-full border-2 border-green-500 transition-all duration-200"
            style={{
              width: cursorHover ? 40 : 20,
              height: cursorHover ? 40 : 20,
              opacity: cursorHover ? 0.8 : 0.5,
              backgroundColor: cursorHover ? 'rgba(154, 205, 50, 0.1)' : 'transparent',
            }}
          />
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div
          className="relative text-center max-w-lg"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Logo */}
          <a href="/" className="inline-flex items-center mb-10">
            <Image
              src="/images/logo.png"
              alt="GTX Marketing e Vendas"
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </a>

          {/* Check icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Mensagem recebida!
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            Obrigado pelo contato. Nossa equipe vai retornar em breve.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            Fique de olho no seu WhatsApp — entraremos em contato em até <strong className="text-gray-600">24 horas</strong>.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-green-600 transition-all hover:scale-105 shadow-lg shadow-green-500/20"
            >
              Voltar ao início
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/agenciagtx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-7 py-3.5 rounded-full font-semibold hover:border-pink-500 hover:text-pink-600 transition-all"
            >
              <Instagram className="w-5 h-5" />
              Seguir no Instagram
            </a>
          </div>

          {/* WhatsApp note */}
          <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d={WA_PATH} />
            </svg>
            Você também pode nos chamar pelo WhatsApp a qualquer momento
          </div>
        </div>
      </div>
    </>
  );
}
