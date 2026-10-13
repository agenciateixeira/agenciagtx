import Layout from '../components/site/Layout';
import Link from 'next/link';
import Steps from '../components/site/Steps';

const crumbs = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre' },
];

const method = [
  {
    n: '01',
    label: 'Diagnóstico',
    line: '30 minutos, e pode terminar em não.',
    text: 'A conversa vê o processo. Se a implantação não cabe, o trabalho para ali. Sem contrato.',
  },
  {
    n: '02',
    label: 'Plano curto',
    line: 'Agora, depois, e o que não entra.',
    text: 'O mapa sai do diagnóstico. Não é um aplicativo novo ao lado da operação.',
  },
  {
    n: '03',
    label: 'Primeira entrega',
    line: 'No fluxo que já existe.',
    text: 'Pedido, cobrança ou resumo do dia, no canal que o time já usa. O prazo fica no plano.',
  },
  {
    n: '04',
    label: 'Acompanhamento',
    line: 'Do que ficou no ar.',
    text: 'Todo mês, no plano. Inclui desligar o que ninguém usa.',
  },
];

const values = [
  {
    n: '01',
    label: 'Transparência',
    line: 'O dado que não se explica não sustenta a decisão.',
    text: 'Um número sem origem não entra na conversa.',
  },
  {
    n: '02',
    label: 'Visão do conjunto',
    line: 'Um dado solto não mostra a operação.',
    text: 'Pedido, cobrança e resumo precisam ser lidos juntos.',
  },
  {
    n: '03',
    label: 'Dizer não',
    line: 'Se não cabe, a conversa acaba.',
    text: 'O diagnóstico existe para isso, não só para começar um plano.',
  },
  {
    n: '04',
    label: 'Quem decide',
    line: 'A decisão fica com quem já decide.',
    text: 'A implantação tira cópia, cobrança e lembrete. Não toma o lugar de quem escolhe.',
  },
];

export default function Sobre() {
  return (
    <Layout
      title="Implementamos IAs em empresas | GTX"
      description="GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil. Guilherme Teixeira é o fundador da Agência GTX."
      crumbs={crumbs}
    >
      <article>
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Quem somos</p>
            <h1>Implementamos IAs<br />em empresas.</h1>
            <p className="lede">GTX Gestão e Implementações Digitais, desde 2017, atendimento remoto no Brasil.</p>
          </div>
        </section>

        <section className="founder" aria-label="Guilherme Teixeira">
          <div className="shell founder-grid">
            <img
              className="founder-photo"
              src="/images/guilherme-teixeira.jpg"
              alt="Guilherme Teixeira, fundador da Agência GTX"
              width="720"
              height="1080"
            />
            <div>
              <p className="eyebrow">Fundador</p>
              <h2>Guilherme Teixeira.</h2>
              <p className="role">Fundador da Agência GTX. 9 anos em growth marketing.</p>
              <p className="bio">Sem transparência e sem visão do conjunto, o dado não sustenta a decisão. A GTX implementa IAs dentro da empresa, nos processos que já existem.</p>
              <p className="bio">A conversa comercial é com ele. O atendimento é remoto, no Brasil, desde 2017.</p>
              <p className="hero-actions"><Link className="btn" href="/contato">Pedir diagnóstico</Link></p>
            </div>
          </div>
        </section>

        <section className="section" aria-label="História">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">História</p>
              <h2>Desde 2017, remoto, no Brasil.</h2>
            </div>
            <div className="stack">
              <article>
                <h2>O que faltava.</h2>
                <p>Guilherme Teixeira tem 9 anos em growth marketing. Sem transparência e sem visão do conjunto, o dado não sustenta a decisão. A Agência GTX implementa IAs dentro da empresa, nos processos que já existem.</p>
              </article>
              <article>
                <h2>O que a empresa faz hoje.</h2>
                <p>Implementa IAs nos processos que a empresa já tem. Pedido, cobrança e resumo do dia. Em outro produto, faz a gestão de tráfego pago no Meta, no Google e no LinkedIn.</p>
              </article>
              <article>
                <h2>Quem fala com você.</h2>
                <p>Guilherme Teixeira, fundador da Agência GTX. Razão social: GTX Gestão e Implementações Digitais.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Método">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Método</p>
              <h2>Três passos, e um deles é dizer não.</h2>
              <p className="lede">O não é uma etapa. Não é um imprevisto no fim da conversa.</p>
            </div>
            <Steps items={method} label="Método" />
          </div>
        </section>

        <section className="section" aria-label="Valores">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Valores</p>
              <h2>O que segura o trabalho.</h2>
            </div>
            <Steps items={values} label="Valores" />
          </div>
        </section>

        <section className="section flush-top">
          <div className="shell statements">
            <article>
              <h2>O que a GTX não faz.</h2>
              <p>Aplicativo do zero sem processo, e retorno prometido antes de ver a operação. Modelo treinado do nada e promessa de cortar equipe também ficam de fora.</p>
            </article>
            <article>
              <h2>Desde 2017, remoto.</h2>
              <p>O atendimento é remoto, no Brasil, desde 2017. O diagnóstico dura 30 minutos e pode terminar sem contrato.</p>
            </article>
          </div>
        </section>

        <section className="section flush-top">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <div className="quiet-links">
              <Link href="/produtos/implantacao-de-ia">Implantação de IA</Link>
              <Link href="/produtos/gestao-de-trafego-pago">Gestão de tráfego pago</Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
