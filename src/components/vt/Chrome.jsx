import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function VtHeader() {
  const { pathname } = useRouter();
  const trabalhos = pathname === '/' || pathname.startsWith('/cases');
  return (
    <div className="vt-band">
    <header className="vt-wrap vt-top">
      <Link className="vt-logo" href="/" aria-label="GTX, início">
        <Image src="/images/logo-gtx-clara.png" alt="GTX" width={472} height={130} sizes="220px" priority />
        <span className="vt-logo-tag" aria-hidden="true">Gestão e implementações digitais</span>
      </Link>
      <nav className="vt-nav" aria-label="Principal">
        <Link href="/#trabalhos" className={trabalhos ? 'vt-on' : undefined}>Trabalhos</Link>
        <Link href="/#servicos">Serviços</Link>
        <Link href="/#processo">Processo</Link>
        <Link href="/#contato">Contato</Link>
      </nav>
      <Link className="vt-btn vt-light" href="/#contato">Pedir diagnóstico</Link>
    </header>
    </div>
  );
}

export function VtFooter() {
  return (
    <footer className="vt-foot-wrap">
      <div className="vt-wrap">
        <div className="vt-foot-g">
          <div>
            <Image src="/images/logo-gtx.png" alt="GTX" width={472} height={130} sizes="160px" />
            <p style={{ maxWidth: 330 }}>Lojas Shopify, mídia paga, implantação de IA, landing pages e sistemas.</p>
          </div>
          <div>
            <h5>Trabalhos</h5>
            <Link href="/cases/fine-tune-on-minis">Fine Tune on Minis</Link>
            <Link href="/#case-fluido">Fluido e Pool</Link>
            <Link href="/cases/sneaker-society">Sneaker Society</Link>
            <Link href="/cases">Todos os cases</Link>
          </div>
          <div>
            <h5>Serviços</h5>
            <Link href="/#srv-shopify">E-commerce Shopify</Link>
            <Link href="/produtos/gestao-de-trafego-pago">Gestão de tráfego pago</Link>
            <Link href="/produtos/implantacao-de-ia">Implantação de IA</Link>
            <Link href="/produtos/gestao-de-redes-sociais">Gestão de redes sociais</Link>
            <Link href="/#srv-landing">Landing pages</Link>
            <Link href="/#srv-sistemas">Sistemas</Link>
          </div>
          <div>
            <h5>Contato</h5>
            <a href="mailto:contato@agenciagtx.com.br">contato@agenciagtx.com.br</a>
            <a href="https://wa.me/5519990122773">+55 19 99012 2773</a>
            <Link href="/contato">Fale com a GTX</Link>
            <Link href="/sobre">Sobre</Link>
          </div>
        </div>
        <div className="vt-legal">
          <span>GTX Gestão e Implementações Digitais · CNPJ 41.768.146/0001-69</span>
          <nav aria-label="Rodapé">
            <span>© 2026 Agência GTX</span>
            <Link href="/politica-de-privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <Link href="/carreiras">Carreiras</Link>
            <Link href="/login">Entrar</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
