import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPlushiePage from "@/app/plushies/new/page";
import PlushiesPage from "@/app/plushies/page";
import { SelectInput } from "@/components/atoms/SelectInput";
import { TextArea } from "@/components/atoms/TextArea";
import { AppSidebar } from "@/components/organisms/AppSidebar";
import { PlushieCard } from "@/components/organisms/PlushieCard";
import { PlushieCollectionPanel } from "@/components/organisms/PlushieCollectionPanel";
import { PlushieFormPanel } from "@/components/organisms/PlushieFormPanel";
import { PlushiePreviewCard } from "@/components/organisms/PlushiePreviewCard";
import { StatTile } from "@/components/molecules/StatTile";
import { defaultAuthState, seedAccount } from "@/lib/auth-state";
import { renderWithProviders } from "../helpers/render";

function getRouterPushMock() {
  return (
    globalThis as unknown as { __routerMocks: { push: ReturnType<typeof vi.fn> } }
  ).__routerMocks.push;
}

describe("plushie features", () => {
  it("renders plushie atoms, molecules, and collection organisms", async () => {
    const user = userEvent.setup();
    const changeSpy = vi.fn();
    const submitSpy = vi.fn();

    render(
      <div>
        <SelectInput aria-label="Example select" defaultValue="Medium">
          <option value="Medium">Medium</option>
        </SelectInput>
        <TextArea aria-label="Example area" defaultValue="Notes" />
        <StatTile label="Total plushies" value={8} helper="Passport profiles" />
        <PlushieCard plushie={seedAccount.plushies[0]} />
        <PlushieCard
          plushie={{
            ...seedAccount.plushies[0],
            id: "no-accessories",
            accessories: [],
            status: "At home",
          }}
        />
        <PlushieCollectionPanel plushies={seedAccount.plushies.slice(0, 2)} />
        <PlushieCollectionPanel
          plushies={[
            {
              ...seedAccount.plushies[1],
              id: "resting-plushie",
              status: "At home",
            },
          ]}
        />
        <PlushieCollectionPanel plushies={[]} />
        <PlushiePreviewCard
          plushie={{
            name: "",
            species: "",
            tagline: "",
            hometown: "",
            birthday: "",
            adoptionDate: "",
            size: "Medium",
            status: "At home",
            favoriteSnack: "",
            favoriteActivity: "",
            color: "",
            accessories: "",
          }}
        />
        <PlushiePreviewCard
          plushie={{
            name: "Comet",
            species: "Dragon",
            tagline: "Sparkly flyer",
            hometown: "Boston",
            birthday: "2024-01-01",
            adoptionDate: "2024-02-01",
            size: "Small",
            status: "On an adventure",
            favoriteSnack: "Blueberries",
            favoriteActivity: "Cloud watching",
            color: "Blue",
            accessories: "Scarf, Satchel",
          }}
        />
        <PlushieFormPanel
          plushie={{
            name: "Comet",
            species: "Dragon",
            tagline: "Sparkly flyer",
            hometown: "Boston",
            birthday: "2024-01-01",
            adoptionDate: "2024-02-01",
            size: "Small",
            status: "On an adventure",
            favoriteSnack: "Blueberries",
            favoriteActivity: "Cloud watching",
            color: "Blue",
            accessories: "Scarf",
          }}
          error="Need another detail"
          onChange={changeSpy}
          onSubmit={submitSpy}
        />
      </div>,
    );

    await user.selectOptions(screen.getByLabelText("Example select"), "Medium");
    await user.type(screen.getByLabelText("Example area"), " updated");
    await user.type(screen.getByLabelText("Name"), "!", { initialSelectionStart: 0, initialSelectionEnd: 0 });
    await user.selectOptions(screen.getByLabelText("Travel Status"), "At home");
    await user.click(screen.getByRole("button", { name: "Save Plushie" }));

    expect(changeSpy).toHaveBeenCalledWith("name", "!Comet");
    expect(changeSpy).toHaveBeenCalledWith("status", "At home");
    expect(submitSpy).toHaveBeenCalled();
    expect(screen.getByText("Passport profiles")).toBeInTheDocument();
    expect(screen.getByText("Your collection is ready for its first passport")).toBeInTheDocument();
    expect(screen.getByText("No accessories yet")).toBeInTheDocument();
    expect(screen.getAllByText("Sparkly flyer").length).toBeGreaterThan(0);
    expect(screen.getByText("Need another detail")).toBeInTheDocument();
  });

  it("renders plushie pages for guests and signed-in users", async () => {
    renderWithProviders(<PlushiesPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<PlushiesPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Mochi")).toBeInTheDocument());
    expect(screen.getByRole("link", { name: "Add Plushie" })).toHaveAttribute("href", "/plushies/new");

    cleanup();
    renderWithProviders(<PlushiesPage />, {
      accounts: [
        {
          ...seedAccount,
          plushies: [],
          stats: { ...seedAccount.stats, plushies: 0 },
        },
      ],
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText(/first passport/)).toBeInTheDocument());
  });

  it("supports the add plushie page flow and plushie navigation state", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AddPlushiePage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    getRouterPushMock().mockClear();
    renderWithProviders(
      <div>
        <AddPlushiePage />
        <AppSidebar activePath="/plushies/new" />
      </div>,
      {
        ...defaultAuthState,
        currentUserEmail: seedAccount.email,
      },
    );

    await waitFor(() => expect(screen.getByText("Plushie details")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Save Plushie" }));
    expect(screen.getByText("Complete every plushie detail.")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Name"), "Comet");
    await user.type(screen.getByLabelText("Species"), "Dragon");
    await user.type(screen.getByLabelText("Colorway"), "Sky Blue");
    await user.type(screen.getByLabelText("Hometown"), "Boston, MA");
    await user.type(screen.getByLabelText("Birthday"), "2024-01-01");
    await user.type(screen.getByLabelText("Adoption Date"), "2024-02-01");
    await user.selectOptions(screen.getByLabelText("Size"), "Small");
    await user.selectOptions(screen.getByLabelText("Travel Status"), "On an adventure");
    await user.type(screen.getByLabelText("Favorite Snack"), "Blueberry gummies");
    await user.type(screen.getByLabelText("Favorite Activity"), "Cloud watching");
    await user.type(screen.getByLabelText(/Accessories/), "Scarf, Satchel");
    await user.type(screen.getByLabelText("Tagline"), "Sparkly flyer");
    await user.click(screen.getByRole("button", { name: "Save Plushie" }));

    expect(getRouterPushMock()).toHaveBeenCalledWith("/plushies");
    expect(screen.getAllByRole("link", { name: "My Plushies" })[0]).toHaveAttribute("href", "/plushies");
    expect(screen.getByText("Comet")).toBeInTheDocument();
  });
});
