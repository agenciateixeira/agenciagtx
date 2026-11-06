import Image from 'next/image';
import Link from 'next/link';
import { BF, PH, duo } from './Frames';
import { img } from '../../lib/vtImages';

const URL_FT = 'finetuneonminis.com.br';

function Crop({ name, scale, origin, sizes, alt = '' }) {
  const file = img[name];
  return (
    <div className="vt-crop">
      <Image src={file.src} alt={alt} fill sizes={sizes} style={{ transform: `scale(${scale})`, transformOrigin: origin }} />
    </div>
  );
}

function Figure({ name, span, caption, alt, sizes }) {
  const file = img[name];
  return (
    <figure className={`vt-${span}`}>
      <Image src={file.src} width={file.width} height={file.height} alt={alt} sizes={sizes} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function FineTuneCase() {
  const logo = img['ft-logo-header'];
  const fl = img['fl-logo-sol'];
  return (
    <>
      <div className="vt-wrap vt-crumb"><Link href="/#trabalhos">Trabalhos</Link> / <b>Fine Tune on Minis</b></div>

      <section className="vt-c-hero">
        <div className="vt-wrap">
          <div className="vt-client-tile"><Image src={logo.src} width={logo.width} height={logo.height} alt="Fine Tune on Minis" sizes="240px" /></div>
          <div className="vt-eyebrow" style={{ marginTop: 26 }}><span className="vt-dot" />Case · Loja Shopify</div>
          <h1>Fine Tune <em>on Minis</em></h1>
          <div className="vt-c-lead">
            <p>Uma loja que apresenta cada miniatura como a peça de colecionador que ela é, com a identidade &quot;Garagem Noturna&quot; do primeiro scroll ao pagamento.</p>
            <div><a className="vt-go" href="https://finetuneonminis.com.br" target="_blank" rel="noopener noreferrer">Visitar a loja →</a></div>
          </div>
          <div className="vt-meta">
            <div><small>Cliente</small><span>Fine Tune on Minis, miniaturas diecast 1:64 customizadas</span></div>
            <div><small>Escopo</small><span>Tema, páginas de produto, carrinho, integrações</span></div>
            <div><small>Plataforma</small><span>Shopify, tema Rise customizado</span></div>
          </div>
        </div>
      </section>

      <section className="vt-c-stage">
        <div className="vt-stage-in">
          <div className="vt-c-m">
            <BF name="ft-home-desktop-fold" url={URL_FT} className="vt-c-bf" sizes="(max-width: 760px) 90vw, 900px" alt="Home da loja Fine Tune on Minis no desktop" />
            <PH name="ft-home-mobile-fold" className="vt-c-p1" sizes="(max-width: 760px) 40vw, 232px" alt="Home da Fine Tune on Minis no celular" />
            <PH name="ft-cart-mobile" className="vt-c-p2" sizes="(max-width: 760px) 40vw, 232px" alt="Carrinho Pit Stop no celular" />
          </div>
          <div className="vt-cap vt-c-cap">
            <Image src={logo.src} width={logo.width} height={logo.height} alt="Fine Tune on Minis" sizes="90px" /> · home, carrinho Pit Stop e celular · no ar
          </div>
        </div>
      </section>

      <section className="vt-sec">
        <div className="vt-wrap vt-chal">
          <div>
            <div className="vt-eyebrow">O desafio</div>
            <h2 style={{ marginTop: 20 }}>Vender uma peça feita à mão, <em>uma por vez.</em></h2>
          </div>
          <div className="vt-txt">
            <p>Cada miniatura sai da caixa desmontada, ganha cromo total, cor escolhida pelo cliente e volta montada, em tiragem extremamente reduzida e com 30 dias de produção. A loja explica esse processo, mostra cada cor com clareza e deixa o prazo visível antes do pagamento.</p>
            <div className="vt-needs">
              <div><b>01</b><span>Contar o processo<small>Do desmonte à montagem final, em imagem e texto curto.</small></span></div>
              <div><b>02</b><span>Escolher a cor com segurança<small>Rosa, Azul Gulf, Verde e Amarelo Siciliano, cada uma com foto própria.</small></span></div>
              <div><b>03</b><span>Prazo e frete claros antes do pagamento<small>Aviso de 30 dias de produção no produto e no carrinho.</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="vt-sec vt-built" style={{ paddingTop: 20 }}>
        <div className="vt-wrap">
          <div className="vt-eyebrow">O que a GTX construiu</div>
          <h2 style={{ marginTop: 18 }}>Cada tela com a mesma <em>identidade</em>, da home ao carrinho.</h2>

          <div className="vt-blk">
            <div className="vt-t">
              <div className="vt-k">01 · Home</div>
              <h3>Uma home que mostra o processo</h3>
              <p>O primeiro scroll abre com &quot;Reimaginando o que a indústria faz em série&quot;. Em seguida, quatro etapas de bancada, o destaque do Daniel Wu e a tira de negativos &quot;Revele o branco&quot;.</p>
              <ul>
                <li>Hero com carroceria nua, base e montagem final</li>
                <li>Seção &quot;Nada aqui sai em série&quot; em quatro etapas</li>
                <li>Interação de negativos para revelar a edição branca</li>
              </ul>
            </div>
            <div className="vt-v vt-duo">
              <BF name="ft-home-desktop-s02" url={URL_FT} style={duo(0, 0, 560)} sizes="(max-width: 760px) 80vw, 560px" alt="Seção 'Nada aqui sai em série' da home" />
              <BF name="ft-home-desktop-s08" url={URL_FT} style={duo(213, 250, 440)} sizes="(max-width: 760px) 66vw, 440px" alt="Seção 'Na bancada' e tira de negativos da home" />
            </div>
          </div>

          <div className="vt-blk vt-rev">
            <div className="vt-t">
              <div className="vt-k">02 · Edições</div>
              <h3>Tiragens e cores em destaque</h3>
              <p>&quot;Duas edições. Nenhuma igual.&quot; apresenta Wagon Cromo e Sedan Full Cromo, com preço e seletor de cores. A tabela &quot;Garagem&quot; lista cada cor e o status da tiragem.</p>
              <ul>
                <li>Cartões de edição com preço de R$ 690</li>
                <li>Tabela de tiragens por cor, com status &quot;Aberta&quot;</li>
                <li>Seção &quot;Na bancada&quot; com fotos do processo</li>
              </ul>
            </div>
            <div className="vt-v vt-duo">
              <BF name="ft-home-desktop-s06" url={URL_FT} style={duo(0, 0, 560)} sizes="(max-width: 760px) 80vw, 560px" alt="Cartões das duas edições na home" />
              <BF name="ft-home-desktop-s07" url={URL_FT} style={duo(213, 250, 440)} sizes="(max-width: 760px) 66vw, 440px" alt="Tabela de tiragens por cor" />
            </div>
          </div>

          <div className="vt-blk">
            <div className="vt-t">
              <div className="vt-k">03 · Produto</div>
              <h3>Página de produto feita para decidir</h3>
              <p>Galeria com seis fotos, seletor de cor com amostras, campo de observação e o botão &quot;Garantir minha unidade&quot;. No celular, uma barra de compra fixa acompanha a rolagem.</p>
              <ul>
                <li>Seletor de cor com swatches e foto por cor</li>
                <li>&quot;Quatro etapas na bancada&quot; e ficha do que vai na caixa</li>
                <li>FAQ de prazo, envio e cuidados com o cromo</li>
              </ul>
            </div>
            <div className="vt-v vt-duo">
              <BF name="ft-pdp-desktop-fold" url={`${URL_FT}/products`} style={duo(0, 0, 520)} sizes="(max-width: 760px) 80vw, 520px" alt="Página de produto no desktop" />
              <BF name="ft-pdp-desktop-s02" url={`${URL_FT}/products`} style={duo(120, 250, 420)} sizes="(max-width: 760px) 66vw, 420px" alt="Seção de etapas na página de produto" />
              <PH name="ft-pdp-mobile-fold" style={duo(480, 70, 172)} sizes="(max-width: 760px) 30vw, 172px" alt="Página de produto no celular" />
            </div>
          </div>

          <div className="vt-blk vt-rev">
            <div className="vt-t">
              <div className="vt-k">04 · Carrinho</div>
              <h3>Carrinho &quot;Pit Stop&quot;</h3>
              <p>O drawer segue a linguagem da loja: faixa de sinalização, selo em japonês e quatro etapas (carrinho, pagamento, montagem e envio). O aviso de 30 dias de produção aparece junto do subtotal.</p>
              <ul>
                <li>Drawer lateral com item, cor, quantidade e remoção</li>
                <li>Subtotal e botão &quot;Ir para o pagamento&quot;</li>
                <li>Aviso de prazo e de frete antes do checkout</li>
              </ul>
            </div>
            <div className="vt-v vt-duo">
              <BF name="ft-cart-desktop" url={URL_FT} style={duo(0, 0, 560)} sizes="(max-width: 760px) 80vw, 560px" alt="Carrinho Pit Stop no desktop" />
              <PH name="ft-cart-mobile" style={duo(440, 90, 200)} sizes="(max-width: 760px) 30vw, 200px" alt="Carrinho Pit Stop no celular" />
            </div>
          </div>

          <div className="vt-blk" style={{ paddingBottom: 20 }}>
            <div className="vt-t" style={{ gridColumn: '1 / -1' }}>
              <div className="vt-k">05 · Integrações</div>
              <h3>Frete, avaliações e domínio próprio</h3>
            </div>
          </div>
          <div className="vt-int">
            <div className="vt-cell">
              <Crop name="ft-cart-desktop" scale={1.9} origin="100% 100%" sizes="(max-width: 760px) 90vw, 400px" alt="Detalhe do carrinho com aviso de frete" />
              <div className="vt-k">Frete</div>
              <h3>Frenet</h3>
              <p>O carrinho informa &quot;Frete calculado no checkout&quot;, com o prazo de produção ao lado. A cotação de frete roda pela Frenet, ativa no checkout.</p>
            </div>
            <div className="vt-cell">
              <Crop name="ft-pdp-desktop-s03" scale={1.9} origin="30% 100%" sizes="(max-width: 760px) 90vw, 400px" alt="Detalhe da seção de avaliações" />
              <div className="vt-k">Avaliações</div>
              <h3>Judge.me</h3>
              <p>Seção &quot;Quem já levou pra garagem&quot; com botão &quot;Escreva uma avaliação&quot;. O app está ativo na loja.</p>
            </div>
            <div className="vt-cell">
              <Crop name="ft-home-desktop-s10" scale={2.5} origin="0 100%" sizes="(max-width: 760px) 90vw, 400px" alt="Detalhe do rodapé da loja" />
              <div className="vt-k">Domínio e rodapé</div>
              <h3>finetuneonminis.com.br</h3>
              <p>Domínio próprio no ar, com política de privacidade, LGPD, WhatsApp e Instagram no rodapé, assinado &quot;By: Agência GTX&quot;.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="vt-sec vt-gal">
        <div className="vt-wrap">
          <div className="vt-sec-h">
            <h2>Galeria de <em>telas</em></h2>
            <p>Capturas reais da loja no ar, desktop e celular, feitas em 03/11/2026.</p>
          </div>
          <div className="vt-gal-g">
            <Figure name="ft-home-desktop-fold" span="s6" caption="Home · primeiro scroll" alt="Home da Fine Tune on Minis, primeiro scroll" sizes="(max-width: 760px) 100vw, 600px" />
            <Figure name="ft-home-desktop-s06" span="s6" caption="Home · duas edições" alt="Home da Fine Tune on Minis, duas edições" sizes="(max-width: 760px) 100vw, 600px" />
            <Figure name="ft-home-desktop-s04" span="s4" caption="Home · Daniel Wu" alt="Home da Fine Tune on Minis, destaque Daniel Wu" sizes="(max-width: 760px) 100vw, 400px" />
            <Figure name="ft-home-desktop-s08" span="s4" caption="Home · na bancada" alt="Home da Fine Tune on Minis, seção na bancada" sizes="(max-width: 760px) 100vw, 400px" />
            <Figure name="ft-pdp-desktop-s02" span="s4" caption="Produto · quatro etapas" alt="Página de produto, quatro etapas" sizes="(max-width: 760px) 100vw, 400px" />
            <Figure name="ft-home-mobile-fold" span="s3" caption="Celular · home" alt="Home no celular" sizes="(max-width: 760px) 50vw, 300px" />
            <Figure name="ft-home-mobile-s07" span="s3" caption="Celular · tiragens" alt="Tiragens no celular" sizes="(max-width: 760px) 50vw, 300px" />
            <Figure name="ft-pdp-mobile-fold" span="s3" caption="Celular · produto" alt="Página de produto no celular" sizes="(max-width: 760px) 50vw, 300px" />
            <Figure name="ft-cart-mobile" span="s3" caption="Celular · Pit Stop" alt="Carrinho Pit Stop no celular" sizes="(max-width: 760px) 50vw, 300px" />
          </div>
        </div>
      </section>

      <section className="vt-sec">
        <div className="vt-wrap">
          <div className="vt-chal">
            <div>
              <div className="vt-eyebrow">Tecnologia</div>
              <h2 style={{ marginTop: 20 }}>O que está <em>por trás.</em></h2>
            </div>
            <div className="vt-txt">
              <p>Uma loja Shopify com tema customizado, frete cotado pela Frenet e avaliações pelo Judge.me, no domínio próprio do cliente.</p>
              <div className="vt-stackrow">
                <span className="vt-tag">Shopify</span>
                <span className="vt-tag">Tema Rise customizado</span>
                <span className="vt-tag">Judge.me</span>
                <span className="vt-tag">Frenet</span>
                <span className="vt-tag">Fontes Archivo e Barlow Condensed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vt-sec" style={{ paddingTop: 0 }}>
        <div className="vt-wrap">
          <div className="vt-next">
            <div className="vt-t">
              <Image className="vt-lg-fl" src={fl.src} width={fl.width} height={fl.height} alt="Fluido e Pool eiPool" sizes="200px" />
              <div className="vt-eyebrow">Próximo case</div>
              <h3>Fluido e Pool <em>(eiPool)</em></h3>
              <p>Loja de produto único em creme e laranja, da areia ao mar. Loja no ar desde novembro de 2026.</p>
              <div><Link className="vt-btn" href="/#case-fluido">Ver o case →</Link></div>
            </div>
            <div className="vt-i"><BF name="fl-d-fold" url="eipool" light sizes="(max-width: 760px) 420px, 520px" alt="Página de produto da Fluido e Pool" /></div>
          </div>
        </div>
      </section>

      <section className="vt-cta-band">
        <div className="vt-wrap vt-in">
          <h2>Quer uma loja com esse nível de <em>acabamento?</em></h2>
          <Link className="vt-btn vt-light" href="/#contato">Pedir diagnóstico de 30 min →</Link>
        </div>
      </section>
    </>
  );
}
