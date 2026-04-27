"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { useAuth } from "@/contexts/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <AuthTemplate>
      <AuthCard
        title="You have been logged out"
        description="Your plushie passport is safe. Sign back in whenever you're ready."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/login">
            <Button>Log back in</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Return home</Button>
          </Link>
        </div>
      </AuthCard>
    </AuthTemplate>
  );
}
