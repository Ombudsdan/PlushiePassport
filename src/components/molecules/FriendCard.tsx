import { Check, Clock3, MapPin, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Pill } from "@/components/atoms/Pill";
import type { UserFriend } from "@/lib/auth-state";

function getFriendLabel(friend: UserFriend) {
  if (friend.requestState === "connected") {
    return friend.isOnline ? "Online now" : "Friend";
  }

  return friend.requestState === "pending" ? "Pending" : "Suggested";
}

export function FriendCard({
  friend,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
}: {
  friend: UserFriend;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
}) {
  return (
    <article className="rounded-[28px] border border-[#e7e0d5] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-[#171717]">{friend.name}</h3>
            <Pill tone={friend.requestState === "connected" ? "success" : "neutral"}>{getFriendLabel(friend)}</Pill>
          </div>
          <p className="mt-2 text-sm text-[#716a60]">{friend.username}</p>
        </div>
        <div className="rounded-full bg-[#f7f4ef] px-3 py-2 text-xs font-semibold text-[#5e564a]">
          {friend.plushieCount} plushies
        </div>
      </div>
      <p className="mt-4 text-sm text-[#716a60]">{friend.bio}</p>
      <div className="mt-5 grid gap-3 text-sm text-[#5e564a] sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-2xl bg-[#f7f4ef] px-4 py-3">
          <MapPin size={16} />
          <span>{friend.city}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-[#f7f4ef] px-4 py-3">
          <Sparkles size={16} />
          <span>Favorite: {friend.favoritePlushie}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-[#f7f4ef] px-4 py-3">
          <Clock3 size={16} />
          <span>{friend.sharedTrips} shared trips</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-[#f7f4ef] px-4 py-3">
          <Users size={16} />
          <span>{friend.mutualFriends} mutual friends</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={onPrimaryAction} icon={friend.requestState === "pending" ? <Check size={16} /> : undefined}>
          {primaryActionLabel}
        </Button>
        {secondaryActionLabel && onSecondaryAction ? (
          <Button variant="secondary" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
