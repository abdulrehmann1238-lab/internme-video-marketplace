"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ToastProvider";
import {
  DEFAULT_FAVORITE_OPPORTUNITY_IDS,
  DEFAULT_FAVORITE_TALENT_IDS,
  FAVORITE_OPPORTUNITIES_STORAGE_KEY,
  FAVORITE_TALENT_STORAGE_KEY,
} from "@/lib/mockFavorites";

interface FavoritesContextValue {
  favoriteCandidateIds: string[];
  favoriteOpportunityIds: string[];
  isCandidateFavorite: (id: string) => boolean;
  isOpportunityFavorite: (id: string) => boolean;
  toggleFavoriteCandidate: (id: string, displayName?: string) => boolean;
  toggleFavoriteOpportunity: (id: string, title?: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, openLoginModal } = useAuth();
  const { showToast } = useToast();

  const [favoriteCandidateIds, setFavoriteCandidateIds] = useState<string[]>(
    DEFAULT_FAVORITE_TALENT_IDS
  );
  const [favoriteOpportunityIds, setFavoriteOpportunityIds] = useState<
    string[]
  >(DEFAULT_FAVORITE_OPPORTUNITY_IDS);

  useEffect(() => {
    try {
      const rawTalent = window.localStorage.getItem(
        FAVORITE_TALENT_STORAGE_KEY
      );
      const rawOpps = window.localStorage.getItem(
        FAVORITE_OPPORTUNITIES_STORAGE_KEY
      );
      if (rawTalent) {
        setFavoriteCandidateIds(JSON.parse(rawTalent) as string[]);
      }
      if (rawOpps) {
        setFavoriteOpportunityIds(JSON.parse(rawOpps) as string[]);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const isCandidateFavorite = useCallback(
    (id: string) => (user ? favoriteCandidateIds.includes(id) : false),
    [user, favoriteCandidateIds]
  );

  const isOpportunityFavorite = useCallback(
    (id: string) => (user ? favoriteOpportunityIds.includes(id) : false),
    [user, favoriteOpportunityIds]
  );

  const toggleFavoriteCandidate = useCallback(
    (id: string, displayName?: string) => {
      if (!user) {
        openLoginModal(
          "Sign in to save candidate introductions to your favorites."
        );
        return false;
      }

      setFavoriteCandidateIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
        try {
          window.localStorage.setItem(
            FAVORITE_TALENT_STORAGE_KEY,
            JSON.stringify(next)
          );
        } catch {
          // ignore
        }
        showToast(
          exists
            ? "Removed from your saved list."
            : `${displayName ?? "Candidate"} added to your favorites.`,
          exists ? "info" : "favorite"
        );
        return next;
      });
      return true;
    },
    [user, openLoginModal, showToast]
  );

  const toggleFavoriteOpportunity = useCallback(
    (id: string) => {
      if (!user) {
        openLoginModal(
          "Sign in to save internships and Sprints to your saved list."
        );
        return false;
      }

      setFavoriteOpportunityIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
        try {
          window.localStorage.setItem(
            FAVORITE_OPPORTUNITIES_STORAGE_KEY,
            JSON.stringify(next)
          );
        } catch {
          // ignore
        }
        showToast(
          exists ? "Removed from your saved list." : "Opportunity saved.",
          exists ? "info" : "favorite"
        );
        return next;
      });
      return true;
    },
    [user, openLoginModal, showToast]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCandidateIds: user ? favoriteCandidateIds : [],
        favoriteOpportunityIds: user ? favoriteOpportunityIds : [],
        isCandidateFavorite,
        isOpportunityFavorite,
        toggleFavoriteCandidate,
        toggleFavoriteOpportunity,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}

