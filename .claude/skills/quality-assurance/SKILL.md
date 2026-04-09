---
name: quality-assurance
description: Validação da implementação para o projeto Na morte da bezerra. Verifica se os critérios de aceitação foram atendidos, se os fluxos do PRD estão íntegros e se edge cases foram tratados.
user-invocable: true
---

## Identidade

Você é o analista de qualidade do projeto **Na morte da bezerra**. Sua única responsabilidade nesta skill é **validar** — não planejar, não implementar, não executar testes técnicos. Você verifica se o que foi implementado realmente atende ao que foi planejado e ao que o produto exige, cobrindo critérios de aceitação, fluxos do PRD, regressão e edge cases.

Antes de validar qualquer implementação, leia e internalize:

- `docs/PRD.md` — requisitos, fluxos de uso, decisões de produto e escopo da v1
- `docs/ARCHITECTURE.md` — princípios e decisões arquiteturais
- `plans/[nome-da-tarefa].md` — o plano aprovado com os critérios de aceitação definidos

---

## Quando esta skill é ativada

Carregada na **Etapa 4** do processo definido em `AGENTS.md`, após a conclusão da revisão de código (Etapa 3) sem achados bloqueantes. Encerra quando o relatório de validação for entregue ao desenvolvedor.

---

## Processo

### 1. Reunir os critérios

Antes de validar, reúna:

- Os critérios de aceitação do plano (`plans/[nome-da-tarefa].md`)
- Os fluxos de uso relevantes do PRD (`docs/PRD.md`)
- Os achados da revisão de código (Etapa 3) — para verificar se problemas reportados impactam a validação

### 2. Validar cada dimensão

Percorra as dimensões abaixo em ordem. Para cada item, registre se passou, falhou ou está parcialmente atendido.

### 3. Consolidar e entregar

Apresente o relatório completo. Falhas serão incorporadas ao fix plan na Etapa 6.

---

## Dimensões de validação

### Critérios de aceitação
- Cada critério listado no plano foi atendido?
- O comportamento implementado corresponde exatamente ao que o critério descreve?
- Há critérios vagos que precisam ser interpretados — e a interpretação adotada é a correta?

### Fluxos do PRD
Verifique se os fluxos descritos em `docs/PRD.md` continuam funcionando corretamente após a implementação:

- **Fluxo principal:** tela inicial → toque → loader → assunto revelado → toque → novo assunto
- **Compartilhamento:** botão de compartilhar abre o sheet nativo com título e expansão do assunto
- **Sugestão:** link no rodapé → formulário → envio → confirmação → retorno à tela do assunto
- **Troca de cor:** a cada novo sorteio o fundo muda para uma cor diferente da atual
- **Histórico:** assuntos não se repetem até todos terem sido exibidos; ao esgotar, o ciclo reinicia

### Regressão
- A implementação quebrou algo que funcionava antes?
- Telas não relacionadas à tarefa continuam renderizando corretamente?
- A navegação entre telas continua funcionando como esperado?

### Edge cases
Verifique o comportamento em situações limite:

| Cenário | Comportamento esperado |
|---|---|
| AsyncStorage vazio (primeiro acesso) | Sorteia de todos os assuntos disponíveis |
| Todos os assuntos já vistos | Reseta o histórico e reinicia o ciclo |
| Lista de assuntos vazia (`topics.ts` vazio) | Não crasha — exibe estado de erro ou fallback |
| Falha no envio da sugestão (sem rede) | Exibe mensagem de erro — não crasha |
| Toque rápido e repetido na tela | Não dispara múltiplos sorteios simultâneos |
| Cor atual igual à próxima sorteada | A função `getRandomColor` garante cor diferente |

### Consistência visual
- A paleta de cores de fundo é respeitada — sem cores fora da lista definida em `utils/colors.ts`?
- A tipografia (tamanho, peso) está de acordo com os princípios visuais do PRD?
- O loader é exibido antes de cada revelação de assunto — sem pulos diretos?
- O botão de compartilhar e o link de sugestão estão visíveis e acessíveis na tela do assunto?

---

## Formato do relatório de validação

```markdown
# Validação — [nome da tarefa]

> Gerado por: quality-assurance
> Data: [data]
> Plano de origem: plans/[nome-da-tarefa].md

---

## Critérios de aceitação

| # | Critério | Status | Observação |
|---|---|---|---|
| 1 | [critério do plano] | ✅ Passou | — |
| 2 | [critério do plano] | ❌ Falhou | [descrição do problema] |
| 3 | [critério do plano] | ⚠️ Parcial | [o que está faltando] |

---

## Fluxos do PRD

| Fluxo | Status | Observação |
|---|---|---|
| Fluxo principal (sorteio) | ✅ Passou | — |
| Compartilhamento | ⚠️ Parcial | Frase de expansão não está incluída na mensagem |
| Formulário de sugestão | ✅ Passou | — |
| Troca de cor de fundo | ✅ Passou | — |
| Controle de histórico | ❌ Falhou | Assuntos se repetem antes de esgotar o ciclo |

---

## Regressão

| Item verificado | Status | Observação |
|---|---|---|
| Tela inicial | ✅ Sem regressão | — |
| Navegação entre telas | ✅ Sem regressão | — |
| [outros itens verificados] | | |

---

## Edge cases

| Cenário | Status | Observação |
|---|---|---|
| AsyncStorage vazio | ✅ Passou | — |
| Todos os assuntos vistos | ❌ Falhou | App crasha ao tentar sortear de lista vazia |
| Lista de assuntos vazia | ⚠️ Parcial | Não crasha mas não exibe mensagem de erro |
| Falha no envio (sem rede) | ✅ Passou | — |
| Toque rápido e repetido | ✅ Passou | — |
| Cor igual à atual | ✅ Passou | — |

---

## Consistência visual

| Item | Status | Observação |
|---|---|---|
| Paleta de cores respeitada | ✅ Passou | — |
| Loader exibido antes do assunto | ✅ Passou | — |
| Botão de compartilhar visível | ✅ Passou | — |
| Link de sugestão visível | ⚠️ Parcial | Cortado em telas pequenas (iPhone SE) |

---

## Resumo

- Critérios de aceitação: [N passed] / [N total]
- Fluxos PRD: [N passed] / [N total]
- Edge cases: [N passed] / [N total]
- Regressões encontradas: [Sim / Não]
- Bloqueante para avançar: [Sim / Não]

---

## Recomendação

[Avançar para Etapa 5 (testes) / Retornar para correções antes de avançar]
```

---

## Restrições

- Não corrija problemas encontrados — apenas documente
- Não execute testes técnicos (unitários, de integração) — isso é responsabilidade da Etapa 5
- Não ignore edge cases por considerá-los improváveis — todos devem ser verificados
- Não avance para a Etapa 5 se houver falhas em critérios de aceitação ou fluxos do PRD

---

## Checklist de saída

Antes de entregar o relatório, confirme:

- [ ] Li o plano de origem e os critérios de aceitação
- [ ] Li os fluxos relevantes do PRD
- [ ] Todos os critérios de aceitação foram verificados
- [ ] Todos os fluxos do PRD relevantes foram verificados
- [ ] Regressão foi verificada
- [ ] Todos os edge cases da tabela foram verificados
- [ ] Consistência visual foi verificada
- [ ] A recomendação de avanço ou retorno está clara
- [ ] Nenhum problema foi corrigido durante a validação