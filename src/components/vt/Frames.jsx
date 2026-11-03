import Image from 'next/image';
import { img } from '../../lib/vtImages';

/* Moldura de navegador com captura real. Posição e largura chegam por style, em porcentagem do bloco. */
export function BF({ name, url, light = false, style, className = '', sizes = '(max-width: 760px) 80vw, 600px', priority = false, alt = '' }) {
  const file = img[name];
  return (
    <div className={`vt-bf${light ? ' vt-lt' : ''}${className ? ` ${className}` : ''}`} style={style}>
      <div className="vt-bf-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <div className="vt-bf-url">{url}</div>
      </div>
      <Image src={file.src} width={file.width} height={file.height} alt={alt} sizes={sizes} priority={priority} />
    </div>
  );
}

/* Moldura de celular. */
export function PH({ name, style, className = '', sizes = '(max-width: 760px) 34vw, 210px', alt = '' }) {
  const file = img[name];
  return (
    <div className={`vt-ph${className ? ` ${className}` : ''}`} style={style}>
      <Image src={file.src} width={file.width} height={file.height} alt={alt} sizes={sizes} />
    </div>
  );
}

const pct = (value, base) => `${Math.round((value / base) * 100000) / 1000}%`;

/* Posição em porcentagem dentro de uma composição de largura w e altura h (px do desenho aprovado). */
export const place = (w, h) => (left, top, width) => ({
  left: pct(left, w),
  top: pct(top, h),
  width: pct(width, w),
});

export const vz = place(710, 700);
export const duo = place(653, 560);
