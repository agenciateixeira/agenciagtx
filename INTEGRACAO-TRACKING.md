# 🎯 GTX - Tracking Server-Side Integrado

## ✅ O QUE FOI FEITO

### 1. Configuração de Ambiente (.env.local)
- ✅ Dual Supabase configurado
  - Supabase ORIGINAL mantido (não afeta site atual)
  - Supabase TRACKING adicionado (só para leads)
- ✅ Credenciais Meta Pixel, Google Analytics, GTM configuradas

### 2. Sistema de Tracking Server-Side
- ✅ `src/lib/trackingServerSide.js` criado
  - Captura automática de _fbp, _fbc, gclid
  - Captura de UTMs completos
  - Captura de IP e User Agent
  - Event ID único para deduplicação
  - Salva leads no Supabase de tracking
  - Envia eventos para Meta Pixel (client-side)

### 3. Componente WhatsApp
- ✅ `src/components/WhatsAppButton.jsx` criado
  - Tracking automático ao clicar
  - Loading state durante salvamento
  - Redireciona para WhatsApp após tracking
  - Não bloqueia usuário em caso de erro

### 4. Meta Pixel Configurado
- ✅ `src/pages/_app.js` atualizado
  - Inicializa Meta Pixel automaticamente
  - Rastreia mudanças de página
  - react-facebook-pixel instalado

---

## 🚀 PRÓXIMOS PASSOS (VOCÊ PRECISA FAZER)

### Passo 1: Criar Tabela no Supabase ⚠️ OBRIGATÓRIO

1. **Acesse o Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/cffpqwynoftzqpdkaqoj/editor
   ```

2. **Clique em "SQL Editor"** no menu lateral

3. **Copie TODO o conteúdo do arquivo:**
   ```
   /Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE/templates/supabase-schema.sql
   ```

4. **Cole no editor SQL e clique em "RUN"**

5. **Verifique se a tabela foi criada:**
   - Vá em "Table Editor"
   - Procure pela tabela "leads"
   - Deve ter 20+ colunas

---

### Passo 2: Usar o Componente WhatsApp nas Páginas

#### Exemplo Básico:
```jsx
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <div>
      <WhatsAppButton
        phoneNumber="5511999999999"  // ⚠️ ALTERE PARA SEU NÚMERO
        message="Olá! Vim do site da GTX"
        className="btn-primary"
      >
        Falar no WhatsApp
      </WhatsAppButton>
    </div>
  )
}
```

#### Exemplo com Dados do Formulário:
```jsx
import { useState } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'

export default function FormularioContato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  return (
    <form>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        type="tel"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
      />

      <WhatsAppButton
        phoneNumber="5511999999999"  // ⚠️ ALTERE
        message={`Olá! Me chamo ${nome}, vim do site`}
        additionalData={{
          nome: nome,
          email: email,
          telefone: telefone
        }}
      >
        Enviar e Falar no WhatsApp
      </WhatsAppButton>
    </form>
  )
}
```

---

### Passo 3: Rodar o Servidor de Desenvolvimento

```bash
cd /Users/guilhermeteixeira/Documents/PROJETOS/gtx-landing
npm run dev
```

Acesse: `http://localhost:3000`

---

### Passo 4: Testar o Tracking

1. **Abra o Console do Navegador** (F12)

2. **Clique no botão WhatsApp**

3. **Verifique os logs:**
   ```
   [GTX] 📊 Iniciando tracking WhatsApp...
   [GTX] ✅ Lead salvo com sucesso: uuid-do-lead
   [GTX] ✅ Pixel Event: Lead event_id_xxx
   ```

4. **Verifique no Supabase:**
   - Acesse Table Editor > leads
   - Deve aparecer uma nova linha com seus dados

5. **Verifique no Meta Events Manager:**
   - Acesse: https://business.facebook.com/events_manager2
   - Selecione seu Pixel (611003988383118)
   - Vá em "Test Events"
   - Deve aparecer o evento "Lead"

---

## 📊 MONITORAMENTO SERVER-SIDE (OPCIONAL)

Para ativar o envio automático para Meta CAPI quando um lead vira venda:

### 1. Iniciar Monitor de Leads

```bash
cd "/Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE"
npm start
```

