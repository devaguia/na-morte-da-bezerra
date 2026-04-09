# Plano — Setup do projeto Expo

> Gerado por: dev-architect
> Data: 2026-04-09
> Status: aguardando aprovação

---

## Entendimento da tarefa

Inicializar o projeto Expo com toda a infraestrutura técnica necessária para o desenvolvimento do app. O resultado esperado é um repositório com estrutura de diretórios correta, dependências instaladas, configurações base prontas e um servidor de desenvolvimento funcional — mas ainda sem nenhuma tela implementada.

O diretório já contém `CLAUDE.md`, `README.md` e `docs/`. A inicialização precisa coexistir com esses arquivos sem sobrescrevê-los.

---

## Arquivos impactados

| Ação | Arquivo | Motivo |
|---|---|---|
| Criar | `package.json` | Manifesto do projeto com todas as dependências |
| Criar | `tsconfig.json` | Configuração TypeScript compatível com Expo |
| Criar | `app.json` | Configuração do Expo (nome, slug, scheme, plugins) |
| Criar | `babel.config.js` | Configuração do Babel para Expo Router |
| Criar | `.env.example` | Modelo da variável de ambiente do webhook |
| Criar | `.gitignore` | Ignorar node_modules, .env, .expo, builds |
| Criar | `app/_layout.tsx` | Layout raiz exigido pelo Expo Router |
| Criar | `app/index.tsx` | Tela inicial (placeholder vazio por ora) |
| Criar | `data/topics.ts` | Arquivo com array vazio (estrutura criada, conteúdo vem depois) |
| Criar | `utils/randomizer.ts` | Arquivo vazio com assinatura exportada |
| Criar | `utils/colors.ts` | Arquivo vazio com assinatura exportada |
| Criar | `utils/share.ts` | Arquivo vazio com assinatura exportada |
| Criar | `assets/` | Diretório para a ilustração da bezerra |
| Criar | `AGENTS.md` | Processo obrigatório referenciado em CLAUDE.md — ausente no repositório |

---

## Dependências

### Produção

| Pacote | Versão | Motivo |
|---|---|---|
| `expo` | ~51.0.0 | Framework base |
| `expo-router` | ~3.5.0 | Navegação baseada em arquivos |
| `expo-sharing` | ~12.0.0 | Share API nativa |
| `@react-native-async-storage/async-storage` | ~1.23.0 | Histórico local de assuntos vistos |
| `react` | 18.2.0 | UI |
| `react-native` | 0.74.5 | Runtime nativo |
| `react-native-safe-area-context` | ~4.10.0 | Exigido pelo Expo Router |
| `react-native-screens` | ~3.31.0 | Exigido pelo Expo Router |
| `expo-status-bar` | ~1.12.0 | Controle da status bar (padrão Expo) |

### Desenvolvimento

| Pacote | Versão | Motivo |
|---|---|---|
| `typescript` | ~5.3.0 | Tipagem estática |
| `@types/react` | ~18.2.0 | Tipos do React |
| `eslint` | ~8.x | Linting |
| `eslint-config-expo` | ~7.x | Preset de regras para Expo |
| `prettier` | ~3.x | Formatação de código |

---

## Riscos e pontos de atenção

- **AGENTS.md ausente:** O arquivo está referenciado em CLAUDE.md como obrigatório para o processo, mas não existe no repositório. Será criado neste setup para que o processo funcione corretamente.
- **Conflito com arquivos existentes:** O diretório já tem `README.md` e `CLAUDE.md`. A inicialização manual (sem `create-expo-app`) evita sobrescrita. Nenhum arquivo existente será modificado.
- **Versões de dependências:** As versões no ARCHITECTURE.md são de referência (~51.x, ~3.x). O setup usará versões concretas compatíveis entre si, conforme a matriz de compatibilidade do Expo SDK 51.
- **Expo Go no Linux:** O desenvolvedor está em Linux. O teste local via Expo Go exige celular na mesma rede Wi-Fi ou uso de tunnel (`--tunnel`). Isso será documentado no passo de validação.
- **`app/_layout.tsx` obrigatório:** O Expo Router exige um layout raiz para funcionar. Sem ele, o app não inicializa.

---

## Sequência de execução

1. Criar `.gitignore` com entradas para `node_modules/`, `.env`, `.expo/`, `dist/` e builds nativos
2. Criar `package.json` com nome, versão, scripts (`start`, `android`, `ios`, `web`) e todas as dependências listadas acima
3. Criar `tsconfig.json` com `extends: "expo/tsconfig.base"` e configuração estrita
4. Criar `babel.config.js` com preset `babel-preset-expo`
5. Criar `app.json` com `name`, `slug`, `scheme` (necessário para deep linking do Expo Router), `version`, `orientation: portrait`, e plugin `expo-router`
6. Criar `app/_layout.tsx` como layout raiz com Stack navigator vazio
7. Criar `app/index.tsx` com placeholder mínimo (componente funcional com View e Text "em breve")
8. Criar `data/topics.ts` com array vazio tipado (`Topic[]`) e exportação nomeada
9. Criar `utils/randomizer.ts` com assinaturas exportadas vazias (`getNextTopic`, `resetHistory`)
10. Criar `utils/colors.ts` com assinatura exportada vazia (`getRandomColor`) e paleta definida no ARCHITECTURE.md já declarada (sem lógica ainda)
11. Criar `utils/share.ts` com assinatura exportada vazia (`shareTopic`)
12. Criar `assets/` como diretório vazio com `.gitkeep`
13. Criar `.env.example` com `EXPO_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/SEU_ID/exec`
14. Criar `AGENTS.md` com o processo de execução de tarefas completo (6 etapas + skills)
15. Rodar `npm install` para instalar todas as dependências
16. Rodar `npx expo start` para verificar que o servidor de desenvolvimento sobe sem erros

---

## Critérios de aceitação

- [ ] `npm install` executa sem erros
- [ ] `npx expo start` sobe o servidor de desenvolvimento sem erros no terminal
- [ ] A estrutura de diretórios está conforme definida em `ARCHITECTURE.md` (`app/`, `data/`, `utils/`, `assets/`, `plans/`)
- [ ] `tsconfig.json` está presente e válido
- [ ] `app.json` contém `scheme` e o plugin `expo-router`
- [ ] `app/_layout.tsx` existe (sem ele o Expo Router não funciona)
- [ ] Todos os arquivos em `utils/` existem com as assinaturas exportadas corretas
- [ ] `.env.example` está presente e `.env` está no `.gitignore`
- [ ] `AGENTS.md` existe e descreve o processo completo das 6 etapas
- [ ] Nenhum arquivo existente (`CLAUDE.md`, `README.md`, `docs/`) foi modificado

---

## Fora do escopo desta tarefa

- Implementação de qualquer lógica nas telas ou utilitários — apenas estrutura e assinaturas
- Curadoria dos assuntos em `data/topics.ts` — lista vazia por ora
- Criação da ilustração da bezerra (`assets/bezerra.svg`)
- Configuração de ícone e splash screen
- Configuração do EAS Build
- Configuração do webhook do Google Apps Script
- Qualquer funcionalidade da v1 (sorteio, histórico, compartilhamento, sugestão)
