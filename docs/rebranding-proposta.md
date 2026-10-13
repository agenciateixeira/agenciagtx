# Proposta de rebranding — Agência GTX

Rascunho para aprovação. Fase 1: diagnóstico, posicionamento, direção visual e plano. Nenhum arquivo do site em produção foi alterado. A home nova está só em [`docs/mockup-home.html`](mockup-home.html), para ser vista e aprovada antes de qualquer implementação.

Público: empresas brasileiras. Idioma do site: pt-BR. Oferta que o site precisa sustentar, daqui para frente:

1. Implementação de IA em empresas.
2. Social media com mídia paga (Meta Ads, Google, LinkedIn).

O site atual não vende essas duas coisas. Vende um cardápio genérico de tráfego, e-commerce, marketplace e “transformação digital”.

---

## 1. O que o repositório é hoje

### Stack do site público

O site que o visitante vê é a raiz do repositório, não a pasta `apps/`.

| Peça | O que está no código |
| --- | --- |
| Framework | Next.js 14.0.4, Pages Router |
| UI | React 18.2, Tailwind 3.3 |
| Ícones | lucide-react |
| Fonte | Lexend via Google Fonts, carregada em `_document.js` (não via `next/font`) |
| Leads | Supabase no clique de WhatsApp; Google Sheets nas páginas `/exclusive` e `/carreiras` |
| Anúncios | Meta Pixel, GA4, Google Ads e um snippet de tag Google, todos no `<head>` |
| Domínio no código | `https://agenciagtx.com.br` |

`package.json` da raiz chama o projeto `gtx-landing`. Scripts: `dev`, `build`, `start`, `lint`. Não há workspaces npm: `apps/web` e `apps/api` são projetos separados, com `package-lock` próprio.

### O que mais mora no mesmo repositório

- `apps/web` — Next.js 14.2 (App Router, TypeScript, Tailwind). Painel interno chamado “GTX SWAS”: login, dashboard, pipeline, leads. A home redireciona para `/dashboard`. Não é o site institucional.
- `apps/api` — NestJS 11, Prisma, PostgreSQL, Redis/BullMQ, JWT. Módulos de lead, UTM, eventos, pipeline, WhatsApp, automações e analytics. CRM, não vitrine.
- A página `/login` do site público aponta para `https://app.agenciagtx.com.br`. O painel, se estiver no ar, é outro host.

Recomendação de fronteira: o rebranding mexe no site da raiz. O CRM fica como está nesta fase. Unir os dois apps num monorepo de verdade não ajuda a prospecção.

### Páginas que existem

| Rota | Função | No menu da home? | No sitemap? |
| --- | --- | --- | --- |
| `/` | Landing única, âncoras | sim | sim |
| `/carreiras` | Vagas e formulário | não | não |
| `/exclusive` | Oferta para empresa que fatura acima de R$ 2 mi/mês | não | não; `robots.txt` bloqueia |
| `/login` | Ponte para o app | não | não; bloqueada no robots |
| `/obrigado` | Confirmação, dispara conversão | não | não; `noindex` |
| `/politica-privacidade` | Política e, na mesma página, termos | rodapé | sim |
| `/termos-de-uso` | Redireciona para a política | rodapé | não |
| `/404` | Erro | — | — |
| `/sitemap.xml` | Gerado em runtime | — | aponta só `/` e a política |

Não existem páginas de serviço, de case, de sobre ou de contato. Tudo é uma rolagem só.

### Como a home é construída

`src/pages/index.js` só monta `GTXLanding`. Esse arquivo tem cerca de 1.800 linhas e concentra menu, hero, estatísticas, “omnichannel”, sobre, seis serviços, logos, depoimentos, CTA, calculadora de ROI, contato, rodapé, cursor personalizado, popup de saída, banner de cookie e modal de WhatsApp.

Estes componentes estão vazios (0 bytes) e não são usados:

- `Header.jsx`, `Footer.jsx`, `Hero.jsx`, `Services.jsx`, `CTA.jsx`, `Testimonials.jsx`
- `src/lib/gtm.js`

`WhatsAppButton.jsx` existe, com telefone padrão `5511999999999`, e a home não o importa. O modal de WhatsApp foi reimplementado dentro de `GTXLanding`. Há também `GTXLanding.backup.jsx` (~930 linhas).

### Conteúdo que o visitante lê hoje

