import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-[#e2dacd] bg-white px-4 py-3 text-sm text-[#171717] shadow-sm outline-none transition placeholder:text-[#8b8479] focus:border-[#171717]",
          className,
        )}
        {...props}
      />
    );
  },
);
