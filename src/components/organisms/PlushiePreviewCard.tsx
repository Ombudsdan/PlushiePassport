import { Pill } from "@/components/atoms/Pill";
import type { AddPlushieInput } from "@/lib/auth-state";

export function PlushiePreviewCard({ plushie }: { plushie: AddPlushieInput }) {
  const name = plushie.name.trim() || "Your plushie";
  const species = plushie.species.trim() || "Add a species";
  const tagline = plushie.tagline.trim() || "A quick personality note will show up here.";
  const accessories = plushie.accessories
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#716a60]">Preview</p>
      <h2 className="mt-4 text-3xl font-bold text-[#171717]">{name}</h2>
      <p className="mt-1 text-sm font-medium text-[#716a60]">{species}</p>
      <div className="mt-4">
        <Pill tone={plushie.status === "At home" ? "neutral" : "success"}>{plushie.status}</Pill>
      </div>
      <p className="mt-5 text-sm text-[#716a60]">{tagline}</p>

      <dl className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4 border-t border-[#efe7da] pt-4 first:border-t-0 first:pt-0">
          <dt className="text-[#716a60]">Hometown</dt>
          <dd className="text-right font-semibold text-[#171717]">{plushie.hometown || "Add a hometown"}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-[#efe7da] pt-4">
          <dt className="text-[#716a60]">Favorite snack</dt>
          <dd className="text-right font-semibold text-[#171717]">{plushie.favoriteSnack || "Add a snack"}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-[#efe7da] pt-4">
          <dt className="text-[#716a60]">Favorite activity</dt>
          <dd className="text-right font-semibold text-[#171717]">{plushie.favoriteActivity || "Add an activity"}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        {accessories.length ? accessories.map((accessory) => <Pill key={accessory}>{accessory}</Pill>) : <Pill>No accessories yet</Pill>}
      </div>
    </section>
  );
}
