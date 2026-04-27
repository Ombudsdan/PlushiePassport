"use client";

import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { InstallStatusCard } from "@/components/organisms/InstallStatusCard";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <AppShell
      activePath="/dashboard"
      title="Dashboard"
      description="Quick access to your plushie passport activity and install readiness."
      action={
        <Link href="/profile">
          <Button variant="secondary">Manage account</Button>
        </Link>
      }
    >
      <ProtectedContent>
        <div className="grid gap-6">
          <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#171717]">
              Welcome back{currentUser ? `, ${currentUser.displayName}` : ""}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[#716a60]">
              Your account journey is ready for Vercel deployment, app installation, and browser notification setup.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Plushie collection", currentUser?.stats.plushies ?? 0],
                ["Friends", currentUser?.stats.friends ?? 0],
                ["Birthdays tracked", currentUser?.stats.birthdaysTracked ?? 0],
              ].map(([label, value]) => (
                <article key={label} className="rounded-2xl bg-[#f7f4ef] p-5">
                  <p className="text-sm text-[#716a60]">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-[#171717]">{value}</p>
                </article>
              ))}
            </div>
          </section>
          <InstallStatusCard />
        </div>
      </ProtectedContent>
    </AppShell>
  );
}
