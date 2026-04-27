"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { useAuth } from "@/contexts/AuthContext";
import { toErrorMessage } from "@/lib/errors";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthTemplate>
      <AuthCard
        title="Create your account"
        description="Start your plushie passport with an installable, notification-ready profile."
        footer={
          <p className="text-[#716a60]">
            Already have an account? <Link href="/login" className="font-semibold text-[#171717]">Log in</Link>
          </p>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            try {
              signUp(form);
              router.push("/dashboard");
            } catch (submissionError) {
              setError(toErrorMessage(submissionError, "We couldn't create your account."));
            }
          }}
        >
          <FieldGroup
            label="Display Name"
            value={form.displayName}
            onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
          />
          <FieldGroup
            label="Username"
            placeholder="@plushie_friend"
            value={form.username}
            onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
          />
          <FieldGroup
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <FieldGroup
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
          <FieldGroup
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
          {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </form>
      </AuthCard>
    </AuthTemplate>
  );
}
