import Image from 'next/image';
import Link from 'next/link';
import { EMAIL, INSTAGRAM, LINKEDIN, PHONE, WHATSAPP } from './contacts';

export default function Footer() {
  return (
    <footer className="pf-f">
      <div className="pf-c pf-f-g">
        <div className="pf-f-legal">
          <p>
            Design e desenvolvimento por GTX.<br />
            GTX Gestão e Implementações Digitais, <span className="pf-nw">CNPJ 41.768.146/0001-69</span><br />
            Atendimento remoto em todo o Brasil, desde 2017<br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> / Tel: <a href={WHATSAPP}>{PHONE}</a>
          </p>
        </div>
        <div className="pf-f-mid">
          <Link href="/" aria-label="GTX, página inicial">
            <Image src="/images/logo-gtx-portfolio.png" alt="GTX" width={472} height={130} sizes="200px" />
          </Link>
          <div className="pf-f-copy">
            © 2026 Todos os direitos reservados
            <span> | </span><Link href="/politica-de-privacidade">Política de privacidade</Link>
            <span> | </span><Link href="/termos">Termos</Link>
            <span> | </span><Link href="/carreiras">Carreiras</Link>
            <span> | </span><Link href="/login">Entrar</Link>
          </div>
        </div>
        <div className="pf-f-links">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Whatsapp</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">Linkedin</a>
        </div>
      </div>
    </footer>
  );
}
