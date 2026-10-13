import Link from 'next/link';
import Layout from '../components/site/Layout';
import LeadForm from '../components/site/LeadForm';
import { OutcomePin } from '../components/site/FlowMap';
import Faq from '../components/site/Faq';
import Picker from '../components/site/Picker';
import Solutions from '../components/site/Solutions';
import { faqSchema } from '../lib/seo';

const clients = [
  { src: '/images/clients/logofl.png', alt: 'Logo da Frasco Life', mark: 1.5, vcenter: 0.52 },
  { src: '/images/clients/LOGODZS.png', alt: 'Logo do Depósito Zona Sul', mark: 1.22, vcenter: 0.517 },
  { src: '/images/clients/logosneakers.png', alt: 'Logo da Sneaker Society', mark: 1.12, vcenter: 0.515 },
  { src: '/images/clients/logojsete.png', alt: 'Logo da Jsete', mark: 1.3, vcenter: 0.508 },
  { src: '/images/clients/logoroute.png', alt: 'Logo da Route Cred', mark: 1.49, vcenter: 0.549 },
  { src: '/images/clients/logoflypro.png', alt: 'Logo da FlyPro', mark: 2.04, vcenter: 0.571, knockout: true },
  { src: '/images/clients/podologia.png', alt: 'Logo da Podologia', mark: 1, vcenter: 0.499 },
];

const problems = [
  {
    n: '01',
    label: 'Atendimento',
    line: 'O pedido chega no WhatsApp e alguém copia para outro lugar.',
    text: 'A mesma pergunta volta porque a resposta não ficou no fluxo.',
  },
  {
    n: '02',
    label: 'Vendas',
    line: 'O próximo contato depende de alguém lembrar.',
    text: 'A proposta espera um dado que está em outra conversa.',
  },
  {
    n: '03',
    label: 'Financeiro',
    line: 'A cobrança sai quando alguém lembra.',
    text: 'O fechamento do dia espera a planilha.',
  },
  {
    n: '04',
    label: 'Operação',
    line: 'O status do pedido vive na conversa.',
    text: 'O resumo do dia é montado na mão.',
  },
];

const steps = [
  {
    n: '01',
    label: 'Diagnóstico',
    line: '30 minutos, sem contrato.',
    text: 'Entrega: onde a operação pesa, e se a implantação cabe. Se não couber, a conversa acaba ali.',
  },
  {
    n: '02',
    label: 'Plano',
    line: 'Sai do diagnóstico.',
    text: 'Entrega: o que fazer agora, o que fica para depois e o que não entra.',
  },
  {
    n: '03',
    label: 'Primeira automação',
    line: 'O prazo fica no plano.',
    text: 'Entrega: a automação no canal que o time já usa. O prazo depende do fluxo, e por isso não é uma data fixa.',
  },
  {
    n: '04',
    label: 'Expansão',
    line: 'Depois que a primeira está em uso.',
    text: 'Entrega: o próximo item do plano. Só anda quando a anterior já faz parte do dia.',
  },
  {
    n: '05',
    label: 'Acompanhamento',
    line: 'Todo mês, enquanto o plano estiver ativo.',
    text: 'Entrega: o ajuste do que já está no ar, e o critério para desligar o que ninguém usa.',
  },
];

const included = [
  {
    n: '01',
    label: 'Diagnóstico',
    line: '30 minutos para ver se cabe.',
    text: 'Pode terminar sem contrato.',
  },
  {
    n: '02',
    label: 'Plano curto',
    line: 'Agora, depois, e o que não entra.',
    text: 'O mapa sai da conversa, não de um aplicativo novo.',
  },
  {
    n: '03',
    label: 'Primeira automação',
    line: 'No canal atual.',
    text: 'Pedido, cobrança ou resumo do dia, onde o time já trabalha.',
  },
  {
    n: '04',
    label: 'Expansão',
    line: 'O próximo fluxo da lista.',
    text: 'Quando a primeira automação já está em uso.',
  },
  {
    n: '05',
    label: 'Acompanhamento',
    line: 'Mensal.',
    text: 'O que ajustar, e o que desligar porque ninguém usa.',
  },
];

