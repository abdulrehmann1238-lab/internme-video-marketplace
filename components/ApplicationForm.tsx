"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ShieldCheck,
  X,
} from "lucide-react";
import { ApplicationAnswer, Opportunity } from "@/lib/types";
import { formatPublicName } from "@/lib/helpers";
import { useAuth } from "@/context/AuthContext";
import { useDemoState } from "@/context/DemoStateContext";
import { EditorialImage } from "@/components/EditorialImage";
import { useToast } from "@/components/ToastProvider";

interface ApplicationFormProps {
  isOpen: boolean;
  opportunity: Opportunity;
  onClose: () => void;
}

export function ApplicationForm({
  isOpen,
  opportunity,
  onClose,
}: ApplicationFormProps) {
  const { user, loginAsCandidate } = useAuth();
  const { candidates, openReelModal, submitApplication, applications } =
    useDemoState();
  const { showToast } = useToast();

  // Active candidate profile (defaults to Sarah J. for candidate demo preview)
  const activeCandidate =
    candidates.find((c) => c.id === (user?.candidateId || "sarah-j")) ||
    candidates[0];
  const publicName = formatPublicName(
    activeCandidate.firstName,
    activeCandidate.lastInitial
  );

  const alreadyApplied = applications.some(
    (app) =>
      app.opportunityId === opportunity.id &&
      app.candidateId === activeCandidate.id
  );

  const [introNote, setIntroNote] = useState("");
  const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setErrorMsg(null);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    for (const q of opportunity.customQuestions) {
      if (q.required && !answersMap[q.id]?.trim()) {
        setErrorMsg(`Please answer: "${q.questionText}"`);
        return;
      }
    }

    if (!user) {
      loginAsCandidate();
    }

    const answers: ApplicationAnswer[] = opportunity.customQuestions.map(
      (q) => ({
        questionId: q.id,
        questionText: q.questionText,
        answer: answersMap[q.id]?.trim() || "No response provided",
      })
    );

    submitApplication({
      opportunity,
      candidateId: activeCandidate.id,
      candidateDisplayName: publicName,
      candidateTitle: activeCandidate.title,
      introNote:
        introNote.trim() ||
        `Shared 30-second video introduction for ${opportunity.title}.`,
      answers,
    });

    setSubmitted(true);
    showToast("Application submitted directly through InternMe.", "success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="application-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-warm-charcoal/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-panel border border-sand-border bg-warm-ivory p-6 shadow-modal sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close application form"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:text-warm-charcoal"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted || alreadyApplied ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2
                  id="application-modal-title"
                  className="mt-5 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal"
                >
                  Your application is on its way.
                </h2>
                <p className="mt-2 text-sm text-secondary-text">
                  You&apos;re one step closer to your next opportunity.
                </p>
                <div className="mx-auto mt-6 max-w-md rounded-card border border-sand-border bg-pure-white p-4 text-left text-xs text-secondary-text">
                  <p className="font-semibold text-warm-charcoal">
                    {opportunity.title} · {opportunity.companyName}
                  </p>
                  <p className="mt-1">
                    Submitted directly on InternMe with {publicName}&apos;s{" "}
                    {activeCandidate.reelDuration}s video introduction.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/dashboard/talent/applications"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
                  >
                    <span>Track My Applications</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-sand-border bg-pure-white px-5 py-2.5 text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand"
                  >
                    Back to Role
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Direct On-Platform Application
                  </span>
                  <h2
                    id="application-modal-title"
                    className="mt-3 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal"
                  >
                    Apply for {opportunity.title}
                  </h2>
                  <p className="mt-1 text-sm text-secondary-text">
                    {opportunity.companyName} · {opportunity.duration} ·{" "}
                    {opportunity.workArrangement}
                  </p>
                </div>

                {/* Candidate Summary & Reel Preview */}
                <div className="flex flex-col justify-between gap-4 rounded-card border border-sand-border bg-pure-white p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3.5">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-sand-border bg-muted-sand">
                      <EditorialImage
                        src={activeCandidate.thumbnailUrl}
                        alt={publicName}
                        fallbackLabel={publicName}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-sage">
                        Applying as {user ? "signed-in" : "demo"} candidate
                      </p>
                      <p className="font-heading text-base font-semibold text-warm-charcoal">
                        {publicName}
                      </p>
                      <p className="text-xs text-secondary-text">
                        {activeCandidate.title} · {activeCandidate.location}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openReelModal(activeCandidate)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2 text-xs font-semibold text-deep-forest transition hover:border-deep-forest"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Preview {activeCandidate.reelDuration}s Reel</span>
                  </button>
                </div>

                {/* Optional Short Introduction */}
                <div>
                  <label
                    htmlFor="app-intro-note"
                    className="block text-sm font-semibold text-warm-charcoal"
                  >
                    Short Introduction{" "}
                    <span className="font-normal text-secondary-text">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="app-intro-note"
                    rows={3}
                    maxLength={400}
                    value={introNote}
                    onChange={(e) => setIntroNote(e.target.value)}
                    placeholder={`Share a brief note on why ${opportunity.companyName}'s work stands out to you...`}
                    className="mt-2 w-full rounded-xl border border-sand-border bg-pure-white px-4 py-3 text-sm text-warm-charcoal placeholder:text-secondary-text focus:border-deep-forest focus:outline-none"
                  />
                </div>

                {/* Employer Custom Questions */}
                {opportunity.customQuestions.length > 0 && (
                  <div className="space-y-4 border-t border-sand-border pt-4">
                    <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary-text">
                      Employer Intake Questions
                    </h3>
                    {opportunity.customQuestions.map((q) => (
                      <div key={q.id}>
                        <label
                          htmlFor={`q-${q.id}`}
                          className="block text-sm font-medium text-warm-charcoal"
                        >
                          {q.questionText}{" "}
                          {q.required && (
                            <span className="text-deep-forest">*</span>
                          )}
                        </label>

                        {q.type === "yes_no" ? (
                          <div className="mt-2 flex gap-3">
                            {["Yes", "No"].map((opt) => {
                              const selected = answersMap[q.id] === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setAnswersMap((prev) => ({
                                      ...prev,
                                      [q.id]: opt,
                                    }))
                                  }
                                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                                    selected
                                      ? "border-deep-forest bg-deep-forest text-warm-ivory"
                                      : "border-sand-border bg-pure-white text-warm-charcoal hover:bg-muted-sand/50"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        ) : q.type === "long_text" ? (
                          <textarea
                            id={`q-${q.id}`}
                            rows={3}
                            value={answersMap[q.id] || ""}
                            onChange={(e) =>
                              setAnswersMap((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            placeholder="Write your response..."
                            className="mt-2 w-full rounded-xl border border-sand-border bg-pure-white px-4 py-2.5 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
                          />
                        ) : (
                          <input
                            id={`q-${q.id}`}
                            type="text"
                            value={answersMap[q.id] || ""}
                            onChange={(e) =>
                              setAnswersMap((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            placeholder="Short answer..."
                            className="mt-2 h-11 w-full rounded-xl border border-sand-border bg-pure-white px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {errorMsg && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700"
                  >
                    {errorMsg}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-sand-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[11px] text-secondary-text">
                    Never redirected off-platform · Direct review by{" "}
                    {opportunity.companyName}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-deep-forest px-6 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
                  >
                    <span>Submit Application</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

