import Image from 'next/image';
import Link from 'next/link';
import { BF, PH, vz } from './Frames';
import { img } from '../../lib/vtImages';

const services = [
  ['Implementação de IA', 'srv-ia'],
  ['E-commerce Shopify', 'srv-shopify'],
  ['Landing pages', 'srv-landing'],
  ['Sistemas', 'srv-sistemas'],
  ['Mídia paga', 'srv-midia'],
];

function Logo({ name, alt, className, sizes }) {
  const file = img[name];
  return <Image className={className} src={file.src} width={file.width} height={file.height} alt={alt} sizes={sizes} />;
}

/* ---------- Hero C ---------- */
export function Hero() {
  return (
    <section className="vt-hc">
      <div className="vt-wrap">
        <div className="vt-hc-grid">
          <div>
            <div className="vt-eyebrow"><span className="vt-dot" />Shopify · IA · Sistemas · Mídia paga</div>
            <h1>Lojas Shopify sob medida e IA para a <em>operação inteira.</em></h1>
            <p className="vt-lead">Do tema ao pagamento, e da campanha ao sistema que roda por trás. A GTX constrói o que a sua empresa vende e opera.</p>
            <div className="vt-cta">
              <a className="vt-btn vt-solid" href="#contato">Pedir diagnóstico de 30 min</a>
              <a className="vt-btn vt-ghost" href="#trabalhos">Ver os trabalhos ↓</a>
            </div>
            <div className="vt-aifirst"><b>Abordagem AI first</b>A IA entra no desenho, na construção e na operação de cada projeto, de agentes de atendimento a análise de campanhas.</div>
          </div>
          <div className="vt-hc-card">
            <div className="vt-hc-title">
              <Logo name="fl-logo-sol" alt="" sizes="60px" />
              Fluido e Pool · Shopify · estreia 04/11
            </div>
            <BF name="fl-d-fold" url="eipool" light className="vt-hc-b1" priority sizes="(max-width: 760px) 86vw, 540px" alt="Página de produto da loja Fluido e Pool, no desktop" />
            <BF name="fl-d-trans" url="eipool" light className="vt-hc-b2" sizes="(max-width: 760px) 76vw, 500px" alt="Página 'Da areia ao mar' da loja Fluido e Pool" />
            <PH name="fl-m-mar" className="vt-hc-ph" sizes="(max-width: 760px) 36vw, 190px" alt="Loja Fluido e Pool no celular" />
            <div className="vt-chip vt-hc-c1">
              <b>No celular</b>
              Página de produto pensada para o celular
              <small>Tema Shopify sob medida</small>
            </div>
            <div className="vt-chip vt-hc-c2">
              <b>&quot;Da areia ao mar&quot;</b>
              Página de produto em creme e laranja
              <small>Em Liquid, com seções próprias</small>
            </div>
          </div>
        </div>
        <nav className="vt-svca" aria-label="O que a GTX entrega">
          <span className="vt-svca-t">O que a GTX entrega</span>
          {services.map(([name, id], index) => (
            <a key={id} href={`#${id}`}>
              <b>{`0${index + 1}`}</b>{name}<i aria-hidden="true">↓</i>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/* ---------- Trabalhos ---------- */
export function Works() {
  return (
    <section className="vt-sec" id="trabalhos">
      <div className="vt-wrap">
        <div className="vt-sec-h">
          <h2>Trabalhos</h2>
          <p>Duas lojas Shopify com tema sob medida: páginas de produto, carrinho e integrações. O que você vê aqui são as telas reais.</p>
        </div>

        <article className="vt-case vt-ft">
          <div className="vt-txt">
            <Logo name="ft-logo-header" alt="Fine Tune on Minis" className="vt-lg-ft" sizes="200px" />
            <div className="vt-num">Case 01 · Shopify · E-commerce</div>
            <h3>Fine Tune on Minis</h3>
            <p>Loja de miniaturas diecast 1:64 customizadas à mão, em tiragens extremamente reduzidas. Cada seção mostra o processo, da carroceria nua à montagem final.</p>
            <ul>
              <li>Tema Shopify customizado, com a identidade &quot;Garagem Noturna&quot;</li>
              <li>Carrinho &quot;Pit Stop&quot; em quatro etapas</li>
              <li>Página de produto por cor, com barra de compra fixa no celular</li>
              <li>Frete Frenet, avaliações Judge.me e domínio próprio</li>
            </ul>
            <div className="vt-foot">
              <Link className="vt-go" href="/cases/fine-tune-on-minis">Ver o case completo →</Link>
              <a className="vt-status" href="https://finetuneonminis.com.br" target="_blank" rel="noopener noreferrer"><span className="vt-dot" />finetuneonminis.com.br</a>
            </div>
          </div>
          <div className="vt-vis">
            <div className="vt-vz">
              <BF name="ft-home-desktop-fold" url="finetuneonminis.com.br" style={vz(36, 44, 600)} sizes="(max-width: 760px) 80vw, 600px" alt="Home da loja Fine Tune on Minis" />
              <BF name="ft-pdp-desktop-fold" url="finetuneonminis.com.br/products" style={vz(110, 300, 580)} sizes="(max-width: 760px) 80vw, 580px" alt="Página de produto da Fine Tune on Minis" />
              <PH name="ft-cart-mobile" style={vz(476, 120, 208)} sizes="(max-width: 760px) 30vw, 208px" alt="Carrinho Pit Stop no celular" />
            </div>
          </div>
        </article>

        <article className="vt-case vt-fl">
          <div className="vt-vis">
            <div className="vt-vz">
              <BF name="fl-d-fold" url="eipool" light style={vz(44, 56, 610)} sizes="(max-width: 760px) 80vw, 610px" alt="Página de produto da Fluido e Pool" />
              <BF name="fl-d-mar" url="eipool" light style={vz(110, 372, 600)} sizes="(max-width: 760px) 80vw, 600px" alt="Seção 'Compre com tranquilidade' da Fluido e Pool" />
              <PH name="fl-m-fold" style={vz(490, 150, 196)} sizes="(max-width: 760px) 28vw, 196px" alt="Fluido e Pool no celular" />
            </div>
          </div>
          <div className="vt-txt">
            <Logo name="fl-logo-sol" alt="Fluido e Pool eiPool" className="vt-lg-fl" sizes="200px" />
            <div className="vt-num">Case 02 · Shopify · Produto único</div>
            <h3>Fluido e Pool <em>(eiPool)</em></h3>
            <p>Loja do Fluido da Seda, reconstrutor térmico de 120 ml. A página de produto leva da areia ao mar enquanto a pessoa rola, com preço, 12x e botão de compra no primeiro scroll.</p>
            <ul>
              <li>Tema Shopify sob medida, em Liquid, com seções próprias</li>
              <li>Página &quot;Da areia ao mar&quot;, em creme e laranja</li>
              <li>Seções de garantia e de Clube Pro na página de produto</li>
              <li>Página de produto pensada para a velocidade no celular</li>
            </ul>
            <div className="vt-foot">
              <span className="vt-status">Estreia em 04/11/2026</span>
              <span className="vt-tag">Case em preparo</span>
            </div>
          </div>
        </article>

        <div className="vt-more">
          <div className="vt-mini">
            <div className="vt-lg"><Logo name="logosneakers" alt="Sneaker Society" sizes="300px" /></div>
            <small>Tráfego pago</small>
            <h4>Sneaker Society</h4>
            <p>Gestão de mídia paga sobre a verba existente. Resultado em <a href="#srv-midia">Mídia paga ↓</a></p>
          </div>
          <div className="vt-mini">
            <div className="vt-lg"><Logo name="logofl" alt="Frasco Life" sizes="300px" /></div>
            <small>Cliente GTX</small>
            <h4>Frasco Life</h4>
            <p>A operação industrial, nos canais digitais.</p>
          </div>
          <div className="vt-mini">
            <div className="vt-lg vt-dk"><Logo name="logojsete" alt="Jsete" sizes="300px" /></div>
            <small>Cliente GTX</small>
            <h4>Jsete</h4>
            <p>Da loja física para a loja online.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Serviços: 5 capítulos de largura total ---------- */
function Chapter({ id, n, name, line, cls, href, children }) {
  return (
    <div className={`vt-ch vt-${cls}`} id={id}>
      <div className="vt-ch-v">{children}</div>
      <div className="vt-ch-t">
        <span className="vt-ch-n">{n}</span>
        <h3>{name}</h3>
      </div>
      <div className="vt-ch-bar">
        <b>{n} / 05</b>
        <span>{name}</span>
        <span className="vt-ln">{line}</span>
        {href ? <Link href={href} aria-label={`Saiba mais: ${name}`}>↗</Link> : <i aria-hidden="true">↗</i>}
      </div>
    </div>
  );
}

function Shot({ name, className = '', sizes, alt = '', position = 'top' }) {
  const file = img[name];
  return (
    <div className={`vt-im${className ? ` ${className}` : ''}`}>
      <Image src={file.src} alt={alt} fill sizes={sizes} style={{ objectPosition: position }} />
    </div>
  );
}

export function Services() {
  return (
    <section className="vt-ve" id="servicos">
      <Chapter id="srv-ia" n="01" name="Implementação de IA" line="IA dentro do processo que já existe" cls="c1" href="/produtos/implantacao-de-ia">
        <div className="vt-chat">
          <div className="vt-bub"><small>WhatsApp</small>Oi, quero 2 caixas para sexta.</div>
          <div className="vt-arr" aria-hidden="true">→</div>
          <div className="vt-ord">
            <small>Pedido registrado no ERP</small>
            <div><span>Itens</span><b>2 caixas</b></div>
            <div><span>Entrega</span><b>sexta</b></div>
            <div><span>Origem</span><b>WhatsApp</b></div>
          </div>
        </div>
        <div className="vt-ill">Fluxo de exemplo do método GTX</div>
      </Chapter>

      <Chapter id="srv-shopify" n="02" name="E-commerce Shopify" line="Tema sob medida, do produto ao carrinho" cls="c2">
        <Shot name="ft-shopify-car" className="vt-big" sizes="(max-width: 900px) 420px, 820px" alt="Página de produto da Fine Tune on Minis no desktop" />
        <div className="vt-phn"><Shot name="ft-pdp-mobile-s01" sizes="200px" alt="Página de produto da Fine Tune on Minis no celular" /></div>
      </Chapter>

      <Chapter id="srv-landing" n="03" name="Landing pages" line="Páginas de campanha rápidas e medidas" cls="c3">
        <Shot name="fl-d-meio" className="vt-big" sizes="(max-width: 900px) 420px, 880px" alt="Seção da página da Fluido e Pool no desktop" />
        <div className="vt-phn"><Shot name="fl-m-leve" sizes="200px" alt="Seção da página da Fluido e Pool no celular" /></div>
      </Chapter>

      <Chapter id="srv-sistemas" n="04" name="Sistemas" line="OS com fotos e checklist · estoque com curva ABC · PDV · financeiro com DRE · NF-e e NFS-e" cls="c4">
        <BF name="four-app-1" url="sistemafourcustom.com.br" className="vt-bfr" sizes="(max-width: 900px) 440px, 840px" alt="Tela de gestão de estoque do sistema da Four Custom Garage" />
        <BF name="four-app-2" url="sistemafourcustom.com.br" className="vt-bfr2" sizes="(max-width: 900px) 290px, 560px" alt="Tela de ordens de serviço do sistema da Four Custom Garage" />
        <div className="vt-ch-cap">
          <Logo name="four-logo" alt="Four Custom Garage" className="vt-ch-logo" sizes="210px" />
          <p>ERP, CRM e PDV para oficina de motocicletas.</p>
          <span>sistemafourcustom.com.br</span>
        </div>
      </Chapter>

      <Chapter id="srv-midia" n="05" name="Mídia paga" line="Meta, Google e LinkedIn" cls="c5" href="/produtos/gestao-de-trafego-pago">
        <div className="vt-sn-big">
          <Logo name="logosneakers" alt="Sneaker Society" className="vt-lgsn" sizes="200px" />
          <div>
            <b>De R$ 19 mil para mais de R$ 60 mil por mês</b>
            <span>mesmo custo de anúncio.</span>
          </div>
        </div>
      </Chapter>
    </section>
  );
}

/* ---------- Processo ---------- */
const steps = [
  ['01', 'Diagnóstico', 'Conversa de 30 minutos sobre a operação, o público e a meta de vendas.', 'Entrega: plano de ação'],
  ['02', 'Desenho', 'Direção visual, estrutura das páginas e fluxo de compra, validados com você.', 'Entrega: telas aprovadas'],
  ['03', 'Construção', 'Tema, integrações e campanhas, testados em celular e desktop.', 'Entrega: loja em ambiente de teste'],
  ['04', 'Lançamento e evolução', 'Publicação, medição de velocidade e vendas, ajustes a cada ciclo.', 'Entrega: loja no ar e relatório'],
];

export function Process() {
  return (
    <section className="vt-sec" id="processo">
      <div className="vt-wrap">
        <div className="vt-sec-h">
          <h2>Como o trabalho <em>acontece</em></h2>
          <p>Quatro etapas com entrega visível em cada uma. Você aprova o desenho antes da construção.</p>
        </div>
        <div className="vt-proc">
          {steps.map(([n, title, text, out]) => (
            <div className="vt-step" key={n}>
              <div className="vt-n">{n}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="vt-out">{out}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
