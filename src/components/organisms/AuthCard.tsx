import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="w-full rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#171717]">{title}</h1>
        <p className="mt-2 text-sm text-[#716a60]">{description}</p>
      </div>
      {children}
      {footer ? <div className="mt-6 border-t border-[#efe7da] pt-5 text-sm">{footer}</div> : null}
    </section>
  );
}