O monitor vai:
- Checar a cada 5 minutos se há leads com `status = 'fechado'`
- Enviar evento "Purchase" para Meta CAPI automaticamente
- Marcar como `enviado_meta_purchase = true`

### 2. Atualizar Status dos Leads

Quando um lead virar cliente, atualize no Supabase:

```sql
UPDATE leads
SET
  status = 'fechado',
  valor_venda = 5000.00
WHERE email = 'cliente@exemplo.com';
```

O monitor vai detectar e enviar o Purchase automaticamente! 🎯

---

## 🎯 COMO FUNCIONA O FLUXO COMPLETO

1. **Usuário visita a landing page**
   - Meta Pixel cria cookies _fbp e _fbc
   - UTMs são capturados da URL

2. **Usuário clica no botão WhatsApp**
   - `trackWhatsAppClick()` é chamado
   - Dados são capturados (cookies, UTMs, IP, etc)
   - Lead é salvo no Supabase
   - Evento "Lead" é enviado para Meta Pixel (client-side)
   - Evento ID é usado para deduplicação

3. **Lead vira venda**
   - Você atualiza status para "fechado" no Supabase
   - Monitor detecta automaticamente
   - Envia evento "Purchase" para Meta CAPI (server-side)
   - Usa o MESMO event_id para deduplicação

4. **Meta atribui a conversão**
   - Meta recebe evento client-side E server-side
   - Deduplica usando event_id
   - Atribui à campanha correta usando _fbp/_fbc
   - Melhora aprendizado da campanha 🚀

---

## 🔧 TROUBLESHOOTING

### ❌ Erro: "Tracking data não disponível"
- Verifique se você está acessando via HTTPS ou localhost
- Cookies só funcionam em contexto seguro

### ❌ Erro ao salvar no Supabase
- Verifique se a tabela foi criada (Passo 1)
- Verifique as credenciais em .env.local
- Veja o console do navegador para detalhes

### ❌ Eventos não aparecem no Meta
- Verifique se NEXT_PUBLIC_META_PIXEL_ID está correto
- Abra Meta Events Manager > Test Events
- Pode levar até 20 minutos para aparecer

### ❌ Site está dando erro 500
- Verifique se react-facebook-pixel foi instalado
- Run: `npm install react-facebook-pixel`

---

## 📝 ARQUIVOS IMPORTANTES

### Landing Page:
```
/Users/guilhermeteixeira/Documents/PROJETOS/gtx-landing/
├── .env.local                           # Credenciais (DUAL Supabase)
├── src/
│   ├── lib/
│   │   └── trackingServerSide.js       # Sistema de tracking
│   ├── components/
│   │   └── WhatsAppButton.jsx          # Botão com tracking
│   └── pages/
│       └── _app.js                      # Meta Pixel inicializado
```

### Server-Side:
```
/Users/guilhermeteixeira/Documents/AGENCIA GTX./SERVER-SIDE/
├── config/
│   └── .env                             # Credenciais servidor
├── scripts/
│   ├── meta-capi.js                    # Envio CAPI
│   └── monitor-leads.js                # Monitor automático
└── templates/
    └── supabase-schema.sql             # Schema da tabela
```

---

## 🎯 PRÓXIMA AÇÃO PRIORITÁRIA

**⚠️ CRIAR A TABELA NO SUPABASE (Passo 1)**

Sem a tabela, nada vai funcionar!

1. Acesse: https://supabase.com/dashboard/project/cffpqwynoftzqpdkaqoj/editor
2. SQL Editor > Cole o schema > Run
3. Depois teste o botão WhatsApp

---

## 💡 DICAS

- **Teste primeiro em desenvolvimento** antes de fazer deploy
- **Use Test Event Code** do Meta para validar eventos
- **Monitore o console do navegador** para ver logs de tracking
- **Não delete a tabela original do Supabase** (bortomadefyundsarhpu)
- **O site continua funcionando normalmente** - só adicionamos tracking

---

## 🚀 DEPLOY EM PRODUÇÃO

Quando estiver tudo testado:

```bash
# Build
npm run build

# Deploy (depende da sua plataforma)
# Vercel, Netlify, etc
```

Certifique-se de configurar as variáveis de ambiente no seu host!

---

**Criado por GTX Agency - Server-Side Tracking v1.0** 🎯
