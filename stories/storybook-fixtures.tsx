import type { ReactNode } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import {
  STORAGE_KEY,
  defaultAuthState,
  seedAccount,
  type AddPlushieInput,
  type AuthState,
} from "@/lib/auth-state";
import { getBirthdayEntries, getFriendCounts, searchCommunity } from "@/lib/community-insights";
import { buildNotificationFeed } from "@/lib/plushie-insights";

const signedInState: AuthState = {
  accounts: [seedAccount],
  currentUserEmail: seedAccount.email,
};

function ensureServiceWorkerMock() {
  if (!("serviceWorker" in navigator)) {
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: { register: async () => undefined },
    });
  }
}

function seedStoryAuthState(state: AuthState) {
  if (typeof window !== "undefined") {
    ensureServiceWorkerMock();
    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function StorySurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-[240px] rounded-[32px] bg-[#f7f4ef] p-6 ${className}`}>{children}</div>;
}

export const withAuthenticatedApp = (Story: () => ReactNode) => {
  seedStoryAuthState(signedInState);

  return (
    <AppProviders>
      <Story />
    </AppProviders>
  );
};

export const withSignedOutApp = (Story: () => ReactNode) => {
  seedStoryAuthState(defaultAuthState);

  return (
    <AppProviders>
      <Story />
    </AppProviders>
  );
};

export const sampleUser = seedAccount;
export const samplePlushie = seedAccount.plushies[0];
export const secondaryPlushie = seedAccount.plushies[1];
export const sampleNotifications = buildNotificationFeed(seedAccount);
export const sampleBirthdayEntries = getBirthdayEntries(seedAccount.plushies, new Date("2026-04-01T10:00:00Z"));
export const sampleFriendCounts = getFriendCounts(seedAccount.friends);
export const sampleSearchResults = searchCommunity(seedAccount, "", "all", new Date("2026-04-01T10:00:00Z")).slice(0, 4);
export const emptyPlushieDraft: AddPlushieInput = {
  name: "Comet",
  species: "Dragon",
  tagline: "Sparkly flyer with a stamp book to match.",
  hometown: "Boston, MA",
  birthday: "2024-01-01",
  adoptionDate: "2024-02-01",
  size: "Small",
  status: "On an adventure",
  favoriteSnack: "Blueberry gummies",
  favoriteActivity: "Cloud watching",
  color: "Sky Blue",
  accessories: "Scarf, Satchel",
};
