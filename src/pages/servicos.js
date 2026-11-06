import Link from 'next/link';
import Layout from '../components/site/Layout';
import PageHead from '../components/pf/PageHead';
import { Chevron } from '../components/pf/Icons';

const services = [
  { n: '01', name: 'Implementação de IA', line: 'IA dentro do processo que já existe: pedido pelo WhatsApp registrado no ERP, cobrança e resumo do dia.', href: '/produtos/implantacao-de-ia' },
  { n: '02', name: 'E-commerce Shopify', line: 'Tema sob medida, do produto ao carrinho, com frete, pagamento e integrações.', href: '/portfolio/e-commerce' },
  { n: '03', name: 'Landing pages', line: 'Páginas de campanha rápidas, medidas e pensadas para o celular.', href: '/cases/fluido-e-pool' },
  { n: '04', name: 'Sistemas', line: 'OS com fotos e checklist, estoque com curva ABC, PDV, financeiro com DRE, NF-e e NFS-e.', href: '/cases/four-custom-garage' },
  { n: '05', name: 'Mídia paga', line: 'Meta, Google e LinkedIn, em cima da verba que já existe.', href: '/produtos/gestao-de-trafego-pago' },
];

const steps = [
  ['01', 'Diagnóstico', 'Conversa de 30 minutos sobre a operação, o público e a meta de vendas.', 'Plano de ação'],
  ['02', 'Desenho', 'Direção visual, estrutura das páginas e fluxo de compra, validados com você.', 'Telas aprovadas'],
  ['03', 'Construção', 'Tema, integrações e campanhas, testados no celular e no desktop.', 'Loja em ambiente de teste'],
  ['04', 'Lançamento', 'Publicação, medição de velocidade e vendas, ajustes a cada ciclo.', 'Loja no ar e relatório'],
];

export default function Servicos() {
  return (
    <Layout
      variant="pf"
      title="Serviços | GTX"
      description="Implementação de IA, e-commerce Shopify, landing pages, sistemas e mídia paga. Como a GTX trabalha, em quatro etapas."
      crumbs={[{ href: '/', label: 'Início' }, { href: '/servicos', label: 'Serviços' }]}
    >
      <div className="pf-c pf-page">
        <PageHead label="Serviços" title={<>O que a GTX<br />faz</>}>
          <p>Cinco frentes, um time. Do tema ao pagamento, e da campanha ao sistema que roda por trás.</p>
        </PageHead>

        <ol className="pf-svc">
          {services.map((s) => (
            <li key={s.n}>
              <Link href={s.href}>
                <span className="pf-svc-n">{s.n}</span>
                <span className="pf-svc-name">{s.name}</span>
                <span className="pf-svc-line">{s.line}</span>
                <Chevron className="pf-svc-go" />
              </Link>
            </li>
          ))}
        </ol>

        <div className="pf-sep" id="processo"><span>Processo</span></div>
        <div className="pf-page-in">
          <h2 className="pf-h2">Como o trabalho acontece</h2>
          <ol className="pf-steps">
            {steps.map(([n, t, d, out]) => (
              <li key={n}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
                <small>Entrega: {out}</small>
              </li>
            ))}
          </ol>
        </div>
        <div className="pf-page-cta">
          <Link className="pf-btn" href="/contato">Pedir diagnóstico de 30 min<Chevron /></Link>
        </div>
      </div>
    </Layout>
  );
}
