import type { ApplicationRecord } from "@/lib/types";

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "app-101",
    opportunityId: "opp-1",
    opportunitySlug: "product-design-intern-northstar-labs",
    opportunityTitle: "Product Design Intern",
    companyName: "Northstar Labs",
    track: "Internship",
    candidateId: "sarah-j",
    candidateDisplayName: "Sarah J.",
    candidateTitle: "UI/UX Designer",
    submittedAt: "2026-11-10",
    status: "Shortlisted",
    introNote:
      "Loved Northstar's focus on keyboard-first calm planning. My 30s reel walks through an onboarding study I ran last month.",
    answers: [
      {
        questionId: "q-nl-1",
        questionText: "Share one digital product you admire for its restraint, and why.",
        answer:
          "Linear's issue triage view — every border and keyboard shortcut feels intentional with zero visual noise.",
      },
      {
        questionId: "q-nl-2",
        questionText: "Are you available to work hybrid in Lahore at least 3 days a week?",
        answer: "Yes — I live 15 minutes from Gulberg and can work hybrid 3–4 days.",
      },
    ],
  },
  {
    id: "app-102",
    opportunityId: "opp-4",
    opportunitySlug: "brand-identity-sprint-studio-field",
    opportunityTitle: "Brand Identity Sprint",
    companyName: "Studio Field",
    track: "Sprint",
    candidateId: "sarah-j",
    candidateDisplayName: "Sarah J.",
    candidateTitle: "UI/UX Designer",
    submittedAt: "2026-11-08",
    status: "Under Review",
    introNote:
      "Excited about a tight 2-week typographic sprint — happy to share editorial mood boards in Figma.",
    answers: [],
  },
  {
    id: "app-103",
    opportunityId: "opp-9",
    opportunitySlug: "design-systems-sprint-foundry-studio",
    opportunityTitle: "Design Systems Sprint",
    companyName: "Foundry Studio",
    track: "Sprint",
    candidateId: "sarah-j",
    candidateDisplayName: "Sarah J.",
    candidateTitle: "UI/UX Designer",
    submittedAt: "2026-11-03",
    status: "Submitted",
    introNote:
      "Built multi-brand spacing tokens in Figma Variables and would love to support your design engineering sprint.",
    answers: [],
  },
  {
    id: "app-104",
    opportunityId: "opp-3",
    opportunitySlug: "growth-marketing-intern-common-ground",
    opportunityTitle: "Growth Marketing Intern",
    companyName: "Common Ground",
    track: "Internship",
    candidateId: "sarah-j",
    candidateDisplayName: "Sarah J.",
    candidateTitle: "UI/UX Designer",
    submittedAt: "2026-10-27",
    status: "Not Selected",
    introNote:
      "Applied to bring UX storytelling and visual campaign assets to Common Ground's maker launches.",
    answers: [
      {
        questionId: "q-cg-1",
        questionText: "Describe a small community or campus campaign you helped grow.",
        answer:
          "Organized our university design critique newsletter, growing attendance from 12 to 65 students.",
      },
    ],
  },
  {
    id: "app-105",
    opportunityId: "opp-1",
    opportunitySlug: "product-design-intern-northstar-labs",
    opportunityTitle: "Product Design Intern",
    companyName: "Northstar Labs",
    track: "Internship",
    candidateId: "daniel-t",
    candidateDisplayName: "Daniel T.",
    candidateTitle: "Product Design Intern",
    submittedAt: "2026-11-11",
    status: "Under Review",
    introNote:
      "My 27s reel highlights rapid 5-day prototyping cycles for early founder teams.",
    answers: [
      {
        questionId: "q-nl-1",
        questionText: "Share one digital product you admire for its restraint, and why.",
        answer:
          "iA Writer — pure focus mode and effortless typographic hierarchy.",
      },
      {
        questionId: "q-nl-2",
        questionText: "Are you available to work hybrid in Lahore at least 3 days a week?",
        answer: "No — applying for remote consideration if open.",
      },
    ],
  },
  {
    id: "app-106",
    opportunityId: "opp-7",
    opportunitySlug: "ux-research-sprint-northstar-labs",
    opportunityTitle: "UX Research Sprint",
    companyName: "Northstar Labs",
    track: "Sprint",
    candidateId: "hana-l",
    candidateDisplayName: "Hana L.",
    candidateTitle: "Product Research Intern",
    submittedAt: "2026-11-11",
    status: "Shortlisted",
    introNote:
      "I run rapid 2–3 week moderated discovery sprints and deliver crisp synthesis memos founders can act on immediately.",
    answers: [],
  },
  {
    id: "app-107",
    opportunityId: "opp-2",
    opportunitySlug: "react-developer-sprint-foundry-studio",
    opportunityTitle: "React Developer Sprint",
    companyName: "Foundry Studio",
    track: "Sprint",
    candidateId: "ahmed-r",
    candidateDisplayName: "Ahmed R.",
    candidateTitle: "Frontend Developer",
    submittedAt: "2026-11-11",
    status: "Submitted",
    introNote:
      "Shipping accessible React + Tailwind components cleanly and ready to start immediately.",
    answers: [],
  },
];
