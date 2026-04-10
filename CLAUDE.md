# CLAUDE.md — Na morte da bezerra

> Este arquivo é o ponto de entrada para qualquer sessão de trabalho com IA neste projeto.  
> Leia este arquivo inteiro antes de qualquer outra ação.

---

## O que é este projeto

**Na morte da bezerra** é um aplicativo mobile híbrido (iOS e Android) que sorteia assuntos, ideias e conceitos para o usuário pensar. O usuário abre o app, toca na tela e recebe um tema acompanhado de uma frase de expansão — uma pergunta, dado curioso ou provocação.

O nome é uma referência à expressão popular brasileira. O tom é despretensioso e bem-humorado.

> Projeto experimental de criação de app com IA. Sem fins comerciais. Sem monetização.

---

## Documentação completa

Estes são os documentos de referência do projeto. Leia-os sempre que precisar de detalhes sobre decisões, arquitetura ou requisitos.

| Arquivo | O que contém |
|---|---|
| `docs/PRD.md` | Requisitos de produto, fluxos de uso, decisões tomadas, escopo e o que está fora do escopo na v1 |
| `docs/ARCHITECTURE.md` | Arquitetura técnica, estrutura de arquivos, modelo de dados, lógica de sorteio, backend e decisões arquiteturais |
| `AGENTS.md` | Processo obrigatório de execução de tarefas — como planejar, implementar, revisar, validar, testar e registrar fixes |
| `README.md` | Visão geral do projeto, como rodar localmente, como fazer build e como configurar o backend |

---

## Contexto do produto

### Fluxo principal

```
Abre o app
  → Tela inicial (ilustração da bezerra + "Clique na tela para começar a pensar")
  → Toque na tela
  → Loader animado
  → Assunto revelado (título + frase de expansão + fundo colorido)
  → Toque → novo assunto (cor de fundo muda)
  → Compartilhar via Share API nativa
  → "Sugerir novos assuntos" → formulário → backend
```

### Decisões de produto já tomadas

| Decisão | Escolha |
|---|---|
| Fonte dos assuntos | Lista fixa curada manualmente |
| Filtro por categoria | Não — sorteio 100% aleatório |
| Histórico local | Sim — evita repetição até todos serem vistos |
| Expansão dos assuntos | Sim — frase obrigatória em cada assunto |
| Compartilhamento | Sim — Share API nativa |
| Onboarding | Não — app é autoexplicativo |
| Backend de sugestões | Google Sheets via Google Apps Script (webhook) |
| Curadoria de sugestões | Manual — o dono revisa a planilha e decide o que entra |

### Categorias de assuntos

- `filosofico` — reflexivo, existencial
- `cientifico` — curioso, baseado em fatos ou dados
- `absurdo` — aleatório, nonsense, bem-humorado
- `misto` — não se encaixa em uma categoria única

### Fora do escopo na v1

Não implemente, não sugira e não discuta as seguintes funcionalidades para a v1:

- Assuntos gerados por IA em tempo real
- Filtro de categorias pelo usuário
- Favoritos ou histórico visível para o usuário
- Notificações push
- Gamificação
- Autenticação ou contas de usuário
- Monetização de qualquer natureza

---

## Contexto técnico

### Stack

| Camada | Tecnologia |
|---|---|
| Framework | Expo + React Native |
| Linguagem | TypeScript |
| Navegação | Expo Router |
| Storage local | AsyncStorage |
| Compartilhamento | expo-sharing |
| Clipboard | expo-clipboard |
| Backend (sugestões) | Google Apps Script + Google Sheets |
| Build / Publicação | EAS Build |

### Estrutura de arquivos

