import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/atoms/Pill";
import type { SearchResultItem } from "@/lib/community-insights";

export function SearchResultCard({ result }: { result: SearchResultItem }) {
  return (
    <article className="rounded-[24px] border border-[#e7e0d5] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-[#171717]">{result.title}</h3>
            <Pill>{result.badge}</Pill>
          </div>
          <p className="mt-2 text-sm text-[#5e564a]">{result.subtitle}</p>
          <p className="mt-3 text-sm text-[#716a60]">{result.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link href={result.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717]">
          Open result
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
