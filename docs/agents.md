# AGENTS — Na morte da bezerra

> Arquivo de instruções para execução de tarefas por IA.  
> Referencie este arquivo antes de passar qualquer tarefa de desenvolvimento.

---

## Documentação de referência

Antes de executar qualquer tarefa, a IA deve obrigatoriamente ler e internalizar:

- [`docs/PRD.md`](docs/PRD.md) — requisitos de produto, fluxos, decisões e escopo
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — arquitetura técnica, estrutura de arquivos, modelo de dados e decisões arquiteturais
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — documentação de alterações no projeto

Nenhuma tarefa deve ser iniciada sem a leitura prévia desses dois documentos. Eles são a fonte da verdade do projeto.

---

## Skills disponíveis

As skills ficam na pasta `.claude/skills/` na raiz do projeto. Cada skill é um conjunto de instruções especializadas que a IA deve carregar antes de executar a etapa correspondente.

| Skill | Arquivo | Uso |
|---|---|---|
| Arquiteto mobile | `.claude/skills/mobile-architect/SKILL.md` | Planejamento e design de soluções |
| Desenvolvedor React Native | `.claude/skills/dev-react-native/SKILL.md` | Implementação de código |
| Revisor de código | `.claude/skills/dev-code-review/SKILL.md` | Revisão do código gerado |
| Quality assurance | `.claude/skills/quality-assurance/SKILL.md` | Validação da implementação |
| Quality tester | `.claude/skills/quality-tester/SKILL.md` | Execução de testes |

---

## Processo padrão de execução de tarefas

Toda tarefa de desenvolvimento deve seguir obrigatoriamente as etapas abaixo, nesta ordem. Não pule etapas. Não execute a próxima etapa sem concluir a anterior.

---

### Etapa 0 — Leitura e compreensão

Antes de qualquer coisa:

1. Leia `docs/PRD.md` na íntegra
2. Leia `docs/ARCHITECTURE.md` na íntegra
2. Leia `docs/CHANGELOG.md` na íntegra
3. Confirme que entendeu o contexto do projeto, a stack, a estrutura de arquivos e as decisões tomadas
4. Analise a tarefa recebida à luz desses documentos
5. Se a tarefa contradizer alguma decisão documentada, aponte o conflito antes de prosseguir e aguarde instrução

---

### Etapa 1 — Planejamento (skill: `mobile-architect`)

Carregue a skill `.claude/skills/mobile-architect/SKILL.md` e monte um plano de execução detalhado antes de escrever qualquer linha de código.

O plano deve conter:

```markdown
## Plano — [nome da tarefa]

### Entendimento da tarefa
[Descreva com suas palavras o que precisa ser feito e qual o resultado esperado]

### Arquivos impactados
[Liste todos os arquivos que serão criados, modificados ou removidos]

### Dependências
[Listar pacotes novos necessários, se houver]

### Riscos e pontos de atenção
[Listar o que pode dar errado ou o que precisa de atenção especial]

### Sequência de execução
1. [passo 1]
2. [passo 2]
3. [passo n]

### Critérios de aceitação
[Como saberemos que a tarefa foi concluída com sucesso?]
```

Salve o plano em:

```
docs/plans/[nome-da-tarefa].md
```

Aguarde aprovação do plano antes de avançar para a implementação. Não escreva código antes da aprovação.

---

### Etapa 2 — Implementação (skill: `dev-react-native`)

Carregue a skill `.claude/skills/dev-react-native/SKILL.md` e execute o plano aprovado.

Regras durante a implementação:

- Siga rigorosamente a estrutura de arquivos definida em `docs/ARCHITECTURE.md`
- Respeite os tipos TypeScript definidos no modelo de dados
- Nenhum componente de tela deve conter lógica de negócio — delegue para `utils/`
- Nenhum estado global — use apenas estado local e AsyncStorage via `randomizer.ts`
- Nenhuma dependência nova deve ser instalada sem estar no plano aprovado
- Commits atômicos por arquivo ou responsabilidade, nunca tudo de uma vez
- Se durante a implementação surgir algo não previsto no plano, pare, documente e aguarde instrução antes de improvisar

---

### Etapa 3 — Revisão de código (skill: `dev-code-review`)

Carregue a skill `.claude/skills/dev-code-review/SKILL.md` e revise todo o código gerado na etapa anterior.

A revisão deve cobrir:

- **Correção:** o código faz o que o plano descreve?
- **Tipagem:** todos os tipos TypeScript estão corretos e completos?
- **Padrões:** o código segue os padrões estabelecidos na arquitetura?
- **Duplicação:** há lógica duplicada que deveria estar centralizada em `utils/`?
- **Legibilidade:** o código é claro, nomeado corretamente e sem comentários desnecessários?
- **Segurança:** há dados sensíveis expostos? A URL do webhook está em variável de ambiente?
- **Performance:** há re-renders desnecessários, loops ineficientes ou chamadas redundantes ao AsyncStorage?

Documente o resultado da revisão inline nos próprios arquivos como comentários temporários prefixados com `// REVIEW:` ou como uma seção ao final do plano em `docs/plans/`.

