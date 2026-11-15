/**
 * Exporta o conteúdo do banco SQLite para JSON estático.
 * Este arquivo é consumido em runtime pela aplicação, o que a torna
 * compatível com ambientes serverless (Vercel) sem dependência de FS gravável.
 */
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const academias = await prisma.academia.findMany({
    include: {
      endereco: true,
      modalidades: { include: { modalidade: true } },
    },
    orderBy: { nome: "asc" },
  });

  const modalidades = await prisma.modalidade.findMany({
    orderBy: { nome: "asc" },
  });

  const bairros = [
    ...new Set(academias.map((a) => a.endereco?.bairro).filter(Boolean)),
  ].sort((a, b) => (a as string).localeCompare(b as string));

  const out = { academias, modalidades, bairros };

  const outDir = path.join(process.cwd(), "src", "data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "academias.json"),
    JSON.stringify(out, null, 2),
  );
  console.log(
    `✔ Exportado: ${academias.length} academias, ${modalidades.length} modalidades, ${bairros.length} bairros`,
  );
}

main().finally(() => prisma.$disconnect());
