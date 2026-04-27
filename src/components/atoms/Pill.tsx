import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tone === "success" ? "bg-[#ecf9f0] text-[#0f8b45]" : "bg-[#f3eee6] text-[#5e564a]",
      )}
    >
      {children}
    </span>
  );
}
