# CHANGELOG — Na morte da bezerra

---

## [Não publicado]

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
