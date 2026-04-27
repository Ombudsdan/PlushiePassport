import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountSettingsPanel } from "@/components/organisms/AccountSettingsPanel";
import { AuthCard } from "@/components/organisms/AuthCard";
import { ConnectedAccountsPanel } from "@/components/organisms/ConnectedAccountsPanel";
import { NotificationSettingsPanel } from "@/components/organisms/NotificationSettingsPanel";
import { ProfileSummaryCard } from "@/components/organisms/ProfileSummaryCard";
import { StorySurface, sampleUser } from "../storybook-fixtures";

const meta = {
  title: "Organisms/Settings & Profile",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SummaryAndAuthCards: Story = {
  render: () => (
    <StorySurface className="grid gap-4 xl:grid-cols-2">
      <ProfileSummaryCard user={sampleUser} />
      <AuthCard title="Plushie Passport" description="Use this shell for login, signup, and recovery flows.">
        <p className="text-sm text-[#716a60]">Drop in the appropriate form fields for each auth journey.</p>
      </AuthCard>
    </StorySurface>
  ),
};

export const SettingsPanels: Story = {
  render: () => {
    function SettingsPreview() {
      const [preferences, setPreferences] = useState(sampleUser.notifications);
      const [accounts, setAccounts] = useState(sampleUser.connectedAccounts);

      return (
        <StorySurface className="grid gap-4 xl:grid-cols-2">
          <AccountSettingsPanel user={sampleUser} onSave={() => undefined} />
          <NotificationSettingsPanel
            preferences={preferences}
            onToggle={(id) =>
              setPreferences((current) =>
                current.map((preference) =>
                  preference.id === id ? { ...preference, enabled: !preference.enabled } : preference,
                ),
              )
            }
          />
          <ConnectedAccountsPanel
            accounts={accounts}
            onToggle={(id) =>
              setAccounts((current) =>
                current.map((account) =>
                  account.id === id ? { ...account, connected: !account.connected } : account,
                ),
              )
            }
          />
        </StorySurface>
      );
    }

    return <SettingsPreview />;
  },
};
