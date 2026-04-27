import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedContent({ children }: { children: ReactNode }) {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) {
    return (
      <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
        <p className="text-sm text-[#716a60]">Loading your plushie passport…</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">You&apos;re signed out</h1>
        <p className="mt-2 text-sm text-[#716a60]">
          Sign back in to manage your passport, profile, and notification settings.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/login">
            <Button>Go to login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary">Create account</Button>
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