---

### Etapa 4 — Validação (skill: `quality-assurance`)

Carregue a skill `.claude/skills/quality-assurance/SKILL.md` e valide se a implementação atende aos critérios de aceitação definidos no plano.

A validação deve cobrir:

- **Critérios de aceitação:** cada item definido no plano foi atendido?
- **Fluxos do PRD:** os fluxos de uso descritos em `docs/PRD.md` continuam íntegros?
- **Regressão:** a implementação quebrou algo que já funcionava?
- **Edge cases:** o que acontece se o AsyncStorage estiver vazio? Se o webhook falhar? Se a lista de assuntos estiver vazia?
- **Consistência visual:** a implementação respeita a paleta de cores, tipografia e princípios visuais definidos no PRD?

---

### Etapa 5 — Testes (skill: `quality-tester`)

Carregue a skill `.claude/skills/quality-tester/SKILL.md` e execute todos os testes possíveis dentro do escopo da tarefa.

Para cada teste executado, registre:

```markdown
## Teste — [descrição]

- **Cenário:** [o que foi testado]
- **Entrada:** [dados ou ação usada]
- **Resultado esperado:** [o que deveria acontecer]
- **Resultado obtido:** [o que aconteceu de fato]
- **Status:** ✅ passou | ❌ falhou | ⚠️ parcial
```

Tipos de teste a considerar por escopo:

| Tipo | Exemplos |
|---|---|
| Unitário | funções de `randomizer.ts`, `colors.ts`, `share.ts` |
| Integração | fluxo de sorteio completo com AsyncStorage |
| UI | renderização correta das telas, transição de cores |
| Edge case | histórico vazio, todos os assuntos vistos, falha de rede |
| Acessibilidade | tamanho de fonte, contraste de cores, áreas de toque |

---

### Etapa 6 — Consolidação de fixes

Ao final das etapas 3, 4 e 5, consolide todos os problemas encontrados em um único documento:

```
docs/plans/fix-[nome-da-tarefa].md
```

O arquivo deve seguir este formato:

```markdown
## Fix plan — [nome da tarefa]

> Originado de: docs/plans/[nome-da-tarefa].md  
> Data: [data]

### Problemas encontrados

| # | Origem | Severidade | Descrição | Arquivo(s) |
|---|---|---|---|---|
| 1 | Revisão de código | Alta | [descrição] | `utils/randomizer.ts` |
| 2 | QA | Média | [descrição] | `app/topic.tsx` |
| 3 | Testes | Baixa | [descrição] | `utils/colors.ts` |

### Severidades

- **Alta** — impede o funcionamento correto ou quebra um fluxo do PRD
- **Média** — não bloqueia mas degrada experiência ou qualidade do código
- **Baixa** — melhorias, padronização ou ajustes cosméticos

### Sequência de correção

[Ordene os fixes por severidade e dependência entre si]

1. Fix #1 — [descrição curta]
2. Fix #2 — [descrição curta]
3. Fix #3 — [descrição curta]

### Critérios de aceitação dos fixes

[Como saberemos que todos os fixes foram corretamente aplicados?]
```

Após gerar o fix plan, aguarde instrução antes de aplicar as correções. O fix plan pode gerar um novo ciclo completo a partir da Etapa 2.

---

## Estrutura de arquivos de planos

```
docs/plans/
├── [nome-da-tarefa].md          # plano de execução original
└── fix-[nome-da-tarefa].md      # plano de correções derivado
```

Exemplos:

```
docs/plans/
├── tela-inicial.md
├── fix-tela-inicial.md
├── logica-sorteio.md
├── fix-logica-sorteio.md
├── formulario-sugestao.md
└── compartilhamento.md
```

---

## Regras gerais

- **Nunca improvise fora do plano aprovado.** Se algo não previsto surgir, documente e aguarde instrução.
- **Nunca instale dependências não planejadas** sem aprovação explícita.
- **Nunca altere `docs/PRD.md` ou `docs/ARCHITECTURE.md`** durante a execução de uma tarefa. Se a tarefa revelar a necessidade de atualizar a documentação, sinalize ao final.
- **Nunca avance uma etapa sem concluir a anterior.** O processo é sequencial.
- **Sempre referencie o plano** ao reportar o que foi feito. Use "conforme plano `docs/plans/nome.md`, etapa N".
- **Em caso de dúvida, pergunte.** Uma pergunta antes de implementar vale mais do que um fix plan depois.

---

## Como usar este arquivo

Antes de passar uma tarefa de desenvolvimento, inicie a conversa com:

```
Leia o arquivo AGENTS.md e os documentos referenciados em docs/ antes de começar.
A tarefa é: [descrição da tarefa]
```

A IA irá:
1. Confirmar a leitura dos documentos
2. Montar e apresentar o plano para aprovação
3. Aguardar sua aprovação antes de implementar
4. Executar cada etapa reportando o progresso
5. Entregar o fix plan ao final se houver pendências

---

*Última atualização: abril de 2026*