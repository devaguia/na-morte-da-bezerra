# AGENTS.md — Na morte da bezerra

> Processo obrigatório de execução de tarefas com IA.  
> Nenhuma tarefa deve começar sem seguir este processo na ordem definida.

---

## Processo de execução

Todo desenvolvimento neste projeto segue 6 etapas sequenciais. Nunca avance uma etapa sem concluir a anterior.

```
Etapa 0 → Leitura de contexto
Etapa 1 → Planejamento          (skill: dev-architect)
Etapa 2 → Implementação         (skill: dev-react-native)
Etapa 3 → Revisão de código     (skill: dev-code-review)
Etapa 4 → Validação             (skill: quality-assurance)
Etapa 5 → Testes                (skill: quality-tester)
Etapa 6 → Registro de problemas (plans/fix-[tarefa].md)
```

---

## Etapa 0 — Leitura de contexto

**Antes de qualquer outra ação**, leia:

- `CLAUDE.md` — ponto de entrada do projeto
- `docs/PRD.md` — requisitos de produto, fluxos e escopo da v1
- `docs/ARCHITECTURE.md` — estrutura de arquivos, stack, modelo de dados e princípios

Se algum desses arquivos não foi lido na sessão atual, leia antes de continuar.

---

## Etapa 1 — Planejamento

**Skill:** `dev-architect` (`.claude/skills/dev-architect/SKILL.md`)

**O que faz:** Analisa a tarefa, mapeia arquivos impactados, lista dependências e gera um plano de execução detalhado.

**Saída:** Arquivo `plans/[nome-da-tarefa].md` salvo no repositório.

**Regra:** Nenhuma linha de código é escrita nesta etapa. O plano deve ser aprovado explicitamente pelo desenvolvedor antes de avançar.

**Como iniciar uma tarefa:**

```
Leia CLAUDE.md e AGENTS.md antes de começar.
A tarefa é: [descrição da tarefa]
```

---

## Etapa 2 — Implementação

**Skill:** `dev-react-native` (`.claude/skills/dev-react-native/SKILL.md`)

**O que faz:** Executa o plano aprovado passo a passo, criando e modificando arquivos conforme definido.

**Regras:**
- Implementa somente o que está no plano aprovado
- Não instala dependências não previstas no plano
- Não improvisa — se algo imprevisto surgir, para e sinaliza
- Toda lógica de negócio vai para `utils/` — nenhuma nas telas
- Sem `any` no TypeScript
- AsyncStorage acessado somente via `utils/randomizer.ts`

---

## Etapa 3 — Revisão de código

**Skill:** `dev-code-review` (`.claude/skills/dev-code-review/SKILL.md`)

**O que faz:** Revisa o código implementado verificando correção, tipagem, padrões de arquitetura, segurança e performance.

**Saída:** Lista de problemas encontrados, classificados por severidade.

**Regra:** Problemas bloqueantes devem ser corrigidos antes de avançar para a Etapa 4.

---

## Etapa 4 — Validação

**Skill:** `quality-assurance` (`.claude/skills/quality-assurance/SKILL.md`)

**O que faz:** Verifica se os critérios de aceitação do plano foram atendidos, se os fluxos do PRD estão íntegros e se edge cases foram tratados.

**Saída:** Checklist dos critérios de aceitação com status (atendido / não atendido).

---

## Etapa 5 — Testes

**Skill:** `quality-tester` (`.claude/skills/quality-tester/SKILL.md`)

**O que faz:** Executa testes unitários, de integração, de UI e de edge cases sobre o código implementado. Registra resultados por cenário.

**Saída:** Relatório de testes com status por cenário.

---

## Etapa 6 — Registro de problemas

Se problemas foram encontrados nas Etapas 3, 4 ou 5:

1. Consolide todos os problemas em `plans/fix-[nome-da-tarefa].md`
2. Classifique por severidade (bloqueante / relevante / menor)
3. Aguarde instrução do desenvolvedor sobre o que corrigir

Se nenhum problema foi encontrado, a tarefa está concluída.

---

## Nomenclatura dos planos

```
plans/setup-expo.md
plans/tela-inicial.md
plans/logica-sorteio.md
plans/formulario-sugestao.md
plans/compartilhamento.md
plans/paleta-de-cores.md
plans/fix-tela-inicial.md     ← registro de correções
```

---

## Skills disponíveis

| Skill | Caminho | Etapa |
|---|---|---|
| Arquiteto mobile | `.claude/skills/dev-architect/SKILL.md` | 1 — Planejamento |
| Dev React Native | `.claude/skills/dev-react-native/SKILL.md` | 2 — Implementação |
| Revisor de código | `.claude/skills/dev-code-review/SKILL.md` | 3 — Revisão |
| Quality assurance | `.claude/skills/quality-assurance/SKILL.md` | 4 — Validação |
| Quality tester | `.claude/skills/quality-tester/SKILL.md` | 5 — Testes |

---

*Última atualização: abril de 2026*
