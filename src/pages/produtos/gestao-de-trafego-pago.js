import Link from 'next/link';
import Layout from '../../components/site/Layout';
import LeadForm from '../../components/site/LeadForm';
import Faq from '../../components/site/Faq';
import Steps from '../../components/site/Steps';
import { faqSchema } from '../../lib/seo';

const crumbs = [
  { href: '/', label: 'Início' },
  { href: '/produtos/gestao-de-trafego-pago', label: 'Gestão de tráfego pago' },
];

const deliverables = [
  {
    n: '01',
    label: 'Canais',
    line: 'Meta, Google e LinkedIn.',
    text: 'Entra o canal que faz sentido para o ciclo de venda. Não são três por obrigação.',
  },
  {
    n: '02',
    label: 'Leitura semanal',
    line: 'O que pausar, o que escalar e o que não repetir.',
    text: 'Um número por semana, com a conta à vista.',
  },
  {
    n: '03',
    label: 'A conta',
    line: 'Continua com você.',
    text: 'O acesso à conta de anúncios é do cliente.',
  },
];

const timeline = [
  {
    n: '01',
    label: 'Diagnóstico',
    line: '30 minutos.',
    text: 'Sem proposta de retorno antes de olhar a conta.',
  },
  {
    n: '02',
    label: 'Plano',
    line: 'Depois de ver a conta.',
    text: 'O que entra, o que não entra e o que a leitura semanal vai mostrar.',
  },
  {
    n: '03',
    label: 'Gestão',
    line: 'Toda semana.',
    text: 'O que pausar, o que escalar e o que não repetir.',
  },
];

const metrics = [
  {
    n: '01',
    label: 'Semana',
    line: 'O que pausar, o que escalar e o que não repetir.',
  },
  {
    n: '02',
    label: 'Número',
    line: 'Só entra com período e com a conta conferida.',
  },
  {
    n: '03',
    label: 'Verba',
    line: 'A mesma conta, lida toda semana, sem promessa antes do diagnóstico.',
  },
];

const faq = [
  {
    q: 'Quais canais entram?',
    a: 'Meta, Google e LinkedIn. Entra o canal que faz sentido para a venda, não os três por padrão.',
  },
  {
    q: 'O que eu leio toda semana?',
    a: 'O que pausar, o que escalar e o que não repetir.',
  },
  {
    q: 'O que não está incluso?',
    a: 'Loja virtual, marketplace e pacote de posts sem anúncio.',
  },
  {
    q: 'Vocês prometem retorno antes de ver a conta?',
    a: 'Não. Sem proposta de retorno antes de olhar a conta.',
  },
  {
    q: 'De quem é a conta de anúncios?',
    a: 'Do cliente. A GTX faz a gestão. O acesso continua com quem é dono da conta.',
  },
  {
    q: 'Qual número está publicado?',
    a: 'Sneaker Society: de R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo anúncio. Relato de Leonardo Utida. O período entra depois de conferir a conta.',
  },
  {
    q: 'Quanto custa?',
    a: 'O valor sai depois de olhar a conta. O diagnóstico dura 30 minutos e não é uma proposta fechada.',
  },
  {
    q: 'Como começa?',
    a: 'Com um diagnóstico de 30 minutos. Se o tráfego não couber agora, a conversa acaba ali.',
  },
  {
    q: 'Vocês montam loja ou marketplace?',
    a: 'Não. Isso fica fora da gestão de tráfego pago.',
  },
];

