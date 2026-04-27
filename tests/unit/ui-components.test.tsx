import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Pill } from "@/components/atoms/Pill";
import { TextInput } from "@/components/atoms/TextInput";
import { Toggle } from "@/components/atoms/Toggle";
import { ConnectedAccountRow } from "@/components/molecules/ConnectedAccountRow";
import { FieldGroup } from "@/components/molecules/FieldGroup";
import { NotificationRow } from "@/components/molecules/NotificationRow";
import { SidebarLink } from "@/components/molecules/SidebarLink";
import { AccountSettingsPanel } from "@/components/organisms/AccountSettingsPanel";
import { AppSidebar } from "@/components/organisms/AppSidebar";
import { AuthCard } from "@/components/organisms/AuthCard";
import { ConnectedAccountsPanel } from "@/components/organisms/ConnectedAccountsPanel";
import { NotificationSettingsPanel } from "@/components/organisms/NotificationSettingsPanel";
import { ProfileSummaryCard } from "@/components/organisms/ProfileSummaryCard";
import { AppShell } from "@/components/templates/AppShell";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { defaultAuthState, seedAccount } from "@/lib/auth-state";
import { renderWithProviders } from "../helpers/render";

describe("component rendering", () => {
  it("renders atomic controls and interactive molecules", async () => {
    const user = userEvent.setup();
    const toggleSpy = vi.fn();
    const accountSpy = vi.fn();

    render(
      <div>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <TextInput placeholder="Type here" />
        <Toggle checked={false} onChange={toggleSpy} label="Example toggle" />
        <Avatar initials="PP" />
        <Avatar initials="PP" size="sm" />
        <Pill>Neutral</Pill>
        <Pill tone="success">Success</Pill>
        <FieldGroup label="Field label" hint="Helpful hint" defaultValue="value" />
        <SidebarLink href="/profile" label="Profile" active />
        <NotificationRow preference={seedAccount.notifications[0]} onToggle={toggleSpy} />
        <ConnectedAccountRow account={seedAccount.connectedAccounts[2]} onToggle={accountSpy} />
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Example toggle" }));
    await user.click(screen.getByRole("button", { name: /Disconnect|Connect/ }));

    expect(toggleSpy).toHaveBeenCalled();
    expect(accountSpy).toHaveBeenCalled();
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
    expect(screen.getByText("Helpful hint")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("href", "/profile");
    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("renders composite profile and shell components", async () => {
    const user = userEvent.setup();
    const saveSpy = vi.fn();
    const toggleNotification = vi.fn();
    const toggleAccount = vi.fn();

    renderWithProviders(
      <div>
        <AuthTemplate>
          <AuthCard title="Card title" description="Card description" footer={<p>Card footer</p>}>
            <p>Card body</p>
          </AuthCard>
        </AuthTemplate>
        <AppShell activePath="/profile" title="Profile" description="Description" action={<Button>Edit</Button>}>
          <p>Shell body</p>
        </AppShell>
        <ProfileSummaryCard user={seedAccount} />
        <AccountSettingsPanel user={seedAccount} onSave={saveSpy} />
        <NotificationSettingsPanel preferences={seedAccount.notifications} onToggle={toggleNotification} />
        <ConnectedAccountsPanel accounts={seedAccount.connectedAccounts} onToggle={toggleAccount} />
        <ConnectedAccountsPanel
          accounts={seedAccount.connectedAccounts.map((account) => ({ ...account, connected: true }))}
          onToggle={toggleAccount}
        />
        <AppSidebar activePath="/profile" />
      </div>,
      { ...defaultAuthState, currentUserEmail: seedAccount.email },
    );

    await user.clear(screen.getByLabelText("Display Name"));
    await user.type(screen.getByLabelText("Display Name"), "Sarah Johnson");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));
    await user.click(screen.getByRole("button", { name: "Birthday reminders" }));
    await user.click(screen.getAllByRole("button", { name: "Add Account" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Add Account" })[1]);

    expect(saveSpy).toHaveBeenCalledWith({
      displayName: "Sarah Johnson",
      username: seedAccount.username,
      email: seedAccount.email,
    });
    expect(toggleNotification).toHaveBeenCalledWith("birthday");
    expect(toggleAccount).toHaveBeenCalledWith("apple");
    expect(screen.getByText("Profile saved successfully.")).toBeInTheDocument();
    expect(screen.getByText("Unlock unlimited plushies & more")).toBeInTheDocument();
    expect(screen.getByText("Card footer")).toBeInTheDocument();
    expect(screen.getByText("Shell body")).toBeInTheDocument();
  });
});
