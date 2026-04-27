import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-xl border border-[#e2dacd] bg-white px-4 py-3 text-sm text-[#171717] shadow-sm outline-none transition placeholder:text-[#8b8479] focus:border-[#171717]",
        className,
      )}
      {...props}
    />
  );
});