```
na-morte-da-bezerra/
├── app/
│   ├── index.tsx          # Tela inicial (bezerra + instrução)
│   ├── topic.tsx          # Tela do assunto sorteado
│   └── suggest.tsx        # Formulário de sugestão
├── data/
│   └── topics.ts          # Lista curada de assuntos
├── utils/
│   ├── randomizer.ts      # Sorteio com histórico via AsyncStorage
│   ├── colors.ts          # Paleta de fundos + seleção aleatória
│   └── share.ts           # Composição e disparo do compartilhamento
├── assets/
│   └── bezerra.svg        # Ilustração da tela inicial
├── plans/                 # Planos de execução de tarefas (gerados pela IA)
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
├── .claude/
│   └── skills/
│       ├── dev-architect/SKILL.md
│       ├── dev-react-native/SKILL.md
│       ├── dev-code-review/SKILL.md
│       ├── quality-assurance/SKILL.md
│       └── quality-tester/SKILL.md
├── .env                   # Variáveis de ambiente (não versionar)
├── .env.example           # Modelo do .env
├── AGENTS.md              # Processo de execução de tarefas
├── CLAUDE.md              # Este arquivo
└── README.md              # Documentação pública do projeto
```

### Modelo de dados

```typescript
type Topic = {
  id: string;
  category: "filosofico" | "cientifico" | "absurdo" | "misto";
  title: string;
  expansion: string;
};
```

### Histórico local (AsyncStorage)

```typescript
const HISTORY_KEY = "@nadmb:seen_topics";
type SeenHistory = string[]; // array de Topic["id"]
```

### Variável de ambiente

```bash
# .env
EXPO_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/SEU_ID/exec
```

### Princípios de arquitetura

- Componentes de tela são responsáveis apenas por renderização e eventos — sem lógica de negócio
- Toda lógica de negócio vive em `utils/`
- Sem estado global — apenas estado local + AsyncStorage via `randomizer.ts`
- Assuntos embutidos no bundle — sem chamada de API para buscar conteúdo
- Nenhuma dependência nova sem estar no plano aprovado

---

## Skills disponíveis

As skills ficam em `.claude/skills/`. Cada uma deve ser carregada na etapa correspondente do processo.

| Skill | Caminho | Quando usar |
|---|---|---|
| Arquiteto mobile | `.claude/skills/dev-architect/SKILL.md` | Planejamento de qualquer tarefa |
| Dev React Native | `.claude/skills/dev-react-native/SKILL.md` | Implementação de código |
| Revisor de código | `.claude/skills/dev-code-review/SKILL.md` | Revisão pós-implementação |
| Quality assurance | `.claude/skills/quality-assurance/SKILL.md` | Validação da implementação |
| Quality tester | `.claude/skills/quality-tester/SKILL.md` | Execução de testes |

---

## Como executar tarefas

Todo desenvolvimento segue o processo definido em `AGENTS.md`. O resumo é:

```
0. Ler docs/PRD.md e docs/ARCHITECTURE.md
1. Montar plano (dev-architect) → salvar em plans/ → aguardar aprovação
2. Implementar (dev-react-native) seguindo o plano aprovado
3. Revisar código gerado (dev-code-review)
4. Validar implementação (quality-assurance)
5. Testar (quality-tester)
6. Consolidar problemas em plans/fix-[tarefa].md → aguardar instrução
```

Nunca avance uma etapa sem concluir a anterior. Nunca implemente sem plano aprovado.

Para iniciar uma tarefa, use:

```
Leia CLAUDE.md e AGENTS.md antes de começar.
A tarefa é: [descrição da tarefa]
```

---

## Estado atual do projeto

| Item | Status |
|---|---|
| Documentação de produto (PRD) | ✅ Concluído |
| Documentação técnica (ARCHITECTURE) | ✅ Concluído |
| README | ✅ Concluído |
| Processo de execução (AGENTS) | ✅ Concluído |
| Setup do projeto Expo | ✅ Concluído |
| Lista inicial de assuntos | ✅ Concluído |
| Tela inicial | ✅ Concluído |
| Tela do assunto | ✅ Concluído |
| Lógica de sorteio com histórico | ✅ Concluído |
| Formulário de sugestão + backend | ✅ Concluído |
| Compartilhamento via Share API | ✅ Concluído |
| Clipboard (cópia do assunto) | ✅ Concluído |
| Polimento visual | ✅ Concluído |
| Build e publicação (EAS) | ⏳ Pendente |

---

## Contexto do desenvolvedor

- Perfil: desenvolvedor web com experiência em JavaScript/TypeScript
- Sem experiência prévia com desenvolvimento mobile
- Primeira vez usando Expo e React Native
- Ambiente: Linux (Ubuntu)
- Preferência: ser guiado passo a passo quando o assunto for específico de mobile

---

*Última atualização: abril de 2026*