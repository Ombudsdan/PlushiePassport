"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { PlushiePassportPanel } from "@/components/organisms/PlushiePassportPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { buildNotificationFeed } from "@/lib/plushie-insights";

export default function PlushiePassportPage() {
  const params = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const plushie = currentUser?.plushies.find((entry) => entry.id === params.id) ?? null;
  const notifications = buildNotificationFeed(currentUser).filter((item) => item.href.endsWith(plushie?.id ?? "")).slice(0, 2);

  return (
    <AppShell
      activePath="/plushies"
      title="Plushie Passport"
      description="A profile view for one plushie, with milestone details and the latest passport-worthy updates."
      action={
        <Link href="/plushies">
          <Button variant="secondary" icon={<ArrowLeft size={16} />}>Back to collection</Button>
        </Link>
      }
    >
      <ProtectedContent>
        {currentUser ? (
          plushie ? (
            <PlushiePassportPanel plushie={plushie} notifications={notifications.length ? notifications : buildNotificationFeed(currentUser).slice(0, 2)} />
          ) : (
            <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#171717]">Passport not found</h2>
              <p className="mt-3 text-sm text-[#716a60]">
                This plushie profile may have been removed or the link is out of date.
              </p>
              <div className="mt-6">
                <Link href="/plushies">
                  <Button>Return to collection</Button>
                </Link>
              </div>
            </section>
          )
        ) : null}
      </ProtectedContent>
    </AppShell>
  );
}
