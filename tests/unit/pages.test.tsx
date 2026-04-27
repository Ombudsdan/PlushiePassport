import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";
import ForgotPasswordPage from "@/app/forgot-password/page";
import HomePage from "@/app/page";
import ProfilePage from "@/app/profile/page";
import LoginPage from "@/app/login/page";
import LogoutPage from "@/app/logout/page";
import SignUpPage from "@/app/signup/page";
import RootLayout, { metadata } from "@/app/layout";
import manifest from "@/app/manifest";
import { defaultAuthState, seedAccount, STORAGE_KEY } from "@/lib/auth-state";
import { renderWithProviders } from "../helpers/render";

function getRouterPushMock() {
  return (
    globalThis as unknown as { __routerMocks: { push: ReturnType<typeof vi.fn> } }
  ).__routerMocks.push;
}

describe("app pages", () => {
  it("renders the landing page and manifest metadata", () => {
    render(<HomePage />);
    expect(screen.getByText(/Next.js PWA starter/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create account" })).toHaveAttribute("href", "/signup");
    expect(manifest()).toMatchObject({
      short_name: "Plushie",
      display: "standalone",
    });
    expect(metadata.title).toBe("Plushie Passport");
  });

  it("renders the root layout wrapper", () => {
    const result = RootLayout({ children: <p>Child content</p> });
    expect(result.props.children.props.children.props.children).toEqual(<p>Child content</p>);
  });

  it("supports the login flow and error handling", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "sarah@example.com");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(getRouterPushMock()).toHaveBeenCalledWith("/dashboard");

    await user.clear(screen.getByLabelText("Password"));
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Incorrect email or password.")).toBeInTheDocument();
  });

  it("supports sign up, forgot password, and logout", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpPage />);

    await user.type(screen.getByLabelText("Display Name"), "Jamie Plush");
    await user.type(screen.getByLabelText("Username"), "jamie_plush");
    await user.type(screen.getByLabelText(/^Email$/), "jamie@example.com");
    await user.type(screen.getByLabelText(/^Password$/), "StrongPass123!");
    await user.type(screen.getByLabelText("Confirm Password"), "StrongPass123!");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(getRouterPushMock()).toHaveBeenCalledWith("/dashboard");

    cleanup();
    renderWithProviders(<SignUpPage />);
    await user.click(screen.getByRole("button", { name: "Create account" }));
    expect(screen.getByText("Complete every sign up field.")).toBeInTheDocument();

    cleanup();
    renderWithProviders(<ForgotPasswordPage />);
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "reset@example.com");
    await user.click(screen.getByRole("button", { name: "Send reset link" }));
    expect(screen.getByText(/reset@example.com/)).toBeInTheDocument();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...defaultAuthState, currentUserEmail: seedAccount.email }),
    );
    cleanup();
    renderWithProviders(<LogoutPage />, { ...defaultAuthState, currentUserEmail: seedAccount.email });
    await waitFor(() => {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
      expect(parsed.currentUserEmail).toBeNull();
    });
    expect(screen.getByText("You have been logged out")).toBeInTheDocument();
  });

  it("renders guest and authenticated application screens", async () => {
    renderWithProviders(<DashboardPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    const user = userEvent.setup();
    renderWithProviders(<ProfilePage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });

    await waitFor(() => expect(screen.getAllByText("Sarah Johnson").length).toBeGreaterThan(0));
    await user.clear(screen.getByLabelText("Display Name"));
    await user.type(screen.getByLabelText("Display Name"), "Sarah J.");
    await user.clear(screen.getByLabelText("Username"));
    await user.type(screen.getByLabelText("Username"), "sarah_j");
    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "sarahj@example.com");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    await user.click(screen.getByRole("button", { name: "Birthday reminders" }));
    await user.click(screen.getAllByRole("button", { name: "Disconnect" })[0]);
    await user.click(screen.getByRole("button", { name: "Add Account" }));

    expect(screen.getByText("Profile saved successfully.")).toBeInTheDocument();
    expect(screen.getAllByText("Connected").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sarah J.").length).toBeGreaterThan(0);

    renderWithProviders(<ProfilePage />);
    expect(screen.getAllByText("You're signed out").length).toBeGreaterThan(0);
  });
});
