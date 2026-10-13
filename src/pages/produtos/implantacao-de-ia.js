import Layout from '../../components/site/Layout';
import LeadForm from '../../components/site/LeadForm';
import FlowMap from '../../components/site/FlowMap';
import Faq from '../../components/site/Faq';
import Steps from '../../components/site/Steps';
import { faqSchema } from '../../lib/seo';

const crumbs = [
  { href: '/', label: 'Início' },
  { href: '/produtos/implantacao-de-ia', label: 'Implantação de IA' },
];

const deliverables = [
  {
    n: '01',
    label: 'Mapa',
    line: 'Agora, depois, e o que não entra.',
    text: 'O primeiro entregável é esse recorte, não um aplicativo ao lado da operação.',
  },
  {
    n: '02',
    label: 'Primeira automação',
    line: 'No canal que o time já usa.',
    text: 'Pedido, cobrança ou resumo do dia. O prazo fica no plano, porque depende do fluxo.',
  },
  {
    n: '03',
    label: 'Critério de desligar',
    line: 'O que ninguém usa sai.',
    text: 'A implantação inclui a regra para tirar do ar o que não entrou no dia.',
  },
  {
    n: '04',
    label: 'Acompanhamento',
    line: 'Todo mês.',
    text: 'Ajuste do que ficou no ar, enquanto o plano estiver ativo.',
  },
];

const timeline = [
  {
    n: '01',
    label: 'Diagnóstico',
    line: '30 minutos.',
    text: 'Sem contrato. Se não couber, a conversa acaba ali.',
  },
  {
    n: '02',
    label: 'Plano',
    line: 'Na sequência do diagnóstico.',
    text: 'O que fazer agora, o que fica para depois e o que não entra.',
  },
  {
    n: '03',
    label: 'Primeira automação',
    line: 'Prazo definido no plano.',
    text: 'Não há uma data única para toda empresa. O fluxo é que define.',
  },
  {
    n: '04',
    label: 'Expansão',
    line: 'Depois da primeira em uso.',
    text: 'O próximo item do mapa, no mês seguinte do plano.',
  },
];

const segments = [
  {
    n: '01',
    label: 'Comércio',
    line: 'O pedido chega no WhatsApp.',
    text: 'Alguém copia para o sistema. A automação faz esse registro no fluxo que já existe.',
  },
  {
    n: '02',
    label: 'Serviço',
    line: 'A cobrança sai quando alguém lembra.',
    text: 'O lembrete passa a sair do fluxo, sem uma lista montada na mão.',
  },
  {
    n: '03',
    label: 'Operação',
    line: 'O resumo do dia é uma tarefa.',
    text: 'Quem decide recebe o fechamento sem esperar a planilha.',
  },
  {
    n: '04',
    label: 'Atendimento',
    line: 'A mesma pergunta volta.',
    text: 'A resposta fica no canal, em vez de depender de quem lembra o caso.',
  },
];

const metrics = [
  {
    n: '01',
    label: 'Pedido',
    line: 'Entrou no sistema sem alguém copiar.',
  },
  {
    n: '02',
    label: 'Cobrança',
    line: 'Saiu no combinado do plano.',
  },
  {
    n: '03',
    label: 'Resumo',
    line: 'Chegou para quem decide.',
  },
  {
    n: '04',
    label: 'Uso',
    line: 'O que ninguém usa foi desligado.',
  },
];

const faq = [
  {
    q: 'O que entra no escopo?',
    a: 'Automação no fluxo que a empresa já tem. Pedido, cobrança, resumo do dia e a pergunta que hoje alguém responde na mão.',
  },
  {
    q: 'O que não entra?',
    a: 'Aplicativo do zero sem processo, modelo treinado do nada, promessa de cortar equipe e retorno prometido antes de ver a operação.',
  },
  {
    q: 'Quanto tempo dura o diagnóstico?',
    a: '30 minutos, sem contrato. Se não couber, a conversa acaba ali.',
  },
  {
    q: 'Quando a primeira automação fica pronta?',
    a: 'O prazo fica no plano. Ele depende do fluxo, então não é uma data igual para toda empresa.',
  },
  {
    q: 'Quanto custa?',
    a: 'O investimento é definido depois do diagnóstico, conforme o escopo. Entram o diagnóstico, o plano, a primeira automação, a expansão quando a primeira estiver em uso, e o acompanhamento mensal.',
  },
  {
    q: 'Vocês trocam o sistema da empresa?',
    a: 'Não. A IA entra no WhatsApp, no CRM, no ERP ou na planilha que a operação já usa.',
  },
  {
    q: 'Vocês treinam um modelo do zero?',
    a: 'Não. O trabalho é a automação no fluxo atual, não um modelo novo.',
  },
  {
    q: 'O que vocês acompanham?',
    a: 'Se o pedido entrou sem cópia, se a cobrança saiu, se o resumo chegou para quem decide, e se algo implantado ficou sem uso.',
  },
  {
    q: 'Para quem é?',
    a: 'Empresas que faturam de R$ 100 mil a R$ 1 milhão por mês, com atendimento remoto no Brasil.',
  },
];

