import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function SelectInput({ className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-[#e2dacd] bg-white px-4 py-3 text-sm text-[#171717] shadow-sm outline-none transition focus:border-[#171717]",
          className,
        )}
        {...props}
      />
    );
  },
);
