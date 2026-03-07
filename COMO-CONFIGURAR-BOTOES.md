# 🎯 GTX Landing - Como Funcionam os Botões WhatsApp

## 📊 ESTADO ATUAL (ANTES DO SERVER-SIDE)

### Como está configurado AGORA:

A landing page **JÁ TEM** botões WhatsApp funcionando, mas com tracking **CLIENT-SIDE apenas**.

#### Localização dos Botões:
Todos os botões estão no arquivo: `src/components/GTXLanding.jsx`

#### Número de WhatsApp Atual:
```javascript
const whatsappUrl = `https://wa.me/5519990122773?text=${encodedMessage}`;
```
**Número:** 5519990122773

#### Como Funciona Atualmente:

**1. Usuário clica em qualquer botão "Falar no WhatsApp":**
   - Abre um modal com campo de mensagem
   - Tracking client-side é disparado:
     - Meta Pixel: evento "Contact"
     - Google Analytics: evento "contact"

**2. Usuário escreve mensagem e clica "Continuar no WhatsApp":**
   - Tracking client-side é disparado:
     - Meta Pixel: evento "Lead"
     - Google Analytics: evento "generate_lead"
     - Google Ads: conversão (AW-16834266345)
   - Redireciona para WhatsApp Web

#### Funções de Tracking Atuais (CLIENT-SIDE):

```javascript
// Linha 106-113: Quando abre o modal
const trackWhatsAppClick = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { contact_method: 'whatsapp' });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact', { method: 'whatsapp' });
  }
};

// Linha 124-132: Quando envia a mensagem
const trackWhatsAppSend = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: 'WhatsApp Enviado' });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', { event_label: 'WhatsApp Enviado' });
    window.gtag('event', 'conversion', { send_to: 'AW-16834266345' });
  }
};
```

#### Onde estão os Botões na Landing:

1. **Header** (linha 628): Botão verde "Falar no WhatsApp"
2. **Menu Mobile** (linha 648): Mesmo botão no menu hamburguer
3. **Hero Section** (linha 692): Botão principal gigante
4. **Seção de Serviços** (linha 837): "Solicitar Consultoria"
5. **ROI Calculator** (linha 1215): "Quero esses resultados"
6. **Seção de Contato** (linha 1235): Card com ícone WhatsApp
7. **Footer** (linha 1294): Botão flutuante verde
8. **Flutuante Fixo** (linha 1359): Botão verde fixo no canto inferior direito
9. **Exit Intent Popup** (linha 1457): Quando usuário tenta sair da página

---

## 🚀 COMO INTEGRAR SERVER-SIDE TRACKING

### ❌ PROBLEMA ATUAL:
Os botões **não salvam os dados no Supabase** e **não enviam para CAPI**.

### ✅ SOLUÇÃO:
Substituir as funções de tracking client-side pelas funções server-side que criamos.

---

## 🔧 OPÇÃO 1: ATUALIZAR FUNÇÕES EXISTENTES (RECOMENDADO)

Vou substituir as funções antigas pelas novas com server-side.

### Passo a Passo:

**1. Importar o tracking server-side no início do arquivo:**

```javascript
// No topo do GTXLanding.jsx (linha 1-4)
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MessageCircle, TrendingUp, ... } from 'lucide-react';
import { trackWhatsAppClick as trackWhatsAppClickServerSide } from '../lib/trackingServerSide'; // ← ADICIONAR
```

**2. Substituir a função `trackWhatsAppSend` (linhas 124-132):**

Trocar:
```javascript
const trackWhatsAppSend = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: 'WhatsApp Enviado' });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', { event_label: 'WhatsApp Enviado' });
    window.gtag('event', 'conversion', { send_to: 'AW-16834266345' });
  }
};
```

Por:
```javascript
const trackWhatsAppSend = async () => {
  // 1. Server-side tracking (salva no Supabase + CAPI)
  await trackWhatsAppClickServerSide({
    mensagem: whatsappMessage,
    origem: 'landing_page_modal'
  });

  // 2. Client-side tracking (mantém o que já tinha)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', { content_name: 'WhatsApp Enviado' });
  }
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', { event_label: 'WhatsApp Enviado' });
    window.gtag('event', 'conversion', { send_to: 'AW-16834266345' });
  }
};
```

**3. Atualizar a função `handleSendWhatsApp` (linhas 153-159):**

Trocar:
```javascript
const handleSendWhatsApp = () => {
  trackWhatsAppSend();
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/5519990122773?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
  closeModal();
};
```

Por:
```javascript
const handleSendWhatsApp = async () => {
  // Tracking server-side + client-side
  await trackWhatsAppSend();

  // Aguarda um pouco para garantir que salvou
  await new Promise(resolve => setTimeout(resolve, 300));

  // Redireciona para WhatsApp
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/5519990122773?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
  closeModal();
};
```

---

## 🔧 OPÇÃO 2: USAR O COMPONENTE WhatsAppButton (MAIS SIMPLES)

Substituir todos os botões pelo componente que criamos.

### Exemplo de Substituição:

**ANTES:**
```javascript
<button
  onClick={handleWhatsAppClick}
  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
