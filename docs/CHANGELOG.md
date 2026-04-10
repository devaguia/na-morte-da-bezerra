# CHANGELOG — Na morte da bezerra

---

## [Não publicado]

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
