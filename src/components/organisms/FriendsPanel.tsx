import { FilterChip } from "@/components/molecules/FilterChip";
import { FriendCard } from "@/components/molecules/FriendCard";
import type { FriendFilter } from "@/lib/community-insights";
import type { UserFriend } from "@/lib/auth-state";

export function FriendsPanel({
  activeFilter,
  counts,
  friends,
  onFilterChange,
  onAcceptFriend,
  onDismissFriend,
  onConnectFriend,
}: {
  activeFilter: FriendFilter;
  counts: Record<FriendFilter, number>;
  friends: UserFriend[];
  onFilterChange: (filter: FriendFilter) => void;
  onAcceptFriend: (id: string) => void;
  onDismissFriend: (id: string) => void;
  onConnectFriend: (id: string) => void;
}) {
  return (
    <section className="grid gap-5 rounded-[28px] border border-[#e7e0d5] bg-[#fcfaf6] p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-[#171717]">Friend activity</h2>
        <p className="mt-2 text-sm text-[#716a60]">Keep up with your plushie circle, pending requests, and collector suggestions.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterChip active={activeFilter === "all"} count={counts.all} label="All" onClick={() => onFilterChange("all")} />
        <FilterChip active={activeFilter === "connected"} count={counts.connected} label="Friends" onClick={() => onFilterChange("connected")} />
        <FilterChip active={activeFilter === "pending"} count={counts.pending} label="Pending" onClick={() => onFilterChange("pending")} />
        <FilterChip active={activeFilter === "suggested"} count={counts.suggested} label="Suggested" onClick={() => onFilterChange("suggested")} />
      </div>
      {friends.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              primaryActionLabel={
                friend.requestState === "pending"
                  ? "Accept request"
                  : friend.requestState === "suggested"
                    ? "Send request"
                    : "View activity"
              }
              secondaryActionLabel={friend.requestState === "connected" ? undefined : "Not now"}
              onPrimaryAction={() => {
                if (friend.requestState === "pending") {
                  onAcceptFriend(friend.id);
                  return;
                }

                if (friend.requestState === "suggested") {
                  onConnectFriend(friend.id);
                }
              }}
              onSecondaryAction={
                friend.requestState === "connected" ? undefined : () => onDismissFriend(friend.id)
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#d7cfbf] bg-white px-6 py-10 text-center">
          <p className="text-lg font-semibold text-[#171717]">No friends in this view</p>
          <p className="mt-2 text-sm text-[#716a60]">Try another filter to review your plushie social circle.</p>
        </div>
      )}
    </section>
  );
}