- Title: “GTX Marketing e Vendas — Tráfego Pago que Gera Resultados”.
- H1 instável: “Escale Sua Operação Digital com” mais um typewriter que troca entre “Inteligência Estratégica”, “Resultados Reais”, “Crescimento Sustentável” e “Tráfego que Converte”.
- Selo “Desde 2017”.
- Quatro números animados: 200+ clientes, R$ 5 mi+ geridos, 400% de ROI médio, 98% de satisfação.
- Bloco de e-commerce, marketplaces (Mercado Livre, Amazon, Magalu, Shopee, B2W) e integrações. Promessa de “do zero ao omnichannel em menos de 90 dias”.
- Seis serviços: tráfego, gestão de campanha, BI, transformação digital, consultoria, suporte.
- Sete logos. O rodapé da mesma seção diz “7 clientes ativos”, ao lado do contador de 200+.
- Três depoimentos, com emoji no lugar de foto: Sneaker Society (R$ 19 mil → R$ 60 mil/mês), Frasco Life, Jsete Store.
- Calculadora que multiplica a verba por 3,2× a 4,2× conforme o segmento e chama o resultado de retorno estimado.
- Contato: WhatsApp +55 19 99012-2773, contato@agenciagtx.com.br, “100% online”.
- Razão social no rodapé: GTX Gestão e Implementações Digitais. CNPJ 41.768.146/0001-69.
- Redes citadas: Instagram `@agenciagtx`, Facebook, LinkedIn `/company/agenciagtx`.

A página `/exclusive` repete o problema com outros números: “+387% de aumento médio em vendas”, “R$ 50 mi+ de faturamento gerado”, “4,8× de ROI”. Não batem com os da home.

### Assets

- Logo em `public/images/logo.png` (~29 KB): wordmark “GTX” preto e um G de circuito em verde-lima. O favicon repete o G verde.
- `public/images/favicon.ico` e `public/images/hero-bg.jpg` têm 0 bytes.
- Logos de cliente em PNG, com nomes inconsistentes (`LOGO PODOLOGIA (1).png`, `LOGODZS.png`), alguns entre 50 KB e 160 KB, vários arquivos na pasta que a home nem usa.
- `video.mov` na raiz do Git, cerca de 10 MB, sem uso no site.

### Publicação

Não há `vercel.json`, Dockerfile, CI nem README (o da raiz está vazio). A pasta `.vercel` está no `.gitignore`, o que indica deploy pela CLI da Vercel em algum momento, mas o repositório não documenta o host, o projeto nem o domínio de produção. O código assume `agenciagtx.com.br`. Tratar “está na Vercel” como hipótese, e confirmar na hora de publicar.

### Tracking, do jeito que está

Em `src/pages/_document.js`, no primeiro paint:

- Meta Pixel hardcoded `611003988383118` (PageView).
- GA4 `G-VH9BW7ET06`.
- Google Ads `AW-16834266345`.
- Um bloco comentado como Google Tag Manager que carrega `gtag/js` com o id `GT-WPQPP6RK` e um iframe `ns.html` com o mesmo id. Container GTM usa id `GTM-` e o arquivo `gtm.js`. Este snippet não é um GTM válido.
- `src/pages/_app.js` inicializa de novo o Pixel via `react-facebook-pixel` com `NEXT_PUBLIC_META_PIXEL_ID`. Se a env repetir o id do `_document`, o PageView dispara duas vezes.
- O banner de cookie grava `localStorage` e não impede nenhum script. “Recusar” não recusa.
- `src/lib/tracking.js` manda conversão do Google Ads para `AW-16834266345/CONVERSION_LABEL`, placeholder. A home manda `AW-16834266345` sem label.
- Há dois clientes Supabase possíveis (site e tracking). A documentação interna ainda descreve passos manuais e um componente que a home não usa.

---

## 2. Diagnóstico

### Credibilidade

O site pede confiança e, na mesma tela, a desmente.

