import type { InputHTMLAttributes } from "react";
import { TextInput } from "@/components/atoms/TextInput";

export function FieldGroup({
  label,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[#171717]">
      <span>{label}</span>
      <TextInput {...props} />
      {hint ? <span className="text-xs font-normal text-[#716a60]">{hint}</span> : null}
    </label>
  );
}
