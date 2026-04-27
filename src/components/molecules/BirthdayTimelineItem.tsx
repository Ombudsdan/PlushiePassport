import { Cake, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BirthdayEntry } from "@/lib/community-insights";

export function BirthdayTimelineItem({
  entry,
  active,
  onSelect,
}: {
  entry: BirthdayEntry;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-[24px] border px-5 py-4 text-left transition",
        active
          ? "border-[#171717] bg-[#171717] text-white shadow-sm"
          : "border-[#e7e0d5] bg-white text-[#171717] hover:border-[#d7cfbf] hover:bg-[#fcfaf6]",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            active ? "bg-white/15 text-white" : "bg-[#fde8b0] text-[#9c6b00]",
          )}
        >
          <Cake size={20} />
        </div>
        <div>
          <p className="font-semibold">{entry.plushie.name}</p>
          <p className={cn("mt-1 text-sm", active ? "text-white/80" : "text-[#716a60]")}>{entry.dateLabel}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn("text-sm font-medium", active ? "text-white/80" : "text-[#716a60]")}>{entry.timingLabel}</span>
        <ChevronRight size={16} className={active ? "text-white" : "text-[#716a60]"} />
      </div>
    </button>
  );
}
