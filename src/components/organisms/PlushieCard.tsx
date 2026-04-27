import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/atoms/Pill";
import { PlushiePortrait } from "@/components/atoms/PlushiePortrait";
import type { PlushieRecord } from "@/lib/auth-state";

export function PlushieCard({ plushie }: { plushie: PlushieRecord }) {
  return (
    <Link
      href={`/plushies/${plushie.id}`}
      className="group overflow-hidden rounded-[28px] border border-[#e7e0d5] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7cfbf]"
    >
      <PlushiePortrait plushie={plushie} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#171717]">{plushie.name}</h2>
            <p className="mt-2 text-sm text-[#716a60]">{plushie.tagline}</p>
          </div>
          <Pill>{plushie.species}</Pill>
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-[#716a60]">
          <div className="flex flex-wrap gap-4">
            <span>{plushie.passportStamps} stamps</span>
            <span>{plushie.adventures} adventures</span>
          </div>
          <span className="inline-flex items-center gap-2 font-semibold text-[#171717]">
            View passport
            <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