export default function TrafegoPago() {
  return (
    <Layout
      title="Gestão de tráfego pago | GTX"
      description="Gestão de anúncio no Meta, no Google e no LinkedIn, com um número por semana. Sem proposta de retorno antes de olhar a conta."
      crumbs={crumbs}
      jsonLd={[faqSchema(faq)]}
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <h1>Gestão de tráfego pago.</h1>
            <p className="lede">Meta, Google e LinkedIn, com um número por semana.</p>
          </div>
        </section>

        <section className="section flush-top" aria-label="Canais">
          <div className="shell">
            <ol className="cards">
              <li>
                <h3>Meta</h3>
                <p>Quem já conhece a marca e quem ainda não comprou.</p>
              </li>
              <li>
                <h3>Google</h3>
                <p>Quem está procurando agora.</p>
              </li>
              <li>
                <h3>LinkedIn</h3>
                <p>Quem decide na empresa, quando a venda é entre empresas.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section" aria-label="Escopo">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Escopo</p>
              <h2>Gestão do anúncio, com a conta à vista.</h2>
            </div>
            <div className="stack">
              <article>
                <h2>O que entra.</h2>
                <p>Gestão no Meta, no Google e no LinkedIn, quando o canal combina com a venda. A leitura semanal diz o que pausar, o que escalar e o que não repetir.</p>
              </article>
              <article>
                <h2>O que não está incluso.</h2>
                <p>Loja virtual, marketplace e pacote de posts sem anúncio. A gestão das redes sociais é outro trabalho.</p>
                <p className="more"><Link className="text-link" href="/produtos/gestao-de-redes-sociais">Ver gestão de redes sociais</Link></p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Entregas">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Entregas</p>
              <h2>O que você recebe.</h2>
            </div>
            <Steps items={deliverables} label="Entregas" />
          </div>
        </section>

        <section className="section" aria-label="Prazo">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Prazo</p>
              <h2>Do diagnóstico à leitura semanal.</h2>
            </div>
            <Steps items={timeline} label="Prazo" />
          </div>
        </section>

        <section className="section" aria-label="Segmentos">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Segmentos</p>
              <h2>O que já está publicado, com nome.</h2>
              <p className="lede">Cifra só onde a conta foi relatada. O resto fica no nome, sem número.</p>
            </div>
            <div className="stack">
              <article>
                <h2>Varejo online. Sneaker Society.</h2>
                <p>De R$ 19 mil para mais de R$ 60 mil por mês, com o mesmo anúncio. Leonardo Utida.</p>
                <p className="note">Relato do cliente. O período entra depois de conferir a conta.</p>
                <p className="more"><Link className="text-link" href="/cases/sneaker-society">Ler o case</Link></p>
              </article>
              <article>
                <h2>Loja física. Jsete.</h2>
                <p>Da loja física para a loja online. Sem cifra publicada.</p>
              </article>
              <article>
                <h2>Operação industrial. Frasco Life.</h2>
                <p>A operação industrial, nos canais digitais. Sem cifra publicada.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Métricas">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Métricas</p>
              <h2>O que a gestão acompanha.</h2>
            </div>
            <Steps items={metrics} label="Métricas" />
          </div>
        </section>

        <section className="section" aria-label="Valor">
          <div className="shell stack">
            <article>
              <p className="eyebrow">Valor</p>
              <h2>O valor sai depois de olhar a conta.</h2>
              <p>Não há proposta de retorno antes disso. O diagnóstico dura 30 minutos e pode terminar sem contrato.</p>
            </article>
          </div>
        </section>
      </article>

      <Faq title="Perguntas sobre tráfego pago." items={faq} />

      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Ver se o tráfego cabe agora.</h2>
            <p className="lede">30 minutos. Sem proposta de retorno antes de olhar a conta. Se não couber, a conversa acaba ali.</p>
            <ul className="cta-points">
              <li>Meta, Google e LinkedIn.</li>
              <li>Uma leitura por semana.</li>
              <li>A conta de anúncios continua sua.</li>
            </ul>
          </div>
          <LeadForm
            page="/produtos/gestao-de-trafego-pago"
            interesse="Gestão de tráfego pago"
            showInteresse={false}
            messageLabel="Como o anúncio funciona hoje"
          />
        </div>
      </section>
    </Layout>
  );
}
