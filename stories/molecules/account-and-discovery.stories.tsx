import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConnectedAccountRow } from "@/components/molecules/ConnectedAccountRow";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import { FriendCard } from "@/components/molecules/FriendCard";
import { NotificationFeedItem } from "@/components/molecules/NotificationFeedItem";
import { NotificationRow } from "@/components/molecules/NotificationRow";
import { SearchResultCard } from "@/components/molecules/SearchResultCard";
import { StorySurface, sampleNotifications, sampleSearchResults, sampleUser } from "../storybook-fixtures";

const meta = {
  title: "Molecules/Account & Discovery",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsRows: Story = {
  render: () => (
    <StorySurface className="grid gap-4">
      <FieldGroup label="Display name" hint="Shown throughout your passport" defaultValue={sampleUser.displayName} />
      <NotificationRow preference={sampleUser.notifications[0]} onToggle={() => undefined} />
      <ConnectedAccountRow account={sampleUser.connectedAccounts[2]} onToggle={() => undefined} />
    </StorySurface>
  ),
};

export const FeedAndResultCards: Story = {
  render: () => (
    <StorySurface className="grid gap-4 xl:grid-cols-2">
      <NotificationFeedItem item={sampleNotifications[0]} />
      <SearchResultCard result={sampleSearchResults[0]} />
    </StorySurface>
  ),
};

export const FriendDiscoveryCards: Story = {
  render: () => (
    <StorySurface className="grid gap-4 xl:grid-cols-2">
      <FriendCard
        friend={sampleUser.friends[0]}
        primaryActionLabel="View activity"
        onPrimaryAction={() => undefined}
      />
      <FriendCard
        friend={sampleUser.friends[3]}
        primaryActionLabel="Send request"
        secondaryActionLabel="Not now"
        onPrimaryAction={() => undefined}
        onSecondaryAction={() => undefined}
      />
    </StorySurface>
  ),
};
