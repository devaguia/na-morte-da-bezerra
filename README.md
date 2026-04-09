# 🐄 Na morte da bezerra

> Uma roleta de assuntos para quando você não sabe no que pensar.

---

## O que é isso?

**Na morte da bezerra** é um app mobile que sorteia assuntos, ideias e conceitos aleatórios para você pensar. Abre o app, toca na tela e recebe um tema — com uma pergunta, dado curioso ou provocação pra acompanhar.

Simples assim.

O nome é uma referência à expressão popular brasileira. O tom é esse mesmo: despretensioso, engraçado e sem compromisso.

> Projeto experimental de criação de app com IA. Sem fins comerciais.

---

## Como funciona

1. Abre o app
2. Vê a bezerra. Toca na tela.
3. Um assunto aparece com uma frase de expansão
4. Toca de novo → novo assunto, nova cor de fundo
5. Compartilha se quiser
6. Sugere um assunto novo se tiver uma ideia

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Expo](https://expo.dev) + React Native |
| Linguagem | TypeScript |
| Navegação | Expo Router |
| Storage local | AsyncStorage |
| Compartilhamento | expo-sharing |
| Backend (sugestões) | Google Apps Script + Google Sheets |
| Build / Publicação | EAS Build |

---

## Estrutura do projeto

```
nadmb/
├── app/
│   ├── index.tsx        # Tela inicial (a bezerra)
│   ├── topic.tsx        # Tela do assunto sorteado
│   └── suggest.tsx      # Formulário de sugestão
├── data/
│   └── topics.ts        # Lista curada de assuntos
├── utils/
│   ├── randomizer.ts    # Sorteio com histórico local
│   ├── colors.ts        # Paleta de fundos
│   └── share.ts         # Compartilhamento nativo
├── assets/
│   └── bezerra.svg      # A protagonista
├── docs/
│   ├── PRD.md           # Documento de requisitos de produto
│   └── ARCHITECTURE.md  # Arquitetura técnica
└── app.json             # Configuração do Expo
```

---

## Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- [Expo Go](https://expo.dev/go) instalado no celular
- Conta no [Expo](https://expo.dev) (gratuita)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nadmb.git
cd nadmb

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL do seu webhook do Google Apps Script
```

### Variáveis de ambiente

```bash
# .env
EXPO_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/SEU_ID/exec
```

### Iniciando

```bash
npx expo start
```

Escaneie o QR code com o app Expo Go no celular. O app abre na hora.

---

## Build de produção

```bash
# Instale o EAS CLI
npm install -g eas-cli

# Login
eas login

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

Para publicar nas lojas, veja a [documentação do EAS Submit](https://docs.expo.dev/submit/introduction/).

---

## Backend de sugestões

As sugestões enviadas pelos usuários vão para uma planilha do Google Sheets via Google Apps Script. Não há servidor — é um webhook simples.

Para configurar o seu:

1. Crie uma planilha no Google Sheets
2. Abra **Extensões → Apps Script**
3. Cole o script abaixo e publique como **Web App** (acesso: qualquer pessoa)
4. Copie a URL gerada para o `.env`

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([new Date(), data.suggestion]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Documentação

| Documento | Descrição |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | Requisitos de produto, fluxos e decisões |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitetura técnica detalhada |

---

## Contribuindo com assuntos

Tem um assunto bom pra rolar? Usa o botão **"Sugerir novos assuntos"** dentro do próprio app. As sugestões chegam até a gente e as melhores entram na próxima versão.

Se preferir, abre uma [issue](https://github.com/seu-usuario/nadmb/issues) com a tag `sugestão`.

---

## Licença

MIT — faz o que quiser, mas conta pra gente o que você fez.

---

*Feito com IA e ociosidade produtiva. 🐄*