- 200+ clientes na estatística, 7 logos na grade, e um selo de “7 clientes ativos”.
- ROI de 400% na home, 4,8× e R$ 50 mi na página exclusiva, multiplicadores fixos na calculadora. Números que não se sustentam entre si não sobrevivem a uma call de prospecção.
- Depoimento com emoji, sem foto, sem data, sem link, sem conta de anúncio. O texto da Sneaker Society é o único com cifra e nome. É o que pode ficar, depois de conferido. O resto precisa de prova ou sai.
- Seis serviços, marketplaces e “omnichannel” diluem a empresa. Quem chega pelo LinkedIn de um dono não sabe se está falando com agência de tráfego, fábrica de e-commerce ou consultoria.
- Popup de saída, cursor que some no desktop (`cursor: none` a partir de 768px), bolhas, canvas de “rede neural” e typewriter. Esse conjunto é o oposto de uma casa que implementa IA com critério.
- Não há rosto, método, limite de escopo nem CNPJ em destaque. O CNPJ está no rodapé, pequeno, e isso é um dos poucos sinais bons — só não carrega a página sozinho.
- Nomes da marca brigam: “GTX Marketing e Vendas” no title, “GTX Gestão e Implementações Digitais” no copyright, “Agência GTX” no Instagram, “GTX SWAS” no painel.

Para reabrir prospecção, o site precisa ser mais específico e mais quieto. Menos afirmação, mais coisa verificável.

### Visual

- Verde-lima `#9ACD32` em botão, ícone, scrollbar, gradiente e glow. É a cor de “agência de tráfego de 2019”, não de um parceiro de operação.
- Lexend em todos os pesos, títulos enormes (até `text-8xl`), cards com sombra, borda que acende no hover, ícone dentro de quadrado verde. Muita caixa, pouca hierarquia.
- Fundo branco com manchas verdes desfocadas. Não há sistema de espaçamento: a página alterna `py-24`, `py-32` e `py-16` com o mesmo tipo de card.
- Logos de cliente em PNG irregular, alguns com fundo, um nome de arquivo com espaço. Em escala de cinza eles não formam uma fileira de marcas; formam uma colagem.
- O logo atual pode continuar como ativo de marca, mas não como está, grande, no topo de uma página clara. O lima do circuito compete com qualquer botão da mesma cor.

### Copy

O texto descreve categoria (“especialistas em performance”, “resultados mensuráveis”, “crescimento sustentável”) e não descreve trabalho. Quase não aparece LinkedIn, embora seja um dos três canais que a casa quer vender. IA, no sentido de implementação em empresa, não aparece. “Transformação digital” ocupa o lugar dela e significa e-commerce.

O H1 animado é ruim para busca e para leitor de tela: a frase que o Google e o visitante deveriam lembrar troca sozinha.

Tom de urgência (“Falar com Especialista Agora”, “atendimento imediato”) empurra todo mundo para o WhatsApp antes de qualificar. Na retomada de prospecção, isso enche a conversa de curioso e esvazia o pipeline.

### Estrutura

Uma URL só não dá para mandar “o serviço de IA” ou “o case” numa mensagem de prospecção. Âncora não ranqueia e não se compartilha bem. Carreiras e Exclusive existem à parte, sem ligação com a oferta nova, e Exclusive ainda promete outro patamar de resultado.

O formulário qualificado (empresa, faturamento) está escondido em `/exclusive`. O caminho principal pede nome, e-mail e telefone e abre o WhatsApp. Não pergunta o que a pessoa quer comprar.

### Técnico

- Next 14.0.4 na vitrine, 14.2 no painel. A vitrine está atrás da linha que o próprio repositório já usa.
- Página inteira no cliente: canvas com 55 nós e ligação O(n²) por frame, parallax no scroll sem throttle, cursor seguindo o mouse, três carrosséis e observers. Tudo isso antes do texto.
- Fontes em duas tags (preload de um recorte e stylesheet completo), bloqueando render.
- Sem `canonical`. Description repetida no `_document` e no `index`. Meta keywords sem efeito. JSON-LD de `MarketingAgency` com descrição de tráfego e e-commerce, logo apontando para o favicon.
- Sitemap dinâmico (`getServerSideProps`) com `lastmod` de “hoje” em toda requisição, e só duas URLs. `robots.txt` libera a home e esconde `/exclusive`.
- Imagens: `next/image` na home, `<img>` solto em carreiras, hero e favicon `.ico` vazios, PNG de logo de cliente pesado.
- LGPD: scripts de anúncio disparam antes do consentimento. O banner é decorativo.
- Conversão mal definida: Pixel em dobro em risco, Google Ads sem label estável, `/obrigado` dispara Lead de novo.
- Lead partido em três destinos (Supabase do modal, Sheets de exclusive, Sheets de carreiras) e um CRM em `apps/api` que o site público não alimenta.
- Acessibilidade: cursor oculto, foco pouco visível, H1 mutante, contraste do lima sobre branco é aceitável mas o uso decorativo atrapalha.
- `README.md` vazio. Quem for publicar o rebranding não tem no repo o comando de deploy nem a lista de env.

