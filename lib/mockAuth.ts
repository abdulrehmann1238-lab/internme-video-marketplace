import type { DemoUser } from "@/lib/types";

export const AUTH_STORAGE_KEY = "internme_demo_user_v1";
export const COMPACT_SESSION_KEY = "hasAcceptedCompact";

export const DEMO_CANDIDATE_USER: DemoUser = {
  id: "user-sarah-j",
  role: "candidate",
  firstName: "Sarah",
  lastInitial: "J",
  fullName: "Sarah J.",
  email: "sarah.j@internme.example",
  title: "UI/UX Designer",
  candidateId: "sarah-j",
};

export const DEMO_EMPLOYER_USER: DemoUser = {
  id: "user-northstar",
  role: "employer",
  firstName: "Nadia",
  lastInitial: "H",
  fullName: "Nadia H.",
  email: "team@northstarlabs.example",
  title: "Head of Design · Northstar Labs",
  companyName: "Northstar Labs",
  companyId: "northstar-labs",
};

export function readCompactAcceptance(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(COMPACT_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function writeCompactAcceptance(accepted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (accepted) {
      window.sessionStorage.setItem(COMPACT_SESSION_KEY, "true");
    } else {
      window.sessionStorage.removeItem(COMPACT_SESSION_KEY);
    }
  } catch {
    // ignore storage errors in restricted environments
  }
}
