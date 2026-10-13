import { useEffect, useState } from 'react';
import Link from 'next/link';
import { solutions } from '../../lib/solutions';
import { SolutionPreview } from './SolutionArt';

function Chevron() {
  return (
    <svg className="chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav-inner">
        <Link href="/" className="brand" aria-label="GTX, início" onClick={close}>
          <span className="brand-mark" />
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
              <Chevron />
            </button>
            <div className="mega-panel" id="menu-solucoes">
              <div className="mega-list">
                <span
                  className="services-rail"
                  aria-hidden="true"
                  style={{ transform: `translateY(${active * 100}%)` }}
                />
                {solutions.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={index === active ? 'is-on' : undefined}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={close}
                  >
                    <span>{item.title}</span>
                    <small>{item.menu}</small>
                  </Link>
                ))}
              </div>
              <div className="mega-preview sol-stage" aria-hidden="true">
                <SolutionPreview id={solutions[active].id} />
              </div>
            </div>
          </div>
          <Link className="nav-link" href="/cases" onClick={close}>Cases</Link>
          <Link className="nav-link" href="/sobre" onClick={close}>Sobre</Link>
          <Link className="nav-link" href="/contato" onClick={close}>Contato</Link>
          <div className="nav-actions">
            <Link className="btn ghost nav-enter" href="/login" onClick={close}>Entrar</Link>
            <Link className="btn nav-cta" href="/contato" onClick={close}>Pedir diagnóstico</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
