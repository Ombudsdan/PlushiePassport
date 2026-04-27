import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppSidebar } from "@/components/organisms/AppSidebar";
import { FriendsPanel } from "@/components/organisms/FriendsPanel";
import { InstallStatusCard } from "@/components/organisms/InstallStatusCard";
import { NotificationInboxPanel } from "@/components/organisms/NotificationInboxPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { SearchExplorerPanel } from "@/components/organisms/SearchExplorerPanel";
import { filterFriends, searchCommunity, type FriendFilter, type SearchScope } from "@/lib/community-insights";
import {
  StorySurface,
  sampleFriendCounts,
  sampleNotifications,
  sampleUser,
  withAuthenticatedApp,
  withSignedOutApp,
} from "../storybook-fixtures";

const meta = {
  title: "Organisms/Community & App",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InboxAndInstallState: Story = {
  render: () => {
    function InboxPreview() {
      const [showUnreadOnly, setShowUnreadOnly] = useState(false);
      const [readIds, setReadIds] = useState<string[]>([]);
      const items = sampleNotifications
        .map((item) => ({ ...item, unread: item.unread && !readIds.includes(item.id) }))
        .filter((item) => (showUnreadOnly ? item.unread : true));

      return (
        <StorySurface className="grid gap-4 xl:grid-cols-2">
          <NotificationInboxPanel
            items={items}
            showUnreadOnly={showUnreadOnly}
            onShowAll={() => setShowUnreadOnly(false)}
            onShowUnread={() => setShowUnreadOnly(true)}
            onMarkAllRead={() => setReadIds(sampleNotifications.map((item) => item.id))}
          />
          <InstallStatusCard />
        </StorySurface>
      );
    }

    return <InboxPreview />;
  },
};

export const FriendsAndSearch: Story = {
  render: () => {
    function DiscoveryPreview() {
      const [filter, setFilter] = useState<FriendFilter>("all");
      const [query, setQuery] = useState("");
      const [scope, setScope] = useState<SearchScope>("all");
      const filteredFriends = filterFriends(sampleUser.friends, filter);
      const results = searchCommunity(sampleUser, query, scope).slice(0, 4);
      const counts = useMemo(
        () => ({
          all: searchCommunity(sampleUser, "", "all").length,
          plushies: searchCommunity(sampleUser, "", "plushies").length,
          friends: searchCommunity(sampleUser, "", "friends").length,
          birthdays: searchCommunity(sampleUser, "", "birthdays").length,
        }),
        [],
      );

      return (
        <StorySurface className="grid gap-4">
          <FriendsPanel
            activeFilter={filter}
            counts={sampleFriendCounts}
            friends={filteredFriends}
            onFilterChange={setFilter}
            onAcceptFriend={() => undefined}
            onDismissFriend={() => undefined}
            onConnectFriend={() => undefined}
          />
          <SearchExplorerPanel
            query={query}
            scope={scope}
            results={results}
            counts={counts}
            onQueryChange={setQuery}
            onScopeChange={setScope}
          />
        </StorySurface>
      );
    }

    return <DiscoveryPreview />;
  },
};

export const SidebarAuthenticated: Story = {
  render: () => (
    <div className="flex min-h-screen bg-[#f7f4ef] p-6">
      <AppSidebar activePath="/search" />
    </div>
  ),
  decorators: [withAuthenticatedApp],
};

export const ProtectedContentSignedOut: Story = {
  render: () => (
    <StorySurface>
      <ProtectedContent>
        <div>Hidden for signed-out users.</div>
      </ProtectedContent>
    </StorySurface>
  ),
  decorators: [withSignedOutApp],
};
