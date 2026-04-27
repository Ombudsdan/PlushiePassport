"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthTemplate } from "@/components/templates/AuthTemplate";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("sarah@example.com");
  const [sent, setSent] = useState(false);

  return (
    <AuthTemplate>
      <AuthCard
        title="Reset your password"
        description="In production this would send a secure reset email through your auth provider."
        footer={
          <p className="text-[#716a60]">
            Back to <Link href="/login" className="font-semibold text-[#171717]">login</Link>
          </p>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <FieldGroup
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" fullWidth>
            Send reset link
          </Button>
          {sent ? (
            <p className="text-sm font-medium text-[#0f8b45]">
              Reset instructions were sent to {email}.
            </p>
          ) : null}
        </form>
      </AuthCard>
    </AuthTemplate>
  );
}
