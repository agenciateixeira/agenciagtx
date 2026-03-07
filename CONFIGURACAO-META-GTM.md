# 🎯 GTX - Configuração Meta Ads e Google Tag Manager

## 📊 STATUS ATUAL DA CONFIGURAÇÃO

### ✅ JÁ ESTÁ CONFIGURADO NO CÓDIGO:

#### Meta Pixel:
- **ID:** 611003988383118
- **Localização:** `_document.js` (linha 65-90)
- **Status:** ✅ Instalado e rodando
- **Eventos client-side:** PageView, Contact, Lead

#### Google Analytics:
- **ID:** G-VH9BW7ET06
- **Localização:** `_document.js` (linha 92-107)
- **Status:** ✅ Instalado e rodando

#### Google Ads:
- **ID:** AW-16834266345
- **Localização:** `_document.js` (linha 104)
- **Status:** ✅ Instalado e rodando

#### Google Tag Manager:
- **ID:** GT-WPQPP6RK
- **Localização:** `_document.js` (linha 109-120)
- **Status:** ✅ Instalado e rodando

---

## 🚀 O QUE VOCÊ PRECISA CONFIGURAR

### 1️⃣ META ADS - Conversions API (CAPI)

#### A) Verificar Meta Pixel está funcionando:

1. **Acesse:** https://business.facebook.com/events_manager2
2. **Selecione seu Pixel:** 611003988383118
3. **Vá em "Test Events"**
4. **Abra seu site:** agenciagtx.com.br
5. **Deve aparecer:** Evento "PageView" em tempo real

#### B) Configurar Conversions API:

**⚠️ IMPORTANTE:** O código já está preparado para CAPI, mas você precisa:

1. **Criar um Test Event Code (opcional para testes):**
   - Events Manager → Settings → Test Events
   - Crie um "Test Event Code" (ex: `TEST12345`)
   - Use para testar antes de ir pra produção

2. **Verificar Access Token:**
   - O token no `.env` do SERVER-SIDE está válido?
   - Token: `EAANah2CP0DwBQ...`
   - Validade: Tokens expiram! Verifique se ainda funciona.

3. **Como gerar novo Access Token (se expirou):**
   ```
   1. Acesse: https://business.facebook.com/events_manager2
   2. Selecione seu Pixel (611003988383118)
   3. Settings → Conversions API
   4. "Generate Access Token"
   5. Copie o token
   6. Atualize no arquivo: /Documents/AGENCIA GTX./SERVER-SIDE/config/.env
   ```

#### C) Verificar Domain Verification:

1. **Events Manager → Settings → Domains**
2. **Adicione:** `agenciagtx.com.br`
3. **Verifique o domínio** (Meta vai te dar opções: DNS, HTML tag, etc)

**Por que é importante?**
- Melhora Event Match Quality
- Permite Aggregated Event Measurement
- Evita perda de dados com iOS 14.5+

#### D) Configurar Aggregated Event Measurement:

1. **Events Manager → Settings → Aggregated Event Measurement**
2. **Configure os 8 eventos prioritários:**
   - 1º: `Purchase` (maior valor)
   - 2º: `Lead`
   - 3º: `InitiateCheckout`
   - 4º: `AddToCart`
   - 5º: `ViewContent`
   - 6º: `PageView`
   - 7º: `Contact`
   - 8º: `Schedule`

**Por que?** iOS 14.5+ limita a 8 eventos. Você escolhe quais são prioritários.

---

### 2️⃣ GOOGLE TAG MANAGER (GTM)

#### A) Verificar GTM está funcionando:

