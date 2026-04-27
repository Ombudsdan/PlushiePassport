"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultAuthState,
  getCurrentUser,
  loadAuthState,
  loginUser,
  logoutUser,
  persistAuthState,
  signUpUser,
  toggleConnectedAccount,
  toggleNotificationPreference,
  updateProfile,
  type AuthState,
  type ConnectedAccount,
  type LoginInput,
  type NotificationPreference,
  type ProfileUpdate,
  type SignUpInput,
} from "@/lib/auth-state";

type AuthContextValue = {
  currentUser: ReturnType<typeof getCurrentUser>;
  isAuthenticated: boolean;
  isHydrated: boolean;
  signUp: (input: SignUpInput) => void;
  login: (input: LoginInput) => void;
  logout: () => void;
  saveProfile: (update: ProfileUpdate) => void;
  toggleNotification: (id: NotificationPreference["id"]) => void;
  toggleAccount: (id: ConnectedAccount["id"]) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultAuthState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setState(loadAuthState(window.localStorage));
    setIsHydrated(true);

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      persistAuthState(window.localStorage, state);
    }
  }, [isHydrated, state]);

  const signUp = useCallback((input: SignUpInput) => {
    setState((currentState) => signUpUser(currentState, input));
  }, []);

  const login = useCallback((input: LoginInput) => {
    setState((currentState) => loginUser(currentState, input));
  }, []);

  const logout = useCallback(() => {
    setState((currentState) => logoutUser(currentState));
  }, []);

  const saveProfile = useCallback((update: ProfileUpdate) => {
    setState((currentState) => updateProfile(currentState, update));
  }, []);

  const toggleNotification = useCallback((id: NotificationPreference["id"]) => {
    setState((currentState) => toggleNotificationPreference(currentState, id));
  }, []);

  const toggleAccount = useCallback((id: ConnectedAccount["id"]) => {
    setState((currentState) => toggleConnectedAccount(currentState, id));
  }, []);

  const currentUser = useMemo(() => getCurrentUser(state), [state]);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isHydrated,
      signUp,
      login,
      logout,
      saveProfile,
      toggleNotification,
      toggleAccount,
    }),
    [currentUser, isHydrated, login, logout, saveProfile, signUp, toggleAccount, toggleNotification],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
