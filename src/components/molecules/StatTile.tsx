export function StatTile({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <article className="rounded-2xl bg-[#f7f4ef] p-5">
      <p className="text-sm text-[#716a60]">{label}</p>
      <p className="mt-3 text-3xl font-bold text-[#171717]">{value}</p>
      <p className="mt-2 text-sm text-[#716a60]">{helper}</p>
    </article>
  );
}
