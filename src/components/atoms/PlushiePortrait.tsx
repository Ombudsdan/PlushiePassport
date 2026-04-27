import { cn } from "@/lib/cn";
import type { PlushieRecord } from "@/lib/auth-state";

const gradients = [
  "from-[#f8d8de] via-[#f7f1e7] to-[#efe5ff]",
  "from-[#d8ebff] via-[#f1f7ff] to-[#dff7f0]",
  "from-[#ffe1c9] via-[#fff4ea] to-[#ffe7f2]",
  "from-[#dfe8c8] via-[#f4f7e9] to-[#e0f0ff]",
];

function getGradient(id: string) {
  const value = Array.from(id).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return gradients[value % gradients.length];
}

export function PlushiePortrait({
  plushie,
  size = "card",
}: {
  plushie: PlushieRecord;
  size?: "card" | "hero";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        getGradient(plushie.id),
        size === "hero" ? "min-h-[320px] rounded-[32px] p-8" : "min-h-[220px] rounded-[28px] p-6",
      )}
    >
      <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-white/35 blur-2xl" />
      <div className="absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-white/25 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#171717] shadow-sm">
            {plushie.species}
          </span>
          <span className="rounded-full bg-[#171717] px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {plushie.status}
          </span>
        </div>
        <div>
          <p className={cn("font-bold text-[#171717]", size === "hero" ? "text-5xl" : "text-3xl")}>
            {plushie.name}
          </p>
          <p className="mt-3 max-w-sm text-sm text-[#5e564a]">{plushie.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#5e564a]">
            <span className="rounded-full bg-white/70 px-3 py-1">{plushie.passportStamps} passport stamps</span>
            <span className="rounded-full bg-white/70 px-3 py-1">{plushie.adventures} adventures</span>
            <span className="rounded-full bg-white/70 px-3 py-1">{plushie.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
