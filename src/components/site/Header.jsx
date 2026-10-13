import { useEffect, useState } from 'react';
import Link from 'next/link';

const produtos = [
  { href: '/produtos/implantacao-de-ia', title: 'Implantação de IA', text: 'No fluxo que a empresa já tem.' },
  { href: '/produtos/gestao-de-trafego-pago', title: 'Gestão de tráfego pago', text: 'Meta, Google e LinkedIn.' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="GTX, início" onClick={close}>
          <img src="/images/logo-gtx.png" alt="GTX" width="472" height="130" />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>
        <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Principal">
          <div className={`produtos${productsOpen ? ' open' : ''}`}>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
            >
              Produtos
            </button>
            <div className="produtos-panel">
              {produtos.map((item) => (
                <Link key={item.href} href={item.href} onClick={close}>
                  {item.title}
                  <small>{item.text}</small>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/cases" onClick={close}>Cases</Link>
          <Link href="/sobre" onClick={close}>Sobre</Link>
          <Link href="/contato" onClick={close}>Contato</Link>
          <Link className="btn nav-cta" href="/contato" onClick={close}>Pedir diagnóstico</Link>
        </nav>
      </div>
    </header>
  );
}
