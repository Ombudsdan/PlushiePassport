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

export type PlushieSize = "Tiny" | "Small" | "Medium" | "Large";

export type PlushieStatus = "At home" | "On an adventure" | "Ready for the next stamp";

export type PlushieRecord = {
  id: string;
  name: string;
  species: string;
  tagline: string;
  hometown: string;
  birthday: string;
  adoptionDate: string;
  size: PlushieSize;
  status: PlushieStatus;
  passportStamps: number;
  adventures: number;
  favoriteSnack: string;
  favoriteActivity: string;
  color: string;
  accessories: string[];
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
  plushies: PlushieRecord[];
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

export type AddPlushieInput = {
  name: string;
  species: string;
  tagline: string;
  hometown: string;
  birthday: string;
  adoptionDate: string;
  size: PlushieSize;
  status: PlushieStatus;
  favoriteSnack: string;
  favoriteActivity: string;
  color: string;
  accessories: string;
};

export const STORAGE_KEY = "plushie-passport-auth";

const baseNotifications: NotificationPreference[] = [
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
];

const baseConnectedAccounts: ConnectedAccount[] = [
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
];

const basePlushies: PlushieRecord[] = [
  {
    id: "mochi-bear-1",
    name: "Mochi",
    species: "Polar Bear",
    tagline: "Snowy explorer with a passport full of cozy cafe stops.",
    hometown: "San Francisco, CA",
    birthday: "2019-12-05",
    adoptionDate: "2021-02-14",
    size: "Medium",
    status: "On an adventure",
    passportStamps: 12,
    adventures: 5,
    favoriteSnack: "Strawberry mochi",
    favoriteActivity: "Collecting station stamps",
    color: "Cloud White",
    accessories: ["Mini scarf", "Travel pouch"],
  },
  {
    id: "pippin-bunny-2",
    name: "Pippin",
    species: "Bunny",
    tagline: "Keeps every train ticket and birthday reminder organized.",
    hometown: "Portland, OR",
    birthday: "2020-04-12",
    adoptionDate: "2021-04-03",
    size: "Small",
    status: "At home",
    passportStamps: 8,
    adventures: 3,
    favoriteSnack: "Carrot cake bites",
    favoriteActivity: "Planning plushie meetups",
    color: "Blush Pink",
    accessories: ["Bow tie", "Passport sleeve"],
  },
  {
    id: "maple-fox-3",
    name: "Maple",
    species: "Fox",
    tagline: "Always scouting the next scenic route for the group.",
    hometown: "Vancouver, BC",
    birthday: "2018-10-22",
    adoptionDate: "2020-07-11",
    size: "Medium",
    status: "Ready for the next stamp",
    passportStamps: 14,
    adventures: 6,
    favoriteSnack: "Maple cookies",
    favoriteActivity: "Trail journaling",
    color: "Cinnamon Red",
    accessories: ["Adventure journal"],
  },
  {
    id: "tulip-lamb-4",
    name: "Tulip",
    species: "Lamb",
    tagline: "Soft-hearted birthday captain for the whole plushie crew.",
    hometown: "Seattle, WA",
    birthday: "2021-03-18",
    adoptionDate: "2022-05-06",
    size: "Small",
    status: "At home",
    passportStamps: 5,
    adventures: 2,
    favoriteSnack: "Vanilla macarons",
    favoriteActivity: "Tea room visits",
    color: "Butter Cream",
    accessories: ["Floral clip"],
  },
  {
    id: "atlas-dino-5",
    name: "Atlas",
    species: "Dinosaur",
    tagline: "Carries maps, snacks, and everyone else's tiny souvenirs.",
    hometown: "Austin, TX",
    birthday: "2017-08-01",
    adoptionDate: "2019-09-09",
    size: "Large",
    status: "On an adventure",
    passportStamps: 20,
    adventures: 9,
    favoriteSnack: "Gummy stars",
    favoriteActivity: "Road-trip playlists",
    color: "Forest Green",
    accessories: ["Mini backpack", "Compass charm"],
  },
  {
    id: "luna-cat-6",
    name: "Luna",
    species: "Cat",
    tagline: "Night-market collector of stamps, charms, and stories.",
    hometown: "Los Angeles, CA",
    birthday: "2019-06-27",
    adoptionDate: "2020-11-12",
    size: "Medium",
    status: "Ready for the next stamp",
    passportStamps: 9,
    adventures: 4,
    favoriteSnack: "Boba jelly cups",
    favoriteActivity: "Photo booth keepsakes",
    color: "Midnight Navy",
    accessories: ["Moon pin"],
  },
  {
    id: "cocoa-pup-7",
    name: "Cocoa",
    species: "Puppy",
    tagline: "Friendly greeter of every new plushie passport holder.",
    hometown: "Chicago, IL",
    birthday: "2022-01-09",
    adoptionDate: "2022-12-01",
    size: "Small",
    status: "At home",
    passportStamps: 4,
    adventures: 1,
    favoriteSnack: "Pretzel bites",
    favoriteActivity: "Park picnics",
    color: "Warm Brown",
    accessories: ["Lucky bandana"],
  },
  {
    id: "sol-penguin-8",
    name: "Sol",
    species: "Penguin",
    tagline: "Postcard-loving globe trotter with perfect packing lists.",
    hometown: "New York, NY",
    birthday: "2018-02-16",
    adoptionDate: "2020-01-26",
    size: "Medium",
    status: "On an adventure",
    passportStamps: 11,
    adventures: 5,
    favoriteSnack: "Lemon shortbread",
    favoriteActivity: "Souvenir shopping",
    color: "Ink Black",
    accessories: ["Camera strap", "Sticker sheet"],
  },
];

function cloneNotificationPreferences(
  preferences: NotificationPreference[] = baseNotifications,
): NotificationPreference[] {
  return preferences.map((preference) => ({ ...preference }));
}

function cloneConnectedAccounts(accounts: ConnectedAccount[] = baseConnectedAccounts): ConnectedAccount[] {
  return accounts.map((account) => ({ ...account }));
}

function clonePlushies(plushies: PlushieRecord[] = basePlushies): PlushieRecord[] {
  return plushies.map((plushie) => ({ ...plushie, accessories: [...plushie.accessories] }));
}

function normalizeAccount(account: Partial<UserAccount>): UserAccount {
  const plushies = clonePlushies(account.plushies ?? []);

  return {
    displayName: account.displayName ?? "Plushie Collector",
    username: account.username ?? "@plushie_collector",
    email: account.email ?? "",
    password: account.password ?? "",
    bio: account.bio ?? "New plushie passport collector",
    location: account.location ?? "Add your location",
    plan: account.plan ?? "Free Plan",
    stats: {
      plushies: account.stats?.plushies ?? plushies.length,
      friends: account.stats?.friends ?? 0,
      birthdaysTracked: account.stats?.birthdaysTracked ?? 0,
    },
    notifications: account.notifications?.length
      ? cloneNotificationPreferences(account.notifications)
      : cloneNotificationPreferences(),
    connectedAccounts: account.connectedAccounts?.length
      ? cloneConnectedAccounts(account.connectedAccounts)
      : cloneConnectedAccounts(),
    plushies,
  };
}

function createPlushieId(name: string, count: number) {
  return `${name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${count + 1}`;
}

function normalizeAccessories(accessories: string) {
  return accessories
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const seedAccount: UserAccount = {
  displayName: "Sarah Johnson",
  username: "@sarah_j_plushies",
  email: "sarah@example.com",
  password: "Password123!",
  bio: "Plushie collector & lover 🧸",
  location: "Based in San Francisco, CA",
  plan: "Free Plan",
  stats: {
    plushies: basePlushies.length,
    friends: 12,
    birthdaysTracked: 15,
  },
  notifications: cloneNotificationPreferences(),
  connectedAccounts: cloneConnectedAccounts(),
  plushies: clonePlushies(),
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
    const accounts = (parsed.accounts ?? [])
      .map((account) => normalizeAccount(account))
      .filter((account) => Boolean(account.email));
    const hasAccounts = Boolean(accounts.length);

    return {
      accounts: hasAccounts ? accounts : defaultAuthState.accounts,
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
    notifications: cloneNotificationPreferences(),
    connectedAccounts: cloneConnectedAccounts(),
    plushies: [],
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

export function addPlushie(state: AuthState, input: AddPlushieInput): AuthState {
  const currentUser = getCurrentUser(state);
  if (!currentUser) {
    throw new Error("You must be signed in to add a plushie.");
  }

  const values = [
    input.name,
    input.species,
    input.tagline,
    input.hometown,
    input.birthday,
    input.adoptionDate,
    input.favoriteSnack,
    input.favoriteActivity,
    input.color,
  ].map((value) => value.trim());

  if (values.some((value) => !value) || !input.size || !input.status) {
    throw new Error("Complete every plushie detail.");
  }

  const plushie: PlushieRecord = {
    id: createPlushieId(input.name, currentUser.plushies.length),
    name: input.name.trim(),
    species: input.species.trim(),
    tagline: input.tagline.trim(),
    hometown: input.hometown.trim(),
    birthday: input.birthday,
    adoptionDate: input.adoptionDate,
    size: input.size,
    status: input.status,
    passportStamps: 0,
    adventures: 0,
    favoriteSnack: input.favoriteSnack.trim(),
    favoriteActivity: input.favoriteActivity.trim(),
    color: input.color.trim(),
    accessories: normalizeAccessories(input.accessories),
  };

  return {
    ...state,
    accounts: state.accounts.map((account) =>
      account.email === currentUser.email
        ? {
            ...account,
            plushies: [plushie, ...account.plushies],
            stats: {
              ...account.stats,
              plushies: account.plushies.length + 1,
            },
          }
        : account,
    ),
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
