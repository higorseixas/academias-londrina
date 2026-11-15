import Link from "next/link";
import { ModalidadeChip } from "./ModalidadeChip";

type Props = {
  id: string;
  nome: string;
  descricao: string | null;
  bairro: string;
  modalidades: string[];
};

export function AcademiaCard({ id, nome, descricao, bairro, modalidades }: Props) {
  return (
    <Link
      href={`/academias/${id}`}
      className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{nome}</h3>
        <span className="whitespace-nowrap rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
          📍 {bairro}
        </span>
      </div>
      {descricao && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{descricao}</p>}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {modalidades.map((m) => (
          <ModalidadeChip key={m} nome={m} />
        ))}
      </div>
      <div className="mt-4 text-sm font-medium text-brand">Ver detalhes →</div>
    </Link>
  );
}
