import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/atoms/Pill";
import type { NotificationFeedEntry } from "@/lib/plushie-insights";

export function NotificationFeedItem({ item }: { item: NotificationFeedEntry }) {
  return (
    <article className="rounded-[24px] border border-[#e7e0d5] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Pill tone={item.unread ? "success" : "neutral"}>{item.category}</Pill>
            <span className="text-xs text-[#8b8479]">{item.timestamp}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#171717]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#716a60]">{item.body}</p>
          </div>
        </div>
        {item.unread ? <span className="mt-1 h-3 w-3 rounded-full bg-[#171717]" aria-label="Unread" /> : null}
      </div>
      <div className="mt-4">
        <Link href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717]">
          {item.ctaLabel}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
