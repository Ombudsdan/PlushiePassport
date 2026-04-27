"use client";

import { Button } from "@/components/atoms/Button";
import { SelectInput } from "@/components/atoms/SelectInput";
import { TextArea } from "@/components/atoms/TextArea";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import type { AddPlushieInput, PlushieSize, PlushieStatus } from "@/lib/auth-state";

const sizeOptions: PlushieSize[] = ["Tiny", "Small", "Medium", "Large"];
const statusOptions: PlushieStatus[] = ["At home", "On an adventure", "Ready for the next stamp"];

export function PlushieFormPanel({
  plushie,
  error,
  onChange,
  onSubmit,
}: {
  plushie: AddPlushieInput;
  error: string | null;
  onChange: (field: keyof AddPlushieInput, value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#171717]">Plushie details</h2>
      <p className="mt-2 text-sm text-[#716a60]">
        Capture the personality, home base, and passport details for your newest travel buddy.
      </p>
      <form
        className="mt-6 grid gap-5 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <FieldGroup label="Name" value={plushie.name} onChange={(event) => onChange("name", event.target.value)} />
        <FieldGroup label="Species" value={plushie.species} onChange={(event) => onChange("species", event.target.value)} />
        <FieldGroup label="Colorway" value={plushie.color} onChange={(event) => onChange("color", event.target.value)} />
        <FieldGroup label="Hometown" value={plushie.hometown} onChange={(event) => onChange("hometown", event.target.value)} />
        <FieldGroup label="Birthday" type="date" value={plushie.birthday} onChange={(event) => onChange("birthday", event.target.value)} />
        <FieldGroup label="Adoption Date" type="date" value={plushie.adoptionDate} onChange={(event) => onChange("adoptionDate", event.target.value)} />
        <label className="flex flex-col gap-2 text-sm font-medium text-[#171717]">
          <span>Size</span>
          <SelectInput value={plushie.size} onChange={(event) => onChange("size", event.target.value)}>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[#171717]">
          <span>Travel Status</span>
          <SelectInput value={plushie.status} onChange={(event) => onChange("status", event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </label>
        <FieldGroup label="Favorite Snack" value={plushie.favoriteSnack} onChange={(event) => onChange("favoriteSnack", event.target.value)} />
        <FieldGroup label="Favorite Activity" value={plushie.favoriteActivity} onChange={(event) => onChange("favoriteActivity", event.target.value)} />
        <div className="md:col-span-2">
          <FieldGroup
            label="Accessories"
            hint="Separate accessories with commas"
            value={plushie.accessories}
            onChange={(event) => onChange("accessories", event.target.value)}
          />
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-[#171717] md:col-span-2">
          <span>Tagline</span>
          <TextArea value={plushie.tagline} onChange={(event) => onChange("tagline", event.target.value)} />
        </label>
        {error ? <p className="md:col-span-2 text-sm font-medium text-[#b42318]">{error}</p> : null}
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">Save Plushie</Button>
        </div>
      </form>
    </section>
  );
}
