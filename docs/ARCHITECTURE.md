# ARCHITECTURE — Na morte da bezerra

> Documento de Arquitetura Técnica · v1.0  
> Stack: Expo · React Native · TypeScript

---

## 1. Visão geral da arquitetura

O app segue uma arquitetura simples de **cliente único sem servidor dedicado**. Todo o estado da aplicação vive no dispositivo do usuário. O único ponto de contato externo é o webhook do Google Apps Script, usado exclusivamente para receber sugestões de assuntos.

```
┌─────────────────────────────────────┐
│            Dispositivo              │
│                                     │
│  ┌─────────────┐  ┌──────────────┐  │
│  │  Expo App   │  │ AsyncStorage │  │
│  │  (React     │◄─│  (histórico  │  │
│  │   Native)   │  │   local)     │  │
│  └──────┬──────┘  └──────────────┘  │
│         │                           │
└─────────┼───────────────────────────┘
          │ POST (sugestões)
          ▼
┌─────────────────────┐
│  Google Apps Script │
│  (webhook público)  │
└──────────┬──────────┘
           │ append
           ▼
┌─────────────────────┐
│    Google Sheets    │
│  (planilha de       │
│   sugestões)        │
└─────────────────────┘
```

---

## 2. Camadas da aplicação

### 2.1 Apresentação (`app/`)

Gerenciada pelo **Expo Router** — roteamento baseado em sistema de arquivos, similar ao Next.js. Cada arquivo dentro de `app/` corresponde a uma rota.

| Arquivo | Rota | Responsabilidade |
|---|---|---|
| `app/index.tsx` | `/` | Tela inicial com a bezerra e instrução |
| `app/topic.tsx` | `/topic` | Exibe o assunto sorteado |
| `app/suggest.tsx` | `/suggest` | Formulário de sugestão |

**Princípios da camada de apresentação:**

- Componentes são exclusivamente responsáveis por renderização e captura de eventos
- Nenhuma lógica de negócio vive nos componentes de tela
- Toda lógica é delegada para `utils/`
- Estado local mínimo — apenas o necessário para controlar UI (ex: loading, cor atual)

### 2.2 Dados (`data/`)

| Arquivo | Responsabilidade |
|---|---|
| `data/topics.ts` | Lista estática e curada de assuntos, exportada como array TypeScript |

O conteúdo é **embutido no bundle do app** — não há chamada de API para buscar assuntos. Isso garante funcionamento offline e simplicidade máxima.

Atualizar a lista exige um novo build e publicação via EAS.

### 2.3 Utilitários (`utils/`)

Contém toda a lógica de negócio, isolada e testável independentemente.

| Arquivo | Responsabilidade |
|---|---|
| `utils/randomizer.ts` | Sorteio de assuntos com controle de histórico via AsyncStorage |
| `utils/colors.ts` | Paleta de cores de fundo e função de seleção aleatória |
| `utils/share.ts` | Composição da mensagem e chamada da Share API nativa; cópia para clipboard |
| `utils/suggestions.ts` | Envio de sugestões via fetch POST para o webhook do Google Apps Script |

### 2.4 Assets (`assets/`)

| Arquivo | Uso |
|---|---|
| `assets/bezerra.png` | Ilustração da tela inicial e ícone do app |
| `assets/fonts/` | Família BJCree (Regular, Medium, SemiBold, Bold) |

---

## 3. Modelo de dados

### 3.1 Tipo `Topic`

```typescript
type Topic = {
  id: string;           // identificador único, ex: "001"
  category: "filosofico" | "cientifico" | "absurdo" | "misto";
  title: string;        // título do assunto
  expansion: string;    // frase de expansão (pergunta, dado ou provocação)
};
```

### 3.2 Histórico local (AsyncStorage)

O histórico é persistido como um array JSON de IDs já sorteados.

```typescript
// Chave no AsyncStorage
const HISTORY_KEY = "@nadmb:seen_topics";

// Formato do valor armazenado
type SeenHistory = string[]; // array de Topic["id"]

// Exemplo
["001", "034", "012", "007"]
```

