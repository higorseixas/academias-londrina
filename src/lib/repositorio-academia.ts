// Repositório de Academias.
// Implementação direta do pseudocódigo em Portugol definido na Extensão III (seção 3):
// - listarAcademias(filtros): aplica filtros por bairro, modalidade e termo livre
// - obterDetalhesAcademia(id): retorna academia com endereço e modalidades
//
// Fonte dos dados: src/data/academias.json, exportado do banco SQLite via
// scripts/export-db-to-json.ts. Essa escolha mantém o modelo Prisma como
// fonte da verdade no desenvolvimento e permite deploy em qualquer ambiente
// serverless (Vercel, Cloudflare) sem depender de filesystem gravável.

import dados from "@/data/academias.json";

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

type AcademiaCrua = (typeof dados)["academias"][number];

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

  return (dados.academias as AcademiaCrua[])
    .filter((a) => a.endereco !== null)
    .filter((a) => !filtros.bairro || a.endereco!.bairro === filtros.bairro)
    .filter(
      (a) =>
        !filtros.modalidadeId ||
        a.modalidades.some((m) => m.modalidadeId === filtros.modalidadeId),
    )
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
  const a = (dados.academias as AcademiaCrua[]).find((x) => x.id === id);
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
    modalidades: a.modalidades.map((m) => ({
      id: m.modalidade.id,
      nome: m.modalidade.nome,
    })),
  };
}

export async function listarBairros(): Promise<string[]> {
  return dados.bairros as string[];
}

export async function listarModalidades(): Promise<{ id: string; nome: string }[]> {
  return dados.modalidades.map((m) => ({ id: m.id, nome: m.nome }));
}
