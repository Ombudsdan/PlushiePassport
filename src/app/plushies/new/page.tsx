"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { PlushieFormPanel } from "@/components/organisms/PlushieFormPanel";
import { PlushiePreviewCard } from "@/components/organisms/PlushiePreviewCard";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { toErrorMessage } from "@/lib/errors";
import type { AddPlushieInput } from "@/lib/auth-state";

const initialPlushie: AddPlushieInput = {
  name: "",
  species: "",
  tagline: "",
  hometown: "",
  birthday: "",
  adoptionDate: "",
  size: "Medium",
  status: "Ready for the next stamp",
  favoriteSnack: "",
  favoriteActivity: "",
  color: "",
  accessories: "",
};

export default function AddPlushiePage() {
  const router = useRouter();
  const { addNewPlushie, currentUser } = useAuth();
  const [plushie, setPlushie] = useState(initialPlushie);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppShell
      activePath="/plushies"
      title="Add Plushie"
      description="Create a passport-ready profile for a new travel companion."
      action={
        <Link href="/plushies">
          <Button variant="secondary" icon={<ArrowLeft size={16} />}>Back to collection</Button>
        </Link>
      }
    >
      <ProtectedContent>
        {currentUser ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
            <PlushieFormPanel
              plushie={plushie}
              error={error}
              onChange={(field, value) => {
                setPlushie((current) => ({ ...current, [field]: value }));
              }}
              onSubmit={() => {
                try {
                  addNewPlushie(plushie);
                  router.push("/plushies");
                } catch (submissionError) {
                  setError(toErrorMessage(submissionError, "We couldn't save this plushie yet."));
                }
              }}
            />
            <PlushiePreviewCard plushie={plushie} />
          </div>
        ) : null}
      </ProtectedContent>
    </AppShell>
  );
}
