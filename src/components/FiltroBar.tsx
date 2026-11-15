"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useId } from "react";

type Props = {
  bairros: string[];
  modalidades: { id: string; nome: string }[];
};

export function FiltroBar({ bairros, modalidades }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termoId = useId();
  const bairroId = useId();
  const modalidadeId_ = useId();

  const [termo, setTermo] = useState(searchParams.get("termo") ?? "");
  const [bairro, setBairro] = useState(searchParams.get("bairro") ?? "");
  const [modalidadeId, setModalidadeId] = useState(searchParams.get("modalidade") ?? "");

  useEffect(() => {
    setTermo(searchParams.get("termo") ?? "");
    setBairro(searchParams.get("bairro") ?? "");
    setModalidadeId(searchParams.get("modalidade") ?? "");
  }, [searchParams]);

  function aplicar(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (termo.trim()) params.set("termo", termo.trim());
    if (bairro) params.set("bairro", bairro);
    if (modalidadeId) params.set("modalidade", modalidadeId);
    router.push(`/?${params.toString()}`);
  }

  function limpar() {
    setTermo("");
    setBairro("");
    setModalidadeId("");
    router.push("/");
  }

  return (
    <form
      onSubmit={aplicar}
      aria-label="Filtros de busca de academias"
      className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4"
    >
      <div className="md:col-span-2">
        <label htmlFor={termoId} className="sr-only">
          Buscar por nome ou descrição
        </label>
        <input
          id={termoId}
          type="text"
          placeholder="Buscar por nome ou descrição..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        />
      </div>
      <div>
        <label htmlFor={bairroId} className="sr-only">
          Filtrar por bairro
        </label>
        <select
          id={bairroId}
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <option value="">Todos os bairros</option>
          {bairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={modalidadeId_} className="sr-only">
          Filtrar por modalidade
        </label>
        <select
          id={modalidadeId_}
          value={modalidadeId}
          onChange={(e) => setModalidadeId(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <option value="">Todas as modalidades</option>
          {modalidades.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 md:col-span-4">
        <button
          type="submit"
          className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={limpar}
          className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
