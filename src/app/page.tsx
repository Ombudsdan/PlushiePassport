import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl rounded-[32px] border border-[#e7e0d5] bg-white p-8 shadow-sm sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#716a60]">Plushie Passport</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-[#171717] sm:text-5xl">
              A Next.js PWA starter for low-cost plushie social accounts on Vercel.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-[#716a60]">
              This prototype covers sign up, login, dashboard, logout, and full account management while keeping the architecture ready for a free-friendly production stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup">
                <Button>Create account</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary">Log in</Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ["Hosting", "Vercel Hobby keeps deployment free for early growth."],
              ["Auth + Database + Storage", "Supabase free tier fits the first production iteration."],
              ["Push notifications", "Use the browser Push API with a Vercel route and stored subscriptions."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-2xl bg-[#f7f4ef] p-5">
                <h2 className="text-lg font-semibold text-[#171717]">{title}</h2>
                <p className="mt-2 text-sm text-[#716a60]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
