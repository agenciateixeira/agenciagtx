import { useEffect, useState } from 'react';
import Link from 'next/link';
import { solutions } from '../../lib/solutions';
import { SolutionPreview } from './SolutionArt';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [active, setActive] = useState(0);

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
          <div className={`mega${productsOpen ? ' open' : ''}`}>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={productsOpen}
              aria-controls="menu-solucoes"
              onClick={() => setProductsOpen((value) => !value)}
            >
              Soluções
            </button>
            <div className="mega-panel" id="menu-solucoes">
              <div className="mega-list">
                {solutions.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={index === active ? 'is-on' : undefined}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={close}
                  >
                    {item.title}
                    <small>{item.menu}</small>
                  </Link>
                ))}
              </div>
              <div className="mega-preview sol-stage" aria-hidden="true">
                <SolutionPreview id={solutions[active].id} />
              </div>
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
