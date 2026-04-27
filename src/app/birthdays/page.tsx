"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatTile } from "@/components/molecules/StatTile";
import { BirthdayPlannerPanel } from "@/components/organisms/BirthdayPlannerPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { getBirthdayEntries } from "@/lib/community-insights";
import { useMemo, useState } from "react";

export default function BirthdaysPage() {
  const { currentUser } = useAuth();
  const entries = useMemo(() => getBirthdayEntries(currentUser?.plushies ?? []), [currentUser]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedEntry = entries.find((entry) => entry.id === selectedId) ?? entries[0] ?? null;
  const counts = {
    today: entries.filter((entry) => entry.group === "Today").length,
    thisWeek: entries.filter((entry) => entry.group === "This Week").length,
    later: entries.filter((entry) => entry.group === "Later").length,
  };

  return (
    <AppShell
      activePath="/birthdays"
      title="Birthdays"
      description="Track every plushie celebration, open a birthday spotlight, and keep gift ideas close at hand."
      action={
        <Link href="/notifications">
          <Button icon={<Gift size={16} />}>Birthday reminders</Button>
        </Link>
      }
    >
      <ProtectedContent>
        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-3">
            <StatTile label="Today" value={counts.today} helper="Plushies celebrating right now" />
            <StatTile label="This week" value={counts.thisWeek} helper="Birthdays coming up soon" />
            <StatTile label="Later" value={counts.later} helper="Future celebrations to plan" />
          </section>
          <BirthdayPlannerPanel
            entries={entries}
            selectedEntry={selectedEntry}
            onSelectEntry={(id) => setSelectedId(id)}
          />
        </div>
      </ProtectedContent>
    </AppShell>
  );
}
