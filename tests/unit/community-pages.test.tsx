import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BirthdaysPage from "@/app/birthdays/page";
import FriendsPage from "@/app/friends/page";
import SearchPage from "@/app/search/page";
import { FilterChip } from "@/components/molecules/FilterChip";
import { BirthdayPlannerPanel } from "@/components/organisms/BirthdayPlannerPanel";
import { FriendsPanel } from "@/components/organisms/FriendsPanel";
import { SearchExplorerPanel } from "@/components/organisms/SearchExplorerPanel";
import { defaultAuthState, seedAccount } from "@/lib/auth-state";
import {
  filterFriends,
  getBirthdayEntries,
  getFriendCounts,
  groupBirthdayEntries,
  searchCommunity,
} from "@/lib/community-insights";
import { renderWithProviders } from "../helpers/render";

describe("community pages and helpers", () => {
  it("derives birthday, friend, and search insights", () => {
    const entries = getBirthdayEntries(
      [
        { ...seedAccount.plushies[0], id: "today", birthday: "2020-04-01" },
        { ...seedAccount.plushies[1], id: "tomorrow", birthday: "2020-04-02" },
        { ...seedAccount.plushies[2], id: "later", birthday: "2020-04-18" },
      ],
      new Date("2026-04-01T10:00:00"),
    );

    expect(entries.map((entry) => entry.group)).toEqual(["Today", "This Week", "Later"]);
    expect(entries.map((entry) => entry.timingLabel)).toEqual(["Birthday today", "Tomorrow", "In 17 days"]);
    expect(groupBirthdayEntries(entries).map((group) => group.items.length)).toEqual([1, 1, 1]);

    expect(filterFriends(seedAccount.friends, "all")).toHaveLength(seedAccount.friends.length);
    expect(filterFriends(seedAccount.friends, "connected").every((friend) => friend.requestState === "connected")).toBe(true);
    expect(getFriendCounts(seedAccount.friends)).toEqual({
      all: 6,
      connected: 3,
      pending: 1,
      suggested: 2,
    });

    expect(searchCommunity(null, "mochi", "all")).toEqual([]);
    expect(searchCommunity(seedAccount, "", "plushies")[0].badge).toBe("Plushie");
    expect(searchCommunity(seedAccount, "candles", "friends")[0].badge).toBe("Friend");
    expect(searchCommunity(seedAccount, "birthday", "birthdays")[0].badge).toBe("Birthday");
  });

  it("renders community organisms directly", async () => {
    const user = userEvent.setup();
    const birthdayEntries = getBirthdayEntries(seedAccount.plushies, new Date("2026-04-01T10:00:00"));
    const searchResults = searchCommunity(seedAccount, "", "all", new Date("2026-04-01T10:00:00")).slice(0, 3);
    const counts = getFriendCounts(seedAccount.friends);
    const primarySpy = vi.fn();
    const secondarySpy = vi.fn();
    const filterSpy = vi.fn();
    const querySpy = vi.fn();
    const scopeSpy = vi.fn();
    const chipSpy = vi.fn();

    render(
      <div>
        <FilterChip active count={2} label="Chip" onClick={chipSpy} />
        <FilterChip active={false} label="No Count" onClick={chipSpy} />
        <BirthdayPlannerPanel
          entries={birthdayEntries}
          selectedEntry={birthdayEntries[0]}
          onSelectEntry={primarySpy}
        />
        <BirthdayPlannerPanel entries={[]} selectedEntry={null} onSelectEntry={primarySpy} />
        <FriendsPanel
          activeFilter="all"
          counts={counts}
          friends={seedAccount.friends}
          onFilterChange={filterSpy}
          onAcceptFriend={primarySpy}
          onDismissFriend={secondarySpy}
          onConnectFriend={primarySpy}
        />
        <FriendsPanel
          activeFilter="pending"
          counts={counts}
          friends={[]}
          onFilterChange={filterSpy}
          onAcceptFriend={primarySpy}
          onDismissFriend={secondarySpy}
          onConnectFriend={primarySpy}
        />
        <SearchExplorerPanel
          query=""
          scope="all"
          results={searchResults}
          counts={{ all: 3, plushies: 1, friends: 1, birthdays: 1 }}
          onQueryChange={querySpy}
          onScopeChange={scopeSpy}
        />
        <SearchExplorerPanel
          query="zzz"
          scope="friends"
          results={[]}
          counts={{ all: 0, plushies: 0, friends: 0, birthdays: 0 }}
          onQueryChange={querySpy}
          onScopeChange={scopeSpy}
        />
      </div>,
    );

    await user.click(screen.getByRole("button", { name: /Pippin/i }));
    await user.click(screen.getByRole("button", { name: "Chip2" }));
    await user.click(screen.getByRole("button", { name: "No Count" }));
    await user.click(screen.getAllByRole("button", { name: /All/i })[0]);
    await user.click(screen.getAllByRole("button", { name: /Friends3/i })[0]);
    await user.click(screen.getAllByRole("button", { name: "View activity" })[0]);
    await user.click(screen.getAllByRole("button", { name: /Pending/i })[0]);
    await user.click(screen.getByRole("button", { name: "Accept request" }));
    await user.click(screen.getAllByRole("button", { name: "Send request" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Not now" })[0]);
    await user.type(screen.getAllByLabelText("Search the plushie world")[0], "Mochi");
    await user.click(screen.getAllByRole("button", { name: /All/i })[2]);
    await user.click(screen.getByRole("button", { name: "Plushies1" }));
    await user.click(screen.getByRole("button", { name: "Friends1" }));
    await user.click(screen.getByRole("button", { name: "Birthdays1" }));

    expect(chipSpy).toHaveBeenCalledTimes(2);
    expect(primarySpy).toHaveBeenCalled();
    expect(secondarySpy).toHaveBeenCalled();
    expect(filterSpy).toHaveBeenCalledWith("all");
    expect(filterSpy).toHaveBeenCalledWith("connected");
    expect(filterSpy).toHaveBeenCalledWith("pending");
    expect(querySpy).toHaveBeenCalled();
    expect(scopeSpy).toHaveBeenCalledWith("all");
    expect(scopeSpy).toHaveBeenCalledWith("plushies");
    expect(scopeSpy).toHaveBeenCalledWith("friends");
    expect(scopeSpy).toHaveBeenCalledWith("birthdays");
    expect(screen.getByText("No birthdays to plan yet")).toBeInTheDocument();
    expect(screen.getByText("No friends in this view")).toBeInTheDocument();
    expect(screen.getByText("No matches yet")).toBeInTheDocument();
  });

  it("renders birthdays, friends, and search pages", async () => {
    const user = userEvent.setup();

    renderWithProviders(<BirthdaysPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<BirthdaysPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Upcoming celebrations")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /Pippin/i }));
    expect(screen.getAllByText("Pippin").length).toBeGreaterThan(0);

    cleanup();
    renderWithProviders(<BirthdaysPage />, {
      accounts: [
        {
          ...seedAccount,
          plushies: [],
          stats: { ...seedAccount.stats, plushies: 0, birthdaysTracked: 0 },
        },
      ],
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("No birthdays to plan yet")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<FriendsPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<FriendsPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Friend activity")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /Pending/i }));
    await user.click(screen.getByRole("button", { name: "Accept request" }));
    expect(screen.getByText("Friend request accepted.")).toBeInTheDocument();
    expect(screen.getByText("No friends in this view")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Suggested/i }));
    await user.click(screen.getAllByRole("button", { name: "Send request" })[0]);
    expect(screen.getByText("Friend request sent.")).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Not now" })[0]);
    expect(screen.getByText("Friend card dismissed for now.")).toBeInTheDocument();

    cleanup();
    renderWithProviders(<SearchPage />);
    await waitFor(() => expect(screen.getByText("You're signed out")).toBeInTheDocument());

    cleanup();
    renderWithProviders(<SearchPage />, {
      ...defaultAuthState,
      currentUserEmail: seedAccount.email,
    });
    await waitFor(() => expect(screen.getByText("Search the plushie world")).toBeInTheDocument());
    await user.type(screen.getByLabelText("Search the plushie world"), "Mochi");
    expect(screen.getByText("Mochi")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Birthdays/i }));
    await user.click(screen.getByRole("button", { name: "Clear search" }));
    await user.type(screen.getByLabelText("Search the plushie world"), "zzzzz");
    expect(screen.getByText("No matches yet")).toBeInTheDocument();
  });
});
