import { cn } from "@/lib/cn";

export function FilterChip({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean;
  count?: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-[#171717] bg-[#171717] text-white"
          : "border-[#d7cfbf] bg-white text-[#171717] hover:bg-[#f7f4ef]",
      )}
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs",
            active ? "bg-white/15 text-white" : "bg-[#f3eee6] text-[#5e564a]",
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
