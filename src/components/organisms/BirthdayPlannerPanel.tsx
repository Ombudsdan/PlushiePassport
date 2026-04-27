import Link from "next/link";
import { Gift, PartyPopper } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PlushiePortrait } from "@/components/atoms/PlushiePortrait";
import { BirthdayTimelineItem } from "@/components/molecules/BirthdayTimelineItem";
import type { BirthdayEntry } from "@/lib/community-insights";

export function BirthdayPlannerPanel({
  entries,
  selectedEntry,
  onSelectEntry,
}: {
  entries: BirthdayEntry[];
  selectedEntry: BirthdayEntry | null;
  onSelectEntry: (id: string) => void;
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_1.05fr]">
      <div className="grid gap-3 rounded-[28px] border border-[#e7e0d5] bg-[#fcfaf6] p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-[#171717]">Upcoming celebrations</h2>
          <p className="mt-2 text-sm text-[#716a60]">Choose a plushie birthday to view its celebration details.</p>
        </div>
        {entries.length ? (
          entries.map((entry) => (
            <BirthdayTimelineItem
              key={entry.id}
              entry={entry}
              active={entry.id === selectedEntry?.id}
              onSelect={() => onSelectEntry(entry.id)}
            />
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#d7cfbf] bg-white px-6 py-10 text-center">
            <p className="text-lg font-semibold text-[#171717]">No birthdays to plan yet</p>
            <p className="mt-2 text-sm text-[#716a60]">Add a plushie passport to start tracking celebrations.</p>
          </div>
        )}
      </div>
      {selectedEntry ? (
        <section className="grid gap-6 rounded-[28px] border border-[#e7e0d5] bg-white p-6 shadow-sm">
          <PlushiePortrait plushie={selectedEntry.plushie} size="hero" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b8479]">Birthday spotlight</p>
            <h2 className="mt-3 text-3xl font-bold text-[#171717]">{selectedEntry.plushie.name}</h2>
            <p className="mt-2 text-sm text-[#716a60]">{selectedEntry.plushie.tagline}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-[#f7f4ef] p-5">
              <div className="flex items-center gap-2 text-[#171717]">
                <PartyPopper size={16} />
                <p className="font-semibold">Celebration timing</p>
              </div>
              <p className="mt-3 text-sm text-[#716a60]">{selectedEntry.timingLabel}</p>
              <p className="mt-1 text-base font-semibold text-[#171717]">{selectedEntry.dateLabel}</p>
            </div>
            <div className="rounded-[24px] bg-[#f7f4ef] p-5">
              <div className="flex items-center gap-2 text-[#171717]">
                <Gift size={16} />
                <p className="font-semibold">Gift idea</p>
              </div>
              <p className="mt-3 text-sm text-[#716a60]">A birthday bundle inspired by {selectedEntry.plushie.favoriteSnack} and {selectedEntry.plushie.favoriteActivity.toLowerCase()}.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/plushies/${selectedEntry.plushie.id}`}>
              <Button>Open passport</Button>
            </Link>
            <Link href="/notifications">
              <Button variant="secondary">Review reminders</Button>
            </Link>
          </div>
        </section>
      ) : null}
    </section>
  );
}
