import Link from "next/link";
import type { ReactNode } from "react";

export function AuthTemplate({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] bg-[#171717] p-8 text-white shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Plushie Passport</p>
          <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight sm:text-5xl">
            A mobile-first plushie companion designed to feel installable, warm, and social.
          </h1>
          <p className="mt-5 max-w-lg text-sm text-white/80 sm:text-base">
            Launch on Vercel, keep costs light with Supabase, and guide collectors through a polished onboarding and account-management flow.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Hosting", "Vercel Hobby"],
              ["Auth + Data", "Supabase Free"],
              ["Push", "Web Push APIs"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">{label}</p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-white/80 underline-offset-4 hover:underline">
            ← Back to overview
          </Link>
        </section>
        <div className="flex items-center">{children}</div>
      </div>
    </main>
  );
}
