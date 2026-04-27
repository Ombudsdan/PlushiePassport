import { cn } from "@/lib/cn";

export function Avatar({ initials, size = "lg" }: { initials: string; size?: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-[#171717] font-bold text-white",
        size === "lg" ? "h-24 w-24 text-3xl" : "h-10 w-10 text-sm",
      )}
    >
      {initials}
    </div>
  );
}
