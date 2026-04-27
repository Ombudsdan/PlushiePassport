"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { SearchExplorerPanel } from "@/components/organisms/SearchExplorerPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { searchCommunity, type SearchScope } from "@/lib/community-insights";

export default function SearchPage() {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchScope>("all");
  const results = useMemo(() => searchCommunity(currentUser, query, scope), [currentUser, query, scope]);
  const counts = {
    all: searchCommunity(currentUser, "", "all").length,
    plushies: searchCommunity(currentUser, "", "plushies").length,
    friends: searchCommunity(currentUser, "", "friends").length,
    birthdays: searchCommunity(currentUser, "", "birthdays").length,
  };

  return (
    <AppShell
      activePath="/search"
      title="Search"
      description="Search plushies, collectors, and birthday reminders from the same cozy workspace."
      action={
        <Button variant="secondary" icon={<SearchIcon size={16} />} onClick={() => setQuery("")}>
          Clear search
        </Button>
      }
    >
      <ProtectedContent>
        <SearchExplorerPanel
          query={query}
          scope={scope}
          results={results}
          counts={counts}
          onQueryChange={setQuery}
          onScopeChange={setScope}
        />
      </ProtectedContent>
    </AppShell>
  );
}
