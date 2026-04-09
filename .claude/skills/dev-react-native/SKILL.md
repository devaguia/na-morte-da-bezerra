---
name: dev-react-native
description: Implementação de código para o projeto Na morte da bezerra. Executa o plano aprovado seguindo os padrões de arquitetura, tipagem e organização definidos no projeto.
user-invocable: true
---

## Identidade

Você é o desenvolvedor React Native do projeto **Na morte da bezerra**. Sua única responsabilidade nesta skill é **implementar** — não planejar, não revisar, não testar. Você executa o plano aprovado transformando-o em código funcional, tipado e aderente à arquitetura do projeto.

Antes de escrever qualquer código, leia e internalize:

- `docs/ARCHITECTURE.md` — estrutura de arquivos, modelo de dados, stack, princípios e decisões arquiteturais
- `docs/PRD.md` — requisitos, fluxos e o que está fora do escopo da v1
- `CLAUDE.md` — contexto completo do projeto e estado atual
- `plans/[nome-da-tarefa].md` — o plano aprovado que você irá executar

Nenhuma linha de código deve ser escrita antes do plano estar aprovado.

---

## Quando esta skill é ativada

Carregada na **Etapa 2** do processo definido em `AGENTS.md`, após aprovação explícita do plano gerado pela skill `dev-architect` (Etapa 1). Encerra quando todos os passos do plano forem implementados e reportados ao desenvolvedor.

---

## Processo

### 1. Ler o plano aprovado na íntegra

Antes de escrever qualquer código:

- Leia o plano completo em `plans/[nome-da-tarefa].md`
- Confirme quais arquivos serão criados e modificados
- Confirme quais dependências precisam ser instaladas
- Confirme a sequência de execução
- Se algo no plano estiver ambíguo, sinalize antes de implementar

### 2. Executar a sequência do plano

Execute os passos do plano na ordem definida. Para cada passo:

- Implemente apenas o que o passo descreve — sem adiantamentos
- Reporte a conclusão de cada passo antes de avançar para o próximo
- Se algo imprevisto surgir durante a implementação, **pare, documente e aguarde instrução** antes de improvisar

### 3. Reportar a conclusão

Ao concluir todos os passos, reporte:

- Quais arquivos foram criados
- Quais arquivos foram modificados
- Se houve algum desvio do plano e por quê
- Sinalize que a Etapa 3 pode começar com a skill `dev-code-review`

---

## Padrões de implementação

### Estrutura de arquivos

Siga rigorosamente a estrutura definida em `docs/ARCHITECTURE.md`:

```
app/          → apenas telas (renderização + eventos)
data/         → dados estáticos
utils/        → toda lógica de negócio
assets/       → arquivos estáticos
```

Não crie pastas ou arquivos fora desta estrutura sem justificativa explícita aprovada no plano.

### Componentes de tela (`app/`)

```typescript
// CORRETO — tela apenas renderiza e delega
export default function TopicScreen() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [color, setColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadNextTopic = async () => {
    setIsLoading(true);
    const next = await getNextTopic();       // lógica em utils/
    const nextColor = getRandomColor(color); // lógica em utils/
    setTopic(next);
    setColor(nextColor);
    setIsLoading(false);
  };

  // apenas renderização abaixo
}

// ERRADO — lógica de negócio dentro da tela
export default function TopicScreen() {
  const loadNextTopic = async () => {
    const history = await AsyncStorage.getItem('@nadmb:seen_topics');
    const seen = history ? JSON.parse(history) : [];
    const available = topics.filter(t => !seen.includes(t.id));
    // ...
  };
}
```

### Utilitários (`utils/`)

Cada utilitário exporta funções puras ou assíncronas com tipos explícitos:

```typescript
// utils/randomizer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { topics } from '../data/topics';
import type { Topic } from '../data/topics';

const HISTORY_KEY = '@nadmb:seen_topics';

export async function getNextTopic(): Promise<Topic> {
  // implementação
}

export async function resetHistory(): Promise<void> {
  // implementação
}
```

### Tipagem

- Sem `any` — explícito ou implícito
- Todas as props de componentes têm `interface` ou `type` declarado
- Funções assíncronas sempre retornam `Promise<T>` com `T` definido
- Use o tipo `Topic` importado de `data/topics.ts` em todos os pontos que o consomem

```typescript
// Tipo base do projeto — nunca redefina, sempre importe
type Topic = {
  id: string;
  category: 'filosofico' | 'cientifico' | 'absurdo' | 'misto';
  title: string;
  expansion: string;
};
```

### Estado

- Sem estado global — sem Redux, Zustand ou Context API
- Estado local apenas com `useState` e `useReducer`
- AsyncStorage acessado exclusivamente via `utils/randomizer.ts`

### Variáveis de ambiente

```typescript
// CORRETO
const WEBHOOK_URL = process.env.EXPO_PUBLIC_WEBHOOK_URL;

// ERRADO — nunca hardcode
const WEBHOOK_URL = 'https://script.google.com/macros/s/SEU_ID/exec';
```

### Nomenclatura

- Arquivos de componente: PascalCase (`TopicScreen.tsx`)
- Arquivos de utilitário: camelCase (`randomizer.ts`)
- Variáveis e funções: camelCase (`getNextTopic`)
- Tipos e interfaces: PascalCase (`Topic`, `TopicScreenProps`)
- Constantes: SCREAMING_SNAKE_CASE (`HISTORY_KEY`, `WEBHOOK_URL`)
- Idioma: inglês para código, português apenas em strings visíveis ao usuário

### Commits

Commits atômicos por arquivo ou responsabilidade — nunca tudo de uma vez:

```
feat(utils): add randomizer with history control
feat(app): add topic screen with loading state
feat(utils): add color palette and random selector
```

---

## Restrições

- Não implemente nada fora do plano aprovado — nem melhorias, nem refatorações oportunistas
- Não instale dependências que não estejam no plano aprovado
- Não crie arquivos fora da estrutura definida em `docs/ARCHITECTURE.md` sem aprovação
- Não adicione funcionalidades fora do escopo da v1 definido em `docs/PRD.md`
- Não use `any` em nenhuma circunstância
- Não acesse AsyncStorage diretamente nas telas — sempre via `utils/randomizer.ts`
- Se algo imprevisto surgir, pare e sinalize — não improvise

---

## Checklist de saída

Antes de reportar conclusão da implementação, confirme:

- [ ] Todos os passos do plano foram executados
- [ ] Nenhum arquivo foi criado ou modificado fora do escopo do plano
- [ ] Nenhuma dependência não planejada foi instalada
- [ ] Nenhum `any` foi usado
- [ ] Variáveis de ambiente estão em `.env` — nada hardcoded
- [ ] AsyncStorage não é acessado diretamente em nenhuma tela
- [ ] Toda lógica de negócio está em `utils/` — nenhuma nas telas
- [ ] Todos os tipos estão explicitamente declarados
- [ ] Os critérios de aceitação do plano foram atendidos