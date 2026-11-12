"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  IntakeQuestion,
  Opportunity,
  QuestionType,
  TrackType,
  WorkArrangement,
} from "@/lib/types";
import {
  MAX_CUSTOM_QUESTIONS,
  MAX_JOB_DESCRIPTION_LENGTH,
  MAX_JOB_TITLE_LENGTH,
  validateNoExternalAts,
} from "@/lib/validation";
import {
  getTrackBadgeLabel,
  SKILL_OPTIONS,
  slugify,
} from "@/lib/helpers";
import { useDemoState } from "@/context/DemoStateContext";

export function ListingCreationWizard() {
  const { createOpportunity } = useDemoState();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  // Step 1: Details
  const [title, setTitle] = useState("");
  const [track, setTrack] = useState<TrackType>("Internship");
  const [duration, setDuration] = useState("6 months");
  const [location, setLocation] = useState("Lahore");
  const [zipCode, setZipCode] = useState("54000");
  const [workArrangement, setWorkArrangement] =
    useState<WorkArrangement>("Hybrid");
  const [compensation, setCompensation] = useState("$900/mo stipend");

  // Step 2: Description & Skills
  const [description, setDescription] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    "Co-design interactive user journeys in Figma.\nCollaborate directly with engineers during weekly product sprints."
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "UI/UX",
    "Figma",
  ]);
  const [idealCandidate, setIdealCandidate] = useState(
    "Curiosity, clear visual reasoning, and enthusiasm for building alongside an early team."
  );
  const [atsError, setAtsError] = useState<string | null>(null);

  // Step 3: Custom Application Questions (max 3 for Internship)
  const [questions, setQuestions] = useState<IntakeQuestion[]>([
    {
      id: "custom-1",
      questionText: "What project are you proudest of shipping recently?",
      type: "long_text",
      required: true,
    },
  ]);
  const [questionLimitNotice, setQuestionLimitNotice] = useState<string | null>(
    null
  );

  const checkAtsInAllFields = (textToCheck: string) => {
    const check = validateNoExternalAts(textToCheck);
    if (!check.isValid) {
      setAtsError(check.error || null);
      return false;
    }
    setAtsError(null);
    return true;
  };

  const handleTitleChange = (val: string) => {
    const trimmed = val.slice(0, MAX_JOB_TITLE_LENGTH);
    setTitle(trimmed);
    checkAtsInAllFields(`${trimmed} ${description} ${idealCandidate}`);
  };

  const handleDescriptionChange = (val: string) => {
    const trimmed = val.slice(0, MAX_JOB_DESCRIPTION_LENGTH);
    setDescription(trimmed);
    checkAtsInAllFields(`${title} ${trimmed} ${idealCandidate}`);
  };

  const handleAddQuestion = () => {
    if (questions.length >= MAX_CUSTOM_QUESTIONS) {
      setQuestionLimitNotice("You can add up to three custom intake questions.");
      return;
    }
    setQuestionLimitNotice(null);
    setQuestions((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        questionText: "",
        type: "short_text",
        required: false,
      },
    ]);
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!title.trim()) {
        setAtsError("Please enter a job title before continuing.");
        return;
      }
      if (!checkAtsInAllFields(title)) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      const combined = `${title}\n${description}\n${responsibilitiesText}\n${idealCandidate}`;
      if (!checkAtsInAllFields(combined)) return;
      if (!description.trim()) {
        setAtsError("Please enter an opportunity description.");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(4);
    }
  };

  const handlePublish = () => {
    const combined = `${title}\n${description}\n${responsibilitiesText}\n${idealCandidate}`;
    if (!checkAtsInAllFields(combined)) {
      setStep(2);
      return;
    }

    const baseSlug = slugify(title || "startup-opportunity");
    const slug = `${baseSlug}-northstar-${Date.now().toString().slice(-4)}`;
    const weeks =
      track === "Sprint"
        ? parseInt(duration, 10) || 4
        : (parseInt(duration, 10) || 6) * 4;

    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      slug,
      title: title.trim() || "Product Builder",
      companyId: "northstar-labs",
      companyName: "Northstar Labs",
      companyInitials: "NL",
      track,
      duration,
      durationWeeks: weeks,
      location: location.trim() || "Remote",
      zipCode: zipCode.trim() || "54000",
      workArrangement,
      compensation: compensation.trim() || undefined,
      datePosted: new Date().toISOString().slice(0, 10),
      postedLabel: "Just now",
      description: description.trim(),
      responsibilities: responsibilitiesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      skills: selectedSkills.length > 0 ? selectedSkills : ["Product Design"],
      idealCandidate: idealCandidate.trim(),
      customQuestions:
        track === "Internship"
          ? questions.filter((q) => q.questionText.trim().length > 0)
          : [],
      status: "Active",
      applicantCount: 0,
    };

    createOpportunity(newOpportunity);
    setPublishedSlug(slug);
  };

  if (publishedSlug) {
    return (
      <div className="rounded-panel border border-sand-border bg-pure-white p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-semibold text-warm-charcoal">
          Opportunity published on InternMe
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-secondary-text">
          Your {getTrackBadgeLabel(track)} listing is now live in the
          discovery marketplace with native on-platform applications enabled.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={`/jobs/${publishedSlug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            <span>View Live Listing</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard/employer/listings"
            className="rounded-xl border border-sand-border bg-warm-ivory px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest"
          >
            Manage Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps Header */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { num: 1, label: "Details" },
          { num: 2, label: "Description" },
          { num: 3, label: "Intake Questions" },
          { num: 4, label: "Preview & Publish" },
        ].map((item) => {
          const active = step === item.num;
          const completed = step > item.num;
          return (
            <button
              key={item.num}
              type="button"
              onClick={() => {
                if (item.num < step) setStep(item.num as 1 | 2 | 3 | 4);
              }}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                active
                  ? "border-deep-forest bg-deep-forest text-warm-ivory"
                  : completed
                    ? "border-muted-sage bg-soft-sage text-deep-forest"
                    : "border-sand-border bg-pure-white text-secondary-text"
              }`}
            >
              <span className="font-mono">0{item.num}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Inline External ATS Block Alert */}
      {atsError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Listing restriction</p>
            <p className="mt-0.5 text-xs">{atsError}</p>
          </div>
        </div>
      )}

      <div className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="listing-title"
                  className="text-sm font-semibold text-warm-charcoal"
                >
                  Job Title *
                </label>
                <span className="text-xs text-secondary-text">
                  {title.length}/{MAX_JOB_TITLE_LENGTH}
                </span>
              </div>
              <input
                id="listing-title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Product Design Intern or React Developer Sprint"
                className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-sm font-semibold text-warm-charcoal">
                Opportunity Track *
              </span>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  [
                    {
                      value: "Internship",
                      title: "Internship",
                      desc: "3–12 months · Supports up to 3 custom questions",
                      defaultDuration: "6 months",
                    },
                    {
                      value: "Sprint",
                      title: "SignMeUp Sprint",
                      desc: "1–8 weeks · Focused short-term project scope",
                      defaultDuration: "4 weeks",
                    },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setTrack(option.value);
                      setDuration(option.defaultDuration);
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      track === option.value
                        ? "border-deep-forest bg-soft-sage/60 ring-1 ring-deep-forest"
                        : "border-sand-border bg-warm-ivory/40 hover:border-muted-sage"
                    }`}
                  >
                    <p className="font-heading text-sm font-semibold text-warm-charcoal">
                      {option.title}
                    </p>
                    <p className="mt-1 text-xs text-secondary-text">
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                >
                  {track === "Internship" ? (
                    <>
                      <option value="3 months">3 months</option>
                      <option value="4 months">4 months</option>
                      <option value="6 months">6 months</option>
                      <option value="12 months">12 months</option>
                    </>
                  ) : (
                    <>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="4 weeks">4 weeks</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="8 weeks">8 weeks</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Work Arrangement
                </label>
                <select
                  value={workArrangement}
                  onChange={(e) =>
                    setWorkArrangement(e.target.value as WorkArrangement)
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Location / Area
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lahore or Remote"
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-warm-charcoal">
                Compensation{" "}
                <span className="font-normal text-secondary-text">
                  (optional — shown only when specified)
                </span>
              </label>
              <input
                type="text"
                value={compensation}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="e.g., $900/mo stipend or $1,200 fixed sprint"
                className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="listing-desc"
                  className="text-sm font-semibold text-warm-charcoal"
                >
                  Job Description *
                </label>
                <span
                  className={`text-xs font-medium ${
                    description.length >= MAX_JOB_DESCRIPTION_LENGTH
                      ? "text-red-700"
                      : "text-secondary-text"
                  }`}
                >
                  {description.length}/{MAX_JOB_DESCRIPTION_LENGTH}
                </span>
              </div>
              <textarea
                id="listing-desc"
                rows={4}
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Describe what the maker will work on and how your team collaborates..."
                className="mt-1.5 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 py-3 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
              <p className="mt-1.5 text-[11px] text-secondary-text">
                Tip: External ATS links (like greenhouse.io, lever.co, or
                myworkdayjobs.com) are automatically blocked so applications
                stay on InternMe.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-warm-charcoal">
                Responsibilities (one per line)
              </label>
              <textarea
                rows={3}
                value={responsibilitiesText}
                onChange={(e) => {
                  setResponsibilitiesText(e.target.value);
                  checkAtsInAllFields(
                    `${title} ${description} ${e.target.value} ${idealCandidate}`
                  );
                }}
                className="mt-1.5 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 py-3 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
            </div>

            <div>
              <span className="block text-sm font-semibold text-warm-charcoal">
                Required Skills
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? "border-deep-forest bg-deep-forest text-warm-ivory"
                          : "border-sand-border bg-warm-ivory text-warm-charcoal hover:border-muted-sage"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-warm-charcoal">
                Ideal Candidate
              </label>
              <textarea
                rows={2}
                value={idealCandidate}
                onChange={(e) => {
                  setIdealCandidate(e.target.value);
                  checkAtsInAllFields(
                    `${title} ${description} ${responsibilitiesText} ${e.target.value}`
                  );
                }}
                className="mt-1.5 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 py-3 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            {track === "Internship" ? (
              <>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-warm-charcoal">
                      Custom Application Questions (max 3)
                    </h3>
                    <p className="text-xs text-secondary-text">
                      Keep questions focused so emerging talent can respond
                      alongside their 30-second video introduction.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-deep-forest bg-soft-sage px-4 py-2 text-xs font-semibold text-deep-forest transition hover:bg-deep-forest hover:text-warm-ivory"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Question ({questions.length}/3)</span>
                  </button>
                </div>

                {questionLimitNotice && (
                  <p
                    role="alert"
                    className="rounded-xl border border-subtle-gold/50 bg-muted-sand px-4 py-2.5 text-xs font-semibold text-warm-charcoal"
                  >
                    {questionLimitNotice}
                  </p>
                )}

                <div className="space-y-4">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-sand-border bg-warm-ivory/50 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-deep-forest">
                          Question {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setQuestionLimitNotice(null);
                            setQuestions((prev) =>
                              prev.filter((item) => item.id !== q.id)
                            );
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-secondary-text hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) =>
                          setQuestions((prev) =>
                            prev.map((item) =>
                              item.id === q.id
                                ? { ...item, questionText: e.target.value }
                                : item
                            )
                          )
                        }
                        placeholder="Enter intake question..."
                        className="h-10 w-full rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm focus:border-deep-forest focus:outline-none"
                      />

                      <div className="flex flex-wrap items-center gap-4">
                        <select
                          value={q.type}
                          onChange={(e) =>
                            setQuestions((prev) =>
                              prev.map((item) =>
                                item.id === q.id
                                  ? {
                                      ...item,
                                      type: e.target.value as QuestionType,
                                    }
                                  : item
                              )
                            )
                          }
                          className="h-9 rounded-lg border border-sand-border bg-pure-white px-3 text-xs font-medium focus:border-deep-forest focus:outline-none"
                        >
                          <option value="short_text">Short Text</option>
                          <option value="long_text">Long Text</option>
                          <option value="yes_no">Yes / No</option>
                        </select>

                        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-warm-charcoal">
                          <input
                            type="checkbox"
                            checked={q.required}
                            onChange={(e) =>
                              setQuestions((prev) =>
                                prev.map((item) =>
                                  item.id === q.id
                                    ? { ...item, required: e.target.checked }
                                    : item
                                )
                              )
                            }
                            className="h-4 w-4 rounded border-sand-border accent-deep-forest"
                          />
                          <span>Required question</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-sand-border bg-warm-ivory p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted-sand px-3 py-1 text-xs font-semibold text-warm-charcoal">
                  SignMeUp Sprint Configuration
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-warm-charcoal">
                  Streamlined Video-First Sprint Application
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                  SignMeUp Sprints prioritize speed and mutual clarity.
                  Candidates apply with their 30-second video introduction reel
                  and a short kickoff note directly on InternMe—no lengthy
                  intake forms required.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-sand-border pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
                  Live Listing Preview
                </p>
                <h3 className="mt-1 font-heading text-2xl font-semibold text-warm-charcoal">
                  {title || "Untitled Opportunity"}
                </h3>
                <p className="mt-1 text-sm text-secondary-text">
                  Northstar Labs · {getTrackBadgeLabel(track)} · {duration} ·{" "}
                  {location} ({workArrangement})
                </p>
              </div>
              {compensation && (
                <span className="rounded-lg bg-soft-sage px-3 py-1.5 text-xs font-semibold text-deep-forest">
                  {compensation}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-secondary-text">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-sand-border bg-warm-ivory px-3 py-1 text-xs font-medium text-warm-charcoal"
                >
                  {skill}
                </span>
              ))}
            </div>

            {track === "Internship" && questions.length > 0 && (
              <div className="rounded-2xl border border-sand-border bg-warm-ivory p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-text">
                  Custom Intake Questions ({questions.length}/3)
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-warm-charcoal">
                  {questions.map((q, i) => (
                    <li key={q.id}>
                      {i + 1}. {q.questionText || "Untitled question"}{" "}
                      <span className="text-xs text-secondary-text">
                        ({q.required ? "Required" : "Optional"})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-secondary-text">
              <ShieldCheck className="h-4 w-4 text-deep-forest" />
              <span>
                Verified: Native on-platform applications enabled. Zero external
                ATS links.
              </span>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-sand-border pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
              className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-4 py-2.5 text-sm font-medium text-warm-charcoal hover:bg-muted-sand"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-6 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <span>Publish Opportunity</span>
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

