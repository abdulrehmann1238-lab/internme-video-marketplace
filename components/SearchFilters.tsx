"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { DURATION_FILTER_OPTIONS } from "@/lib/helpers";
import { SkillMultiSelect } from "@/components/SkillMultiSelect";

export interface DiscoverFilterState {
  keyword: string;
  zipCode: string;
  area: string;
  workArrangement: string;
  track: string;
  skills: string[];
  duration: string;
  sort: "relevant" | "recent" | "shortest";
}

interface SearchFiltersProps {
  filters: DiscoverFilterState;
  activeView: "talent" | "opportunities";
  resultCount: number;
  areas: string[];
  onChange: (next: DiscoverFilterState) => void;
  onClear: () => void;
}

export function SearchFilters({
  filters,
  activeView,
  resultCount,
  areas,
  onChange,
  onClear,
}: SearchFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasActiveFilters =
    Boolean(filters.keyword) ||
    Boolean(filters.zipCode) ||
    filters.area !== "all" ||
    filters.workArrangement !== "all" ||
    filters.track !== "all" ||
    filters.skills.length > 0 ||
    filters.duration !== "all";

  const filterChips: { key: string; label: string; remove: () => void }[] = [];
  if (filters.keyword) {
    filterChips.push({
      key: "keyword",
      label: `Search: "${filters.keyword}"`,
      remove: () => onChange({ ...filters, keyword: "" }),
    });
  }
  if (filters.zipCode) {
    filterChips.push({
      key: "zip",
      label: `ZIP: ${filters.zipCode}`,
      remove: () => onChange({ ...filters, zipCode: "" }),
    });
  }
  if (filters.area !== "all") {
    filterChips.push({
      key: "area",
      label: `Area: ${filters.area}`,
      remove: () => onChange({ ...filters, area: "all" }),
    });
  }
  if (filters.workArrangement !== "all") {
    filterChips.push({
      key: "arrangement",
      label: filters.workArrangement,
      remove: () => onChange({ ...filters, workArrangement: "all" }),
    });
  }
  if (filters.track !== "all") {
    filterChips.push({
      key: "track",
      label: filters.track === "Sprint" ? "SignMeUp Sprint" : "Internship",
      remove: () => onChange({ ...filters, track: "all" }),
    });
  }
  if (filters.duration !== "all") {
    const found = DURATION_FILTER_OPTIONS.find(
      (d) => d.value === filters.duration
    );
    filterChips.push({
      key: "duration",
      label: found ? found.label : filters.duration,
      remove: () => onChange({ ...filters, duration: "all" }),
    });
  }
  for (const skill of filters.skills) {
    filterChips.push({
      key: `skill-${skill}`,
      label: skill,
      remove: () =>
        onChange({
          ...filters,
          skills: filters.skills.filter((s) => s !== skill),
        }),
    });
  }

  const FilterControlsGrid = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {/* ZIP / Postal Code */}
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-sage" />
        <input
          type="text"
          value={filters.zipCode}
          onChange={(e) => onChange({ ...filters, zipCode: e.target.value })}
          placeholder="ZIP / Postal code"
          aria-label="ZIP or postal code"
          className="h-11 w-full rounded-xl border border-sand-border bg-pure-white pl-9 pr-3 text-sm text-warm-charcoal placeholder:text-secondary-text focus:border-deep-forest focus:outline-none"
        />
      </div>

      {/* Area / Location */}
      <select
        value={filters.area}
        onChange={(e) => onChange({ ...filters, area: e.target.value })}
        aria-label="Area or location"
        className="h-11 w-full rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
      >
        <option value="all">Area: All locations</option>
        {areas.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      {/* Work Arrangement */}
      <select
        value={filters.workArrangement}
        onChange={(e) =>
          onChange({ ...filters, workArrangement: e.target.value })
        }
        aria-label="Work arrangement"
        className="h-11 w-full rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
      >
        <option value="all">Mode: All modes</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="On-site">On-site</option>
      </select>

      {/* Track */}
      <select
        value={filters.track}
        onChange={(e) => onChange({ ...filters, track: e.target.value })}
        aria-label="Opportunity track"
        className="h-11 w-full rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
      >
        <option value="all">Track: All tracks</option>
        <option value="Internship">Internship (3–12 mos)</option>
        <option value="Sprint">SignMeUp Sprint (1–8 wks)</option>
      </select>

      {/* Skills Multi-select */}
      <SkillMultiSelect
        selectedSkills={filters.skills}
        onChange={(skills) => onChange({ ...filters, skills })}
      />

      {/* Duration */}
      <select
        value={filters.duration}
        onChange={(e) => onChange({ ...filters, duration: e.target.value })}
        aria-label="Duration"
        className="h-11 w-full rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm text-warm-charcoal focus:border-deep-forest focus:outline-none"
      >
        {DURATION_FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="rounded-panel border border-sand-border bg-pure-white p-4 sm:p-6">
      {/* Top Row: Keyword search + Sort + Mobile filter toggle */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            placeholder={
              activeView === "talent"
                ? "Search talent by role, skill, or bio..."
                : "Search roles, companies, or skills..."
            }
            aria-label="Search by keyword"
            className="h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 pl-10 pr-4 text-sm text-warm-charcoal placeholder:text-secondary-text focus:border-deep-forest focus:bg-pure-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-4 text-sm font-medium text-warm-charcoal lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-deep-forest" />
            <span>Filters</span>
            {filterChips.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-deep-forest text-[11px] font-semibold text-warm-ivory">
                {filterChips.length}
              </span>
            )}
          </button>

          {activeView === "opportunities" && (
            <select
              value={filters.sort}
              onChange={(e) =>
                onChange({
                  ...filters,
                  sort: e.target.value as DiscoverFilterState["sort"],
                })
              }
              aria-label="Sort opportunities"
              className="h-11 rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm font-medium text-warm-charcoal focus:border-deep-forest focus:outline-none"
            >
              <option value="relevant">Sort: Most relevant</option>
              <option value="recent">Sort: Recently posted</option>
              <option value="shortest">Sort: Shortest duration</option>
            </select>
          )}
        </div>
      </div>

      {/* Desktop Filter Controls */}
      <div className="mt-3 hidden lg:block">{FilterControlsGrid}</div>

      {/* Mobile Collapsible Filter Sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mt-4 border-t border-sand-border pt-4">
              {FilterControlsGrid}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Chips & Result Count */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-sand-border/70 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-warm-charcoal">
            {resultCount}{" "}
            {activeView === "talent"
              ? resultCount === 1
                ? "candidate"
                : "candidates"
              : resultCount === 1
                ? "opportunity"
                : "opportunities"}
          </span>

          <AnimatePresence>
            {filterChips.map((chip) => (
              <motion.span
                key={chip.key}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-deep-forest/20 bg-soft-sage px-3 py-1 text-xs font-medium text-deep-forest"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.remove}
                  aria-label={`Remove ${chip.label} filter`}
                  className="rounded-full p-0.5 transition hover:bg-deep-forest/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-deep-forest hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

