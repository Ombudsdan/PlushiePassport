"use client";

import {
  startTransition,
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
  addPlushie,
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
  type AddPlushieInput,
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
  addNewPlushie: (input: AddPlushieInput) => void;
  toggleNotification: (id: NotificationPreference["id"]) => void;
  toggleAccount: (id: ConnectedAccount["id"]) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(defaultAuthState);
  const [isHydrated, setIsHydrated] = useState(false);
  const stateRef = useRef(state);

  useEffect(() => {
    startTransition(() => {
      setState(loadAuthState(globalThis.localStorage));
      setIsHydrated(true);
    });

    if ("serviceWorker" in navigator && navigator.serviceWorker) {
      void navigator.serviceWorker.register("/sw.js");
    }
  }, []);

  useEffect(() => {
    stateRef.current = state;
    if (isHydrated) {
      persistAuthState(globalThis.localStorage, state);
    }
  }, [isHydrated, state]);

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

  const addNewPlushie = useCallback((input: AddPlushieInput) => {
    setState(addPlushie(stateRef.current, input));
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
      isHydrated,
      signUp,
      login,
      logout,
      saveProfile,
      addNewPlushie,
      toggleNotification,
      toggleAccount,
    }),
    [addNewPlushie, currentUser, isHydrated, login, logout, saveProfile, signUp, toggleAccount, toggleNotification],
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
