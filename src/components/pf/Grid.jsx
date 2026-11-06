import Image from 'next/image';
import Link from 'next/link';
import { clientOf } from '../../lib/portfolio';
import { IconEye } from './Icons';

export function Tile({ href, client, title, src, priority = false, alt }) {
  return (
    <Link href={href} className="pf-post">
      <Image className="pf-post-img" src={src} alt={alt || `${client}, ${title}`} fill priority={priority} sizes="(max-width: 575px) 100vw, (max-width: 767px) 50vw, 34vw" />
      <span className="pf-post-cover">
        <span className="pf-post-txt">
          <span className="pf-post-client">{client}</span>
          <span className="pf-post-title">{title}</span>
          <span className="pf-post-icon"><IconEye /></span>
        </span>
      </span>
    </Link>
  );
}

export default function Grid({ tiles, priorityCount = 3 }) {
  return (
    <div className="pf-grid">
      {tiles.map((t, i) => (
        <Tile key={`${t.src}-${i}`} href={`/cases/${t.slug}`} client={t.client || clientOf(t.slug)} title={t.title} src={t.src} priority={i < priorityCount} />
      ))}
    </div>
  );
}