const tools = [
  {
    n: '01',
    label: 'WhatsApp',
    line: 'Onde o pedido e a cobrança já acontecem.',
    text: 'A implantação lê o que chega e devolve o que o time precisa registrar.',
  },
  {
    n: '02',
    label: 'CRM',
    line: 'Onde o comercial já anota.',
    text: 'A implantação organiza o que hoje alguém copia de uma conversa para o cadastro.',
  },
  {
    n: '03',
    label: 'ERP',
    line: 'Onde a operação vive.',
    text: 'O pedido entra no sistema sem uma segunda digitação.',
  },
  {
    n: '04',
    label: 'Planilhas',
    line: 'Onde o resumo ainda é montado na mão.',
    text: 'O fechamento do dia deixa de depender de alguém lembrar.',
  },
];

const faq = [
  {
    q: 'O que a GTX implementa?',
    a: 'IAs dentro da empresa, nos processos que já existem. Pedido, cobrança e resumo do dia, no canal que o time já usa.',
  },
  {
    q: 'Quanto tempo dura o diagnóstico?',
    a: '30 minutos, sem contrato. Se a implantação não couber, a conversa acaba ali.',
  },
  {
    q: 'O que sai do diagnóstico?',
    a: 'Um plano curto: o que fazer agora, o que fica para depois e o que não entra.',
  },
  {
    q: 'Quando a primeira automação fica pronta?',
    a: 'O prazo fica escrito no plano, porque depende do fluxo. A entrega é a automação no canal atual, não um aplicativo novo.',
  },
  {
    q: 'Quanto custa o plano?',
    a: 'O investimento é definido depois do diagnóstico, conforme o escopo. Entram o diagnóstico, o plano, a primeira automação, a expansão quando a primeira estiver em uso, e o acompanhamento do que ficou no ar.',
  },
  {
    q: 'Para quem é a GTX?',
    a: 'Para empresas que faturam de R$ 100 mil a R$ 1 milhão por mês. O atendimento é remoto, no Brasil.',
  },
  {
    q: 'Quais ferramentas entram?',
    a: 'WhatsApp, CRM, ERP e planilhas. A GTX implementa IAs no que a empresa já usa. Não trocamos o sistema por um aplicativo novo.',
  },
  {
    q: 'O que a GTX não faz?',
    a: 'Aplicativo do zero sem processo, modelo treinado do nada, promessa de cortar equipe e retorno prometido antes de ver a operação.',
  },
  {
    q: 'Quem decide continua decidindo?',
    a: 'Sim. A implantação tira o trabalho de copiar, cobrar e lembrar. A decisão fica com quem já decide na empresa.',
  },
  {
    q: 'Como peço o diagnóstico?',
    a: 'Pelo formulário desta página ou no WhatsApp +55 19 99012 2773. A resposta chega em horário comercial.',
  },
];

const whatsapp = 'https://wa.me/5519990122773?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20GTX%20e%20quero%20um%20diagn%C3%B3stico.';

