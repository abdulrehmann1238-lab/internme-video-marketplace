"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CANDIDATES } from "@/data/candidates";
import { OPPORTUNITIES } from "@/data/opportunities";
import { INITIAL_APPLICATIONS } from "@/data/applications";
import {
  ApplicationAnswer,
  ApplicationRecord,
  ApplicationStatus,
  Candidate,
  Opportunity,
} from "@/lib/types";
import { useToast } from "@/components/ToastProvider";

const DEMO_OPPS_KEY = "internme_demo_opps_v1";
const DEMO_APPS_KEY = "internme_demo_apps_v1";
const DEMO_CANDIDATES_KEY = "internme_demo_candidates_v1";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Northstar Labs shortlisted your Product Design Intern profile.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "n-2",
    title: "Your 30-second video reel passed edge validation.",
    time: "1d ago",
    unread: true,
  },
  {
    id: "n-3",
    title: "New SignMeUp Sprint matches your Figma & UI/UX skills.",
    time: "2d ago",
    unread: false,
  },
];

interface DemoStateContextValue {
  candidates: Candidate[];
  opportunities: Opportunity[];
  applications: ApplicationRecord[];
  activeReelCandidate: Candidate | null;
  notifications: NotificationItem[];
  openReelModal: (candidate: Candidate) => void;
  closeReelModal: () => void;
  updateCandidateProfile: (
    candidateId: string,
    updates: Partial<Candidate>
  ) => void;
  createOpportunity: (newOpp: Opportunity) => void;
  toggleOpportunityStatus: (id: string) => void;
  submitApplication: (params: {
    opportunity: Opportunity;
    candidateId: string;
    candidateDisplayName: string;
    candidateTitle: string;
    introNote: string;
    answers: ApplicationAnswer[];
  }) => ApplicationRecord;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  markNotificationsRead: () => void;
  resetDemoState: () => void;
}

const DemoStateContext = createContext<DemoStateContextValue | undefined>(
  undefined
);

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(CANDIDATES);
  const [opportunities, setOpportunities] =
    useState<Opportunity[]>(OPPORTUNITIES);
  const [applications, setApplications] =
    useState<ApplicationRecord[]>(INITIAL_APPLICATIONS);
  const [activeReelCandidate, setActiveReelCandidate] =
    useState<Candidate | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  useEffect(() => {
    try {
      const savedOpps = window.localStorage.getItem(DEMO_OPPS_KEY);
      const savedApps = window.localStorage.getItem(DEMO_APPS_KEY);
      const savedCandidates = window.localStorage.getItem(DEMO_CANDIDATES_KEY);

      if (savedOpps) {
        setOpportunities(JSON.parse(savedOpps) as Opportunity[]);
      }
      if (savedApps) {
        setApplications(JSON.parse(savedApps) as ApplicationRecord[]);
      }
      if (savedCandidates) {
        setCandidates(JSON.parse(savedCandidates) as Candidate[]);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const openReelModal = useCallback((candidate: Candidate) => {
    setActiveReelCandidate(candidate);
  }, []);

  const closeReelModal = useCallback(() => {
    setActiveReelCandidate(null);
  }, []);

  const updateCandidateProfile = useCallback(
    (candidateId: string, updates: Partial<Candidate>) => {
      setCandidates((prev) => {
        const next = prev.map((c) =>
          c.id === candidateId ? { ...c, ...updates } : c
        );
        try {
          // Strip transient blob URLs before saving to localStorage
          const serializable = next.map((c) =>
            c.videoUrl?.startsWith("blob:")
              ? { ...c, videoUrl: undefined }
              : c
          );
          window.localStorage.setItem(
            DEMO_CANDIDATES_KEY,
            JSON.stringify(serializable)
          );
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const createOpportunity = useCallback(
    (newOpp: Opportunity) => {
      setOpportunities((prev) => {
        const next = [newOpp, ...prev];
        try {
          window.localStorage.setItem(DEMO_OPPS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      showToast("Opportunity published to InternMe.", "success");
    },
    [showToast]
  );

  const toggleOpportunityStatus = useCallback(
    (id: string) => {
      setOpportunities((prev) => {
        const next = prev.map((opp) =>
          opp.id === id
            ? {
                ...opp,
                status: (opp.status === "Paused" ? "Active" : "Paused") as
                  | "Active"
                  | "Paused",
              }
            : opp
        );
        try {
          window.localStorage.setItem(DEMO_OPPS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      showToast("Listing status updated.", "info");
    },
    [showToast]
  );

  const submitApplication = useCallback(
    ({
      opportunity,
      candidateId,
      candidateDisplayName,
      candidateTitle,
      introNote,
      answers,
    }: {
      opportunity: Opportunity;
      candidateId: string;
      candidateDisplayName: string;
      candidateTitle: string;
      introNote: string;
      answers: ApplicationAnswer[];
    }) => {
      const record: ApplicationRecord = {
        id: `app-${Date.now()}`,
        opportunityId: opportunity.id,
        opportunitySlug: opportunity.slug,
        opportunityTitle: opportunity.title,
        companyName: opportunity.companyName,
        track: opportunity.track,
        candidateId,
        candidateDisplayName,
        candidateTitle,
        submittedAt: new Date().toISOString().slice(0, 10),
        status: "Submitted",
        introNote,
        answers,
      };

      setApplications((prev) => {
        const next = [record, ...prev];
        try {
          window.localStorage.setItem(DEMO_APPS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });

      return record;
    },
    []
  );

  const updateApplicationStatus = useCallback(
    (id: string, status: ApplicationStatus) => {
      setApplications((prev) => {
        const next = prev.map((app) =>
          app.id === id ? { ...app, status } : app
        );
        try {
          window.localStorage.setItem(DEMO_APPS_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      showToast(`Application moved to ${status}.`, "success");
    },
    [showToast]
  );

  const markNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const resetDemoState = useCallback(() => {
    setCandidates(CANDIDATES);
    setOpportunities(OPPORTUNITIES);
    setApplications(INITIAL_APPLICATIONS);
    try {
      window.localStorage.removeItem(DEMO_OPPS_KEY);
      window.localStorage.removeItem(DEMO_APPS_KEY);
      window.localStorage.removeItem(DEMO_CANDIDATES_KEY);
    } catch {
      // ignore
    }
    showToast("Demo data reset to initial defaults.", "info");
  }, [showToast]);

  return (
    <DemoStateContext.Provider
      value={{
        candidates,
        opportunities,
        applications,
        activeReelCandidate,
        notifications,
        openReelModal,
        closeReelModal,
        updateCandidateProfile,
        createOpportunity,
        toggleOpportunityStatus,
        submitApplication,
        updateApplicationStatus,
        markNotificationsRead,
        resetDemoState,
      }}
    >
      {children}
    </DemoStateContext.Provider>
  );
}

export function useDemoState() {
  const ctx = useContext(DemoStateContext);
  if (!ctx) {
    throw new Error("useDemoState must be used within DemoStateProvider");
  }
  return ctx;
}

