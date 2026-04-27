import { cleanup, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";
import NotificationsPage from "@/app/notifications/page";
import PlushiePassportPage from "@/app/plushies/[id]/page";
import { defaultAuthState, seedAccount, signUpUser } from "@/lib/auth-state";
import {
  buildNotificationFeed,
  formatPassportDate,
  getFeaturedPlushies,
  getUpcomingBirthdays,
} from "@/lib/plushie-insights";
import { renderWithProviders } from "../helpers/render";

function getRouterMocks() {
  return globalThis as unknown as {
    __routerMocks: { params: { id: string } };
  };
}

describe("dashboard, notifications, and passport flows", () => {
  it("formats plushie insights and covers helper branches", () => {
    expect(formatPassportDate("2026-04-01")).toContain("2026");

    const ordered = getUpcomingBirthdays(
      [
        { ...seedAccount.plushies[0], id: "later", birthday: "2020-01-10" },
        { ...seedAccount.plushies[1], id: "sooner", birthday: "2020-01-02" },
      ],
      2,
      new Date("2026-01-05T12:00:00"),
    );
    expect(ordered.map((item) => item.id)).toEqual(["later", "sooner"]);

    const featured = getFeaturedPlushies(
      [
        { ...seedAccount.plushies[0], id: "first", passportStamps: 1, adventures: 4 },
        { ...seedAccount.plushies[1], id: "second", passportStamps: 7, adventures: 1 },
        { ...seedAccount.plushies[2], id: "third", passportStamps: 7, adventures: 5 },
      ],
      2,
    );
    expect(featured.map((item) => item.id)).toEqual(["third", "second"]);

    expect(buildNotificationFeed(null)).toEqual([]);
    expect(buildNotificationFeed(seedAccount)[2].title).toBe("Travel stamp alerts are switched off");
    expect(buildNotificationFeed(seedAccount)[3].title).toBe("Your weekly plushie digest is scheduled");

    const cozyUser = signUpUser(defaultAuthState, {
      displayName: "Jamie",
      username: "jamie",
      email: "jamie@example.com",
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    }).accounts[1];
    const cozyNotifications = buildNotificationFeed(
      {
        ...cozyUser,
        notifications: cozyUser.notifications.map((item) =>
          item.id === "digest" || item.id === "stamps" ? { ...item, enabled: false } : item,
        ),
        connectedAccounts: cozyUser.connectedAccounts.map((item) => ({ ...item, connected: true })),
      },
      new Date("2026-02-10T10:00:00"),
    );

    expect(cozyNotifications[0].title).toBe("Start tracking a plushie birthday");
    expect(cozyNotifications[1].title).toBe("Plan your first plushie adventure");
    expect(cozyNotifications[3].title).toBe("Your account setup is looking cozy");

    const missingPreferenceNotifications = buildNotificationFeed({
      ...cozyUser,
      notifications: [],
      connectedAccounts: [],
    });
    expect(missingPreferenceNotifications[2].title).toBe("Travel stamp alerts are switched off");
    expect(missingPreferenceNotifications[3].title).toBe("Your account setup is looking cozy");

    const connectedReminderNotifications = buildNotificationFeed({
      ...cozyUser,
      notifications: cozyUser.notifications.map((item) =>
        item.id === "stamps"
          ? { ...item, enabled: true }
          : item.id === "digest"
            ? { ...item, enabled: false }
            : item,
      ),
    });
    expect(connectedReminderNotifications[2].title).toBe("Travel stamp alerts are switched on");
    expect(connectedReminderNotifications[2].body).toContain("adventure-ready plushies");
    expect(connectedReminderNotifications[3].title).toBe("Finish connecting Apple");
    expect(connectedReminderNotifications[3].body).toContain("Connect Apple");
  });

  it("supports notification page interactions and dashboard rendering", async () => {
    const user = userEvent.setup();

    renderWithProviders(<NotificationsPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<NotificationsPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Notification inbox")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Unread only" }));
    await user.click(screen.getByRole("button", { name: "Mark all as read" }));
    expect(screen.getByText("All caught up")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "All updates" }));
    expect(screen.getByText("Your weekly plushie digest is scheduled")).toBeInTheDocument();

    cleanup();
    renderWithProviders(<DashboardPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Collection highlights")).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Open notifications" })).toHaveAttribute("href", "/notifications");
    expect(screen.getByText("Circle snapshot")).toBeInTheDocument();

    cleanup();
    renderWithProviders(<DashboardPage />, {
      accounts: [
        {
          ...seedAccount,
          plushies: [],
          stats: { ...seedAccount.stats, plushies: 0 },
        },
      ],
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("My Plushie Collection")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Add New Plushie" })).toBeInTheDocument();
  });

  it("renders plushie passport pages for found and missing plushies", async () => {
    getRouterMocks().__routerMocks.params.id = seedAccount.plushies[0].id;
    renderWithProviders(<PlushiePassportPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    getRouterMocks().__routerMocks.params.id = seedAccount.plushies[0].id;
    renderWithProviders(<PlushiePassportPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Plushie passport")).toBeInTheDocument());
    expect(screen.getByText(seedAccount.plushies[0].favoriteSnack)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to collection" })).toHaveAttribute("href", "/plushies");

    cleanup();
    getRouterMocks().__routerMocks.params.id = seedAccount.plushies[3].id;
    renderWithProviders(<PlushiePassportPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() =>
      expect(screen.getAllByText(seedAccount.plushies[3].name).length).toBeGreaterThan(0),
    );

    cleanup();
    getRouterMocks().__routerMocks.params.id = "missing-passport";
    renderWithProviders(<PlushiePassportPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Passport not found")).toBeInTheDocument());
  });
});
