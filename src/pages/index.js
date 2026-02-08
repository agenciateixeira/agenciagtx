import Head from 'next/head';
import GTXLanding from '../components/GTXLanding';

export default function Home() {
  return (
    <>
      <Head>
        <title>GTX Marketing e Vendas — Tráfego Pago que Gera Resultados</title>
        <meta name="description" content="Especialistas em tráfego pago e transformação digital para e-commerce, restaurantes e serviços. Consultoria estratégica gratuita." />
      </Head>
      <GTXLanding />
    </>
  );
}