**Ciclo de vida do histórico:**

```
Primeiro acesso
    → histórico vazio []
    → sorteia de todos os assuntos

A cada sorteio
    → adiciona ID ao histórico
    → filtra lista para excluir IDs vistos

Quando lista filtrada fica vazia (todos vistos)
    → reseta histórico para []
    → reinicia o ciclo
```

---

## 4. Fluxo de dados por tela

### 4.1 Tela inicial (`index.tsx`)

```
Renderiza bezerra + instrução
    ↓
Usuário toca na tela
    ↓
Navega para /topic
```

Sem estado, sem efeitos. Tela puramente estática.

### 4.2 Tela do assunto (`topic.tsx`)

```
onMount
    ↓
chama randomizer.getNextTopic()
    ├── lê histórico do AsyncStorage
    ├── filtra assuntos disponíveis
    ├── sorteia um
    └── salva ID no histórico

    ↓
chama colors.getRandomColor()
    └── retorna cor diferente da atual

    ↓
exibe loader (500~800ms simulado)
    ↓
renderiza título + expansão + fundo colorido

Toque na tela → repete o ciclo acima
Toque em compartilhar → chama share.shareTopic(topic)
Toque em copiar → chama share.copyTopic(topic) → feedback visual 1.5s
Toque em "Sugerir" → navega para /suggest
```

### 4.3 Tela de sugestão (`suggest.tsx`)

```
Usuário digita sugestão
    ↓
Toque em enviar
    ↓
POST para webhook do Google Apps Script
    {
      suggestion: string,
      timestamp: string
    }
    ↓
Exibe confirmação de sucesso (ou erro)
    ↓
Botão de voltar → retorna para /topic
```

---

## 5. Utilitários em detalhe

### 5.1 `randomizer.ts`

```typescript
// Interface pública do módulo
export async function getNextTopic(): Promise<Topic>
export async function resetHistory(): Promise<void>
```

**Responsabilidades:**
- Ler e escrever no AsyncStorage
- Garantir que nenhum assunto se repita antes de todos serem exibidos
- Resetar automaticamente quando o ciclo se encerra

### 5.2 `colors.ts`

```typescript
// Interface pública do módulo
export function getRandomColor(excludeCurrent?: string): string
```

**Responsabilidades:**
- Manter a paleta de cores disponíveis
- Garantir que a próxima cor seja sempre diferente da atual
- Retornar valor de cor como string (hex ou rgb)

**Paleta inicial sugerida (8 cores vibrantes):**

```typescript
const palette = [
  "#F4A261", // laranja
  "#E76F51", // coral
  "#2A9D8F", // verde-azulado
  "#E9C46A", // amarelo
  "#264653", // azul escuro
  "#A8DADC", // azul claro
  "#C77DFF", // roxo
  "#80B918", // verde
];
```

### 5.3 `share.ts`

```typescript
// Interface pública do módulo
export async function shareTopic(topic: Topic): Promise<void>
export async function copyTopic(topic: Topic): Promise<void>
export async function shareDownloadLink(): Promise<void>
```

**Responsabilidades:**
- Compor e disparar o compartilhamento nativo via Share API
- Copiar o conteúdo do assunto para o clipboard via `expo-clipboard`
- Compartilhar o link de download do app

**Formato da mensagem compartilhada (`shareTopic`):**
```
[título do assunto]

[frase de expansão]

— Na morte da bezerra
```

**Formato do texto copiado (`copyTopic`):**
```
[título do assunto]

[frase de expansão]
```

---

## 6. Backend — Google Apps Script

### 6.1 Estrutura do webhook

O Apps Script é publicado como **Web App** com acesso público (sem autenticação). Recebe requisições POST com JSON e escreve uma nova linha na planilha.

