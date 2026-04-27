import Link from "next/link";
import { cn } from "@/lib/cn";

export function SidebarLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-[#f3eee6]",
        active ? "bg-[#f3eee6] text-[#171717]" : "text-[#5e564a]",
      )}
    >
      {label}
    </Link>
  );
}