export default function ImplantacaoIa() {
  return (
    <Layout
      title="IA no fluxo que a empresa já tem | GTX"
      description="Automação onde hoje alguém copia, cobra ou lembra. Diagnóstico de 30 minutos. O investimento é definido depois do diagnóstico, conforme o escopo. Se não couber, a conversa acaba ali."
      crumbs={crumbs}
      jsonLd={[faqSchema(faq)]}
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <h1>IA no fluxo que a empresa já tem.</h1>
            <p className="lede">Automação onde hoje alguém copia, cobra ou lembra. O investimento é definido depois do diagnóstico, conforme o escopo.</p>
          </div>
        </section>

        <section className="section flush-top">
          <div className="shell">
            <FlowMap />
          </div>
        </section>

        <section className="section" aria-label="Escopo">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Escopo</p>
              <h2>O que a implantação cobre.</h2>
              <p className="lede">O trabalho repetido que já acontece. Não um sistema novo ao lado dele.</p>
            </div>
            <div className="stack">
              <article>
                <h2>O que entra.</h2>
                <p>Pedido, cobrança, resumo do dia e a triagem do que chega no canal atual. WhatsApp, CRM, ERP ou planilha.</p>
              </article>
              <article>
                <h2>O que não entra.</h2>
                <p>Aplicativo do zero, modelo treinado do nada e promessa de cortar equipe. Retorno prometido antes de ver a operação também fica de fora.</p>
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
              <h2>Quanto tempo cada etapa leva.</h2>
              <p className="lede">O diagnóstico tem hora marcada. O resto espera o fluxo real.</p>
            </div>
            <Steps items={timeline} label="Prazo" />
          </div>
        </section>

        <section className="section" aria-label="Segmentos">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Segmentos</p>
              <h2>Onde esse fluxo aparece.</h2>
              <p className="lede">Exemplos do trabalho, não um resultado de cliente.</p>
            </div>
            <Steps items={segments} label="Segmentos" />
          </div>
        </section>

        <section className="section" aria-label="Métricas">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">Métricas</p>
              <h2>O que a implantação olha.</h2>
              <p className="lede">Quatro sinais do fluxo. Sem percentual prometido antes de ver a operação.</p>
            </div>
            <Steps items={metrics} label="Métricas" />
          </div>
        </section>

        <section className="section" aria-label="Valor">
          <div className="shell stack">
            <article>
              <p className="eyebrow">Valor</p>
              <h2>Definido depois do diagnóstico.</h2>
              <p>O investimento acompanha o escopo. Entram o diagnóstico, o plano curto, a primeira automação, a expansão quando a primeira estiver em uso, e o acompanhamento do que ficou no ar. O diagnóstico não vira contrato. Se não couber, a conversa acaba ali.</p>
            </article>
          </div>
        </section>
      </article>

      <Faq title="Perguntas sobre a implantação." items={faq} />

      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Ver se a IA cabe na sua operação.</h2>
            <p className="lede">30 minutos, sem contrato. O investimento é definido depois do diagnóstico, conforme o escopo. Se não couber, a conversa acaba aqui.</p>
            <ul className="cta-points">
              <li>Para empresas de R$ 100 mil a R$ 1 milhão por mês.</li>
              <li>WhatsApp, CRM, ERP ou planilha.</li>
              <li>Resposta em horário comercial.</li>
            </ul>
          </div>
          <LeadForm
            page="/produtos/implantacao-de-ia"
            interesse="Implantação de IA"
            showInteresse={false}
          />
        </div>
      </section>
    </Layout>
  );
}