>
  Falar no WhatsApp
</button>
```

**DEPOIS:**
```javascript
import WhatsAppButton from './WhatsAppButton';

<WhatsAppButton
  phoneNumber="5519990122773"
  message="Olá! Vim do site da GTX"
  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
>
  Falar no WhatsApp
</WhatsAppButton>
```

**Vantagem:** Tracking automático, loading state, error handling.

**Desvantagem:** Perde o modal customizado (pode ser adaptado).

---

## 🎯 QUAL OPÇÃO ESCOLHER?

### ✅ OPÇÃO 1 (Atualizar Funções) - RECOMENDO
**Vantagens:**
- Mantém o modal bonito que já existe
- Mantém toda a experiência atual
- Adiciona server-side tracking sem mudanças visuais
- Tracking duplo (client + server) para máxima precisão

**Desvantagens:**
- Requer editar o GTXLanding.jsx

### ⚙️ OPÇÃO 2 (Usar WhatsAppButton)
**Vantagens:**
- Mais simples de implementar
- Componente reutilizável
- Já tem tudo pronto

**Desvantagens:**
- Perde o modal customizado
- Menos controle visual

---

## 🚀 MINHA RECOMENDAÇÃO: HÍBRIDO

**Usar OPÇÃO 1** para o modal principal (mantém a experiência atual).

**Usar OPÇÃO 2** para novos botões em outras páginas.

---

## 📝 RESUMO DO QUE PRECISA FAZER

### Para ativar Server-Side Tracking:

1. ✅ **Já feito:** Sistema de tracking criado (`trackingServerSide.js`)
2. ✅ **Já feito:** Componente WhatsAppButton criado
3. ✅ **Já feito:** Meta Pixel configurado no `_app.js`
4. ⚠️ **VOCÊ PRECISA:** Criar tabela no Supabase (ver `INTEGRACAO-TRACKING.md`)
5. ⚠️ **VOCÊ ESCOLHE:** Aplicar OPÇÃO 1 ou OPÇÃO 2

---

## 🛠️ POSSO FAZER ISSO PRA VOCÊ?

Quer que eu:

**A) Aplique a OPÇÃO 1** (atualizar as funções existentes no GTXLanding.jsx)?

**B) Aplique a OPÇÃO 2** (substituir botões pelo componente WhatsAppButton)?

**C) Aplique o HÍBRIDO** (funções server-side no modal + WhatsAppButton em novos lugares)?

É só me falar qual você prefere! 🚀

---

## 📊 O QUE VAI MUDAR PARA O USUÁRIO?

**NADA!**

A experiência visual continua **EXATAMENTE IGUAL**.

A diferença é só no backend:
- ✅ Dados salvos no Supabase
- ✅ Eventos enviados para Meta CAPI
- ✅ Event ID para deduplicação
- ✅ Captura de cookies, UTMs, IP
- ✅ Melhor atribuição de conversões

---

## 🔍 COMO TESTAR DEPOIS

1. Rodar o servidor: `npm run dev`
2. Abrir: `http://localhost:3000`
3. Clicar em qualquer botão WhatsApp
4. Abrir console do navegador (F12)
5. Ver logs: `[GTX] ✅ Lead salvo com sucesso`
6. Verificar no Supabase: Table Editor > leads

---

**Criado por GTX Agency - Guia de Configuração v1.0** 🎯
