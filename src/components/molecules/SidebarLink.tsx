import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function SidebarLink({
  href,
  label,
  active,
  icon: Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#f3eee6]",
        active ? "bg-[#f3eee6] text-[#171717]" : "text-[#5e564a]",
      )}
    >
      <Icon aria-hidden="true" size={16} />
      <span>{label}</span>
    </Link>
  );
}
