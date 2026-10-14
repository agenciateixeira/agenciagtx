import Layout from '../../components/site/Layout';
import LeadForm from '../../components/site/LeadForm';
import Faq from '../../components/site/Faq';
import Steps from '../../components/site/Steps';
import { faqSchema } from '../../lib/seo';

const crumbs = [
  { href: '/', label: 'Início' },
  { href: '/produtos/gestao-de-redes-sociais', label: 'Gestão de redes sociais' },
];

const deliverables = [
  {
    label: 'Presença',
    line: 'As redes que a empresa já usa.',
    text: 'A gestão fica nas contas da empresa. A GTX não abre uma rede paralela no lugar delas.',
  },
  {
    label: 'Conteúdo',
    line: 'No ritmo da operação.',
    text: 'O que publicar acompanha o que a empresa vende e atende. Não é um pacote genérico de posts.',
  },
  {
    label: 'Leitura',
    line: 'O que repetir e o que parar.',
    text: 'Sem cifra de alcance publicada neste site. O número só entra com período e com a conta conferida.',
  },
];

const faq = [
  {
    q: 'O que entra na gestão de redes?',
    a: 'A presença da empresa nas redes que ela já usa, o conteúdo no ritmo da operação e a leitura do que repetir ou parar.',
  },
  {
    q: 'Vocês prometem alcance ou seguidores?',
    a: 'Não. Não há número de alcance, seguidores ou engajamento publicado. Um número só entra com período e com a conta conferida.',
  },
  {
    q: 'Isso é o mesmo que tráfego pago?',
    a: 'Não. Tráfego pago é a gestão de anúncio no Meta, no Google e no LinkedIn. Redes sociais é a presença da empresa. Os dois podem andar juntos, quando a conversa mostrar que cabe.',
  },
  {
    q: 'O que não entra?',
    a: 'Loja virtual, marketplace e pacote genérico de posts sem relação com a operação.',
  },
  {
    q: 'Quanto custa?',
    a: 'Não há valor publicado. O escopo sai da conversa. O diagnóstico dura 30 minutos e pode terminar sem contrato.',
  },
  {
    q: 'Como começa?',
    a: 'Com um diagnóstico de 30 minutos. Se a gestão de redes não couber agora, a conversa acaba ali.',
  },
];

export default function RedesSociais() {
  return (
    <Layout
      title="Gestão de redes sociais | GTX"
      description="Gestão das redes que a empresa já usa, no ritmo da operação. Sem número de alcance publicado. O escopo sai da conversa."
      crumbs={crumbs}
      jsonLd={[faqSchema(faq)]}
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <h1>Gestão de redes sociais.</h1>
            <p className="lede">A presença da empresa, no ritmo da operação. Sem pacote genérico e sem número de alcance publicado.</p>
          </div>
        </section>

        <section className="section flush-top" aria-label="Escopo">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Escopo</p>
              <h2>A presença que a empresa já tem.</h2>
            </div>
            <div className="stack">
              <article>
                <h2>O que entra.</h2>
                <p>A gestão das redes que a empresa já usa. O conteúdo segue o que ela vende e atende. A leitura diz o que repetir e o que parar.</p>
              </article>
              <article>
                <h2>O que não entra.</h2>
                <p>Loja virtual, marketplace e pacote genérico de posts. Também não entra promessa de alcance ou de seguidores antes de ver a operação.</p>
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

        <section className="section" aria-label="Valor">
          <div className="shell stack">
            <article>
              <p className="eyebrow">Valor</p>
              <h2>O escopo sai da conversa.</h2>
              <p>Não há valor publicado para a gestão de redes. O diagnóstico dura 30 minutos e pode terminar sem contrato.</p>
            </article>
          </div>
        </section>
      </article>

      <Faq title="Perguntas sobre redes sociais." items={faq} />

      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Ver se a gestão de redes cabe agora.</h2>
            <p className="lede">30 minutos. Sem promessa de alcance antes de ver a operação. Se não couber, a conversa acaba ali.</p>
            <ul className="cta-points">
              <li>Nas redes que a empresa já usa.</li>
              <li>Sem número de alcance publicado.</li>
              <li>O escopo sai da conversa.</li>
            </ul>
          </div>
          <LeadForm
            page="/produtos/gestao-de-redes-sociais"
            interesse="Gestão de redes sociais"
            showInteresse={false}
            messageLabel="Como as redes funcionam hoje"
          />
        </div>
      </section>
    </Layout>
  );
}
