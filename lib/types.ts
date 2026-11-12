export type TrackType = "Internship" | "Sprint";
export type WorkArrangement = "Remote" | "Hybrid" | "On-site";
export type UserRole = "guest" | "candidate" | "employer";
export type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Shortlisted"
  | "Not Selected";

export type QuestionType = "short_text" | "long_text" | "yes_no";

export interface IntakeQuestion {
  id: string;
  questionText: string;
  type: QuestionType;
  required: boolean;
}

export interface ReelTranscriptLine {
  startSec: number;
  endSec: number;
  text: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastInitial: string;
  title: string;
  bio: string; // max 255 chars
  location: string;
  zipCode: string;
  workPreference: WorkArrangement;
  skills: string[];
  thumbnailUrl: string;
  reelDuration: number; // seconds, <= 30
  availability: string;
  preferredTrack: TrackType | "Both";
  preferredDuration: string;
  desiredRoles: string[];
  featured?: boolean;
  reelHeadline: string;
  reelTranscript: ReelTranscriptLine[];
  videoUrl?: string;
  privateIdentity: {
    fullLegalName: string;
    email: string;
    phone: string;
    portfolioNote: string;
  };
}

export interface Company {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  description: string;
  sector: string;
  stage: string;
  teamSize: string;
  foundedYear: number;
  location: string;
  accentBg: string;
  accentText: string;
}

export interface Opportunity {
  id: string;
  slug: string;
  title: string; // max 255 chars
  companyId: string;
  companyName: string;
  companyInitials: string;
  track: TrackType;
  duration: string;
  durationWeeks: number;
  location: string;
  zipCode: string;
  workArrangement: WorkArrangement;
  compensation?: string;
  datePosted: string; // ISO date YYYY-MM-DD
  postedLabel: string;
  description: string; // max 1000 chars
  responsibilities: string[];
  skills: string[];
  idealCandidate: string;
  customQuestions: IntakeQuestion[]; // up to 3 for Internships
  featured?: boolean;
  status?: "Active" | "Paused";
  applicantCount?: number;
}

export interface ApplicationAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  opportunitySlug: string;
  opportunityTitle: string;
  companyName: string;
  track: TrackType;
  candidateId: string;
  candidateDisplayName: string;
  candidateTitle: string;
  submittedAt: string;
  status: ApplicationStatus;
  introNote: string;
  answers: ApplicationAnswer[];
}

export interface DemoUser {
  id: string;
  role: Exclude<UserRole, "guest">;
  firstName: string;
  lastInitial: string;
  fullName: string;
  email: string;
  title: string;
  companyName?: string;
  candidateId?: string;
  companyId?: string;
}

