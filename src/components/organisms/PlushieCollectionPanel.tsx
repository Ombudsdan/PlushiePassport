import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { StatTile } from "@/components/molecules/StatTile";
import { PlushieCard } from "@/components/organisms/PlushieCard";
import type { PlushieRecord } from "@/lib/auth-state";

export function PlushieCollectionPanel({ plushies }: { plushies: PlushieRecord[] }) {
  const totalStamps = plushies.reduce((sum, plushie) => sum + plushie.passportStamps, 0);
  const totalAdventures = plushies.reduce((sum, plushie) => sum + plushie.adventures, 0);
  const activeTravellers = plushies.filter((plushie) => plushie.status !== "At home").length;

  if (!plushies.length) {
    return (
      <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#171717]">Your collection is ready for its first passport</h2>
        <p className="mt-3 max-w-2xl text-sm text-[#716a60]">
          Add your first plushie to start tracking birthdays, travel stamps, and adventure notes.
        </p>
        <div className="mt-6">
          <Link href="/plushies/new">
            <Button>Add your first plushie</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <StatTile label="Total plushies" value={plushies.length} helper="Passport profiles in your collection" />
        <StatTile label="Passport stamps" value={totalStamps} helper="Travel moments recorded so far" />
        <StatTile label="Active adventures" value={activeTravellers || totalAdventures} helper="Plushies currently planning or taking trips" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {plushies.map((plushie) => (
          <PlushieCard key={plushie.id} plushie={plushie} />
        ))}
      </section>
    </div>
  );
}
