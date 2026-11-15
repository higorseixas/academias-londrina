/**
 * Testes unitários do repositório de academias.
 * Valida filtros (bairro, modalidade, termo livre) e busca por id.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { listar, obterPorId, listarBairros, listarModalidades } from "./repositorio-academia";
import { prisma } from "./db";

describe("repositorio-academia", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("listar()", () => {
    it("retorna todas as academias sem filtros", async () => {
      const res = await listar();
      expect(res.length).toBeGreaterThanOrEqual(15);
      expect(res[0]).toHaveProperty("nome");
      expect(res[0]).toHaveProperty("bairro");
      expect(res[0]).toHaveProperty("modalidades");
    });

    it("filtra por bairro Centro corretamente", async () => {
      const res = await listar({ bairro: "Centro" });
      expect(res.length).toBeGreaterThan(0);
      res.forEach((a) => expect(a.bairro).toBe("Centro"));
    });

    it("retorna lista vazia para bairro inexistente", async () => {
      const res = await listar({ bairro: "BairroInexistente" });
      expect(res).toEqual([]);
    });

    it("busca por termo livre no nome", async () => {
      const res = await listar({ termoLivre: "Palhano" });
      expect(res.length).toBeGreaterThan(0);
      expect(res.some((a) => a.nome.toLowerCase().includes("palhano"))).toBe(true);
    });

    it("combina filtros (bairro + modalidade)", async () => {
      const modalidades = await listarModalidades();
      const musc = modalidades.find((m) => m.nome === "Musculação");
      expect(musc).toBeDefined();
      const res = await listar({ bairro: "Centro", modalidadeId: musc!.id });
      res.forEach((a) => {
        expect(a.bairro).toBe("Centro");
        expect(a.modalidades).toContain("Musculação");
      });
    });

    it("retorna ordenado alfabeticamente por nome", async () => {
      const res = await listar();
      const nomes = res.map((a) => a.nome);
      const ordenado = [...nomes].sort((a, b) => a.localeCompare(b));
      expect(nomes).toEqual(ordenado);
    });
  });

  describe("obterPorId()", () => {
    it("retorna a academia e dados completos quando id é válido", async () => {
      const [first] = await listar();
      const det = await obterPorId(first.id);
      expect(det).not.toBeNull();
      expect(det!.nome).toBe(first.nome);
      expect(det!.endereco).not.toBeNull();
      expect(det!.modalidades.length).toBeGreaterThan(0);
    });

    it("retorna null para id inexistente", async () => {
      const det = await obterPorId("id-que-nao-existe-123");
      expect(det).toBeNull();
    });
  });

  describe("listarBairros() e listarModalidades()", () => {
    it("lista bairros distintos e ordenados", async () => {
      const bairros = await listarBairros();
      expect(bairros.length).toBeGreaterThan(5);
      const ordenado = [...bairros].sort((a, b) => a.localeCompare(b));
      expect(bairros).toEqual(ordenado);
    });

    it("lista modalidades com id e nome", async () => {
      const mods = await listarModalidades();
      expect(mods.length).toBeGreaterThanOrEqual(10);
      mods.forEach((m) => {
        expect(m).toHaveProperty("id");
        expect(m).toHaveProperty("nome");
      });
    });
  });
});