1. **Instale extensão:** [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. **Abra:** agenciagtx.com.br
3. **Ative Tag Assistant**
4. **Deve aparecer:** GTM container GT-WPQPP6RK

#### B) Configurar Tags no GTM:

**⚠️ IMPORTANTE:** Você tem 2 implementações rodando:

1. **Hardcoded no _document.js:**
   - Meta Pixel
   - Google Analytics
   - Google Ads

2. **Via GTM:** (container GT-WPQPP6RK)

**RECOMENDAÇÃO:**
Escolha UMA das duas opções para evitar duplicação:

**OPÇÃO A - Manter Hardcoded (atual):**
✅ Mais rápido
✅ Menos dependências
❌ Difícil de gerenciar

**OPÇÃO B - Migrar tudo pro GTM:**
✅ Fácil de gerenciar
✅ Não precisa deploy pra mudar
❌ Adiciona latência

**Se escolher OPÇÃO B, você precisa:**

1. **Remover scripts hardcoded do _document.js**
2. **Configurar no GTM:**
   - Tag: Google Analytics GA4 (G-VH9BW7ET06)
   - Tag: Google Ads Conversion (AW-16834266345)
   - Tag: Meta Pixel (611003988383118)

#### C) Configurar Enhanced Conversions (Google Ads):

**No GTM:**

1. **Crie variável "User Data":**
   ```
   Tipo: Data Layer Variable
   Nome: userData
   Data Layer Variable Name: userData
   ```

2. **Crie tag de Enhanced Conversions:**
   ```
   Tag Type: Google Ads Conversion Tracking
   Conversion ID: AW-16834266345
   Conversion Label: [seu label]
   Enhanced Conversions: Enabled
   User Data: {{userData}}
   ```

3. **Configure trigger:**
   ```
   Trigger: Custom Event
   Event Name: generate_lead
   ```

**Ou configure direto no Google Ads:**
- Google Ads → Tools → Conversions
- Selecione conversão
- Settings → Enhanced Conversions → Enable

---

### 3️⃣ GOOGLE ADS - Enhanced Conversions

#### A) Ativar Enhanced Conversions:

1. **Acesse:** https://ads.google.com
2. **Tools → Conversions**
3. **Crie conversão "Lead":**
   ```
   Category: Lead
   Value: 1
   Count: Every
   Conversion window: 30 days
   ```

4. **Settings → Enhanced Conversions:**
   ```
   Method: Google Tag Manager (ou API)
   Status: Enabled
   ```

5. **Copie o Conversion Label:**
   - Vai ser algo como: `AbC123XyZ`
   - Use no código: `AW-16834266345/AbC123XyZ`

#### B) Atualizar código com Conversion Label correto:

**Localização:** `src/components/GTXLanding.jsx` linha 234

Trocar:
```javascript
window.gtag('event', 'conversion', {
  'send_to': 'AW-16834266345/CONVERSION_LABEL', // ← COLOQUE O LABEL CORRETO
  'value': 1.0,
  'currency': 'BRL'
});
```

Por:
```javascript
window.gtag('event', 'conversion', {
  'send_to': 'AW-16834266345/SEU_LABEL_AQUI', // ← Ex: AW-16834266345/AbC123XyZ
  'value': 1.0,
  'currency': 'BRL'
});
```

---

### 4️⃣ SERVER-SIDE TRACKING - Monitor Automático

#### A) Rodar monitor de leads (OPCIONAL mas RECOMENDADO):

**Local:** Servidor sempre ligado (VPS, EC2, etc)

```bash
cd "/Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE"
npm start
```

**O que faz:**
- Monitora tabela `leads` a cada 5 minutos
- Quando lead vira `status = 'fechado'`
- Envia evento `Purchase` para Meta CAPI automaticamente

**Para rodar 24/7:**
```bash
# Usando PM2
npm install -g pm2
pm2 start scripts/monitor-leads.js --name "gtx-tracking"
pm2 save
pm2 startup
```

#### B) Testar CAPI manualmente:

```bash
cd "/Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE"
node scripts/test-events.js
```

Deve aparecer:
```
✅ Evento enviado para Meta CAPI com sucesso!
Event ID: evt_xxx
```

---

## ✅ CHECKLIST FINAL

### Meta Ads:
- [ ] Pixel funcionando (Test Events mostra eventos)
- [ ] Domain Verification feita
- [ ] Aggregated Event Measurement configurado (8 eventos)
- [ ] Access Token válido (não expirado)
- [ ] Test Event Code criado (opcional)

### Google Tag Manager:
- [ ] Container carregando (Tag Assistant confirma)
- [ ] Decisão: Hardcoded OU GTM (não os dois)
- [ ] Se GTM: Tags configuradas

### Google Ads:
- [ ] Conversão "Lead" criada
- [ ] Enhanced Conversions ativado
- [ ] Conversion Label copiado e atualizado no código

### Server-Side:
- [ ] Variáveis de ambiente no Vercel configuradas ✅ (você já fez)
- [ ] Tabela `leads` criada no Supabase ✅ (você já fez)
- [ ] Monitor rodando (opcional)
- [ ] CAPI testado

---

## 🧪 COMO TESTAR TUDO

### 1. Teste Client-Side (Meta Pixel):

1. Abra: agenciagtx.com.br
2. Abra Console (F12)
3. Digite: `fbq('track', 'ViewContent')`
4. Vá em Events Manager → Test Events
5. Deve aparecer o evento

### 2. Teste Server-Side (CAPI):

```bash
cd "/Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE"
node scripts/test-events.js
```

Depois, vá em Events Manager → Test Events e veja se apareceu.

### 3. Teste Enhanced Conversions (Google):

1. Clique no botão WhatsApp
2. Envie mensagem
3. Abra: Google Ads → Conversions
4. Aguarde até 24h
5. Deve aparecer na lista

---

## 📊 MÉTRICAS IMPORTANTES

### Event Match Quality (Meta):

- **Objetivo:** Acima de 6.0
- **Como melhorar:**
  - Domain verification ✅
  - Enviar email hasheado (SHA256)
  - Enviar telefone hasheado
  - Enviar IP e User Agent
  - Usar event_id para deduplicação

**Seu código JÁ FAZ ISSO!** 🎉

### Enhanced Conversions Score (Google):

- **Objetivo:** "Good" ou "Excellent"
- **Como ver:** Google Ads → Conversions → Enhanced Conversions column

---

## 🚨 ERROS COMUNS

### "No Match" no Meta CAPI:
- Verifique se _fbp/_fbc estão sendo capturados
- Verifique domain verification
- Use Test Event Code

### Eventos duplicados:
- Certifique-se de usar o MESMO event_id no client e server
- Código já implementa isso ✅

### Enhanced Conversions não aparece:
- Aguarde até 24h
- Verifique se conversion label está correto
- Verifique se Enhanced Conversions está ON

---

## 💡 PRÓXIMOS PASSOS RECOMENDADOS

**AGORA (obrigatório):**
1. ✅ Adicionar variáveis de ambiente no Vercel (você está fazendo)
2. ✅ Verificar se Pixel está funcionando (Test Events)
3. ⚠️ Atualizar Conversion Label do Google Ads

**ESTA SEMANA:**
1. Domain Verification (Meta)
2. Aggregated Event Measurement (Meta)
3. Enhanced Conversions (Google Ads)

**ESTE MÊS:**
1. Rodar monitor server-side 24/7
2. Configurar automação de Purchase
3. Analisar Event Match Quality

---

**Criado por GTX Agency - Guia de Configuração v1.0** 🎯
