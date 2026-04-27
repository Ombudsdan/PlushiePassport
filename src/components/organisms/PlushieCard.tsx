import { Pill } from "@/components/atoms/Pill";
import type { PlushieRecord } from "@/lib/auth-state";

export function PlushieCard({ plushie }: { plushie: PlushieRecord }) {
  return (
    <article className="rounded-[28px] border border-[#e7e0d5] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#171717]">{plushie.name}</h2>
          <p className="mt-1 text-sm font-medium text-[#716a60]">{plushie.species}</p>
        </div>
        <Pill tone={plushie.status === "At home" ? "neutral" : "success"}>{plushie.status}</Pill>
      </div>
      <p className="mt-4 text-sm text-[#716a60]">{plushie.tagline}</p>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl bg-[#f7f4ef] p-4">
          <dt className="text-[#716a60]">Hometown</dt>
          <dd className="mt-1 font-semibold text-[#171717]">{plushie.hometown}</dd>
        </div>
        <div className="rounded-2xl bg-[#f7f4ef] p-4">
          <dt className="text-[#716a60]">Colorway</dt>
          <dd className="mt-1 font-semibold text-[#171717]">{plushie.color}</dd>
        </div>
        <div className="rounded-2xl bg-[#f7f4ef] p-4">
          <dt className="text-[#716a60]">Passport stamps</dt>
          <dd className="mt-1 font-semibold text-[#171717]">{plushie.passportStamps}</dd>
        </div>
        <div className="rounded-2xl bg-[#f7f4ef] p-4">
          <dt className="text-[#716a60]">Adventures</dt>
          <dd className="mt-1 font-semibold text-[#171717]">{plushie.adventures}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {plushie.accessories.length ? (
          plushie.accessories.map((accessory) => <Pill key={accessory}>{accessory}</Pill>)
        ) : (
          <Pill>No accessories added yet</Pill>
        )}
      </div>
    </article>
  );
}
