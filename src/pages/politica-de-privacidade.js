import Layout from '../components/site/Layout';

export default function Politica() {
  return (
    <Layout
      title="Política de privacidade | GTX"
      description="O que o site da GTX coleta no formulário, no WhatsApp e nos anúncios."
    >
      <article className="page">
        <section className="hero">
          <div className="shell">
            <p className="eyebrow">Legal</p>
            <h1>Política de privacidade.</h1>
            <p className="lede">O que o site coleta no formulário, no WhatsApp e nos anúncios.</p>
          </div>
        </section>
        <section>
          <div className="shell prose">
            <h2>Quem é o responsável</h2>
            <p>GTX Gestão e Implementações Digitais, CNPJ 41.768.146/0001-69. Contato: contato@agenciagtx.com.br.</p>
            <h2>O que coletamos</h2>
            <p>No formulário: nome, email, WhatsApp, empresa, mensagem, a página de origem e os parâmetros de campanha presentes na visita (utm e gclid).</p>
            <p>No clique do WhatsApp, o número é o da própria conversa. Não guardamos o conteúdo do chat neste site.</p>
            <p>A visita pode registrar página, identificador de sessão e dados técnicos se o rastreamento do site estiver configurado.</p>
            <h2>Para que usamos</h2>
            <p>Para responder o pedido de diagnóstico, medir campanhas e entender de qual página veio o contato.</p>
            <h2>Com quem compartilhamos</h2>
            <p>O pedido de contato é gravado no HubSpot. O site carrega o Meta Pixel e o Google Analytics para medir visita e lead. Esses serviços recebem os dados técnicos do navegador conforme a configuração de cada um.</p>
            <h2>Por quanto tempo</h2>
            <p>Enquanto a conversa comercial existir, e depois pelo prazo necessário para obrigação legal.</p>
            <h2>Seus direitos</h2>
            <p>Você pode pedir acesso, correção ou exclusão pelo email contato@agenciagtx.com.br.</p>
          </div>
        </section>
      </article>
    </Layout>
  );
}
