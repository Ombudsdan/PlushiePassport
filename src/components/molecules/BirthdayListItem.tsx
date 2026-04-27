import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Pill } from "@/components/atoms/Pill";
import type { PlushieRecord } from "@/lib/auth-state";
import { formatPassportDate } from "@/lib/plushie-insights";

export function BirthdayListItem({ plushie }: { plushie: PlushieRecord }) {
  return (
    <Link
      href={`/plushies/${plushie.id}`}
      className="flex items-center justify-between gap-4 rounded-2xl border border-[#efe7da] bg-white px-4 py-4 transition hover:border-[#d7cfbf] hover:bg-[#fcfaf6]"
    >
      <div>
        <p className="font-semibold text-[#171717]">{plushie.name}</p>
        <p className="mt-1 text-sm text-[#716a60]">{formatPassportDate(plushie.birthday)}</p>
      </div>
      <div className="flex items-center gap-3">
        <Pill>{plushie.species}</Pill>
        <ChevronRight aria-hidden="true" size={16} className="text-[#716a60]" />
      </div>
    </Link>
  );
}
