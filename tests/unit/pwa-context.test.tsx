import { render, screen, waitFor } from "@testing-library/react";
import { useAuth } from "@/contexts/AuthContext";
import { getInstallSupport, getNotificationSupport } from "@/lib/pwa";
import DashboardPage from "@/app/dashboard/page";
import { renderWithProviders } from "../helpers/render";
import { defaultAuthState, seedAccount, STORAGE_KEY } from "@/lib/auth-state";

function HookConsumer() {
  const auth = useAuth();
  return <p>{auth.isAuthenticated ? "authenticated" : "guest"}</p>;
}

describe("pwa helpers and auth context", () => {
  it("covers install support states", () => {
    const originalWindow = globalThis.window;
    vi.stubGlobal("window", undefined);
    expect(getInstallSupport()).toBe("Check install support from a browser.");
    vi.stubGlobal("window", originalWindow);

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    expect(getInstallSupport()).toContain("Add to Home Screen");

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    expect(getInstallSupport()).toBe("Installed on this device.");
  });

  it("covers notification support states", () => {
    const originalWindow = globalThis.window;
    vi.stubGlobal("window", undefined);
    expect(getNotificationSupport()).toBe("Browser notifications are not available in this environment.");
    vi.stubGlobal("window", originalWindow);

    Object.defineProperty(window, "Notification", {
      configurable: true,
      value: { permission: "granted" },
    });
    expect(getNotificationSupport()).toBe("Browser notifications are enabled.");

    Object.defineProperty(window, "Notification", {
      configurable: true,
      value: { permission: "denied" },
    });
    expect(getNotificationSupport()).toBe("Browser notifications are blocked for this browser.");

    Object.defineProperty(window, "Notification", {
      configurable: true,
      value: { permission: "default" },
    });
    expect(getNotificationSupport()).toContain("ready to be enabled");
  });

  it("throws when useAuth is used outside a provider", () => {
    expect(() => render(<HookConsumer />)).toThrow("useAuth must be used within AuthProvider.");
  });

  it("hydrates auth state and registers the service worker when available", async () => {
    const register = vi.fn().mockResolvedValue({});
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register },
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...defaultAuthState, currentUserEmail: seedAccount.email }),
    );
    renderWithProviders(<HookConsumer />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });

    await waitFor(() => expect(screen.getByText("authenticated")).toBeInTheDocument());
    expect(register).toHaveBeenCalledWith("/sw.js");
  });

  it("renders the dashboard when service worker support is absent", async () => {
    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
    Object.defineProperty(window, "Notification", {
      configurable: true,
      value: { permission: "default" },
    });

    renderWithProviders(<DashboardPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });

    await waitFor(() => expect(screen.getByText(/Welcome back, Sarah Johnson/)).toBeInTheDocument());
    expect(screen.getByText(/manifest, service worker/)).toBeInTheDocument();
  });
});
