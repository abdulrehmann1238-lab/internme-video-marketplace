"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Lock, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";
import { MAX_BIO_LENGTH } from "@/lib/validation";
import { formatPublicName, SKILL_OPTIONS } from "@/lib/helpers";
import { TrackType, WorkArrangement } from "@/lib/types";

export default function TalentProfileManagementPage() {
  const { candidates, updateCandidateProfile } = useDemoState();
  const { showToast } = useToast();

  const candidate = candidates.find((c) => c.id === "sarah-j") || candidates[0];

  const [title, setTitle] = useState(candidate.title);
  const [bio, setBio] = useState(candidate.bio);
  const [location, setLocation] = useState(candidate.location);
  const [availability, setAvailability] = useState(candidate.availability);
  const [workPreference, setWorkPreference] = useState<WorkArrangement>(
    candidate.workPreference
  );
  const [preferredTrack, setPreferredTrack] = useState<TrackType | "Both">(
    candidate.preferredTrack
  );
  const [skills, setSkills] = useState<string[]>(candidate.skills);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile(candidate.id, {
      title: title.trim() || candidate.title,
      bio: bio.slice(0, MAX_BIO_LENGTH),
      location: location.trim() || candidate.location,
      availability: availability.trim() || candidate.availability,
      workPreference,
      preferredTrack,
      skills: skills.length > 0 ? skills : candidate.skills,
    });
    showToast("Candidate profile updated.", "success");
  };

  return (
    <DashboardShell mode="candidate">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-secondary-text">
              Manage how startup teams discover your skills and availability.
            </p>
          </div>
          <Link
            href={`/talent/${candidate.id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-4 py-2.5 text-xs font-semibold text-deep-forest hover:border-deep-forest"
          >
            <span>View Public Profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <form
            onSubmit={handleSave}
            className="space-y-5 rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8 lg:col-span-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-warm-charcoal">
                  Short Bio
                </label>
                <span className="text-xs text-secondary-text">
                  {bio.length}/{MAX_BIO_LENGTH}
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={MAX_BIO_LENGTH}
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO_LENGTH))}
                className="mt-1.5 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 py-3 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Availability
                </label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Work Mode
                </label>
                <select
                  value={workPreference}
                  onChange={(e) =>
                    setWorkPreference(e.target.value as WorkArrangement)
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-warm-charcoal">
                  Track Preference
                </label>
                <select
                  value={preferredTrack}
                  onChange={(e) =>
                    setPreferredTrack(
                      e.target.value as TrackType | "Both"
                    )
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                >
                  <option value="Internship">Internships</option>
                  <option value="Sprint">SignMeUp Sprints</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-warm-charcoal">
                Skills
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const selected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        selected
                          ? "border-deep-forest bg-deep-forest text-warm-ivory"
                          : "border-sand-border bg-warm-ivory text-warm-charcoal hover:border-muted-sage"
                      }`}
                    >
                      {selected && <Check className="h-3 w-3" />}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-sand-border pt-4">
              <button
                type="submit"
                className="rounded-xl bg-deep-forest px-6 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                Save Profile Changes
              </button>
            </div>
          </form>

          {/* Privacy Visibility Preview */}
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-panel border border-sand-border bg-pure-white p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
                <ShieldCheck className="h-3.5 w-3.5" />
                Public Identity Masking
              </span>
              <p className="mt-3 text-xs text-secondary-text">
                Public discovery cards display only:
              </p>
              <p className="mt-1 font-heading text-xl font-semibold text-warm-charcoal">
                {formatPublicName(candidate.firstName, candidate.lastInitial)}
              </p>

              <div className="mt-4 space-y-2 border-t border-sand-border pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-text">
                  Locked Private Details
                </p>
                <div className="flex items-center justify-between rounded-xl bg-warm-ivory px-3 py-2 text-xs text-secondary-text">
                  <span>{candidate.privateIdentity.fullLegalName}</span>
                  <Lock className="h-3.5 w-3.5 text-muted-sage" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-warm-ivory px-3 py-2 text-xs text-secondary-text">
                  <span>{candidate.privateIdentity.email}</span>
                  <Lock className="h-3.5 w-3.5 text-muted-sage" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}

