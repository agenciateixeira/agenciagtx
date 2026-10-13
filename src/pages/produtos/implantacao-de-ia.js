import Layout from '../../components/site/Layout';
import LeadForm from '../../components/site/LeadForm';

export default function ImplantacaoIa() {
  return (
    <Layout
      title="IA no fluxo que a empresa já tem | GTX"
      description="Automação onde hoje alguém copia, cobra ou lembra. Diagnóstico de 30 minutos. Se não couber, a conversa acaba ali."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Produtos</p>
            <h1>IA no fluxo que a empresa já tem.</h1>
            <p className="lede">Automação onde hoje alguém copia, cobra ou lembra.</p>
          </div>
        </section>
        <section>
          <div className="shell stack">
            <article>
              <h2>Pedido que chega no WhatsApp.</h2>
              <p>Entra no sistema sem retrabalho.</p>
            </article>
            <article>
              <h2>Cobrança que se repete.</h2>
              <p>O lembrete sai sem alguém montar a lista.</p>
            </article>
            <article>
              <h2>Resumo do dia.</h2>
              <p>O que entrou, o que travou e o que vence amanhã.</p>
            </article>
            <article>
              <h2>O que não entra.</h2>
              <p>Aplicativo do zero, modelo treinado do nada e promessa de cortar equipe.</p>
            </article>
            <article>
              <h2>Da conversa à primeira automação.</h2>
              <p>Diagnóstico, plano curto, e a automação no canal que o time já usa.</p>
            </article>
          </div>
        </section>
      </article>
      <section className="contact" id="contato">
        <div className="shell contact-grid">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2>Ver se a IA cabe na sua operação.</h2>
            <p className="lede">30 minutos. Se não couber, a conversa acaba aqui.</p>
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
