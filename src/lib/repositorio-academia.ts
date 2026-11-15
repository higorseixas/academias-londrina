// Repositório de Academias.
// Implementação direta do pseudocódigo em Portugol definido na Extensão III (seção 3):
// - listarAcademias(filtros): aplica filtros por bairro, modalidade e termo livre
// - obterDetalhesAcademia(id): retorna academia com endereço e modalidades

import { prisma } from "./db";

export type FiltroConsulta = {
  bairro?: string;
  modalidadeId?: string;
  termoLivre?: string;
};

export type AcademiaResumo = {
  id: string;
  nome: string;
  descricao: string | null;
  bairro: string;
  modalidades: string[];
};

export type AcademiaDetalhes = {
  id: string;
  nome: string;
  descricao: string | null;
  telefone: string | null;
  siteUrl: string | null;
  instagram: string | null;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string | null;
    latitude: number | null;
    longitude: number | null;
  } | null;
  modalidades: { id: string; nome: string }[];
};

// Normaliza string removendo acentos e caixa, para busca tolerante a diacríticos.
// Refinamento aplicado na Extensão VII: antes, a busca por "igapo" (sem acento)
// não retornava "Academia Igapó Fitness"; agora retorna.
function normalizar(texto: string): string {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export async function listar(filtros: FiltroConsulta = {}): Promise<AcademiaResumo[]> {
  const termo = filtros.termoLivre ? normalizar(filtros.termoLivre) : null;

  const academias = await prisma.academia.findMany({
    where: {
      AND: [
        filtros.bairro ? { endereco: { is: { bairro: filtros.bairro } } } : {},
        filtros.modalidadeId
          ? { modalidades: { some: { modalidadeId: filtros.modalidadeId } } }
          : {},
      ],
    },
    include: {
      endereco: true,
      modalidades: { include: { modalidade: true } },
    },
    orderBy: { nome: "asc" },
  });

  return academias
    .filter((a) => a.endereco !== null)
    .filter((a) => {
      if (!termo) return true;
      const alvo = normalizar(`${a.nome} ${a.descricao ?? ""}`);
      return alvo.includes(termo);
    })
    .map((a) => ({
      id: a.id,
      nome: a.nome,
      descricao: a.descricao,
      bairro: a.endereco!.bairro,
      modalidades: a.modalidades.map((m) => m.modalidade.nome),
    }));
}

export async function obterPorId(id: string): Promise<AcademiaDetalhes | null> {
  const a = await prisma.academia.findUnique({
    where: { id },
    include: {
      endereco: true,
      modalidades: { include: { modalidade: true } },
    },
  });

  if (!a) return null;

  return {
    id: a.id,
    nome: a.nome,
    descricao: a.descricao,
    telefone: a.telefone,
    siteUrl: a.siteUrl,
    instagram: a.instagram,
    endereco: a.endereco
      ? {
          rua: a.endereco.rua,
          numero: a.endereco.numero,
          bairro: a.endereco.bairro,
          cidade: a.endereco.cidade,
          estado: a.endereco.estado,
          cep: a.endereco.cep,
          latitude: a.endereco.latitude,
          longitude: a.endereco.longitude,
        }
      : null,
    modalidades: a.modalidades.map((m) => ({ id: m.modalidade.id, nome: m.modalidade.nome })),
  };
}

export async function listarBairros(): Promise<string[]> {
  const rows = await prisma.endereco.findMany({
    select: { bairro: true },
    distinct: ["bairro"],
    orderBy: { bairro: "asc" },
  });
  return rows.map((r) => r.bairro);
}

export async function listarModalidades(): Promise<{ id: string; nome: string }[]> {
  return prisma.modalidade.findMany({ orderBy: { nome: "asc" } });
}
