import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { categories } from '../../lib/portfolio';
import { IconInstagram, IconLinkedin, IconWhatsapp } from './Icons';
import { INSTAGRAM, LINKEDIN, WHATSAPP } from './contacts';

function Social({ className }) {
  return (
    <div className={`pf-social ${className || ''}`}>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da GTX"><IconWhatsapp /></a>
      <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram da GTX"><IconInstagram /></a>
      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da GTX"><IconLinkedin /></a>
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const home = router.pathname === '/';
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(router.pathname.startsWith('/portfolio'));
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 30);
      if (!home) setHidden(y > 220 && y > last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [home]);

  useEffect(() => {
    const close = () => setOpen(false);
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    router.events.on('routeChangeStart', close);
    window.addEventListener('keydown', onKey);
    return () => {
      router.events.off('routeChangeStart', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [router.events]);

  const is = (href) => (href === '/' ? router.pathname === '/' : router.asPath.startsWith(href));
  const cls = [
    'pf-h',
    home ? 'pf-h-home' : 'pf-h-inner',
    home && compact ? 'is-compact' : '',
    hidden && !open ? 'is-hidden' : '',
    open ? 'is-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="pf-c pf-h-in">
        <div className="pf-logo">
          <Link href="/" aria-label="GTX, página inicial">
            <Image src="/images/logo-gtx-portfolio.png" alt="GTX" width={472} height={130} priority sizes="(max-width: 575px) 140px, 360px" />
          </Link>
          <span aria-hidden="true">Implementações digitais</span>
        </div>
        <div className="pf-h-btns">
          <Social className="pf-social-h" />
          <button type="button" className={`pf-menu-btn${open ? ' is-active' : ''}`} aria-expanded={open} aria-controls="pf-menu" onClick={() => setOpen((v) => !v)}>
            <span className="pf-burger" aria-hidden="true"><i /><i /><i /></span>
            Menu
          </button>
        </div>
        <nav id="pf-menu" className={`pf-menu${open ? ' is-show' : ''}`} aria-label="Menu principal">
          <ul className="pf-menu-l1">
            <li><Link className={is('/') ? 'is-on' : undefined} href="/">Home</Link></li>
            <li><Link className={is('/sobre') ? 'is-on' : undefined} href="/sobre">Quem somos</Link></li>
            <li>
              <button type="button" className={is('/portfolio') || is('/cases') ? 'is-on' : undefined} aria-expanded={sub} onClick={() => setSub((v) => !v)}>Portfólio</button>
              {sub ? (
                <ul className="pf-menu-l2">
                  <li><Link href="/portfolio">Todos</Link></li>
                  {categories.map((c) => <li key={c.slug}><Link href={`/portfolio/${c.slug}`}>{c.label}</Link></li>)}
                </ul>
              ) : null}
            </li>
            <li><Link className={is('/servicos') ? 'is-on' : undefined} href="/servicos">Serviços</Link></li>
            <li><Link className={is('/contato') ? 'is-on' : undefined} href="/contato">Contato</Link></li>
          </ul>
          <Social className="pf-social-m" />
        </nav>
      </div>
    </header>
  );
}