```javascript
// Estrutura do Apps Script (backend)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),        // timestamp
    data.suggestion    // texto sugerido
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 6.2 Payload enviado pelo app

```typescript
// POST para WEBHOOK_URL
{
  suggestion: string,   // texto digitado pelo usuário
  timestamp: string     // ISO 8601, gerado no app
}
```

### 6.3 Estrutura da planilha

| Coluna A | Coluna B |
|---|---|
| Timestamp | Sugestão |
| 2026-04-09 10:32:00 | Por que as pessoas mentem para si mesmas? |

### 6.4 Segurança

- A URL do webhook é **pública mas não divulgada** — só vive no bundle do app
- Não há autenticação de usuário
- Não há dados pessoais coletados — apenas o texto da sugestão e o timestamp
- Rate limiting não é necessário no escopo atual (volume esperado muito baixo)

---

## 7. Navegação

Gerenciada pelo **Expo Router** com estrutura de arquivos. Sem estado global de navegação.

```
/          → index.tsx   (tela inicial)
/topic     → topic.tsx   (assunto sorteado)
/suggest   → suggest.tsx (formulário)
```

**Fluxo de navegação:**

```
index → topic → suggest → topic (volta)
            ↑_______________|
              (toque na tela)
```

---

## 8. Gerenciamento de estado

O app **não usa gerenciador de estado global** (sem Redux, Zustand, Context API). O estado é local e mínimo:

| Tela | Estado local |
|---|---|
| `topic.tsx` | `currentTopic`, `currentColor`, `isLoading`, `loaderMessage`, `copied` |
| `suggest.tsx` | `text`, `sent`, `isSending`, `error` |

O único estado persistido é o histórico de assuntos vistos, que vive no AsyncStorage e é acessado via `randomizer.ts`.

---

## 9. Dependências

### 9.1 Dependências de produção

| Pacote | Versão | Uso |
|---|---|---|
| `expo` | ~54.x | Framework base |
| `expo-router` | ~6.x | Navegação baseada em arquivos |
| `@react-native-async-storage/async-storage` | ~2.x | Histórico local |
| `expo-font` | ~13.x | Carregamento de fontes customizadas |
| `expo-splash-screen` | ~0.29.x | Controle da splash screen |
| `expo-clipboard` | ~8.x | Cópia para clipboard |
| `react-native` | 0.81.x | Runtime nativo |
| `react` | 19.x | UI |

### 9.2 Dependências de desenvolvimento

| Pacote | Uso |
|---|---|
| `typescript` | Tipagem estática |
| `@types/react` | Tipos do React |
| `eslint` | Linting |
| `prettier` | Formatação de código |

---

## 10. Build e publicação

### 10.1 Desenvolvimento local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npx expo start

# Testar no celular via Expo Go (escanear QR code)
```

### 10.2 Build de produção (EAS Build)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login na conta Expo
eas login

# Build para Android (.apk / .aab)
eas build --platform android

# Build para iOS (.ipa)
eas build --platform ios
```

### 10.3 Publicação

| Plataforma | Canal | Processo |
|---|---|---|
| Android | Google Play Store | Upload do `.aab` gerado pelo EAS |
| iOS | Apple App Store | Upload do `.ipa` via EAS Submit |

---

## 11. Variáveis de ambiente

O app usa uma única variável de ambiente sensível:

```bash
# .env (não versionar)
EXPO_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/SEU_ID/exec
```

Acessada no código via:

```typescript
const WEBHOOK_URL = process.env.EXPO_PUBLIC_WEBHOOK_URL;
```

> O prefixo `EXPO_PUBLIC_` é obrigatório para que o Expo exponha a variável ao bundle do cliente.

---

## 12. Decisões arquiteturais

| Decisão | Escolha | Motivo |
|---|---|---|
| Roteamento | Expo Router | Familiar para devs web, baseado em arquivos como Next.js |
| Estado global | Nenhum | App simples demais para justificar complexidade |
| Persistência | AsyncStorage | Solução padrão Expo para dados locais simples |
| Assuntos offline | Bundle embutido | Sem dependência de rede para funcionar |
| Backend | Apps Script | Zero infraestrutura, zero custo, curadoria manual |
| Autenticação | Nenhuma | Fora do escopo — app anônimo por design |

---

*Última atualização: abril de 2026*