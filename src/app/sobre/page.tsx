export default function Sobre() {
  return (
    <article className="prose prose-slate max-w-none rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Sobre o projeto</h1>
      <p className="mt-3 text-slate-700">
        <strong>Aplicativo Web para Consulta das Academias de Londrina/PR</strong> é o
        Trabalho de Conclusão de Curso de Engenharia de Software do Centro Universitário
        Filadélfia (UniFil), apresentado como Extensão V.
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900">Objetivo</h2>
        <p className="mt-2 text-slate-700">
          Oferecer uma consulta rápida, sem cadastro e 100% offline, das academias de
          Londrina — com filtros por bairro, modalidade e busca por termo livre.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900">Funcionalidades</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
          <li>Listagem de academias</li>
          <li>Filtro por bairro</li>
          <li>Filtro por modalidade</li>
          <li>Busca por nome ou descrição (termo livre)</li>
          <li>Visualização de detalhes (endereço, contato e redes)</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900">Tecnologias</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
          <li>Next.js 15 (App Router) + React 19</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Prisma ORM + SQLite</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-slate-900">Autor</h2>
        <p className="mt-2 text-slate-700">
          <strong>Higor Clem Seixas</strong>
          <br />
          Orientador: Prof. Dr. Maicon Rosário
          <br />
          UniFil · Engenharia de Software · 2026
        </p>
      </section>
    </article>
  );
}
