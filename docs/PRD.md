# PRD — Na morte da bezerra

> Documento de Requisitos de Produto · v1.0  
> Classificação: Experimento pessoal · Sem fins comerciais

---

## 1. Visão geral

**Na morte da bezerra** é um aplicativo mobile híbrido (iOS e Android) que sorteia assuntos, ideias e conceitos para o usuário pensar. A premissa é simples: o usuário abre o app, toca na tela e recebe um tema com uma frase de expansão — uma pergunta, dado curioso ou provocação relacionada.

O nome é uma referência à expressão popular brasileira, reforçando o tom despretensioso e bem-humorado do projeto.

**Objetivo:** Experimento de criação de app com IA. Sem monetização, sem métricas de negócio. A métrica de sucesso é qualitativa — o usuário abriu, tocou e pensou em algo que não pensaria sozinho.

---

## 2. Público-alvo

Qualquer pessoa com curiosidade e um momento ocioso. Não há segmentação demográfica definida — o app é generalista por design.

---

## 3. Fluxo de uso

```
Abre o app
    ↓
Tela inicial → ilustração da bezerra + "Clique na tela para começar a pensar"
    ↓
Toque na tela
    ↓
Loader animado ("pensando...", "procurando assunto...")
    ↓
Assunto revelado → título + frase de expansão + fundo colorido
    ↓
[Toque] → novo loader → novo assunto (cor de fundo muda)
[Compartilhar] → sheet nativo do celular (WhatsApp, Instagram etc.)
[Sugerir assunto] → formulário simples → envia para backend
```

---

## 4. Telas

### 4.1 Tela inicial

- Ilustração da bezerra (tom engraçado, despretensioso)
- Texto de instrução: _"Clique na tela para começar a pensar"_
- Toque em qualquer área da tela avança para o sorteio
- Sem menu, sem navegação extra

### 4.2 Tela do assunto

- Loader animado antes de revelar o conteúdo
- Título do assunto em destaque (tipografia grande, legível)
- Frase de expansão abaixo (pergunta, dado curioso ou provocação)
- Fundo de tela muda de cor a cada novo sorteio (paleta curada)
- Toque em qualquer área sorteia um novo assunto
- Botão fixo de compartilhamento
- Link fixo no rodapé: _"Sugerir novos assuntos"_

### 4.3 Tela de sugestão

- Campo de texto livre para o usuário descrever o assunto sugerido
- Botão de envio
- Feedback de confirmação após envio
- Navegação de volta para a tela do assunto

---

## 5. Conteúdo

### 5.1 Formato de cada assunto

Cada assunto é composto por dois campos obrigatórios:

| Campo | Descrição |
|---|---|
| `title` | Nome ou tema do assunto (curto, direto) |
| `expansion` | Frase de expansão: pergunta, dado curioso ou provocação |

### 5.2 Categorias

Os assuntos são organizados internamente em categorias para garantir variedade nos sorteios. O usuário **não escolhe** a categoria — o sorteio é sempre aleatório.

| Categoria | Tom |
|---|---|
| `filosofico` | Reflexivo, existencial |
| `cientifico` | Curioso, baseado em dados ou fatos |
| `absurdo` | Aleatório, nonsense, bem-humorado |
| `misto` | Não se encaixa em uma categoria única |

### 5.3 Volume inicial

~50 assuntos distribuídos entre as 4 categorias como versão de lançamento.

### 5.4 Modelo de dados

```typescript
type Topic = {
  id: string;
  category: "filosofico" | "cientifico" | "absurdo" | "misto";
  title: string;
  expansion: string;
};
```

---

## 6. Lógica de sorteio

O app mantém um histórico local dos assuntos já exibidos para evitar repetição imediata.

**Algoritmo:**

1. Carrega a lista completa de assuntos
2. Lê do `AsyncStorage` os IDs já vistos
3. Filtra os assuntos ainda não exibidos
4. Se a lista filtrada estiver vazia → reseta o histórico e recomeça
5. Sorteia aleatoriamente da lista filtrada
6. Salva o ID sorteado no histórico

> O usuário só verá o mesmo assunto duas vezes depois de ter passado por todos os outros.

---

## 7. Visual e identidade

### 7.1 Princípios

- Mobile first — tela cheia, sem poluição visual
- O assunto deve "respirar" na tela
- Tom engraçado e despretensioso, alinhado ao nome