Nada disso exige trocar de framework. Exige parar de tratar a home como um único componente de campanha.

---

## 3. Posicionamento e mensagem

### Frase de posição

**A GTX tira peso da operação com IA e presta conta da mídia.**

Versão de uma frase, para title e bio:

> Implementamos IA no dia a dia da empresa e conduzimos redes e tráfego pago — Meta, Google e LinkedIn — para negócios no Brasil.

O que essa frase recusa: ser “agência de marketing digital”, ser fábrica de loja virtual, ser consultoria que entrega PDF.

### Como falar de cada serviço

**Implementação de IA.** Não é curso, não é chatbot genérico na home, não é “app com IA”. É colocar um agente ou uma automação no fluxo que já existe (pedido que chega no WhatsApp, cobrança, resumo do dia, triagem) e combinar o que fica fora. O primeiro entregável é um mapa: fazer agora, fazer depois, não fazer. Referência de discurso, não de layout copiado: a Epic separa aposta, oportunismo e “ainda não”. A GTX deve fazer o mesmo, em português de dono de empresa.

Promessa que pode ir ao ar: diagnóstico do processo, implementação no canal atual, critério para desligar o que não for usado.

Promessa que não pode: “empresa movida a IA em 30 dias”, redução de headcount, ROI da IA antes de ver o processo.

**Social media e mídia paga.** Uma oferta, não duas gavetas. Conteúdo sem verba não é o produto. Verba sem peça também não. Canais nomeados: Meta, Google, LinkedIn. O relatório cabe em cinco minutos e diz o que pausar. O acesso à conta de anúncios é do cliente.

Promessa que pode ir ao ar: gestão das redes, mídia nos três canais quando fizer sentido para o ciclo de venda, leitura semanal.

Promessa que não pode: percentual de ROI, “triplicar faturamento”, gestão de marketplace, montagem de e-commerce. Isso sai do menu mesmo que tenha sido vendido antes. Se ainda houver cliente legado nesses escopos, o case pode contar a história; a oferta da home não.

### Tom

Direto, em “você”, frases curtas, concreto. O modelo de voz é o da Epic (pt-BR, sem adjetivo empilhado) com a clareza da AbacatePay (o número ou o limite na frente, sem letra miúda). Não entra o humor de startup da AbacatePay (“sem migué”, “nadinha”). Empresa que compra implementação não está nesse registro. Também não entra o jargão atual (“inteligência estratégica”, “omnichannel”, “performance digital”).

Palavras de trabalho: operação, peso, diagnóstico, escopo, relatório, anúncio, verba, agente, processo.

### Prova

Enquanto os números não forem conferidos na conta:

- Pode ficar o relato nominal da Sneaker Society, com a ressalva de fonte e período, como no mockup.
- Podem ficar os nomes Frasco Life e Jsete, sem cifra inventada.
- Saem 200+, 400%, 98%, R$ 5 mi, R$ 50 mi, +387% e a calculadora.

### Nome

Usar **GTX** na interface e **Agência GTX** quando precisar da categoria. A razão social aparece no rodapé, uma vez. “Marketing e Vendas” sai do title: empurra a casa de volta para agência genérica. Title proposto:

> GTX — IA na operação e mídia paga

---

## 4. Direção visual

O mockup segue uma direção só, a recomendada. A segunda fica descrita para contraste, sem tela, até o Guilherme escolher.

### O que entra de cada referência

