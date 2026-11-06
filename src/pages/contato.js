import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/site/Layout';
import PageHead from '../components/pf/PageHead';
import { Chevron } from '../components/pf/Icons';
import { EMAIL, PHONE, WHATSAPP } from '../components/pf/contacts';
import { readAttribution } from '../components/site/LeadForm';
import { trackGaEvent } from '../lib/ga4';

function ContactForm() {
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
    const payload = {
      nome: data.get('nome'),
      email: data.get('email'),
      telefone: data.get('telefone'),
      empresa: data.get('empresa'),
      mensagem: data.get('mensagem'),
      interesse: 'Contato',
      pagina: '/contato',
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
      if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', { content_name: '/contato' });
      trackGaEvent('generate_lead', { event_label: '/contato' });
      router.push('/obrigado');
    } catch (err) {
      setError('Não foi possível enviar. Tente de novo ou chame no WhatsApp.');
      setSending(false);
    }
  };

  return (
    <form className="pf-form" onSubmit={onSubmit} noValidate>
      <div className="pf-form-row">
        <label className="pf-field pf-full"><span className="pf-sr">Nome</span><input name="nome" type="text" autoComplete="name" placeholder="Nome" required /></label>
        <label className="pf-field pf-full"><span className="pf-sr">Empresa</span><input name="empresa" type="text" autoComplete="organization" placeholder="Empresa" required /></label>
        <label className="pf-field"><span className="pf-sr">E-mail</span><input name="email" type="email" autoComplete="email" placeholder="E-mail" required /></label>
        <label className="pf-field"><span className="pf-sr">WhatsApp</span><input name="telefone" type="tel" autoComplete="tel" placeholder="WhatsApp" required /></label>
        <label className="pf-field pf-full"><span className="pf-sr">Mensagem</span><textarea name="mensagem" placeholder="Deixe sua mensagem" required /></label>
      </div>
      <div className="pf-hp" aria-hidden="true">
        <label>Site<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <p className="pf-form-terms">Ao clicar em enviar, você concorda com a nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
      {error ? <p className="pf-form-err" role="alert">{error}</p> : null}
      <button className="pf-btn" type="submit" disabled={sending}>{sending ? 'Enviando' : 'Enviar'}<Chevron /></button>
    </form>
  );
}

export default function Contato() {
  return (
    <Layout
      variant="pf"
      title="Contato | GTX"
      description="Fale com a GTX pelo formulário, pelo WhatsApp ou por e-mail. Diagnóstico de 30 minutos, sem contrato."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/contato', label: 'Contato' }]}
    >
      <div className="pf-c pf-page">
        <PageHead label="Contato" title="Vamos falar?">
          <p>Use o formulário abaixo, chame no WhatsApp ou mande um e-mail.</p>
          <p>WhatsApp: <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">{PHONE}</a> / <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </PageHead>
        <div className="pf-page-in pf-page-form">
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
}