### 7.2 Paleta de fundos

A cada roleta, o fundo do app muda para uma cor da paleta curada. As cores devem ser vibrantes e distintas entre si para criar sensação de variedade.

### 7.3 Tipografia

- Título do assunto: fonte grande, peso forte
- Frase de expansão: fonte menor, peso regular
- Toda a interface: sem serifa, legível em telas pequenas

### 7.4 Mascote

Ilustração da bezerra morta presente na tela inicial. Estilo cartoon/flat, sem realismo.

---

## 8. Compartilhamento

- Usa a Share API nativa do Expo (`expo-sharing`)
- Abre o sheet de compartilhamento padrão do sistema operacional
- Texto compartilhado inclui o título do assunto e a frase de expansão
- Sem integração direta com nenhuma rede social específica — o usuário escolhe o destino

---

## 9. Backend — sugestões de assuntos

### 9.1 Solução

Google Sheets via Google Apps Script publicado como webhook. Zero infraestrutura, zero custo.

### 9.2 Fluxo

```
Usuário preenche o formulário
    ↓
App faz POST para a URL do Apps Script
    ↓
Script adiciona uma linha na planilha com: texto sugerido + timestamp
    ↓
Dono do app revisa manualmente e decide o que incluir na lista
```

### 9.3 Curadoria

Sugestões **não entram automaticamente** no app. O dono revisa a planilha e adiciona manualmente os assuntos aprovados no arquivo `topics.ts`, seguido de novo deploy.

---

## 10. Stack técnica

| Camada | Tecnologia |
|---|---|
| Framework | Expo (React Native + TypeScript) |
| Navegação | Expo Router |
| Storage local | AsyncStorage |
| Compartilhamento | expo-sharing / Share API |
| Backend | Google Apps Script + Google Sheets |
| Build e publicação | EAS Build (Expo Application Services) |

---

## 11. Estrutura de arquivos

```
nadmb/
├── app/
│   ├── index.tsx          # Tela inicial (bezerra)
│   ├── topic.tsx          # Tela do assunto roleteado
│   └── suggest.tsx        # Formulário de sugestão
├── data/
│   └── topics.ts          # Lista curada de assuntos
├── utils/
│   ├── randomizer.ts      # Lógica de sorteio + histórico
│   ├── colors.ts          # Paleta de fundos
│   └── share.ts           # Lógica de compartilhamento
├── assets/
│   └── bezerra.svg        # Ilustração da tela inicial
├── docs/
│   └── PRD.md             # Este documento
└── app.json               # Configuração do Expo
```

---

## 12. Decisões tomadas

| Decisão | Escolha | Justificativa |
|---|---|---|
| Assuntos fixos ou gerados por IA | Lista fixa curada | Controle total do tom e qualidade |
| Usuário filtra categoria? | Não — sorteio aleatório | Mais simples, mais fiel à proposta de surpresa |
| Histórico local? | Sim | Evita repetição imediata, melhora experiência |
| Onboarding? | Não | App é autoexplicativo pela tela inicial |
| Expansão dos assuntos? | Sim, é essencial | Frase de expansão dá profundidade ao tema |
| Compartilhamento? | Sim | Share API nativa — sem complexidade extra |
| Backend de sugestões | Google Sheets + Apps Script | Zero infraestrutura, curadoria manual |

---

## 13. Fora do escopo (v1)

- Assuntos gerados por IA em tempo real
- Filtro de categorias pelo usuário
- Favoritos ou histórico visível para o usuário
- Notificações push
- Gamificação
- Autenticação / contas de usuário
- Monetização de qualquer natureza

---

## 14. Plano de execução

| Etapa | Descrição |
|---|---|
| 1 | Setup do projeto Expo + TypeScript + dependências |
| 2 | Curar lista inicial (~50 assuntos nas 4 categorias) |
| 3 | Tela inicial (bezerra + instrução) |
| 4 | Tela do assunto (loader → conteúdo → cor de fundo) |
| 5 | Lógica de sorteio com histórico (AsyncStorage) |
| 6 | Formulário de sugestão + webhook Google Sheets |
| 7 | Compartilhamento via Share API |
| 8 | Polimento visual (animações, paleta, ícone, splash) |
| 9 | Build e publicação via EAS Build |

---

*Última atualização: abril de 2026*