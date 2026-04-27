"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FriendsPanel } from "@/components/organisms/FriendsPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { filterFriends, getFriendCounts, type FriendFilter } from "@/lib/community-insights";
import type { UserFriend } from "@/lib/auth-state";

export default function FriendsPage() {
  const { currentUser } = useAuth();
  const [friendOverrides, setFriendOverrides] = useState<Record<string, Partial<UserFriend>>>({});
  const [dismissedFriendIds, setDismissedFriendIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<FriendFilter>("all");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const friends = useMemo(
    () =>
      (currentUser?.friends ?? [])
        .filter((friend) => !dismissedFriendIds.includes(friend.id))
        .map((friend) => ({ ...friend, ...friendOverrides[friend.id] })),
    [currentUser, dismissedFriendIds, friendOverrides],
  );
  const counts = useMemo(() => getFriendCounts(friends), [friends]);
  const filteredFriends = useMemo(() => filterFriends(friends, activeFilter), [friends, activeFilter]);

  return (
    <AppShell
      activePath="/friends"
      title="Friends"
      description="Stay connected with your plushie circle, approve requests, and discover new collectors to follow."
      action={<Button icon={<Users size={16} />}>Invite a friend</Button>}
    >
      <ProtectedContent>
        <div className="grid gap-6">
          {statusMessage ? (
            <section className="rounded-[24px] border border-[#d7cfbf] bg-[#fcfaf6] px-5 py-4 text-sm font-medium text-[#5e564a]">
              {statusMessage}
            </section>
          ) : null}
          <FriendsPanel
            activeFilter={activeFilter}
            counts={counts}
            friends={filteredFriends}
            onFilterChange={setActiveFilter}
            onAcceptFriend={(id) => {
              setFriendOverrides((current) => ({
                ...current,
                [id]: { ...(current[id] ?? {}), requestState: "connected", isOnline: true },
              }));
              setStatusMessage("Friend request accepted.");
            }}
            onDismissFriend={(id) => {
              setDismissedFriendIds((current) => [...current, id]);
              setStatusMessage("Friend card dismissed for now.");
            }}
            onConnectFriend={(id) => {
              setFriendOverrides((current) => ({
                ...current,
                [id]: { ...(current[id] ?? {}), requestState: "pending" },
              }));
              setStatusMessage("Friend request sent.");
            }}
          />
        </div>
      </ProtectedContent>
    </AppShell>
  );
}
