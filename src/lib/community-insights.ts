import type { PlushieRecord, UserAccount, UserFriend } from "@/lib/auth-state";
import { formatPassportDate, getUpcomingBirthdays } from "@/lib/plushie-insights";

export type BirthdayEntry = {
  id: string;
  plushie: PlushieRecord;
  nextBirthday: Date;
  daysUntil: number;
  dateLabel: string;
  timingLabel: string;
  group: "Today" | "This Week" | "Later";
};

export type FriendFilter = "all" | "connected" | "pending" | "suggested";
export type SearchScope = "all" | "plushies" | "friends" | "birthdays";

export type SearchResultItem = {
  id: string;
  kind: "plushie" | "friend" | "birthday";
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  href: string;
};

function getNextBirthdayDate(birthday: string, now: Date) {
  const value = new Date(`${birthday}T00:00:00`);
  const nextBirthday = new Date(now.getFullYear(), value.getMonth(), value.getDate());
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (nextBirthday < startOfToday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }

  return nextBirthday;
}

function getDaysUntilBirthday(nextBirthday: Date, now: Date) {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((nextBirthday.getTime() - startOfToday) / (1000 * 60 * 60 * 24));
}

function getBirthdayTimingLabel(daysUntil: number) {
  if (daysUntil === 0) {
    return "Birthday today";
  }

  if (daysUntil === 1) {
    return "Tomorrow";
  }

  return `In ${daysUntil} days`;
}

function getBirthdayGroup(daysUntil: number): BirthdayEntry["group"] {
  if (daysUntil === 0) {
    return "Today";
  }

  if (daysUntil <= 7) {
    return "This Week";
  }

  return "Later";
}

export function getBirthdayEntries(plushies: PlushieRecord[], now = new Date()): BirthdayEntry[] {
  return getUpcomingBirthdays(plushies, plushies.length || 0, now).map((plushie) => {
    const nextBirthday = getNextBirthdayDate(plushie.birthday, now);
    const daysUntil = getDaysUntilBirthday(nextBirthday, now);

    return {
      id: plushie.id,
      plushie,
      nextBirthday,
      daysUntil,
      dateLabel: formatPassportDate(nextBirthday.toISOString().slice(0, 10)),
      timingLabel: getBirthdayTimingLabel(daysUntil),
      group: getBirthdayGroup(daysUntil),
    };
  });
}

export function groupBirthdayEntries(entries: BirthdayEntry[]) {
  return ["Today", "This Week", "Later"].map((label) => ({
    label,
    items: entries.filter((entry) => entry.group === label),
  }));
}

export function filterFriends(friends: UserFriend[], filter: FriendFilter) {
  if (filter === "all") {
    return friends;
  }

  return friends.filter((friend) => friend.requestState === filter);
}

export function getFriendCounts(friends: UserFriend[]) {
  return {
    all: friends.length,
    connected: friends.filter((friend) => friend.requestState === "connected").length,
    pending: friends.filter((friend) => friend.requestState === "pending").length,
    suggested: friends.filter((friend) => friend.requestState === "suggested").length,
  };
}

export function searchCommunity(
  user: UserAccount | null,
  query: string,
  scope: SearchScope,
  now = new Date(),
): SearchResultItem[] {
  if (!user) {
    return [];
  }

  const normalizedQuery = query.trim().toLowerCase();
  const birthdayEntries = getBirthdayEntries(user.plushies, now);

  const plushieResults: SearchResultItem[] = user.plushies.map((plushie) => ({
    id: `plushie-${plushie.id}`,
    kind: "plushie",
    title: plushie.name,
    subtitle: `${plushie.species} · ${plushie.status}`,
    description: plushie.tagline,
    badge: "Plushie",
    href: `/plushies/${plushie.id}`,
  }));

  const friendResults: SearchResultItem[] = user.friends.map((friend) => ({
    id: `friend-${friend.id}`,
    kind: "friend",
    title: friend.name,
    subtitle: `${friend.username} · ${friend.city}`,
    description: friend.bio,
    badge: friend.requestState === "connected" ? "Friend" : friend.requestState === "pending" ? "Pending" : "Suggested",
    href: "/friends",
  }));

  const birthdayResults: SearchResultItem[] = birthdayEntries.map((entry) => ({
    id: `birthday-${entry.id}`,
    kind: "birthday",
    title: `${entry.plushie.name}'s birthday`,
    subtitle: `${entry.timingLabel} · ${entry.dateLabel}`,
    description: `${entry.plushie.name} from ${entry.plushie.hometown} loves ${entry.plushie.favoriteSnack}.`,
    badge: "Birthday",
    href: `/plushies/${entry.plushie.id}`,
  }));

  const scopedResults = [
    ...(scope === "all" || scope === "plushies" ? plushieResults : []),
    ...(scope === "all" || scope === "friends" ? friendResults : []),
    ...(scope === "all" || scope === "birthdays" ? birthdayResults : []),
  ];

  if (!normalizedQuery) {
    return scopedResults;
  }

  return scopedResults.filter((result) =>
    [result.title, result.subtitle, result.description, result.badge]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}
