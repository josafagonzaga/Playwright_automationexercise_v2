# Playwright Automation Exercise

Automacao de testes E2E do site [Automation Exercise](https://automationexercise.com) usando Playwright, TypeScript, Page Objects e fixtures customizadas.

## Objetivo

O projeto cobre os 26 cenarios principais do Automation Exercise, incluindo cadastro, login, produtos, carrinho, checkout, pagamento, download de invoice, subscription, contato e scroll.

## Estrutura

```text
tests/
  automation-exercise/   # CTs principais do Automation Exercise
  fixtures/              # Fixtures customizadas do Playwright
  pages/                 # Page Objects e componentes reutilizaveis
  utils/                 # Helpers de massa de dados e compatibilidade
```

## Arquitetura

Os testes em `tests/automation-exercise` descrevem o fluxo de negocio. Os detalhes de seletores e interacoes ficam encapsulados em Page Objects dentro de `tests/pages`.

Principais Pages e componentes:

- `HomePage`
- `LoginSignupPage`
- `AccountPage`
- `ProductsPage`
- `ProductDetailPage`
- `CartPage`
- `CheckoutPage`
- `PaymentPage`
- `ContactPage`
- `TestCasesPage`
- `SubscriptionComponent`

A fixture [tests/fixtures/pages.ts](tests/fixtures/pages.ts) instancia essas classes automaticamente, permitindo escrever testes assim:

```ts
test('exemplo', async ({ homePage, productsPage, cartPage }) => {
  await homePage.acessarEValidar();
  await productsPage.abrirPeloMenu();
  await cartPage.abrirPeloMenu();
});
```

## Pre-requisitos

- Node.js instalado
- Dependencias do projeto instaladas
- Browsers do Playwright instalados

## Instalacao

```bash
npm install
npx playwright install
```

## Comandos

Rodar toda a suite:

```bash
npm test
```

Rodar apenas Chromium:

```bash
npx playwright test --project=chromium
```

Rodar apenas Firefox:

```bash
npx playwright test --project=firefox
```

Rodar com navegador visivel:

```bash
npm run test:headed
```

Abrir modo interativo:

```bash
npm run test:ui
```

Abrir o relatorio HTML:

```bash
npm run report
```

Rodar lint:

```bash
npm run lint
```

Formatar arquivos:

```bash
npm run format
```

Validar formatacao:

```bash
npm run format:check
```

Rodar checagens de qualidade:

```bash
npm run quality
```

## Configuracao

O arquivo [playwright.config.ts](playwright.config.ts) define:

- `testDir: './tests'`
- `baseURL: 'http://automationexercise.com'`
- `testIdAttribute: 'data-qa'`
- projetos `chromium` e `firefox`
- reporter HTML
- trace em primeira retentativa

## Padronizacao

O projeto usa ESLint e Prettier para manter padrao de codigo.

Arquivos principais:

- [eslint.config.mjs](eslint.config.mjs)
- [.prettierrc](.prettierrc)
- [.prettierignore](.prettierignore)

Diretorios gerados como `node_modules`, `playwright-report` e `test-results` ficam fora da formatacao.

## Validacao Atual

Ultima validacao executada:

```bash
npx playwright test --project=chromium
```

Resultado:

```text
26 passed
```

```bash
npx playwright test --project=firefox
```

Resultado:

```text
26 passed
```
