import Link from "next/link";
import { notFound } from "next/navigation";
import { ModalidadeChip } from "@/components/ModalidadeChip";
import { obterPorId } from "@/lib/repositorio-academia";

type Params = Promise<{ id: string }>;

export default async function DetalhesAcademia({ params }: { params: Params }) {
  const { id } = await params;
  const academia = await obterPorId(id);

  if (!academia) notFound();

  const end = academia.endereco;
  const mapsQuery = end
    ? encodeURIComponent(`${end.rua}, ${end.numero} - ${end.bairro}, ${end.cidade} - ${end.estado}`)
    : "";

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-block text-sm text-brand hover:underline">
        ← Voltar para a lista
      </Link>

      <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{academia.nome}</h1>
        {academia.descricao && (
          <p className="mt-2 text-slate-700">{academia.descricao}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {academia.modalidades.map((m) => (
            <ModalidadeChip key={m.id} nome={m.nome} />
          ))}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">📍 Endereço</h2>
          {end ? (
            <address className="not-italic text-slate-700">
              {end.rua}, {end.numero}
              <br />
              {end.bairro} – {end.cidade}/{end.estado}
              {end.cep && (
                <>
                  <br />
                  CEP {end.cep}
                </>
              )}
            </address>
          ) : (
            <p className="text-slate-500">Endereço não informado.</p>
          )}
          {mapsQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
            >
              Abrir no Google Maps ↗
            </a>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-900">📞 Contato</h2>
          <ul className="space-y-2 text-slate-700">
            {academia.telefone && (
              <li>
                Telefone:{" "}
                <a
                  href={`tel:${academia.telefone.replace(/\D/g, "")}`}
                  className="text-brand hover:underline"
                >
                  {academia.telefone}
                </a>
              </li>
            )}
            {academia.siteUrl && (
              <li>
                Site:{" "}
                <a
                  href={academia.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  {academia.siteUrl.replace(/^https?:\/\//, "")} ↗
                </a>
              </li>
            )}
            {academia.instagram && (
              <li>
                Instagram:{" "}
                <a
                  href={`https://instagram.com/${academia.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  {academia.instagram} ↗
                </a>
              </li>
            )}
            {!academia.telefone && !academia.siteUrl && !academia.instagram && (
              <li className="text-slate-500">Nenhum contato cadastrado.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
