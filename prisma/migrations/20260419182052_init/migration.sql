-- CreateTable
CREATE TABLE "Academia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "telefone" TEXT,
    "siteUrl" TEXT,
    "instagram" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "academiaId" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL DEFAULT 'Londrina',
    "estado" TEXT NOT NULL DEFAULT 'PR',
    "cep" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    CONSTRAINT "Endereco_academiaId_fkey" FOREIGN KEY ("academiaId") REFERENCES "Academia" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Modalidade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AcademiaModalidade" (
    "academiaId" TEXT NOT NULL,
    "modalidadeId" TEXT NOT NULL,

    PRIMARY KEY ("academiaId", "modalidadeId"),
    CONSTRAINT "AcademiaModalidade_academiaId_fkey" FOREIGN KEY ("academiaId") REFERENCES "Academia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AcademiaModalidade_modalidadeId_fkey" FOREIGN KEY ("modalidadeId") REFERENCES "Modalidade" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_academiaId_key" ON "Endereco"("academiaId");

-- CreateIndex
CREATE INDEX "Endereco_bairro_idx" ON "Endereco"("bairro");

-- CreateIndex
CREATE UNIQUE INDEX "Modalidade_nome_key" ON "Modalidade"("nome");

-- CreateIndex
CREATE INDEX "AcademiaModalidade_modalidadeId_idx" ON "AcademiaModalidade"("modalidadeId");
