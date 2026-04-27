import type { PlushieRecord, UserAccount } from "@/lib/auth-state";

export type NotificationFeedEntry = {
  id: string;
  category: string;
  title: string;
  body: string;
  timestamp: string;
  href: string;
  ctaLabel: string;
  unread: boolean;
};

function getNextBirthdayTimestamp(birthday: string, now: Date) {
  const date = new Date(`${birthday}T00:00:00`);
  const candidate = new Date(now.getFullYear(), date.getMonth(), date.getDate());
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (candidate < startOfToday) {
    candidate.setFullYear(candidate.getFullYear() + 1);
  }

  return candidate.getTime();
}

export function formatPassportDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function getUpcomingBirthdays(
  plushies: PlushieRecord[],
  limit = 3,
  now = new Date(),
) {
  return [...plushies]
    .sort((left, right) => getNextBirthdayTimestamp(left.birthday, now) - getNextBirthdayTimestamp(right.birthday, now))
    .slice(0, limit);
}

export function getFeaturedPlushies(plushies: PlushieRecord[], limit = 3) {
  return [...plushies]
    .sort((left, right) => right.passportStamps - left.passportStamps || right.adventures - left.adventures)
    .slice(0, limit);
}

export function buildNotificationFeed(
  user: UserAccount | null,
  now = new Date(),
): NotificationFeedEntry[] {
  if (!user) {
    return [];
  }

  const [nextBirthday] = getUpcomingBirthdays(user.plushies, 1, now);
  const [featuredPlushie] = getFeaturedPlushies(user.plushies, 1);
  const travellingPlushie = user.plushies.find((plushie) => plushie.status === "On an adventure") ?? featuredPlushie;
  const stampsEnabled = user.notifications.find((preference) => preference.id === "stamps")?.enabled ?? false;
  const digestEnabled = user.notifications.find((preference) => preference.id === "digest")?.enabled ?? false;
  const disconnectedAccount = user.connectedAccounts.find((account) => !account.connected);

  return [
    {
      id: "birthday-reminder",
      category: "Calendar",
      title: nextBirthday
        ? `${nextBirthday.name}'s birthday is coming up`
        : "Start tracking a plushie birthday",
      body: nextBirthday
        ? `Celebrate ${nextBirthday.name} on ${formatPassportDate(nextBirthday.birthday)} with a fresh passport stamp.`
        : "Add a plushie so your dashboard can surface the next celebration automatically.",
      timestamp: "Today",
      href: nextBirthday ? `/plushies/${nextBirthday.id}` : "/plushies/new",
      ctaLabel: nextBirthday ? "Open passport" : "Add plushie",
      unread: true,
    },
    {
      id: "adventure-update",
      category: "Adventures",
      title: travellingPlushie
        ? `${travellingPlushie.name} is ready for the next stop`
        : "Plan your first plushie adventure",
      body: travellingPlushie
        ? `${travellingPlushie.name} has ${travellingPlushie.passportStamps} stamps and ${travellingPlushie.adventures} adventures logged so far.`
        : "Once you add a plushie, this feed will highlight their latest adventures and milestones.",
      timestamp: "2h ago",
      href: travellingPlushie ? `/plushies/${travellingPlushie.id}` : "/plushies",
      ctaLabel: travellingPlushie ? "View details" : "Browse collection",
      unread: true,
    },
    {
      id: "stamp-alerts",
      category: "Notifications",
      title: stampsEnabled ? "Travel stamp alerts are switched on" : "Travel stamp alerts are switched off",
      body: stampsEnabled
        ? "You will be notified when adventure-ready plushies earn new location stamp updates."
        : "Turn on travel stamp activity alerts to keep up with new adventures from your collection.",
      timestamp: "Yesterday",
      href: "/notifications",
      ctaLabel: "Review inbox",
      unread: stampsEnabled,
    },
    {
      id: "digest-status",
      category: "Account",
      title: digestEnabled
        ? "Your weekly plushie digest is scheduled"
        : disconnectedAccount
          ? `Finish connecting ${disconnectedAccount.title}`
          : "Your account setup is looking cozy",
      body: digestEnabled
        ? `Your next digest will include ${user.stats.plushies} plushies, ${user.stats.birthdaysTracked} tracked birthdays, and new travel moments.`
        : disconnectedAccount
          ? `Connect ${disconnectedAccount.title} to make it easier to share passport highlights across your plushie circle.`
          : "Your profile, passport, and notification settings are all ready for the next plushie adventure.",
      timestamp: "This week",
      href: digestEnabled ? "/notifications" : "/profile",
      ctaLabel: digestEnabled ? "Open notifications" : "Manage account",
      unread: false,
    },
  ];
}