export default function Home() {
  return (
    <Layout
      title="IA na operação da sua empresa | GTX"
      description="IAs implementadas nos processos que a empresa já tem. Diagnóstico de 30 minutos, sem contrato. O investimento é definido depois do diagnóstico, conforme o escopo."
      crumbs={[{ href: '/', label: 'Início' }]}
      showCrumbs={false}
      jsonLd={[faqSchema(faq)]}
    >
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">Agência GTX</p>
          <h1>IA na operação<br />da sua empresa.</h1>
          <p className="lede">No trabalho que hoje alguém copia, cobra ou lembra.</p>
          <p className="hero-actions"><a className="btn" href="#contato">Pedir diagnóstico</a></p>
        </div>
      </section>

      <section className="proof" aria-label="Clientes">
        <div className="shell">
          <p className="eyebrow">Quem já passou pela GTX</p>
        </div>
        <div className="marquee">
          <svg className="logo-filters" aria-hidden="true" width="0" height="0">
            <filter id="logo-knockout" colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
              <feColorMatrix in="SourceGraphic" type="matrix" result="dark" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.2126 -0.7152 -0.0722 0 1" />
              <feComposite in="dark" in2="SourceGraphic" operator="in" result="masked" />
              <feFlood floodColor="#ece5d8" result="cream" />
              <feComposite in="cream" in2="masked" operator="in" />
            </filter>
          </svg>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul className="marquee-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {clients.map((client) => (
                  <li key={client.src} style={{ '--mark': client.mark, '--vcenter': client.vcenter }}>
                    <img src={client.src} alt={copy === 0 ? client.alt : ''} className={client.knockout ? 'is-knockout' : undefined} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <Solutions />

      <section className="section" id="problemas" aria-label="Problemas que resolvemos">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Problemas</p>
            <h2>Onde a operação pesa hoje.</h2>
          </div>
          <Picker items={problems} label="Problemas" />
        </div>
      </section>

      <section className="section story-section" aria-label="Resultado nos processos que a empresa já tem">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Resultado</p>
            <h2>O processo que a empresa já tem, sem o trabalho repetido.</h2>
          </div>
          <OutcomePin />
          <p className="more"><Link className="text-link" href="/produtos/implantacao-de-ia">Ver implantação de IA</Link></p>
        </div>
      </section>

      <section className="section" id="como-funciona" aria-label="Como funciona">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Como funciona</p>
            <h2>Do diagnóstico ao acompanhamento.</h2>
          </div>
          <Picker items={steps} label="Etapas" />
        </div>
      </section>

      <section className="section" id="plano" aria-label="O que entra no plano">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Plano</p>
            <h2>O investimento sai depois do diagnóstico.</h2>
          </div>
          <Picker items={included} label="Plano" />
          <p className="note">Não entra aplicativo do zero, modelo treinado do nada, promessa de cortar equipe nem retorno prometido antes de ver a operação.</p>
        </div>
      </section>

      <section className="section" id="ferramentas" aria-label="Ferramentas">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Ferramentas</p>
            <h2>IAs nos processos que a empresa já tem.</h2>
          </div>
          <Picker items={tools} label="Ferramentas" />
        </div>
      </section>

      <section className="section" id="para-quem" aria-label="Para quem é">
        <div className="shell">
          <div className="section-intro">
            <p className="eyebrow">Para quem</p>
            <h2>PMEs de R$ 100 mil a R$ 1 milhão por mês.</h2>
            <p className="lede">Atendimento remoto no Brasil. O trabalho repetido já existe, e quem decide continua decidindo.</p>
          </div>
          <div className="stack">
            <article>
              <h2>O que precisa existir antes.</h2>
              <p>Um fluxo real: pedido, cobrança ou resumo do dia. Se a operação ainda não tem esse ritmo, o diagnóstico serve para dizer não.</p>
            </article>
            <article>
              <h2>Desde 2017.</h2>
              <p>GTX Gestão e Implementações Digitais. A conversa comercial é com Guilherme Teixeira, fundador da Agência GTX.</p>
            </article>
          </div>
        </div>
      </section>

      <Faq title="Perguntas sobre a implantação." items={faq} />

      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Peça o diagnóstico da operação.</h2>
            <p className="lede">30 minutos, sem contrato. Se não couber, a conversa acaba ali. Ou fale direto no <a href={whatsapp}>WhatsApp</a>.</p>
            <ul className="cta-points">
              <li>O investimento é definido depois do diagnóstico, conforme o escopo.</li>
              <li>Para empresas que faturam de R$ 100 mil a R$ 1 milhão por mês.</li>
              <li>Resposta em horário comercial, no WhatsApp que você deixar.</li>
            </ul>
          </div>
          <LeadForm page="/" messageLabel="Onde a operação pesa" />
        </div>
      </section>
    </Layout>
  );
}
