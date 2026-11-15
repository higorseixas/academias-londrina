import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Academia não encontrada</h1>
      <p className="mt-2 text-slate-600">
        O identificador informado não corresponde a nenhuma academia cadastrada.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Voltar para a lista
      </Link>
    </div>
  );
}
