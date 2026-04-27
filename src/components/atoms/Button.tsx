import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  icon?: ReactNode;
};

export function Button({
  children,
  className,
  fullWidth,
  icon,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] disabled:cursor-not-allowed disabled:opacity-60",
        {
          "bg-[#171717] text-white hover:bg-[#2b2b2b]": variant === "primary",
          "border border-[#d7cfbf] bg-white text-[#171717] hover:bg-[#f7f4ef]":
            variant === "secondary",
          "bg-transparent text-[#171717] hover:bg-[#f3eee6]": variant === "ghost",
          "w-full": fullWidth,
        },
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
