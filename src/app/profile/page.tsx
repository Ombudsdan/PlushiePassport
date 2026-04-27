"use client";

import { PencilLine } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { AccountSettingsPanel } from "@/components/organisms/AccountSettingsPanel";
import { ConnectedAccountsPanel } from "@/components/organisms/ConnectedAccountsPanel";
import { NotificationSettingsPanel } from "@/components/organisms/NotificationSettingsPanel";
import { ProfileSummaryCard } from "@/components/organisms/ProfileSummaryCard";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { currentUser, saveProfile, toggleAccount, toggleNotification } = useAuth();

  return (
    <AppShell
      activePath="/profile"
      title="Profile"
      description="Manage your account and preferences"
      action={<Button variant="secondary" icon={<PencilLine size={16} />}>Edit Profile</Button>}
    >
      <ProtectedContent>
        {currentUser ? (
          <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
            <ProfileSummaryCard user={currentUser} />
            <div className="grid gap-6">
              <AccountSettingsPanel user={currentUser} onSave={saveProfile} />
              <NotificationSettingsPanel
                preferences={currentUser.notifications}
                onToggle={toggleNotification}
              />
              <ConnectedAccountsPanel
                accounts={currentUser.connectedAccounts}
                onToggle={toggleAccount}
              />
            </div>
          </div>
        ) : null}
      </ProtectedContent>
    </AppShell>
  );
}
