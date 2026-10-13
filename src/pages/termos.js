import Layout from '../components/site/Layout';

export default function Termos() {
  return (
    <Layout
      title="Termos de uso | GTX"
      description="Como o site da GTX pode ser usado."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Legal</p>
            <h1>Termos de uso.</h1>
            <p className="lede">Como este site pode ser usado.</p>
          </div>
        </section>
        <section>
          <div className="shell prose">
            <h2>O site</h2>
            <p>Este site apresenta a GTX e recebe pedidos de diagnóstico. O uso é pessoal. Não publique o conteúdo como se fosse seu.</p>
            <h2>O que o site não promete</h2>
            <p>Textos de case descrevem relatos de clientes. Um número só vale com período e conferência da conta. O diagnóstico não é proposta fechada e pode terminar sem contrato.</p>
            <h2>Conta e formulário</h2>
            <p>As informações que você envia precisam ser verdadeiras. O envio não cria obrigação de atendimento além da resposta em horário comercial.</p>
            <h2>Contato</h2>
            <p>Dúvidas sobre estes termos: contato@agenciagtx.com.br.</p>
          </div>
        </section>
      </article>
    </Layout>
  );
}
