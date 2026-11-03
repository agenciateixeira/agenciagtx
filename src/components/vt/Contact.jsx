import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { trackGaEvent } from '../../lib/ga4';
import { readAttribution } from '../site/LeadForm';

const needs = ['Loja Shopify', 'Mídia paga', 'IA', 'Landing page', 'Sistema'];

function DiagnosticoForm({ page }) {
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
    const interesse = data.get('interesse') || needs[0];
    const link = (data.get('link') || '').toString().trim();
    const payload = {
      nome: data.get('nome'),
      email: data.get('email'),
      telefone: data.get('telefone'),
      empresa: data.get('empresa'),
      mensagem: `Precisa de: ${interesse}. Link da loja ou do site atual: ${link || 'não informado'}.`,
      interesse,
      pagina: page,
      website: data.get('website'),
      ...readAttribution(),
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
    <form className="vt-form" onSubmit={onSubmit} noValidate>
      <h3>Pedir diagnóstico</h3>
      <div className="vt-two">
        <div className="vt-field">
          <label htmlFor="vt-nome">Nome</label>
          <input id="vt-nome" name="nome" type="text" autoComplete="name" placeholder="Seu nome" required />
        </div>
        <div className="vt-field">
          <label htmlFor="vt-whats">WhatsApp</label>
          <input id="vt-whats" name="telefone" type="tel" autoComplete="tel" placeholder="(19) 90000 0000" required />
        </div>
      </div>
      <div className="vt-two">
        <div className="vt-field">
          <label htmlFor="vt-email">E-mail</label>
          <input id="vt-email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required />
        </div>
        <div className="vt-field">
          <label htmlFor="vt-empresa">Empresa</label>
          <input id="vt-empresa" name="empresa" type="text" autoComplete="organization" placeholder="Nome da empresa" required />
        </div>
      </div>
      <fieldset className="vt-field">
        <legend>O que você precisa</legend>
        <div className="vt-chips">
          {needs.map((item, index) => (
            <label key={item}>
              <input type="radio" name="interesse" value={item} defaultChecked={index === 0} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="vt-field">
        <label htmlFor="vt-link">Link da loja ou do site atual</label>
        <input id="vt-link" name="link" type="text" inputMode="url" autoComplete="url" placeholder="https://" />
      </div>
      <div className="vt-hp" aria-hidden="true">
        <label>
          Site
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="vt-btn vt-solid" type="submit" disabled={sending}>
        {sending ? 'Enviando' : 'Pedir diagnóstico de 30 min →'}
      </button>
      {error ? <p className="vt-err" role="alert">{error}</p> : null}
      <small>
        Ao enviar, você concorda com o uso dos dados para este contato, conforme a{' '}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link> (LGPD).
      </small>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="vt-contact" id="contato">
      <div className="vt-wrap vt-contact-g">
        <div>
          <div className="vt-eyebrow">Contato</div>
          <h2>Conte o que você precisa <em>vender.</em></h2>
          <p className="vt-lead">Uma conversa de 30 minutos para entender a operação e desenhar o primeiro passo: loja, campanha, landing page, IA ou sistema.</p>
          <div className="vt-ways">
            <div><small>E-mail</small><span><a href="mailto:contato@agenciagtx.com.br">contato@agenciagtx.com.br</a></span></div>
            <div><small>WhatsApp</small><span><a href="https://wa.me/5519990122773?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20GTX%20e%20quero%20um%20diagn%C3%B3stico.">+55 19 99012 2773</a></span></div>
            <div><small>Resposta</small><span>Em horário comercial</span></div>
          </div>
        </div>
        <DiagnosticoForm page="/" />
      </div>
    </section>
  );
}
