import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="foot-wrap">
      <div className="shell">
        <div className="foot">
          <div className="foot-brand">
            <span className="brand-mark" role="img" aria-label="GTX" />
            <p>contato@agenciagtx.com.br<br />+55 19 99012 2773</p>
          </div>
          <nav aria-label="Rodapé">
            <Link href="/produtos/implantacao-de-ia">Implantação de IA</Link>
            <Link href="/produtos/gestao-de-redes-sociais">Gestão de redes sociais</Link>
            <Link href="/produtos/gestao-de-trafego-pago">Gestão de tráfego pago</Link>
            <Link href="/cases">Cases</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/politica-de-privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <Link href="/carreiras">Carreiras</Link>
          </nav>
        </div>
        <p className="legal">GTX Gestão e Implementações Digitais · CNPJ 41.768.146/0001-69</p>
      </div>
    </footer>
  );
}
