import Link from 'next/link';
import Grid from './Grid';
import { categories } from '../../lib/portfolio';

export default function PortfolioPage({ label, list, current }) {
  return (
    <div className="pf-c">
      <div className="pf-sep pf-sep-tabs">
        <span>{label}</span>
        <nav aria-label="Categorias do portfólio">
          <Link className={!current ? 'is-on' : undefined} href="/portfolio">Todos</Link>
          {categories.map((c) => (
            <Link key={c.slug} className={current === c.slug ? 'is-on' : undefined} href={`/portfolio/${c.slug}`}>{c.label}</Link>
          ))}
        </nav>
      </div>
      <div className="pf-grid-in">
        <Grid tiles={list} />
      </div>
    </div>
  );
}
