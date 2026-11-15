# Aplicativo Web para Consulta das Academias de Londrina/PR

> Projeto de extensão universitária — Centro Universitário Filadélfia (UniFil),
> Curso Superior de Engenharia de Software, modalidade EaD.

[![Deploy](https://img.shields.io/badge/vercel-live-black?logo=vercel)](https://agile-cyclone-7186c91.tmp.now)
[![Docs](https://img.shields.io/badge/github%20pages-docs-2088FF?logo=github)](https://higorseixas.github.io/academias-londrina/)

## Sumário

- [Visão geral](#visão-geral)
- [Autoria](#autoria)
- [Como executar localmente](#como-executar-localmente)
- [Arquitetura](#arquitetura)
- [Testes](#testes)
- [Deploy](#deploy)
- [Linha do tempo das extensões](#linha-do-tempo-das-extensões)

## Visão geral

O sistema permite que qualquer cidadão consulte as **academias de Londrina/PR**
filtrando por **bairro**, **modalidade** e **termo livre** (nome ou descrição),
e visualize os detalhes de cada academia (endereço, modalidades, telefone,
site e Instagram). O projeto é **offline-first, sem cadastro, sem login e sem
chamadas a servidores externos** — atende aos requisitos funcionais e
não-funcionais definidos nas Extensões I-III.

Páginas:

- `/` — lista com filtros
- `/academias/[id]` — detalhes
- `/sobre` — informações sobre o projeto
- `not-found.tsx` — 404 personalizada

## Autoria

| | |
|---|---|
| **Aluno** | Higor Clem Seixas |
| **Orientador** | Prof. Maicon Roger do Rosario |
| **Instituição** | Centro Universitário Filadélfia — UniFil |
| **Curso** | Engenharia de Software (EaD) |
| **Disciplinas** | EGS@1019 a EGS@1037 — Extensões I a VIII |

## Como executar localmente

### Pré-requisitos

- Node.js ≥ 18 (recomendado 22)
- npm ≥ 9

### Setup

```bash
git clone https://github.com/higorseixas/academias-londrina
cd academias-londrina
npm install

# Banco local (SQLite) — opcional para alterar os dados
npx prisma migrate deploy   # aplica as migrations
npx prisma db seed          # popula com 15 academias
npm run db:export           # gera src/data/academias.json

# Servidor de desenvolvimento
npm run dev                 # http://localhost:3000
```

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor Next.js em modo dev |
| `npm run build` | Build de produção |
| `npm start` | Executa o build de produção |
| `npm test` | Roda os testes unitários (Vitest) |
| `npm run test:e2e` | Roda os testes end-to-end (Playwright) |
| `npm run test:e2e:report` | Abre o relatório HTML do Playwright |
| `npm run db:seed` | Popula o SQLite com os dados de seed |
| `npm run db:export` | Exporta o SQLite para `src/data/academias.json` |
| `npm run db:reset` | Reseta o banco e re-aplica seed |

## Arquitetura

```
webapp/
├── docs/                             ← GitHub Pages (documentação pública)
│   └── index.html
├── prisma/
│   ├── schema.prisma                 ← espelha o DER da Extensão III
│   ├── seed.ts                       ← popula 15 academias
│   └── dev.db                        ← banco SQLite versionado
├── scripts/
│   └── export-db-to-json.ts          ← dump SQLite → JSON
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← header + rodapé
│   │   ├── page.tsx                  ← home com filtros
│   │   ├── academias/[id]/
│   │   │   ├── page.tsx              ← detalhes
│   │   │   └── not-found.tsx         ← 404 personalizada
│   │   └── sobre/page.tsx
│   ├── components/
│   │   ├── FiltroBar.tsx             ← barra de filtros (Client Component)
│   │   ├── AcademiaCard.tsx          ← card da lista
│   │   └── ModalidadeChip.tsx
│   ├── data/
│   │   └── academias.json            ← dump JSON do SQLite (runtime)
│   └── lib/
│       └── repositorio-academia.ts   ← implementa o Portugol da Ext III
├── tests/
│   └── e2e/
│       └── fluxos.spec.ts            ← Playwright
├── playwright.config.ts
├── vitest.config.ts
└── vercel.json                       ← deploy no Vercel
```

### Padrão de camadas

1. **Model (Prisma + SQLite)** — fonte da verdade em dev; `schema.prisma`
   espelha o DER da Ext III.
2. **Data (JSON exportado)** — `src/data/academias.json`, consumido em runtime.
   Permite deploy serverless sem FS gravável.
3. **Repository (`src/lib/repositorio-academia.ts`)** — implementação literal do
   pseudocódigo Portugol da Ext III, agora em TypeScript.
4. **View (Next.js App Router)** — Server Components consomem o repositório
   diretamente, sem API REST intermediária.

### Por que SQLite + JSON em vez de só um?

Na Extensão IV ficou definido o par **Prisma + SQLite** como camada de modelo,
pela simplicidade (banco em arquivo único) e pela tipagem do cliente gerado.
Durante a Extensão VII, ao preparar o deploy em um ambiente serverless, foi
necessário resolver uma limitação do SQLite: **ele depende de filesystem
gravável**, o que o Vercel não oferece em runtime. A solução foi exportar o
estado do banco para JSON estático (`src/data/academias.json`) e consumir esse
arquivo em runtime. O SQLite permanece em dev como camada de autoria.

## Testes

### Testes unitários (Vitest)

Arquivo: `src/lib/repositorio-academia.test.ts`
Cobertura: filtros (bairro, modalidade, termo), ordenação, `obterPorId`,
listagens auxiliares.

```bash
npm test
# ✓  10 passed
```

### Testes end-to-end (Playwright)

Arquivo: `tests/e2e/fluxos.spec.ts`
Cobertura: home com 15 academias, filtros, abertura de detalhes, 404 custom,
página Sobre, busca por termo livre.

```bash
npm run test:e2e
# ✓  6 passed
```

## Deploy

### Aplicação (Next.js)

- **Produção:** Vercel ([acessar](https://agile-cyclone-7186c91.tmp.now))
- **Como refazer um deploy:**
  ```bash
  vercel deploy --prod
  ```

### Documentação (esta página)

- **GitHub Pages** servindo `docs/index.html` em
  https://higorseixas.github.io/academias-londrina/

## Linha do tempo das extensões

| Extensão | Tema | Entrega principal |
|---|---|---|
| I | Fundamentação e justificativa | Problema, público, justificativa |
| II | Documentação inicial | Casos de uso + protótipos |
| III | Documentação final | UML, DER, pseudocódigo Portugol |
| IV | Desenvolvimento inicial | Classes, lógica inicial, escolha de tecnologias |
| V | Desenvolvimento intermediário | Telas, lógica intermediária, BD integrado |
| VI | Desenvolvimento final | Integração + 10 testes manuais + bugs corrigidos |
| **VII** | **Testes e refinamento** | **Vitest + Playwright + refinamento UX + deploy + GitHub Pages + docs** |
| VIII | Publicação e divulgação | Apresentação final + portfólio |

## Licença

Projeto acadêmico. Uso e consulta livres para fins educacionais.
