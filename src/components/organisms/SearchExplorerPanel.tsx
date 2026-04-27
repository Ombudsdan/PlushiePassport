import { Search } from "lucide-react";
import { TextInput } from "@/components/atoms/TextInput";
import { FilterChip } from "@/components/molecules/FilterChip";
import { SearchResultCard } from "@/components/molecules/SearchResultCard";
import type { SearchResultItem, SearchScope } from "@/lib/community-insights";

export function SearchExplorerPanel({
  query,
  scope,
  results,
  counts,
  onQueryChange,
  onScopeChange,
}: {
  query: string;
  scope: SearchScope;
  results: SearchResultItem[];
  counts: Record<SearchScope, number>;
  onQueryChange: (value: string) => void;
  onScopeChange: (scope: SearchScope) => void;
}) {
  return (
    <section className="grid gap-5 rounded-[28px] border border-[#e7e0d5] bg-[#fcfaf6] p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-[#171717]">Search the plushie world</h2>
        <p className="mt-2 text-sm text-[#716a60]">Look up plushies, collector friends, and birthday reminders from one place.</p>
      </div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b8479]" />
        <TextInput
          aria-label="Search the plushie world"
          className="pl-11"
          placeholder="Search plushies, friends, birthdays..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterChip active={scope === "all"} count={counts.all} label="All" onClick={() => onScopeChange("all")} />
        <FilterChip active={scope === "plushies"} count={counts.plushies} label="Plushies" onClick={() => onScopeChange("plushies")} />
        <FilterChip active={scope === "friends"} count={counts.friends} label="Friends" onClick={() => onScopeChange("friends")} />
        <FilterChip active={scope === "birthdays"} count={counts.birthdays} label="Birthdays" onClick={() => onScopeChange("birthdays")} />
      </div>
      {results.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {results.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#d7cfbf] bg-white px-6 py-10 text-center">
          <p className="text-lg font-semibold text-[#171717]">No matches yet</p>
          <p className="mt-2 text-sm text-[#716a60]">Try a different name, category, or birthday reminder keyword.</p>
        </div>
      )}
    </section>
  );
}
