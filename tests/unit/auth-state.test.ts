import {
  addPlushie,
  defaultAuthState,
  getCurrentUser,
  loadAuthState,
  loginUser,
  logoutUser,
  persistAuthState,
  seedAccount,
  signUpUser,
  toggleConnectedAccount,
  toggleNotificationPreference,
  updateProfile,
} from "@/lib/auth-state";
import { toErrorMessage } from "@/lib/errors";

describe("auth-state", () => {
  it("loads the default state when storage is unavailable or invalid", () => {
    expect(loadAuthState(null)).toEqual(defaultAuthState);
    expect(loadAuthState({ getItem: () => null })).toEqual(defaultAuthState);
    expect(loadAuthState({ getItem: () => "not-json" })).toEqual(defaultAuthState);
    expect(loadAuthState({ getItem: () => JSON.stringify({ accounts: [], currentUserEmail: "x" }) })).toEqual(defaultAuthState);
    expect(loadAuthState({ getItem: () => JSON.stringify({ currentUserEmail: null }) })).toEqual(defaultAuthState);
  });

  it("normalizes persisted accounts for legacy and complete records", () => {
    const loaded = loadAuthState({
      getItem: () =>
        JSON.stringify({
          accounts: [
            {
              displayName: "Legacy Collector",
              username: "@legacy",
              email: "legacy@example.com",
              password: "secret",
            },
            {
              username: "@mystery",
              email: "mystery@example.com",
              password: "secret",
            },
            {
              ...seedAccount,
              email: "full@example.com",
            },
            {
              displayName: "Missing Email",
            },
          ],
          currentUserEmail: "legacy@example.com",
        }),
    });

    expect(loaded.currentUserEmail).toBe("legacy@example.com");
    expect(loaded.accounts).toHaveLength(3);
    expect(loaded.accounts[0]).toMatchObject({
      displayName: "Legacy Collector",
      plan: "Free Plan",
      plushies: [],
    });
    expect(loaded.accounts[1]).toMatchObject({
      displayName: "Plushie Collector",
      username: "@mystery",
    });
    expect(loaded.accounts[2].notifications).toHaveLength(seedAccount.notifications.length);
    expect(loaded.accounts[2].connectedAccounts).toHaveLength(seedAccount.connectedAccounts.length);
    expect(loaded.accounts[2].plushies[0].name).toBe(seedAccount.plushies[0].name);
  });

  it("persists and returns the current user", () => {
    const setItem = vi.fn();
    persistAuthState({ setItem }, defaultAuthState);
    expect(setItem).toHaveBeenCalled();

    const signedInState = { ...defaultAuthState, currentUserEmail: seedAccount.email };
    expect(getCurrentUser(signedInState)?.email).toBe(seedAccount.email);
    expect(getCurrentUser(defaultAuthState)).toBeNull();
  });

  it("signs up a new user and normalizes their details", () => {
    const nextState = signUpUser(defaultAuthState, {
      displayName: "  Jamie Plush  ",
      username: "jamie_plush",
      email: "JAMIE@example.com ",
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    });

    expect(nextState.currentUserEmail).toBe("jamie@example.com");
    expect(nextState.accounts.at(-1)).toMatchObject({
      displayName: "Jamie Plush",
      username: "@jamie_plush",
      email: "jamie@example.com",
      stats: { plushies: 0, friends: 0, birthdaysTracked: 0 },
      plushies: [],
    });
  });

  it("rejects invalid sign-up attempts", () => {
    expect(() =>
      signUpUser(defaultAuthState, {
        displayName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }),
    ).toThrow("Complete every sign up field.");

    expect(() =>
      signUpUser(defaultAuthState, {
        displayName: "Test",
        username: "test",
        email: "test@example.com",
        password: "one",
        confirmPassword: "two",
      }),
    ).toThrow("Passwords must match.");

    expect(() =>
      signUpUser(defaultAuthState, {
        displayName: "Sarah",
        username: "new-user",
        email: seedAccount.email,
        password: "Password123!",
        confirmPassword: "Password123!",
      }),
    ).toThrow("An account already exists for that email.");

    expect(() =>
      signUpUser(defaultAuthState, {
        displayName: "Sarah",
        username: seedAccount.username,
        email: "other@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      }),
    ).toThrow("That username is already taken.");
  });

  it("logs in and logs out existing users", () => {
    const loggedIn = loginUser(defaultAuthState, {
      email: "SARAH@example.com",
      password: "Password123!",
    });
    expect(loggedIn.currentUserEmail).toBe(seedAccount.email);
    expect(() => loginUser(defaultAuthState, { email: "missing@example.com", password: "x" })).toThrow(
      "Incorrect email or password.",
    );
    expect(logoutUser(loggedIn).currentUserEmail).toBeNull();
  });

  it("updates the current profile and prevents duplicates", () => {
    const signedInState = { ...defaultAuthState, currentUserEmail: seedAccount.email };
    const withSecondUser = signUpUser(defaultAuthState, {
      displayName: "Jamie",
      username: "jamie",
      email: "jamie@example.com",
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    });

    const updated = updateProfile(signedInState, {
      displayName: "Sarah J.",
      username: "sarah_j",
      email: "sarahj@example.com",
    });
    expect(updated.currentUserEmail).toBe("sarahj@example.com");
    expect(updated.accounts[0]).toMatchObject({
      displayName: "Sarah J.",
      username: "@sarah_j",
      email: "sarahj@example.com",
    });

    expect(() => updateProfile(defaultAuthState, updated.accounts[0])).toThrow(
      "You must be signed in to update your profile.",
    );

    const jamieSignedIn = { ...withSecondUser, currentUserEmail: seedAccount.email };
    expect(() =>
      updateProfile(jamieSignedIn, {
        displayName: "Sarah",
        username: "jamie",
        email: seedAccount.email,
      }),
    ).toThrow("That username is already in use.");
    expect(() =>
      updateProfile(jamieSignedIn, {
        displayName: "Sarah",
        username: "sarah_unique",
        email: "jamie@example.com",
      }),
    ).toThrow("That email is already in use.");

    const updatedWithMultipleAccounts = updateProfile(jamieSignedIn, {
      displayName: "Sarah Updated",
      username: "sarah_updated",
      email: "sarahupdated@example.com",
    });
    expect(updatedWithMultipleAccounts.accounts[1].email).toBe("jamie@example.com");
  });

  it("adds plushies and keeps other accounts untouched", () => {
    const withSecondUser = signUpUser(defaultAuthState, {
      displayName: "Jamie",
      username: "jamie",
      email: "jamie@example.com",
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    });
    const signedInState = { ...withSecondUser, currentUserEmail: seedAccount.email };

    const updated = addPlushie(signedInState, {
      name: "Comet",
      species: "Dragon",
      tagline: "Loves ferry rides and sparkly postcards.",
      hometown: "Boston, MA",
      birthday: "2024-01-01",
      adoptionDate: "2024-02-01",
      size: "Small",
      status: "Ready for the next stamp",
      favoriteSnack: "Blueberry gummies",
      favoriteActivity: "Window-seat naps",
      color: "Sky Blue",
      accessories: "Tiny satchel, Scarf",
    });

    expect(updated.accounts[0].plushies[0]).toMatchObject({
      id: "comet-9",
      name: "Comet",
      accessories: ["Tiny satchel", "Scarf"],
      passportStamps: 0,
      adventures: 0,
    });
    expect(updated.accounts[0].stats.plushies).toBe(seedAccount.plushies.length + 1);
    expect(updated.accounts[1].plushies).toHaveLength(0);

    expect(() =>
      addPlushie(defaultAuthState, {
        name: "Comet",
        species: "Dragon",
        tagline: "Loves ferry rides and sparkly postcards.",
        hometown: "Boston, MA",
        birthday: "2024-01-01",
        adoptionDate: "2024-02-01",
        size: "Small",
        status: "Ready for the next stamp",
        favoriteSnack: "Blueberry gummies",
        favoriteActivity: "Window-seat naps",
        color: "Sky Blue",
        accessories: "Tiny satchel, Scarf",
      }),
    ).toThrow(
      "You must be signed in to add a plushie.",
    );
    expect(() =>
      addPlushie(signedInState, {
        name: "",
        species: "",
        tagline: "",
        hometown: "",
        birthday: "",
        adoptionDate: "",
        size: "Tiny",
        status: "At home",
        favoriteSnack: "",
        favoriteActivity: "",
        color: "",
        accessories: "",
      }),
    ).toThrow("Complete every plushie detail.");
  });

  it("updates notification and connected-account settings", () => {
    const withSecondUser = signUpUser(defaultAuthState, {
      displayName: "Jamie",
      username: "jamie",
      email: "jamie@example.com",
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    });
    const signedInState = { ...withSecondUser, currentUserEmail: seedAccount.email };
    const notifications = toggleNotificationPreference(signedInState, "birthday");
    expect(notifications.accounts[0].notifications[0].enabled).toBe(false);
    expect(notifications.accounts[1].notifications[0].enabled).toBe(true);

    const accounts = toggleConnectedAccount(signedInState, "apple");
    expect(accounts.accounts[0].connectedAccounts[2]).toMatchObject({
      connected: true,
      handle: "sarah_j_plushies@icloud.com",
    });
    expect(accounts.accounts[1].connectedAccounts[2].connected).toBe(false);

    expect(() => toggleNotificationPreference(defaultAuthState, "birthday")).toThrow(
      "You must be signed in to update notifications.",
    );
    expect(() => toggleConnectedAccount(defaultAuthState, "apple")).toThrow(
      "You must be signed in to manage connected accounts.",
    );
  });

  it("formats unknown errors with a fallback message", () => {
    expect(toErrorMessage(new Error("Known problem"), "Fallback")).toBe("Known problem");
    expect(toErrorMessage("unknown", "Fallback")).toBe("Fallback");
  });
});
