"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PlushieCollectionPanel } from "@/components/organisms/PlushieCollectionPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";

export default function PlushiesPage() {
  const { currentUser } = useAuth();

  return (
    <AppShell
      activePath="/plushies"
      title="My Plushies"
      description="Track your plushie profiles, travel stamps, and favorite details in one place."
      action={
        <Link href="/plushies/new">
          <Button icon={<Plus size={16} />}>Add Plushie</Button>
        </Link>
      }
    >
      <ProtectedContent>
        {currentUser ? <PlushieCollectionPanel plushies={currentUser.plushies} /> : null}
      </ProtectedContent>
    </AppShell>
  );
}
