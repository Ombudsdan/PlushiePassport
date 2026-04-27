import type { ReactNode } from "react";
import { AppSidebar } from "@/components/organisms/AppSidebar";

export function AppShell({
  activePath,
  title,
  description,
  action,
  children,
}: {
  activePath: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f7f4ef] lg:p-6">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col overflow-hidden rounded-none bg-[#f7f4ef] lg:min-h-[calc(100vh-3rem)] lg:flex-row lg:rounded-[32px] lg:border lg:border-[#e7e0d5] lg:bg-white">
        <AppSidebar activePath={activePath} />
        <section className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#171717]">{title}</h1>
              <p className="mt-2 text-sm text-[#716a60]">{description}</p>
            </div>
            {action}
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
