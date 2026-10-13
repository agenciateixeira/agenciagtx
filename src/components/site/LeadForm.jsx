import { useRouter } from 'next/router';
import { useState } from 'react';
import { trackGaEvent } from '../../lib/ga4';

const defaultOptions = [
  { value: 'Implantação de IA', label: 'Implantação de IA' },
  { value: 'Gestão de tráfego pago', label: 'Gestão de tráfego pago' },
  { value: 'Os dois', label: 'Os dois' },
];

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];
  let stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem('gtx_utm') || '{}');
  } catch (error) {
    stored = {};
  }
  keys.forEach((key) => {
    const value = params.get(key);
    if (value) stored[key] = value;
  });
  if (!stored.landing) stored.landing = window.location.pathname;
  sessionStorage.setItem('gtx_utm', JSON.stringify(stored));
  return stored;
}

export default function LeadForm({
  page,
  interesse,
  messageLabel = 'Onde a operação pesa',
  submitLabel = 'Pedir diagnóstico',
  showInteresse = true,
}) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSending(true);
    setError('');
    const data = new FormData(form);
    const attribution = readAttribution();
    const payload = {
      nome: data.get('nome'),
      email: data.get('email'),
      telefone: data.get('telefone'),
      empresa: data.get('empresa'),
      mensagem: data.get('mensagem'),
      interesse: interesse || data.get('interesse'),
      pagina: page,
      website: data.get('website'),
      ...attribution,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.ok) {
        setError(body.message || 'Não foi possível enviar. Tente de novo ou chame no WhatsApp.');
        setSending(false);
        return;
      }
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', { content_name: page });
      }
      trackGaEvent('generate_lead', { event_label: page });
      router.push('/obrigado');
    } catch (err) {
      setError('Não foi possível enviar. Tente de novo ou chame no WhatsApp.');
      setSending(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="pair">
        <label>
          Nome
          <input name="nome" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="pair">
        <label>
          WhatsApp
          <input name="telefone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          Empresa
          <input name="empresa" autoComplete="organization" required />
        </label>
      </div>
      {showInteresse && !interesse ? (
        <label>
          Interesse
          <select name="interesse" required defaultValue="">
            <option value="" disabled>Escolher</option>
            {defaultOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      ) : null}
      <label>
        {messageLabel}
        <textarea name="mensagem" required />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Site
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="btn light" type="submit" disabled={sending}>
        {sending ? 'Enviando' : submitLabel}
      </button>
      {error ? <p className="error" role="alert">{error}</p> : null}
    </form>
  );
}
