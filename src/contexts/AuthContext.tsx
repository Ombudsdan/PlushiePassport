"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
  signUp: (input: SignUpInput) => void;
  login: (input: LoginInput) => void;
  logout: () => void;
  saveProfile: (update: ProfileUpdate) => void;
  toggleNotification: (id: NotificationPreference["id"]) => void;
  toggleAccount: (id: ConnectedAccount["id"]) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => loadAuthState(globalThis.localStorage));
  const stateRef = useRef(state);

  useEffect(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker) {
      void navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  useEffect(() => {
    stateRef.current = state;
    persistAuthState(globalThis.localStorage, state);
  }, [state]);

  const signUp = useCallback((input: SignUpInput) => {
    setState(signUpUser(stateRef.current, input));
  }, []);

  const login = useCallback((input: LoginInput) => {
    setState(loginUser(stateRef.current, input));
  }, []);

  const logout = useCallback(() => {
    setState(logoutUser(stateRef.current));
  }, []);

  const saveProfile = useCallback((update: ProfileUpdate) => {
    setState(updateProfile(stateRef.current, update));
  }, []);

  const toggleNotification = useCallback((id: NotificationPreference["id"]) => {
    setState(toggleNotificationPreference(stateRef.current, id));
  }, []);

  const toggleAccount = useCallback((id: ConnectedAccount["id"]) => {
    setState(toggleConnectedAccount(stateRef.current, id));
  }, []);

  const currentUser = useMemo(() => getCurrentUser(state), [state]);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      signUp,
      login,
      logout,
      saveProfile,
      toggleNotification,
      toggleAccount,
    }),
    [currentUser, login, logout, saveProfile, signUp, toggleAccount, toggleNotification],
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
