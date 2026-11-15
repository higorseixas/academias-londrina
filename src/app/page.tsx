import { Suspense } from "react";
import { AcademiaCard } from "@/components/AcademiaCard";
import { FiltroBar } from "@/components/FiltroBar";
import {
  listar,
  listarBairros,
  listarModalidades,
} from "@/lib/repositorio-academia";

type SearchParams = Promise<{ termo?: string; bairro?: string; modalidade?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;

  const [academias, bairros, modalidades] = await Promise.all([
    listar({ termoLivre: sp.termo, bairro: sp.bairro, modalidadeId: sp.modalidade }),
    listarBairros(),
    listarModalidades(),
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-gradient-to-r from-brand to-brand-dark px-6 py-10 text-white shadow">
        <h1 className="text-3xl font-bold">Encontre a academia ideal em Londrina</h1>
        <p className="mt-2 max-w-2xl text-white/90">
          Consulte academias por bairro, modalidade ou pesquise por nome. Dados sem
          cadastro, 100% offline.
        </p>
      </section>

      <Suspense fallback={<div className="text-sm text-slate-500">Carregando filtros…</div>}>
        <FiltroBar bairros={bairros} modalidades={modalidades} />
      </Suspense>

      <div className="flex items-center justify-between" aria-live="polite">
        <h2 className="text-xl font-semibold">
          {academias.length} academia{academias.length === 1 ? "" : "s"} encontrada
          {academias.length === 1 ? "" : "s"}
        </h2>
      </div>

      {academias.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-600">
            Nenhuma academia corresponde aos filtros selecionados.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Tente ajustar o bairro ou a modalidade.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {academias.map((a) => (
            <AcademiaCard key={a.id} {...a} />
          ))}
        </div>
      )}
    </div>
  );
}
