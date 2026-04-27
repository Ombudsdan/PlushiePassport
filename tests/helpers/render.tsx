import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { AppProviders } from "@/components/providers/AppProviders";
import { STORAGE_KEY, defaultAuthState, type AuthState } from "@/lib/auth-state";

export function renderWithProviders(ui: ReactElement, state: AuthState = defaultAuthState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return render(<AppProviders>{ui}</AppProviders>);
}
