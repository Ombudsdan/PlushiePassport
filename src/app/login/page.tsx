"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { AuthCard } from "@/components/organisms/AuthCard";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "sarah@example.com", password: "Password123!" });
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthTemplate>
      <AuthCard
        title="Log in"
        description="Welcome back. Access your passport, profile, and reminders."
        footer={
          <p className="text-[#716a60]">
            Need an account? <Link href="/signup" className="font-semibold text-[#171717]">Create one</Link>
          </p>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            try {
              login(form);
              router.push("/dashboard");
            } catch (submissionError) {
              setError(
                submissionError instanceof Error
                  ? submissionError.message
                  : "We couldn't sign you in.",
              );
            }
          }}
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            <span>Email</span>
            <input
              className="w-full rounded-xl border border-[#e2dacd] px-4 py-3"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            <span>Password</span>
            <input
              className="w-full rounded-xl border border-[#e2dacd] px-4 py-3"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />
          </label>
          {error ? <p className="text-sm font-medium text-[#b42318]">{error}</p> : null}
          <Button type="submit" fullWidth>
            Continue
          </Button>
          <Link href="/forgot-password" className="inline-flex text-sm font-semibold text-[#171717] underline-offset-4 hover:underline">
            Forgot your password?
          </Link>
        </form>
      </AuthCard>
    </AuthTemplate>
  );
}
