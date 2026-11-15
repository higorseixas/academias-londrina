# Aplicativo Web para Consulta das Academias de Londrina/PR

Projeto Web da **Extensão V** — Engenharia de Software · UniFil.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** para estilos
- **Prisma ORM** + **SQLite** (banco local `dev.db`)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Criar banco e aplicar schema
npx prisma migrate dev --name init

# 3. Popular com academias de exemplo (15 unidades)
npx prisma db seed

# 4. Subir servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000.

## Casos de uso implementados

Espelham os casos de uso e o pseudocódigo definidos na Extensão III:

- **Listar academias** (`/`) — aceita filtros por bairro, modalidade e termo livre (query string).
- **Filtrar** — combinação livre dos filtros.
- **Visualizar detalhes** (`/academias/[id]`) — endereço, telefone clicável, site, Instagram, link para Google Maps.

## Estrutura

```
webapp/
├── prisma/
│   ├── schema.prisma          # espelha o DER da Ext III
│   └── seed.ts                # 15 academias em bairros variados
├── src/
│   ├── app/
│   │   ├── layout.tsx         # cabeçalho + rodapé
│   │   ├── page.tsx           # home com filtros e lista
│   │   ├── academias/[id]/    # detalhes + not-found
│   │   └── sobre/             # sobre o projeto
│   ├── components/
│   │   ├── AcademiaCard.tsx
│   │   ├── FiltroBar.tsx
│   │   └── ModalidadeChip.tsx
│   └── lib/
│       ├── db.ts              # singleton PrismaClient
│       └── repositorio-academia.ts   # listar() e obterPorId() — implementa o Portugol
└── tailwind.config.ts
```

## Relação com o pseudocódigo da Extensão III

O arquivo `src/lib/repositorio-academia.ts` implementa, na prática, os algoritmos
`listarAcademias(filtros)` e `obterDetalhesAcademia(id)` descritos na seção 3 do
documento da Extensão III, com os mesmos três filtros opcionais
(`bairro`, `modalidadeId`, `termoLivre`).