| Referência | O que se aproveita | O que não se copia |
| --- | --- | --- |
| [epic.new](https://epic.new) — base | Papel quente `#f6f0e9`, tinta marrom, borda `#dbc7b4`, título em Lora, rótulo em mono, corpo pequeno e calmo, hero com um artefato (o diagnóstico de exemplo), lista que diz “agora” e “depois”, prova com gente e não com contador, CTA de conversa | O produto deles (software sob medida), o CRM ilustrado, a tabela pesada/leve na íntegra, o time fictício |
| [abacatepay.com](https://abacatepay.com) | Verde profundo `#1f4647` no botão e no bloco final, abacate `#9eea6c` só em cima do verde escuro, voz brasileira direta, Fustat no texto de interface, limite explícito (“não entra”) | O verde-elétrico espalhado, a fonte manuscrita, o tom de meme, a calculadora de taxa |
| [metalab.com](https://metalab.com), [pentagram.com](https://pentagram.com), [work.co](https://work.co) | Case como argumento, muito ar, uma cifra grande quando ela existe, grade alinhada, quase nenhum ornamento | Foto de campanha genérica, grid de “trabalhos” vazio |
| [linear.app](https://linear.app), [stripe.com](https://stripe.com), [vercel.com](https://vercel.com) | Um CTA primário, botão pílula, foco visível, nada de sombra larga, movimento curto | Tema escuro na página inteira, gradiente de produto, visual de ferramenta para desenvolvedor |

### Direção A — Papel (recomendada)

É a do mockup.

**Cor**

| Token | Valor | Uso |
| --- | --- | --- |
| `--paper` | `#f6f0e9` | Fundo, vindo da Epic |
| `--paper-2` | `#faf6f2` | Painel do diagnóstico |
| `--ink` | `#2b180a` | Título |
| `--ink-soft` | `#55463b` | Texto |
| `--muted` | `#85776c` | Legenda |
| `--line` | `#dbc7b4` | Fio, não sombra |
| `--olive` | `#545e46` | Índice, itálico, estado “agora” |
| `--deep` | `#1f4647` | Botão, marca, bloco de contato. Verde da AbacatePay, no lugar do lima `#9ACD32` |
| `--avocado` | `#9eea6c` | Uma linha de eyebrow no bloco escuro. Em fundo claro, não usar |
| Seleção | `#d4a57459` | Como na Epic |

O lima atual não entra na interface. Se o símbolo do circuito for mantido, ele precisa de uma versão numa tinta só (`#1f4647` ou `#2b180a`) para tamanhos pequenos. Verde-lima chapado em botão, scrollbar e ícone é o que hoje tira seriedade.

**Tipo**

- Título: Lora, peso 500, tracking cerca de −0,03em. Hero entre ~40px e 70px, entrelinha ~1,08. Não é cartaz; é editorial.
- Interface e corpo: Fustat (a grotesca da AbacatePay), 16px, entrelinha 1,55. Mais brasileira e menos “tema Tailwind” que a Lexend.
- Rótulo: IBM Plex Mono, 12px, caixa alta, tracking 0,14em. Faz o papel do Geist Mono da Epic.

**Espaço e forma**

- Largura de leitura: 1120px.
- Seção: entre ~4,5rem e 6,5rem. Menos caixa, mais fio horizontal.
- Raio: 0,8rem no painel, pílula no botão (a Epic usa pílula).
- Sombra: nenhuma, ou 1px de apoio. O relevo atual dos cards sai.
- Pontos no fundo, bem fracos, no espírito do papel da Epic. Sem blob, sem gradiente, sem canvas.

**Imagem**

- Hero: não usa foto de estoque nem vídeo. O artefato é o cartão “Diagnóstico · exemplo”, com quatro linhas e uma delas marcada “depois”. Isso comunica critério, que é o que a página atual tenta comunicar com animação.
- Cases: número grande só quando houver fonte. Sem foto, o bloco é tipográfico.
- Sobre: lugar de um retrato do Guilherme, luz natural, corte vertical, como os retratos da Epic. No mockup há um monograma GT e a frase “retrato entra antes de publicar”. Não usar banco de imagem.
- Logos de cliente: até haver SVG limpo, a fileira é o nome em serif, não o PNG torto. Marquee lento (42s), pausa no hover, parado se o sistema pedir menos movimento.

**Movimento**

Fade nenhum de entrada obrigatório. Scroll suave só se o usuário não tiver `prefers-reduced-motion`. Sem cursor custom, sem exit intent, sem contador animado, sem typewriter.

**Logo, nesta direção**

No mockup a marca é um G itálico dentro de um círculo `#1f4647` e a palavra GTX em Lora. É um wordmark de rascunho, desenhado para esta página, não um logo final.

Quando for redraw:

- Área de respiro em volta do símbolo igual à altura do G.
- Versão de uma cor para fundo claro e para o bloco `#1f4647`.
- Não esticar o PNG atual. Não aplicar o lima `#9ACD32` ao lado do botão novo: as duas verdes brigam, e a clara perde.
- Tamanho no header: por volta de 30px de altura. No rodapé, o nome em texto basta.

### Direção B — Grafite (alternativa, não desenhada)

Se a direção A parecer quente demais:

- Fundo `#f7f7f5`, tinta `#111`, fio `#e4e4e4`.
- Uma fonte só, sem serif e sem verde (Inter ou similar).
- Case em faixa larga, foto real quando existir, zero marquee.
- Botão preto, retângulo de raio mínimo.
- Clima Metalab / Pentagram.

Serve se a GTX quiser parecer estúdio. Pesa contra: fica fria para empresa brasileira, joga fora o verde que a AbacatePay mostra que dá para usar com sobriedade, e não conversa com a Epic, que foi a referência principal. Só vale construir essa tela se a direção A for recusada.

### O mockup

Arquivo: `docs/mockup-home.html`. Estático, pt-BR, sem ligação com o Next. O formulário não envia — a linha embaixo do botão diz isso. Dá para abrir no navegador e percorrer âncoras, menu mobile e o estado de “pedido anotado”.

Seções, nesta ordem: hero e diagnóstico de exemplo, nomes de clientes, os dois serviços, método, case, encaixe (entra / não entra), sobre, perguntas, contato, rodapé com CNPJ.

---

## 5. Mapa do site e o que cada página contém

Menu: Serviços, Método, Cases, Sobre, Contato. CTA persistente: “Agendar diagnóstico”.

| URL | Papel |
| --- | --- |
| `/` | Home, como o mockup |
| `/servicos/ia` | Oferta de implementação |
| `/servicos/midia-paga` | Oferta de redes e mídia |
| `/cases` | Lista curta |
| `/cases/sneaker-society` | O case com número, quando validado |
| `/sobre` | Casa, pessoa, limites |
| `/contato` | Formulário |
| `/obrigado` | Confirmação, `noindex`, uma conversão só |
| `/politica-de-privacidade` | Texto revisto para o formulário e os pixels |
| `/termos` | Página própria, não âncora dentro da política |

Fora do menu, no rodapé se ainda fizer sentido: `/carreiras`. `/exclusive` sai do ar ou vira um parágrafo em `/sobre` (“projetos maiores passam pelo mesmo diagnóstico”). `/login` continua existindo, sem entrar no menu e sem `index`.

### Home

1. Header com wordmark e um CTA.
2. Hero com a frase de posição e dois botões (diagnóstico, ver serviços).
3. Painel “o que entra agora / o que fica para depois”.
4. Nomes de clientes, sem número inflado.
5. As duas ofertas, com link para a página e para o contato já com o interesse marcado.
6. Método em três passos.
7. Um case com cifra e dois com nome.
8. Entra / não entra.
9. Sobre, com retrato quando houver arquivo.
10. Quatro perguntas.
11. Formulário.
12. Rodapé legal.

CTAs da home, todos para `/contato` (no mockup, `#contato`): “Pedir diagnóstico”, “Conversar sobre IA”, “Conversar sobre mídia”, “Falar com o Guilherme”. WhatsApp fica como caminho alternativo, com texto pré-preenchido, não como único botão da página.

### `/servicos/ia`

- Hero específico: “IA no fluxo que você já tem.”
- Três exemplos concretos (pedido, cobrança, resumo). Sem screenshot falso de produto.
- O que está fora (app do zero, modelo treinado do nada, promessa de headcount).
- Passo a passo do diagnóstico até a primeira automação no ar.
- Perguntas deste serviço.
- CTA: formulário com interesse travado em IA.

### `/servicos/midia-paga`

- Hero: “Rede e anúncio no mesmo plano.”
- Canais: Meta, Google, LinkedIn — quando cada um entra, em uma linha cada.
- O que o cliente vê toda semana (três linhas, não um dashboard de mentira).
- O que não está incluso: loja virtual, marketplace, sócios de mídia sem criativo.
- CTA com interesse travado em mídia.

### `/cases` e o case

- Lista com setor, frente (IA ou mídia) e uma frase. Sem grade de logo gigante.
- Página do case: contexto, o que foi feito, o número, quem assina, período. Se o número não estiver conferido, a página não publica.
- CTA no fim: “Ver se o seu caso se parece.”

### `/sobre`

- O que a GTX é, desde 2017, atendimento remoto, Brasil.
- Guilherme Teixeira, com foto e um parágrafo biográfico escrito por ele. Não inventar cargo anterior, cliente de outra empresa nem prêmio.
- Como se trabalha (o método da home, um pouco mais longo).
- CNPJ e razão social.

### `/contato`

- Campos: nome, empresa, WhatsApp, interesse (IA / mídia / as duas), “onde a operação pesa”.
- Texto de consentimento com link para a política. Sem pré-marcar.
- Envio grava o lead (ver plano técnico) e mostra confirmação na própria página ou em `/obrigado`.
- Ao lado: WhatsApp, e-mail, horário de resposta (“horário comercial”, sem prometer minutos).

---

## 6. O que passa a sustentar confiança

Colocar no ar, nesta ordem:

1. Oferta com nome e com exclusão. “Não fazemos” é prova.
2. Método de três passos, com o diagnóstico podendo terminar em não.
3. Um case com nome, frase e número só depois da checagem da conta. Os outros, nominais, sem cifra.
4. Retrato e nome de quem responde.
5. CNPJ e razão social no rodapé de todas as páginas.
6. Conta de anúncio acessível ao cliente, dito na oferta de mídia.
7. Política de privacidade que descreve formulário, WhatsApp, Pixel, GA4 e Google Ads, e um banner que realmente segura esses scripts até o aceite.
8. Title, description e texto estáveis. Sem contador, sem calculadora, sem popup.
9. Página de obrigado sem segundo disparo de Lead para quem só recarregou.

Não colocar: selo de satisfação, “clientes atendidos” sem lista, depoimento anônimo, logo de plataforma (Meta, Google) como se fosse certificação, mockup de dashboard com métrica fictícia.

---

## 7. Plano técnico

### O que fica

- Next.js na raiz, Pages Router, nesta leva. Migrar a vitrine para App Router enquanto se troca a marca é dois projetos. O painel em `apps/web` já é App Router e continua separado.
- Tailwind, com os tokens da direção A no `theme.extend` (e o verde `gtx.green: #9ACD32` aposentado da UI).
- Domínio `agenciagtx.com.br`.
- Supabase como destino do lead do site, no curto prazo, porque o modal já grava lá. Um destino só.
- GA4, Google Ads e um único Meta Pixel, depois do consentimento, com id vindo de env — não hardcoded.
- `/login` apontando para o app, fora do menu.

### O que muda na vitrine

- Subir o Next da raiz para a linha 14.2 já usada no `apps/web`, no momento da implementação, e ler o changelog de segurança dessa faixa antes do bump.
- Quebrar `GTXLanding` em componentes reais e apagar os arquivos vazios, o backup e o `video.mov` do Git.
- Copiar o texto para um módulo (`src/content/site.js` ou MDX simples). Página não hardcoda parágrafo de case.
- `next/font` com Lora, Fustat e IBM Plex Mono. Tirar o `<link>` do Google no `_document`.
- Home e páginas institucionais em `getStaticProps` / estático. Sitemap estático, com as URLs novas, `lastmod` de verdade.
- `canonical`, Open Graph e JSON-LD revistos (`ProfessionalService` ou `Organization`), logo em arquivo que não seja o favicon vazio.
- Um H1 por página, texto fixo.
- Imagens: SVG ou WebP dos logos quando existirem; não servir PNG de 160 KB; apagar hero e favicon de 0 bytes; favicon novo alinhado ao wordmark.
- Remover cursor global, canvas, parallax, exit intent, typewriter, calculadora e o CSS que esconde o cursor.

Arquitetura sugerida quando for implementar (não agora):

```
src/components/site/   Header, Footer, Button, LeadForm, ServiceRow, CaseFigure
src/content/           textos e lista de cases
src/pages/             uma rota por URL da tabela acima
src/lib/lead.js        um envio só
```

O CRM em `apps/api` pode receber o mesmo lead numa fase seguinte, por webhook. Não é pré-requisito para publicar a vitrine.

### SEO

- Titles no formato “Página — GTX”, description única, ~150 caracteres, com as duas ofertas só na home.
- H2 na ordem do mockup. Sem esconder texto em aba.
- `robots.txt`: permitir as páginas novas; manter `Disallow` em `/login`, `/obrigado`, `/api/`.
- Redirecionar `/exclusive` para `/contato` ou `/sobre` quando a página morrer, para não deixar link morto se alguém tiver compartilhado.
- Não ranquear `/carreiras` até ela ser reescrita no visual novo; hoje ela repete a estética antiga.

### Performance

O ganho grande é apagar o canvas e o cursor, não trocar de host. Meta de implementação, medida em Lighthouse na home estática, mobile: LCP sem animação de hero, sem JS de tracking antes da interação com o banner, fonte com `display: swap` via `next/font`. Não fixar nota mágica aqui; medir na página nova, contra a home atual, e registrar os dois relatórios.

### Analytics e pixel

1. Um Pixel, iniciado uma vez, só após “aceitar”. “Recusar” não carrega Pixel, GA4 nem Google Ads.
2. Eventos mínimos: `PageView`, `Lead` no envio válido do formulário (uma vez), `Contact` no clique de WhatsApp. Sem Lead no load de `/obrigado` se o formulário já disparou.
3. Google Ads com label real de conversão, ou não disparar. Tirar a string `CONVERSION_LABEL`.
4. Corrigir ou remover o snippet `GT-WPQPP6RK`. Se a conta usa Google Tag (GT), o snippet é o do Google Tag, uma vez, junto com o GA4 — não um iframe de GTM com id trocado. Se a conta usa GTM, o id é `GTM-` e o arquivo é `gtm.js`.
5. LinkedIn Insight Tag: a casa vende LinkedIn Ads e o site não tem o tag. Incluir no mesmo regime de consentimento, com o id da conta de anúncios do Guilherme (não inventar).
6. UTM já capturada no tracking atual permanece no lead: origem da prospecção precisa chegar no registro.
7. Não duplicar o lead em Sheets e Supabase. Carreiras, se continuar, usa o mesmo cliente de lead com `origem=carreiras`.

### Formulário

Campos do mockup. Validação no browser e no servidor. Resposta 200 só depois de gravar. Mensagem de erro visível. Sem abrir WhatsApp automaticamente: isso mistura “pediu diagnóstico” com “clicou no ícone” e suja a conversão. O WhatsApp segue como link ao lado.

---

## 8. Fases de implementação

Cada fase só começa com o que a anterior deixou decidido. Nenhuma publica sozinha.

**Fase 0 — esta.** Aprovar ou corrigir a direção A, a frase, os dois serviços e o tom do mockup. Lista do que o Guilherme precisa entregar está na seção 9.

**Fase 1 — home no ar, no visual aprovado.** Trocar a landing pelos componentes novos, com o texto do mockup já ajustado. Sem páginas internas ainda: âncoras, formulário gravando lead, pixels atrás do banner de verdade. Números não conferidos não entram. Logo: wordmark da direção A, ou o símbolo redraw em uma cor, se o arquivo existir a tempo.

**Fase 2 — páginas.** `/servicos/ia`, `/servicos/midia-paga`, `/cases`, `/sobre`, `/contato`, política reescrita, sitemap, canonical. `/exclusive` redireciona. Carreiras fica de fora até alguém decidir se a página ainda serve.

**Fase 3 — prova e aquisição.** Case da Sneaker Society com período e print da conta, se o cliente autorizar. Retrato. Insight Tag do LinkedIn. Eventos revisados contra as campanhas que vão anunciar o próprio site. Aí sim faz sentido mandar tráfego de prospecção para a casa.

**Fora destas fases.** Reescrever o CRM, unificar com App Router, produzir vídeo, refazer identidade além do wordmark e das regras de cor acima.

---

## 9. Decisões que travam a implementação

1. A direção A (papel, Lora, Fustat, verde `#1f4647`) está aprovada, ou segue a direção B?
2. O wordmark do mockup serve até o símbolo novo, ou o G de circuito precisa aparecer já na fase 1, em uma cor só?
3. Confirmar, com data e print, o relato Sneaker Society (R$ 19 mil → R$ 60 mil/mês, mesmo custo de anúncio). Sem isso, a home publica o case sem a cifra.
4. Um parágrafo e uma foto do Guilherme, para a seção sobre. O mockup não inventa biografia.
5. Horário real de resposta e se o WhatsApp comercial continua sendo +55 19 99012-2773.
6. Id do LinkedIn Insight, label de conversão do Google Ads, e confirmação de qual id de Pixel deve permanecer (hoje há um hardcoded e uma env).
7. `/carreiras` continua? Se sim, não entra na fase 1.
8. Onde o site está publicado (projeto Vercel ou outro), para a fase 1 ter um preview, não um push cego em produção.

---

## 10. Fora deste documento

Não foi feito, de propósito: alteração de página, componente, estilo, tracking ou configuração do site. O preview é o HTML estático. Screenshots de desktop e de mobile acompanham a revisão; eles não substituem a leitura do arquivo, porque o menu, o formulário e as âncoras precisam ser clicados.
