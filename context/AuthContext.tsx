"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DemoUser, UserRole } from "@/lib/types";
import {
  AUTH_STORAGE_KEY,
  DEMO_CANDIDATE_USER,
  DEMO_EMPLOYER_USER,
  readCompactAcceptance,
  writeCompactAcceptance,
} from "@/lib/mockAuth";

interface AuthContextValue {
  user: DemoUser | null;
  role: UserRole;
  isHydrated: boolean;
  hasAcceptedCompact: boolean;
  loginModalOpen: boolean;
  loginModalReason: string;
  openLoginModal: (reason?: string) => void;
  closeLoginModal: () => void;
  loginAsCandidate: () => void;
  loginAsEmployer: () => void;
  loginWithForm: (params: {
    email: string;
    role: "candidate" | "employer";
    fullName?: string;
    companyName?: string;
  }) => void;
  logout: () => void;
  acceptCompact: () => void;
  resetCompact: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasAcceptedCompact, setHasAcceptedCompact] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalReason, setLoginModalReason] = useState(
    "Sign in to save favorites, track applications, and connect on InternMe."
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved) as DemoUser);
      }
      setHasAcceptedCompact(readCompactAcceptance());
    } catch {
      // ignore storage errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistUser = useCallback((nextUser: DemoUser | null) => {
    setUser(nextUser);
    try {
      if (nextUser) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const loginAsCandidate = useCallback(() => {
    persistUser(DEMO_CANDIDATE_USER);
    setLoginModalOpen(false);
  }, [persistUser]);

  const loginAsEmployer = useCallback(() => {
    persistUser(DEMO_EMPLOYER_USER);
    setLoginModalOpen(false);
  }, [persistUser]);

  const loginWithForm = useCallback(
    ({
      email,
      role,
      fullName,
      companyName,
    }: {
      email: string;
      role: "candidate" | "employer";
      fullName?: string;
      companyName?: string;
    }) => {
      if (role === "candidate") {
        const parts = (fullName || "Sarah Javed").trim().split(/\s+/);
        const firstName = parts[0] || "Sarah";
        const lastInitial = (parts[1]?.[0] || "J").toUpperCase();
        persistUser({
          ...DEMO_CANDIDATE_USER,
          firstName,
          lastInitial,
          fullName: `${firstName} ${lastInitial}.`,
          email: email || DEMO_CANDIDATE_USER.email,
        });
      } else {
        const parts = (fullName || "Nadia Hassan").trim().split(/\s+/);
        const firstName = parts[0] || "Nadia";
        const lastInitial = (parts[1]?.[0] || "H").toUpperCase();
        const org = companyName?.trim() || "Northstar Labs";
        persistUser({
          ...DEMO_EMPLOYER_USER,
          firstName,
          lastInitial,
          fullName: `${firstName} ${lastInitial}.`,
          email: email || DEMO_EMPLOYER_USER.email,
          companyName: org,
          title: `Hiring Team · ${org}`,
        });
      }
      setLoginModalOpen(false);
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const openLoginModal = useCallback((reason?: string) => {
    if (reason) {
      setLoginModalReason(reason);
    } else {
      setLoginModalReason(
        "Sign in to save favorites, track applications, and connect on InternMe."
      );
    }
    setLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, []);

  const acceptCompact = useCallback(() => {
    writeCompactAcceptance(true);
    setHasAcceptedCompact(true);
  }, []);

  const resetCompact = useCallback(() => {
    writeCompactAcceptance(false);
    setHasAcceptedCompact(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : "guest",
        isHydrated,
        hasAcceptedCompact,
        loginModalOpen,
        loginModalReason,
        openLoginModal,
        closeLoginModal,
        loginAsCandidate,
        loginAsEmployer,
        loginWithForm,
        logout,
        acceptCompact,
        resetCompact,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
