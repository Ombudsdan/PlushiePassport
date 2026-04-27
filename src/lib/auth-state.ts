export type NotificationPreference = {
  id: "birthday" | "friend" | "stamps" | "digest";
  title: string;
  description: string;
  enabled: boolean;
};

export type ConnectedAccount = {
  id: "instagram" | "google" | "apple";
  title: string;
  handle: string;
  connected: boolean;
};

export type UserStats = {
  plushies: number;
  friends: number;
  birthdaysTracked: number;
};

export type UserAccount = {
  displayName: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  location: string;
  plan: string;
  stats: UserStats;
  notifications: NotificationPreference[];
  connectedAccounts: ConnectedAccount[];
};

export type AuthState = {
  accounts: UserAccount[];
  currentUserEmail: string | null;
};

export type SignUpInput = {
  displayName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ProfileUpdate = Pick<UserAccount, "displayName" | "username" | "email">;

export const STORAGE_KEY = "plushie-passport-auth";

export const seedAccount: UserAccount = {
  displayName: "Sarah Johnson",
  username: "@sarah_j_plushies",
  email: "sarah@example.com",
  password: "Password123!",
  bio: "Plushie collector & lover 🧸",
  location: "Based in San Francisco, CA",
  plan: "Free Plan",
  stats: {
    plushies: 8,
    friends: 12,
    birthdaysTracked: 15,
  },
  notifications: [
    {
      id: "birthday",
      title: "Birthday reminders",
      description: "Get notified when a plushie's birthday is coming up",
      enabled: true,
    },
    {
      id: "friend",
      title: "Friend request alerts",
      description: "Be the first to know when someone wants to connect",
      enabled: true,
    },
    {
      id: "stamps",
      title: "New location stamp activity",
      description: "Updates when friends add new travel stamps",
      enabled: false,
    },
    {
      id: "digest",
      title: "Weekly digest email",
      description: "A weekly recap of your plushie community",
      enabled: true,
    },
  ],
  connectedAccounts: [
    {
      id: "instagram",
      title: "Instagram",
      handle: "@sarah_plushies",
      connected: true,
    },
    {
      id: "google",
      title: "Google",
      handle: "sarah@example.com",
      connected: true,
    },
    {
      id: "apple",
      title: "Apple",
      handle: "Available to connect",
      connected: false,
    },
  ],
};

export const defaultAuthState: AuthState = {
  accounts: [seedAccount],
  currentUserEmail: null,
};

export function loadAuthState(storage: Pick<Storage, "getItem"> | null | undefined): AuthState {
  if (!storage) {
    return defaultAuthState;
  }

  const rawState = storage.getItem(STORAGE_KEY);
  if (!rawState) {
    return defaultAuthState;
  }

  try {
    const parsed = JSON.parse(rawState) as AuthState;
    const hasAccounts = Boolean(parsed.accounts?.length);
    return {
      accounts: hasAccounts ? parsed.accounts : defaultAuthState.accounts,
      currentUserEmail: hasAccounts ? parsed.currentUserEmail ?? null : null,
    };
  } catch {
    return defaultAuthState;
  }
}

export function persistAuthState(
  storage: Pick<Storage, "setItem"> | null | undefined,
  state: AuthState,
) {
  storage?.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getCurrentUser(state: AuthState): UserAccount | null {
  return state.accounts.find((account) => account.email === state.currentUserEmail) ?? null;
}

export function signUpUser(state: AuthState, input: SignUpInput): AuthState {
  const displayName = input.displayName.trim();
  const username = input.username.trim().replace(/^@?/, "@");
  const email = input.email.trim().toLowerCase();

  if (!displayName || !username || !email || !input.password || !input.confirmPassword) {
    throw new Error("Complete every sign up field.");
  }

  if (input.password !== input.confirmPassword) {
    throw new Error("Passwords must match.");
  }

  if (state.accounts.some((account) => account.email.toLowerCase() === email)) {
    throw new Error("An account already exists for that email.");
  }

  if (state.accounts.some((account) => account.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("That username is already taken.");
  }

  const newAccount: UserAccount = {
    displayName,
    username,
    email,
    password: input.password,
    bio: "New plushie passport collector",
    location: "Add your location",
    plan: "Free Plan",
    stats: {
      plushies: 0,
      friends: 0,
      birthdaysTracked: 0,
    },
    notifications: seedAccount.notifications,
    connectedAccounts: seedAccount.connectedAccounts,
  };

  return {
    accounts: [...state.accounts, newAccount],
    currentUserEmail: email,
  };
}

export function loginUser(state: AuthState, input: LoginInput): AuthState {
  const email = input.email.trim().toLowerCase();
  const account = state.accounts.find((entry) => entry.email.toLowerCase() === email);

  if (!account || account.password !== input.password) {
    throw new Error("Incorrect email or password.");
  }

  return {
    ...state,
    currentUserEmail: account.email,
  };
}

export function logoutUser(state: AuthState): AuthState {
  return {
    ...state,
    currentUserEmail: null,
  };
}

export function updateProfile(state: AuthState, update: ProfileUpdate): AuthState {
  const currentUser = getCurrentUser(state);
  if (!currentUser) {
    throw new Error("You must be signed in to update your profile.");
  }

  const nextEmail = update.email.trim().toLowerCase();
  const nextUsername = update.username.trim().replace(/^@?/, "@");

  if (
    state.accounts.some(
      (account) =>
        account.email.toLowerCase() === nextEmail && account.email !== currentUser.email,
    )
  ) {
    throw new Error("That email is already in use.");
  }

  if (
    state.accounts.some(
      (account) =>
        account.username.toLowerCase() === nextUsername.toLowerCase() &&
        account.email !== currentUser.email,
    )
  ) {
    throw new Error("That username is already in use.");
  }

  const updatedAccount = {
    ...currentUser,
    displayName: update.displayName.trim(),
    username: nextUsername,
    email: nextEmail,
  };

  return {
    accounts: state.accounts.map((account) =>
      account.email === currentUser.email ? updatedAccount : account,
    ),
    currentUserEmail: nextEmail,
  };
}

export function toggleNotificationPreference(
  state: AuthState,
  preferenceId: NotificationPreference["id"],
): AuthState {
  const currentUser = getCurrentUser(state);
  if (!currentUser) {
    throw new Error("You must be signed in to update notifications.");
  }

  return {
    ...state,
    accounts: state.accounts.map((account) =>
      account.email === currentUser.email
        ? {
            ...account,
            notifications: account.notifications.map((preference) =>
              preference.id === preferenceId
                ? { ...preference, enabled: !preference.enabled }
                : preference,
            ),
          }
        : account,
    ),
  };
}

export function toggleConnectedAccount(
  state: AuthState,
  accountId: ConnectedAccount["id"],
): AuthState {
  const currentUser = getCurrentUser(state);
  if (!currentUser) {
    throw new Error("You must be signed in to manage connected accounts.");
  }

  return {
    ...state,
    accounts: state.accounts.map((account) =>
      account.email === currentUser.email
        ? {
            ...account,
            connectedAccounts: account.connectedAccounts.map((entry) =>
              entry.id === accountId
                ? {
                    ...entry,
                    connected: !entry.connected,
                    handle: !entry.connected
                      ? `${currentUser.username.replace(/^@/, "")}@icloud.com`
                      : "Available to connect",
                  }
                : entry,
            ),
          }
        : account,
    ),
  };
}
