"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import type { UserAccount } from "@/lib/auth-state";

export function AccountSettingsPanel({
  user,
  onSave,
}: {
  user: UserAccount;
  onSave: (input: { displayName: string; username: string; email: string }) => void;
}) {
  const [form, setForm] = useState({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
  });
  const [message, setMessage] = useState<string | null>(null);

  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      <p className="mt-2 text-sm text-[#716a60]">Update your personal information</p>
      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(form);
          setMessage("Profile saved successfully.");
        }}
      >
        <FieldGroup
          label="Display Name"
          value={form.displayName}
          onChange={(event) => setForm((current) => ({ ...current, displayName: event.target.value }))}
        />
        <FieldGroup
          label="Username"
          value={form.username}
          onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
        />
        <FieldGroup
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        />
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
        {message ? <p className="text-sm font-medium text-[#0f8b45]">{message}</p> : null}
      </form>
    </section>
  );
}
