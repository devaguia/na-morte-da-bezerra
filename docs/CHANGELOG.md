# CHANGELOG — Na morte da bezerra

---

## [Não publicado]

### Formulário de sugestão funcional — abril de 2026

**Adicionado:**
- `utils/suggestions.ts` — `sendSuggestion(text)` faz POST para `EXPO_PUBLIC_WEBHOOK_URL` com payload `{ suggestion, timestamp }`; `AbortController` com timeout de 10s; parse seguro do JSON da resposta; propaga erros para o componente

**Alterado:**
- `app/suggest.tsx` — substituído mock `setSent(true)` por chamada real a `sendSuggestion`; adicionados estados `isSending` e `error`; botão mostra "Enviando..." e fica desabilitado durante a requisição; estado de erro com botão "Tentar novamente" (texto preservado); proteção contra duplo envio

---

### Clipboard e correção do teclado — abril de 2026

**Adicionado:**
- `utils/share.ts` — `copyTopic(topic)` compõe `"${title}\n\n${expansion}"` e copia para o clipboard via `expo-clipboard`; falha silenciosa com try/catch
- `app/topic.tsx` — ícone de copiar (`copy-outline`) ao lado do ícone de compartilhar no footer; estado `copied` com feedback visual (`checkmark-outline` por 1.5s); `copyTimeoutRef` com cleanup no unmount; handler `handleCopy` com `useCallback`

**Corrigido:**
- `app/suggest.tsx` — `KeyboardAvoidingView` substituiu `View` como elemento raiz do layout (`flex: 1`, `justifyContent: 'flex-end'`, `behavior` condicional por plataforma); sheet não fica mais atrás do teclado ao abrir o formulário; `minHeight: 380` removido para não conflitar com redução de altura no Android

---

### Polimento visual e mascote — abril de 2026

**Adicionado:**
- Fonte customizada BJCree em 4 pesos (`Regular`, `Medium`, `SemiBold`, `Bold`) integrada via `expo-font` e `SplashScreen.preventAutoHideAsync`
- `app/topic.tsx` — header com título "Na Morte da Bezerra" (BJCree-Bold, uppercase); rótulo de categoria acima do título; ícone de compartilhar (`share-social-outline`) substituindo texto "Compartilhar"; estados de opacidade ativo/desabilitado no ícone
- `app/index.tsx` — nome do app "Na Morte da Bezerra!" abaixo da imagem; ícone de compartilhar movido para o footer (fora da área de toque central); `paddingHorizontal` do texto de instrução aumentado
- `app/suggest.tsx` — formulário como bottom sheet com animação slide-up (`Animated.timing` 320ms); handle, header, campo de texto, contador, botão e estado de sucesso
- `assets/bezerra.png` — mascote integrada como logo na tela inicial (tamanho proporcional à largura da tela) e como ícone do app em `app.json`

---

### Tela do assunto + utilitários — abril de 2026

Implementação da tela do assunto completa e dos três utilitários de negócio.

**Adicionado:**
- `app/topic.tsx` — tela do assunto com loader de mensagens alternando (8 variações), título e frase de expansão sobre fundo colorido, rodapé fixo com botão de compartilhamento e link de sugestão
- `app/suggest.tsx` — stub mínimo como destino de `/suggest`
- `utils/randomizer.ts` — `getNextTopic` com controle de histórico via AsyncStorage (sem repetição até esgotar o ciclo, reset automático) e `resetHistory`
- `utils/colors.ts` — `getRandomColor` com exclusão da cor atual e paleta de 8 cores
- `utils/share.ts` — `shareTopic` via `Share.share` nativo com formato definido no ARCHITECTURE.md

**Validado:**
- Todos os edge cases cobertos: AsyncStorage vazio, ciclo esgotado, JSON corrompido, cancelamento do share, toque durante carregamento
- `npx tsc --noEmit` sem erros

---

### Tela inicial — abril de 2026

Implementação da tela inicial do app (`app/index.tsx`) e stub da tela do assunto (`app/topic.tsx`).

**Adicionado:**
- `app/index.tsx` — tela inicial com fundo `#FBF3EB`, espaço reservado para a ilustração da bezerra, texto de instrução com animação de pulsação (`Animated.loop`) e navegação para `/topic` via `Pressable`
- `app/topic.tsx` — stub mínimo como destino de rota, a ser implementado na próxima tarefa

**Validado:**
- Animação com `useNativeDriver: true` — off the JS thread
- Cleanup do loop no desmonte do componente — sem vazamento de memória
- `npx tsc --noEmit` sem erros

---

### Lista inicial de assuntos — abril de 2026

52 assuntos curados adicionados a `data/topics.ts` como conteúdo da v1.

**Adicionado:**
- 52 assuntos em português do Brasil, distribuídos igualmente entre 4 categorias: `filosofico`, `cientifico`, `absurdo`, `misto` (13 cada)
- IDs sequenciais de "001" a "052", usados pelo histórico do AsyncStorage para evitar repetição
- Campos `title` (máx. 4 palavras) e `expansion` (máx. 2 frases) preenchidos em todos os assuntos

**Validado:**
- `npx tsc --noEmit` sem erros
- 52 IDs únicos, sem gaps na sequência
- Contrato de importação com `randomizer.ts` e `share.ts` preservado

### Setup do projeto Expo — abril de 2026

Inicialização completa da infraestrutura técnica do app.

**Adicionado:**
- `package.json` com todas as dependências de produção e desenvolvimento (Expo SDK 51, Expo Router, AsyncStorage, expo-sharing, TypeScript)
- `app.json` com nome, slug, scheme (`nadmb`) e plugin `expo-router`
- `tsconfig.json` com `extends: expo/tsconfig.base` e modo estrito
- `babel.config.js` com preset `babel-preset-expo`
- `.gitignore` cobrindo `node_modules/`, `.env`, `.expo/`, builds nativos
- `.env.example` com modelo da variável `EXPO_PUBLIC_WEBHOOK_URL`
- `app/_layout.tsx` — layout raiz do Expo Router (Stack sem header)
- `app/index.tsx` — tela inicial (placeholder)
- `data/topics.ts` — tipo `Topic` e array vazio tipado
- `utils/randomizer.ts` — assinaturas de `getNextTopic` e `resetHistory`
- `utils/colors.ts` — paleta de 8 cores e assinatura de `getRandomColor`
- `utils/share.ts` — assinatura de `shareTopic`
- `assets/` — diretório para a ilustração da bezerra
- `plans/` — diretório para planos de execução de tarefas
- `AGENTS.md` — processo obrigatório de execução de tarefas (6 etapas + skills)

**Validado:**
- `npm install` sem erros
- `npx expo config` retorna configuração correta
- `npx tsc --noEmit` sem erros de tipagem
