export function ModalidadeChip({ nome }: { nome: string }) {
  return (
    <span className="inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark">
      {nome}
    </span>
  );
}
